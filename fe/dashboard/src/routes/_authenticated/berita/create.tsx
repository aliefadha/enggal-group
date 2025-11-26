import * as React from "react";

import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Loader2, Upload } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@/components/ui/editor";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/berita/create")({
  component: RouteComponent,
});

type BeritaItem = {
  id: string;
  judul: string;
  image?: string;
  createdDate?: string;
  penulis: string;
  content: string;
};

const createNews = async (formData: FormData) => {
  const response = await apiClient.post<BeritaItem>("/berita", formData);
  return response.data;
};

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [publishDate, setPublishDate] = React.useState<Date | undefined>(
    undefined,
  );
  const [formState, setFormState] = React.useState({
    title: "",
    author: "",
    content: "",
  });
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedImageName, setSelectedImageName] = React.useState("");
  const [selectedImageFile, setSelectedImageFile] = React.useState<File | null>(
    null,
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const createNewsMutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
      toast.success("Berita berhasil dibuat.");
      setFormState({
        title: "",
        author: "",
        content: "",
      });
      setPublishDate(undefined);
      setSelectedImageName("");
      setSelectedImageFile(null);
      setSubmitError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      navigate({ to: "/berita" });
    },
    onError: (mutationError: unknown) => {
      if (mutationError instanceof ApiError) {
        const message =
          mutationError.message || "Gagal mempublikasikan berita.";
        setSubmitError(message);
        toast.error(message);
        return;
      }

      const fallbackMessage =
        mutationError instanceof Error
          ? mutationError.message
          : "Gagal mempublikasikan berita. Silakan coba lagi.";

      setSubmitError(fallbackMessage);
      toast.error(fallbackMessage);
    },
  });

  const {
    mutate: mutateNews,
    reset: resetNewsMutation,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
  } = createNewsMutation;

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetNewsMutation();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImageName(file ? file.name : "");
    setSelectedImageFile(file);
    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetNewsMutation();
    }
  };

  const handlePublishDateSelect = (date?: Date) => {
    setPublishDate(date);
    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetNewsMutation();
    }
  };

  const handleSubmit = () => {
    const trimmedTitle = formState.title.trim();
    const trimmedAuthor = formState.author.trim();
    const trimmedContent = formState.content.trim();

    if (
      !trimmedTitle ||
      !trimmedAuthor ||
      !trimmedContent ||
      !publishDate
    ) {
      setSubmitError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetNewsMutation();
    }

    const formData = new FormData();
    formData.append("judul", trimmedTitle);
    formData.append("penulis", trimmedAuthor);
    formData.append("content", trimmedContent);
    formData.append("createdDate", format(publishDate, "yyyy-MM-dd"));
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    mutateNews(formData);
  };

  const isSubmitDisabled = isCreatePending;

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
              Upload Foto
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
                disabled={isCreatePending}
                onClick={() => fileInputRef.current?.click()}
              >
                Browse File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                disabled={isCreatePending}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedImageName ? (
                <p className="text-xs text-[#4F4F4F]">
                  File dipilih: {selectedImageName}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Judul Berita<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.title}
                onChange={(event) => handleChange("title", event.target.value)}
                placeholder="Masukan Judul Berita"
                disabled={isCreatePending}
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Penulis<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.author}
                onChange={(event) => handleChange("author", event.target.value)}
                placeholder="Nama Penulis"
                disabled={isCreatePending}
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
                  disabled={isCreatePending}
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
                  onSelect={handlePublishDateSelect}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Isi Berita<span className="text-[#C1272D]">*</span>
            </Label>
            <Editor
              value={formState.content}
              onChange={(value) => handleChange("content", value)}
              placeholder="Masukan Isi Berita Disini"
              disabled={isCreatePending}
              className="min-h-[300px]"
            />
          </div>

          <div className="pt-2">
            <Button
              type="button"
              className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
            >
              {isCreatePending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Mempublikasikan...
                </>
              ) : (
                "Publish Berita"
              )}
            </Button>
            {submitError ? (
              <p className="mt-2 text-sm text-[#C1272D]">{submitError}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
