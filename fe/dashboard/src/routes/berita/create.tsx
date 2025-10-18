import * as React from "react";

import { Link, createFileRoute } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Route = createFileRoute("/berita/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [publishDate, setPublishDate] = React.useState<Date | undefined>(
    new Date(2024, 4, 12),
  );
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-6">
      <nav className="text-sm font-medium text-[#9C1A1C]">
        <Link
          to="/berita"
          className="text-[#9C1A1C]/70 transition-colors hover:text-[#9C1A1C]"
        >
          Daftar Berita
        </Link>{" "}
        <span className="text-[#BFA7AC]">{" > "}</span>
        <span className="text-[#9C1A1C]">Tambah Berita</span>
      </nav>

      <Card className="border-none shadow-sm">
        <CardContent className="space-y-8 p-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#2E2E2E]">
              Upload Foto<span className="text-[#C1272D]">*</span>
            </Label>
            <p className="text-sm text-[#D74E4E]">
              Disarankan menggunakan foto dengan ukuran rasio 3:4
            </p>
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-[#D6DAE1] bg-[#F9FBFD] p-6 text-center">
              <Upload className="size-8 text-[#C1272D]" />
              <div className="text-sm text-[#6B7280]">
                Pilih Foto atau Drop Disini
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F]"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Judul Berita<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                placeholder="Masukan Judul Berita"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Penulis<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                placeholder="Nama Penulis"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Tanggal Publish<span className="text-[#C1272D]">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 w-full justify-start rounded-2xl border border-[#D6DAE1] bg-white px-4 text-left text-sm font-medium text-[#4F4F4F] hover:bg-white"
                >
                  <CalendarIcon className="mr-3 size-4 text-[#C1272D]" />
                  {publishDate
                    ? format(publishDate, "dd-MM-yyyy")
                    : "Pilih Tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto rounded-2xl border border-[#F0F1F3] bg-white p-4"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={publishDate}
                  onSelect={setPublishDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Isi Berita<span className="text-[#C1272D]">*</span>
            </Label>
            <Textarea
              placeholder="Masukan Isi Berita Disini"
              className="min-h-[200px] rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
            />
          </div>

          <div className="pt-2">
            <Button
              type="button"
              className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
            >
              Publish Berita
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
