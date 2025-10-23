import * as React from "react";

import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Loader2,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
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
import { ApiError, apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/_authenticated/promo/$promoId/edit")({
  component: RouteComponent,
});

type PromoItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  syaratKetentuan: string;
  berlakuHingga: string;
  brandId: string;
  image: string;
};

type BrandOption = {
  id: string;
  nama: string;
};

type BrandListMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

const fetchPromoById = async (id: string) => {
  const response = await apiClient.get<PromoItem>(`/promo/${id}`);
  return response.data;
};

const fetchBrandOptions = async () => {
  const params = new URLSearchParams({
    page: "1",
    limit: "100",
  });

  const response = await apiClient.get<BrandOption[], BrandListMeta>(
    `/brand?${params}`,
  );

  return response.data ?? [];
};

type UpdatePromoPayload = {
  id: string;
  formData: FormData;
};

const updatePromoById = async (payload: UpdatePromoPayload) => {
  const { id, formData } = payload;
  const response = await apiClient.put<PromoItem>(`/promo/${id}`, formData);
  return response.data;
};

function RouteComponent() {
  const { promoId } = Route.useParams();
  const queryClient = useQueryClient();

  const [selectedBrand, setSelectedBrand] = React.useState<string | undefined>(
    undefined,
  );
  const [validUntil, setValidUntil] = React.useState<Date | undefined>(
    undefined,
  );
  const [formState, setFormState] = React.useState({
    title: "",
    subtitle: "",
    details: "",
  });
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isFormInitialized, setIsFormInitialized] = React.useState(false);
  const [selectedImageName, setSelectedImageName] = React.useState("");
  const [selectedImageFile, setSelectedImageFile] = React.useState<File | null>(
    null,
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["promoById", promoId],
    queryFn: () => fetchPromoById(promoId),
  });

  const {
    data: brandOptions = [],
    isLoading: isBrandLoading,
    isError: isBrandError,
    error: brandError,
  } = useQuery({
    queryKey: ["brands", "options"],
    queryFn: fetchBrandOptions,
  });

  const updatePromoMutation = useMutation({
    mutationFn: updatePromoById,
    onSuccess: (updatedPromo) => {
      queryClient.setQueryData(["promoById", promoId], updatedPromo);
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      setSubmitError(null);
      toast.success("Perubahan berhasil disimpan.");
    },
    onError: (mutationError: unknown) => {
      if (mutationError instanceof ApiError) {
        const message = mutationError.message || "Gagal menyimpan perubahan.";
        setSubmitError(message);
        toast.error(message);
        return;
      }

      const fallbackMessage =
        mutationError instanceof Error
          ? mutationError.message
          : "Gagal menyimpan perubahan. Silakan coba lagi.";

      setSubmitError(fallbackMessage);
      toast.error(fallbackMessage);
    },
  });

  const {
    mutate: mutatePromo,
    reset: resetPromoMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = updatePromoMutation;

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSubmitError(null);
    if (isUpdateSuccess || isUpdateError) {
      resetPromoMutation();
    }
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSubmitError(null);
    if (isUpdateSuccess || isUpdateError) {
      resetPromoMutation();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImageName(file ? file.name : "");
    setSelectedImageFile(file);
    setSubmitError(null);
    if (isUpdateSuccess || isUpdateError) {
      resetPromoMutation();
    }
  };

  const handleValidUntilSelect = (date?: Date) => {
    setValidUntil(date);
    setSubmitError(null);
    if (isUpdateSuccess || isUpdateError) {
      resetPromoMutation();
    }
  };

  const handleSubmit = () => {
    if (!data) {
      return;
    }

    const trimmedTitle = formState.title.trim();
    const trimmedSubtitle = formState.subtitle.trim();
    const trimmedDetails = formState.details.trim();

    if (
      !selectedBrand ||
      !trimmedTitle ||
      !trimmedSubtitle ||
      !trimmedDetails ||
      !validUntil
    ) {
      setSubmitError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setSubmitError(null);
    if (isUpdateSuccess || isUpdateError) {
      resetPromoMutation();
    }

    const formData = new FormData();
    formData.append("title", trimmedTitle);
    formData.append("subtitle", trimmedSubtitle);
    formData.append("description", trimmedDetails);
    formData.append("syaratKetentuan", trimmedDetails);
    formData.append("berlakuHingga", format(validUntil, "yyyy-MM-dd"));
    formData.append("brandId", selectedBrand);

    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    mutatePromo({
      id: promoId,
      formData,
    });
  };

  React.useEffect(() => {
    setSelectedBrand(undefined);
    setValidUntil(undefined);
    setFormState({
      title: "",
      subtitle: "",
      details: "",
    });
    setIsFormInitialized(false);
    setSelectedImageName("");
    setSelectedImageFile(null);
    setSubmitError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    resetPromoMutation();
  }, [promoId, resetPromoMutation]);

  React.useEffect(() => {
    if (!data || isFormInitialized) {
      return;
    }

    setFormState({
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      details: data.syaratKetentuan ?? data.description ?? "",
    });

    setSelectedBrand(data.brandId ?? undefined);

    if (data.berlakuHingga) {
      const parsedDate = new Date(data.berlakuHingga);
      setValidUntil(
        Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate,
      );
    } else {
      setValidUntil(undefined);
    }

    setIsFormInitialized(true);
  }, [data, isFormInitialized]);

  const isFormDisabled = !data;
  const isSubmitDisabled = isFormDisabled || isUpdatePending;

  let content = (
    <Card className="border-none shadow-sm">
      <CardContent className="space-y-8 p-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[#2E2E2E]">
            Upload Foto<span className="text-[#C1272D]">*</span>
          </Label>
          <p className="text-sm text-[#D74E4E]">
            Disarankan menggunakan foto dengan ukuran rasio 4:5
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
              disabled={isSubmitDisabled}
              onClick={() => fileInputRef.current?.click()}
            >
              Browse File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={isSubmitDisabled}
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
              Brand<span className="text-[#C1272D]">*</span>
            </Label>
            <Select
              value={selectedBrand}
              onValueChange={handleBrandChange}
              disabled={isSubmitDisabled || isBrandLoading}
            >
              <SelectTrigger className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-left text-sm text-[#4F4F4F]">
                <SelectValue
                  placeholder={
                    isBrandLoading ? "Memuat brand..." : "Pilih Brand Promo"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {brandOptions.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isBrandError ? (
              <p className="text-xs text-[#C1272D]">
                {(brandError as Error)?.message ?? "Gagal memuat data brand."}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Judul Promo<span className="text-[#C1272D]">*</span>
            </Label>
            <Input
              value={formState.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Masukan Judul Promo Disini"
              disabled={isSubmitDisabled}
              className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Deskripsi Singkat Promo<span className="text-[#C1272D]">*</span>
            </Label>
            <Input
              value={formState.subtitle}
              onChange={(event) => handleChange("subtitle", event.target.value)}
              placeholder="Masukan Disini"
              disabled={isSubmitDisabled}
              className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#2E2E2E]">
              Berlaku Hingga<span className="text-[#C1272D]">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 w-full justify-start rounded-2xl border border-[#D6DAE1] bg-white px-4 text-left text-sm font-medium text-[#4F4F4F] hover:bg-white"
                  disabled={isSubmitDisabled}
                >
                  <CalendarIcon className="mr-3 size-4 text-[#C1272D]" />
                  {validUntil ? format(validUntil, "dd-MM-yyyy") : "Pilih Tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto rounded-2xl border border-[#F0F1F3] bg-white p-4"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={validUntil}
                  onSelect={handleValidUntilSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#2E2E2E]">
            Deskripsi Ketentuan dan Mekanisme Promo
            <span className="text-[#C1272D]">*</span>
          </Label>
          <Textarea
            value={formState.details}
            onChange={(event) => handleChange("details", event.target.value)}
            placeholder="Masukan syarat, ketentuan dan mekanisme Claim Promo"
            disabled={isSubmitDisabled}
            className="min-h-[200px] rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
          />
        </div>

        <div className="pt-2">
          <Button
            type="button"
            className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            {isUpdatePending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
          {submitError ? (
            <p className="mt-2 text-sm text-[#C1272D]">{submitError}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    content = (
      <Card className="border-none shadow-sm">
        <CardContent className="space-y-8 p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-48 w-full rounded-3xl" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-12 w-48 rounded-2xl" />
        </CardContent>
      </Card>
    );
  } else if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat memuat data promo.";

    content = (
      <Card className="border-none shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <AlertCircle className="size-12 text-[#C1272D]" />
          <div className="space-y-1">
            <p className="text-base font-semibold text-[#2E2E2E]">
              Gagal memuat data promo
            </p>
            <p className="text-sm text-[#6B7280]">{errorMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm font-medium text-[#9C1A1C]">
        <Link
          to="/promo"
          className="text-[#9C1A1C]/70 transition-colors hover:text-[#9C1A1C]"
        >
          Daftar Promo
        </Link>{" "}
        <span className="text-[#BFA7AC]">{">"}</span>{" "}
        <span className="text-[#9C1A1C]">Edit Promo</span>
      </nav>

      {content}
    </div>
  );
}
