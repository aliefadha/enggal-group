import * as React from "react";

import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Calendar as CalendarIcon,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
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

export const Route = createFileRoute("/berita/")({
  component: RouteComponent,
});

type NewsItem = {
  id: number;
  date: string;
  title: string;
  author: string;
};

function RouteComponent() {
  const news: NewsItem[] = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    date: "13-07-2025",
    title:
      "Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB",
    author: "John Doe",
  }));

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 4),
    to: new Date(2024, 1, 4),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[#9C1A1C]">Daftar Berita</h1>
      <Card className="border-none shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A25C67]" />
                <Input
                  placeholder="Cari Nama User"
                  className="h-12 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] pl-11 text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
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
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center gap-3 text-sm text-[#A25C67]">
                <span>Page</span>
                <Select defaultValue="15">
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
                {news.map((item, index) => (
                  <TableRow key={item.id} className="border-b border-[#F0F1F3]">
                    <TableCell className="text-center text-sm text-[#4F4F4F]">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-sm text-[#4F4F4F]">
                      {item.date}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[#4F4F4F]">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-sm text-[#6B7280]">
                      {item.author}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          size="icon"
                          className="h-10 w-10 rounded-xl bg-[#FFB835] hover:bg-[#f5a118]"
                          type="button"
                        >
                          <Pencil className="size-4 text-[#7A3600]" />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          className="h-10 w-10 rounded-xl bg-[#C1272D] hover:bg-[#a01f24]"
                        >
                          <Trash2 className="size-4 text-white" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
