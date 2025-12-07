import * as React from "react";

import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar as CalendarIcon,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ApiError, apiClient } from "@/lib/api-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { toast } from "sonner";
import Edit from "@/assets/icons/edit.svg";

export const Route = createFileRoute("/_authenticated/berita/")({
  component: RouteComponent,
});

type BeritaItem = {
  id: string;
  judul: string;
  slug: string;
  image?: string;
  createdDate?: string;
  penulis: string;
  content: string;
};

type BeritaListMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

async function fetchNews({
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

  const response = await apiClient.get<BeritaItem[], BeritaListMeta>(
    `/berita?${params}`,
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

  const queryClient = useQueryClient();
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  );

  const startDateParam = dateRange?.from
    ? format(dateRange.from, "yyyy-MM-dd")
    : undefined;
  const endDateParam = dateRange?.to
    ? format(dateRange.to, "yyyy-MM-dd")
    : undefined;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "berita",
      pagination.page,
      pagination.limit,
      startDateParam ?? null,
      endDateParam ?? null,
    ],
    queryFn: () =>
      fetchNews({
        ...pagination,
        startDate: startDateParam,
        endDate: endDateParam,
      }),
  });

  const news = React.useMemo(() => {
    const items = data?.data ?? [];
    const filtered = items.filter((item: BeritaItem) =>
      (item.judul ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return filtered;
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

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/berita/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
      toast.success("Berita berhasil dihapus.");
    },
    onError: (mutationError: unknown) => {
      const message =
        mutationError instanceof ApiError
          ? mutationError.message || "Gagal menghapus berita."
          : mutationError instanceof Error
            ? mutationError.message
            : "Gagal menghapus berita. Silakan coba lagi.";

      toast.error(message);
    },
    onSettled: () => {
      setDeleteTargetId(null);
    },
  });

  const { mutate: deleteNews, isPending: isDeletePending } = deleteNewsMutation;

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    deleteNews(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-[#9C1A1C]">Daftar Berita</h1>
        <div className="flex justify-between space-x-6">
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
          <Button
            type="button"
            asChild
            className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
          >
            <Link to="/berita/create">
              <Plus className="mr-2 size-4" />
              Tambah Berita
            </Link>
          </Button>
        </div>
      </div>
      <Card className="border-none shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A25C67]" />
                <Input
                  placeholder="Cari Berita"
                  className="h-12 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] pl-11 text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

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
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
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
                    Tanggal Publish
                  </TableHead>
                  <TableHead className="text-[#9C1A1C]">Judul Berita</TableHead>
                  <TableHead className="w-40 text-[#9C1A1C]">Penulis</TableHead>
                  <TableHead className="w-32 text-center text-[#9C1A1C]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-[#6B7280]"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Memuat data berita...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-[#C1272D]"
                    >
                      Terjadi kesalahan saat memuat data berita.
                      <br />
                      <span className="text-xs text-[#9C1A1C]/70">
                        {(error as Error)?.message ?? "Silakan coba lagi."}
                      </span>
                    </TableCell>
                  </TableRow>
                ) : news.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-[#6B7280]"
                    >
                      Tidak ada data berita yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  news.map((item: BeritaItem, index: number) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-[#F0F1F3]"
                    >
                      <TableCell className="text-center text-sm text-[#4F4F4F]">
                        {(pagination.page - 1) * pagination.limit + index + 1}
                      </TableCell>
                      <TableCell className="text-sm text-[#4F4F4F]">
                        {formatDisplayDate(item.createdDate)}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-[#4F4F4F]">
                        {item.judul}
                      </TableCell>
                      <TableCell className="text-sm text-[#6B7280]">
                        {item.penulis}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            size="icon"
                            className="h-10 w-10 rounded-xl bg-[#FFECC9] hover:bg-[#FFD700]"
                            type="button"
                            asChild
                          >
                            <Link
                              to="/berita/$beritaId/edit"
                              params={{ beritaId: item.slug }}
                            >
                              <img
                                src={Edit}
                                alt="Edit promo"
                                className="size-4"
                              />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="icon"
                                type="button"
                                className="h-10 w-10 rounded-xl bg-[#C1272D] hover:bg-[#a01f24]"
                                disabled={
                                  isDeletePending && deleteTargetId === item.id
                                }
                              >
                                {isDeletePending &&
                                  deleteTargetId === item.id ? (
                                  <Loader2 className="size-4 animate-spin text-white" />
                                ) : (
                                  <Trash2 className="size-4 text-white" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Hapus berita ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tindakan ini tidak dapat dibatalkan. Berita
                                  yang dihapus akan hilang secara permanen.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-2xl">
                                  Batal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="rounded-2xl bg-[#C1272D] hover:bg-[#a01f24]"
                                  disabled={
                                    isDeletePending &&
                                    deleteTargetId === item.id
                                  }
                                  onClick={() => handleDelete(item.id)}
                                >
                                  {isDeletePending &&
                                    deleteTargetId === item.id ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                  ) : null}
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
