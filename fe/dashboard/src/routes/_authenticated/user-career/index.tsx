import * as React from "react";

import { createFileRoute } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Loader2, Search } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/user-career/")({
  component: RouteComponent,
});

type CareerApplicant = {
  id: number;
  tanggal: string;
  nama: string;
  no_hp: string;
  email: string;
  cv_link: string;
};

type CareerListMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

async function fetchUserCareers({
  page,
  limit,
  startDate,
  endDate,
}: {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (startDate) {
    params.set("startDate", startDate);
  }

  if (endDate) {
    params.set("endDate", endDate);
  }

  const response = await apiClient.get<CareerApplicant[], CareerListMeta>(
    `/user-career?${params}`,
  );

  const items = response.data ?? [];
  const meta = response.meta ?? {};

  return {
    data: items,
    meta: {
      total: meta.total ?? items.length,
      page: meta.page ?? page,
      limit: meta.limit ?? limit,
    },
  };
}

function formatDisplayDate(date?: string) {
  if (!date) {
    return "-";
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return format(parsed, "dd-MM-yyyy");
}

function RouteComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pagination, setPagination] = React.useState({ page: 1, limit: 15 });

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const startDateParam = dateRange?.from
    ? format(dateRange.from, "yyyy-MM-dd")
    : undefined;
  const endDateParam = dateRange?.to
    ? format(dateRange.to, "yyyy-MM-dd")
    : undefined;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "user-careers",
      pagination.page,
      pagination.limit,
      startDateParam ?? null,
      endDateParam ?? null,
    ],
    queryFn: () =>
      fetchUserCareers({
        ...pagination,
        startDate: startDateParam,
        endDate: endDateParam,
      }),
  });

  const applicants = React.useMemo(() => {
    const items = data?.data ?? [];
    return items.filter((item) =>
      (item.nama ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.data, searchTerm]);

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    setPagination((prev) => ({
      page: 1,
      limit: Number.isNaN(newLimit) ? prev.limit : newLimit,
    }));
  };

  const handleDateRangeChange = (value: DateRange | undefined) => {
    setDateRange(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-[#9C1A1C]">
          Daftar User Career
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] px-4 text-sm font-medium text-[#4F4F4F] hover:bg-[#f1f3f7]"
            >
              <CalendarIcon className="mr-2 size-4 text-[#A25C67]" />
              {dateRange?.from && dateRange?.to
                ? `${format(dateRange.from, "MMM dd yyyy")} - ${format(
                    dateRange.to,
                    "MMM dd yyyy",
                  )}`
                : dateRange?.from
                  ? `${format(dateRange.from, "MMM dd yyyy")} - …`
                  : "Pilih Rentang Tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto rounded-2xl border border-[#F0F1F3] bg-white p-4"
            align="end"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from ?? dateRange?.to ?? new Date()}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Card className="border-none shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A25C67]" />
              <Input
                placeholder="Cari Nama User"
                className="h-12 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] pl-11 text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="flex items-center gap-3 text-sm text-[#A25C67]">
                <span>Page</span>
                <Select
                  value={String(pagination.limit)}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="h-12 w-24 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] text-[#4F4F4F]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#F0F1F3] bg-white">
            <Table>
              <TableHeader className="bg-[#F6F7F9]">
                <TableRow className="border-b border-[#F0F1F3]">
                  <TableHead className="w-16 text-center text-[#9C1A1C]">
                    No
                  </TableHead>
                  <TableHead className="w-40 text-[#9C1A1C]">
                    Tanggal Submit
                  </TableHead>
                  <TableHead className="text-[#9C1A1C]">Nama</TableHead>
                  <TableHead className="w-40 text-[#9C1A1C]">
                    Nomor Whatsapp
                  </TableHead>
                  <TableHead className="text-[#9C1A1C]">Email</TableHead>
                  <TableHead className="w-28 text-center text-[#9C1A1C]">
                    CV
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-12 text-center text-sm text-[#6B7280]"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Memuat data ...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-12 text-center text-sm text-[#C1272D]"
                    >
                      Terjadi kesalahan saat memuat data.
                      <br />
                      <span className="text-xs text-[#9C1A1C]/70">
                        {(error as Error)?.message ?? "Silakan coba lagi."}
                      </span>
                    </TableCell>
                  </TableRow>
                ) : applicants.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-12 text-center text-sm text-[#6B7280]"
                    >
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                ) : (
                  applicants.map((applicant, index) => (
                    <TableRow
                      key={applicant.id}
                      className="border-b border-[#F0F1F3]"
                    >
                      <TableCell className="text-center text-sm text-[#4F4F4F]">
                        {(pagination.page - 1) * pagination.limit + index + 1}
                      </TableCell>
                      <TableCell className="text-sm text-[#4F4F4F]">
                        {formatDisplayDate(applicant.tanggal)}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-[#4F4F4F]">
                        {applicant.nama}
                      </TableCell>
                      <TableCell className="text-sm text-[#6B7280]">
                        {applicant.no_hp}
                      </TableCell>
                      <TableCell className="text-sm text-[#6B7280]">
                        {applicant.email}
                      </TableCell>
                      <TableCell className="text-center text-sm font-semibold text-[#FF9F0D]">
                        <a href={applicant.cv_link} className="hover:underline">
                          Buka
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
