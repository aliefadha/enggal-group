import * as React from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Upload, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Brand = {
  id: number;
  nama: string;
  logo: string;
  description: string;
};

const createBrand = async (formData: FormData) => {
  const response = await apiClient.post<Brand>("/brand", formData);
  return response.data;
};

export const Route = createFileRoute("/_authenticated/brand/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formState, setFormState] = React.useState({
    nama: "",
    title: "",
    description: "",
    content: "",
    instagramLink: "",
    facebookLink: "",
    twitterLink: "",
    menuLink: "",
  });

  const logoFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const coverImageFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [selectedLogoName, setSelectedLogoName] = React.useState("");
  const [selectedLogoFile, setSelectedLogoFile] = React.useState<File | null>(
    null,
  );

  const [selectedCoverImageName, setSelectedCoverImageName] =
    React.useState("");
  const [selectedCoverImageFile, setSelectedCoverImageFile] =
    React.useState<File | null>(null);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    mutate: mutateBrand,
    reset: resetCreateBrand,
    isPending: isCreatePending,
  } = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Brand berhasil ditambahkan.");
      navigate({ to: "/brand" });
    },
    onError: (mutationError: unknown) => {
      if (mutationError instanceof ApiError) {
        const message = mutationError.message || "Gagal menambahkan brand.";
        setSubmitError(message);
        toast.error(message);
        return;
      }

      const fallbackMessage =
        mutationError instanceof Error
          ? mutationError.message
          : "Gagal menambahkan brand. Silakan coba lagi.";
      setSubmitError(fallbackMessage);
      toast.error(fallbackMessage);
    },
  });

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleLogoFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedLogoName(file ? file.name : "");
    setSelectedLogoFile(file);
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleCoverImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedCoverImageName(file ? file.name : "");
    setSelectedCoverImageFile(file);
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSave = () => {
    if (isCreatePending) {
      return;
    }

    const trimmedNama = formState.nama.trim();
    const trimmedDescription = formState.description.trim();

    if (!trimmedNama || !trimmedDescription) {
      setSubmitError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setSubmitError(null);

    const formData = new FormData();
    formData.append("nama", trimmedNama);
    formData.append("description", trimmedDescription);

    if (selectedLogoFile) {
      formData.append("logo", selectedLogoFile);
    }

    if (selectedCoverImageFile) {
      formData.append("coverImage", selectedCoverImageFile);
    }

    if (formState.title.trim()) {
      formData.append("title", formState.title.trim());
    }

    if (formState.content.trim()) {
      formData.append("content", formState.content.trim());
    }

    if (formState.instagramLink.trim()) {
      formData.append("instagramLink", formState.instagramLink.trim());
    }

    if (formState.facebookLink.trim()) {
      formData.append("facebookLink", formState.facebookLink.trim());
    }

    if (formState.twitterLink.trim()) {
      formData.append("twitterLink", formState.twitterLink.trim());
    }

    if (formState.menuLink.trim()) {
      formData.append("menuLink", formState.menuLink.trim());
    }

    mutateBrand(formData);
  };

  const handleCancel = () => {
    navigate({ to: "/brand" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCancel}
          className="h-10 w-10 rounded-xl border border-[#D6DAE1]"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-[#9C1A1C]">
          Tambah Brand Baru
        </h1>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="space-y-6 p-8">
          {/* Logo Upload */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
              Upload Logo
            </Label>
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
                onClick={() => logoFileInputRef.current?.click()}
              >
                Browse File
              </Button>
              <input
                ref={logoFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoFileChange}
                disabled={isCreatePending}
                className="hidden"
              />
              {selectedLogoName ? (
                <p className="text-xs text-[#4F4F4F]">
                  File dipilih: {selectedLogoName}
                </p>
              ) : null}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
              Upload Cover Image
            </Label>
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
                onClick={() => coverImageFileInputRef.current?.click()}
              >
                Browse File
              </Button>
              <input
                ref={coverImageFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverImageFileChange}
                disabled={isCreatePending}
                className="hidden"
              />
              {selectedCoverImageName ? (
                <p className="text-xs text-[#4F4F4F]">
                  File dipilih: {selectedCoverImageName}
                </p>
              ) : null}
            </div>
          </div>

          {/* Nama Brand */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Nama Brand<span className="text-[#C1272D]">*</span>
            </Label>
            <Input
              value={formState.nama}
              onChange={(event) => handleChange("nama", event.target.value)}
              placeholder="Masukan Nama Brand"
              className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              disabled={isCreatePending}
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">Title</Label>
            <Input
              value={formState.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Masukan Title Brand"
              className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              disabled={isCreatePending}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Deskripsi Brand<span className="text-[#C1272D]">*</span>
            </Label>
            <Textarea
              value={formState.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Masukan Deskripsi Brand"
              className="min-h-[140px] rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              disabled={isCreatePending}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Content
            </Label>
            <Textarea
              value={formState.content}
              onChange={(event) => handleChange("content", event.target.value)}
              placeholder="Masukan Content Brand (optional)"
              className="min-h-[200px] rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              disabled={isCreatePending}
            />
          </div>

          {/* Social Media Links Section */}
          <div className="space-y-4 rounded-2xl border border-[#F0F1F3] bg-[#FAFBFC] p-6">
            <h3 className="text-base font-semibold text-[#2E2E2E]">
              Social Media Links
            </h3>

            {/* Instagram Link */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Instagram Link
              </Label>
              <Input
                value={formState.instagramLink}
                onChange={(event) =>
                  handleChange("instagramLink", event.target.value)
                }
                placeholder="https://instagram.com/yourbrand"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
                disabled={isCreatePending}
              />
            </div>

            {/* Facebook Link */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Facebook Link
              </Label>
              <Input
                value={formState.facebookLink}
                onChange={(event) =>
                  handleChange("facebookLink", event.target.value)
                }
                placeholder="https://facebook.com/yourbrand"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
                disabled={isCreatePending}
              />
            </div>

            {/* Twitter Link */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Twitter Link
              </Label>
              <Input
                value={formState.twitterLink}
                onChange={(event) =>
                  handleChange("twitterLink", event.target.value)
                }
                placeholder="https://twitter.com/yourbrand"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
                disabled={isCreatePending}
              />
            </div>

            {/* Menu Link */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Menu Link
              </Label>
              <Input
                value={formState.menuLink}
                onChange={(event) =>
                  handleChange("menuLink", event.target.value)
                }
                placeholder="https://menu.yourbrand.com"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
                disabled={isCreatePending}
              />
            </div>
          </div>

          {submitError ? (
            <p className="text-sm text-[#C1272D]">{submitError}</p>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              type="button"
              className="h-12 rounded-2xl border border-[#D6DAE1] bg-white px-6 text-sm font-medium text-[#4F4F4F]"
              onClick={handleCancel}
              disabled={isCreatePending}
            >
              Batal
            </Button>
            <Button
              type="button"
              className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
              disabled={isCreatePending}
              onClick={handleSave}
            >
              {isCreatePending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Brand"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
