import * as React from "react";

import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError, apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/_authenticated/outlet/create")({
  component: RouteComponent,
});

type BrandOption = {
  id: string;
  nama: string;
};

type ProvinsiOption = {
  id: string;
  nama: string;
  value: string;
}

const provinsiOptions: ProvinsiOption[] = [
  {
    id: "1",
    nama: "Jawa Barat",
    value: "jawa-barat",
  },
  {
    id: "2",
    nama: "Jawa Tengah",
    value: "jawa-tengah",
  },
  {
    id: "3",
    nama: "Jawa Timur",
    value: "jawa-timur",
  },
  {
    id: "4",
    nama: "Jawa Tengah",
    value: "jawa-tengah",
  },
  {
    id: "5",
    nama: "Madura",
    value: "madura",
  },
  {
    id: "6",
    nama: "Aceh",
    value: "aceh",
  },
  {
    id: "7",
    nama: "Sumatra Utara",
    value: "sumatra-utara",
  },
  {
    id: "8",
    nama: "Sumatra Barat",
    value: "sumatra-barat",
  },
  {
    id: "9",
    nama: "Riau",
    value: "riau",
  },
  {
    id: "10",
    nama: "Jambi",
    value: "jambi",
  },
  {
    id: "11",
    nama: "Sumatra Selatan",
    value: "sumatra-selatan",
  },
  {
    id: "12",
    nama: "Lampung",
    value: "lampung",
  },
  {
    id: "13",
    nama: "Banten",
    value: "banten",
  },
  {
    id: "14",
    nama: "Jakarta",
    value: "jakarta",
  },
  {
    id: "15",
    nama: "Kalimantan Barat",
    value: "kalimantan-barat",
  },
  {
    id: "16",
    nama: "Kalimantan Tengah",
    value: "kalimantan-tengah",
  },
  {
    id: "17",
    nama: "Kalimantan Timur",
    value: "kalimantan-timur",
  },
  {
    id: "18",
    nama: "Kalimantan Selatan",
    value: "kalimantan-selatan",
  },
  {
    id: "19",
    nama: "Nusa Tenggara Timur",
    value: "nusa-tenggara-timur",
  },
  {
    id: "20",
    nama: "Nusa Tenggara Barat",
    value: "nusa-tenggara-barat",
  },
  {
    id: "21",
    nama: "Bali",
    value: "bali",
  },
  {
    id: "22",
    nama: "Makassar",
    value: "makassar",
  },
];

type BrandListMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

type OutletItem = {
  id: string;
  brandId: string;
  nama: string;
  jamOperasional: string;
  lokasi: string;
  googleMapsLink: string;
  whatsappUrl?: string;
  image: string;
};

type OperationalHours = {
  start: string;
  end: string;
};

const defaultOperationalHours: OperationalHours = {
  start: "",
  end: "",
};

const normalizeTimeValue = (value: string) => {
  const match = value.match(/(\d{1,2}):(\d{2})/);

  if (!match) {
    return "";
  }

  const [, rawHour, minute] = match;
  const hour = rawHour.padStart(2, "0").slice(-2);

  return `${hour}:${minute}`;
};

const formatOperationalHours = (start: string, end: string) => {
  const trimmedStart = start.trim();
  const trimmedEnd = end.trim();

  if (!trimmedStart && !trimmedEnd) {
    return "";
  }

  if (!trimmedStart || !trimmedEnd) {
    return `${trimmedStart}${trimmedEnd ? ` - ${trimmedEnd}` : ""}`.trim();
  }

  return `${trimmedStart} - ${trimmedEnd}`;
};

const fetchBrandOptions = async () => {
  const params = new URLSearchParams({
    page: "1",
    limit: "100",
  });

  const response = await apiClient.get<BrandOption[], BrandListMeta>(
    `/brand?${params.toString()}`,
  );

  return response.data ?? [];
};

const createOutlet = async (formData: FormData) => {
  const response = await apiClient.post<OutletItem>("/outlet", formData);
  return response.data;
};

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedBrand, setSelectedBrand] = React.useState<string | undefined>(
    undefined,
  );
  const [selectedProvinsi, setSelectedProvinsi] = React.useState<string | undefined>(
    undefined
  )
  const [formState, setFormState] = React.useState({
    name: "",
    address: "",
    operationalHours: "",
    mapsUrl: "",
    whatsappUrl: "",
  });
  const [selectedImageFile, setSelectedImageFile] = React.useState<File | null>(
    null,
  );
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [operationalHours, setOperationalHours] =
    React.useState<OperationalHours>({ ...defaultOperationalHours });

  const {
    data: brandOptions = [],
    isLoading: isBrandLoading,
    isError: isBrandError,
    error: brandError,
  } = useQuery({
    queryKey: ["brands", "options"],
    queryFn: fetchBrandOptions,
  });

  const createOutletMutation = useMutation({
    mutationFn: createOutlet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlets"] });
      toast.success("Outlet berhasil dibuat.");
      setSelectedBrand(undefined);
      setFormState({
        name: "",
        address: "",
        operationalHours: "",
        mapsUrl: "",
        whatsappUrl: "",
      });
      setOperationalHours({ ...defaultOperationalHours });
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
      setSubmitError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      navigate({ to: "/outlet" });
    },
    onError: (mutationError: unknown) => {
      if (mutationError instanceof ApiError) {
        const message = mutationError.message || "Gagal menambahkan outlet.";
        setSubmitError(message);
        toast.error(message);
        return;
      }

      const fallbackMessage =
        mutationError instanceof Error
          ? mutationError.message
          : "Gagal menambahkan outlet. Silakan coba lagi.";

      setSubmitError(fallbackMessage);
      toast.error(fallbackMessage);
    },
  });

  const {
    mutate: mutateOutlet,
    reset: resetOutletMutation,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
  } = createOutletMutation;

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetOutletMutation();
    }
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetOutletMutation();
    }
  };

  const handleProvinsiChange = (value: string) => {
    setSelectedProvinsi(value);
    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetOutletMutation();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImageFile(file);

    // Clean up old preview URL
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    // Create new preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    } else {
      setImagePreviewUrl(null);
    }

    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetOutletMutation();
    }
  };

  const handleOperationalHourChange = (
    key: keyof OperationalHours,
    value: string,
  ) => {
    const trimmedValue = value.trim();
    const sanitizedValue = trimmedValue
      ? normalizeTimeValue(trimmedValue) || trimmedValue
      : "";
    const updatedHours = {
      ...operationalHours,
      [key]: sanitizedValue,
    };

    setOperationalHours(updatedHours);
    const formatted = formatOperationalHours(
      updatedHours.start,
      updatedHours.end,
    );

    setFormState((prevState) => ({
      ...prevState,
      operationalHours: formatted,
    }));

    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetOutletMutation();
    }
  };

  const handleSubmit = () => {
    const trimmedName = formState.name.trim();
    const trimmedAddress = formState.address.trim();
    const formattedOperationalHours = formatOperationalHours(
      operationalHours.start,
      operationalHours.end,
    );
    const trimmedOperationalHours = formattedOperationalHours.trim();
    const trimmedMapsUrl = formState.mapsUrl.trim();
    const trimmedWhatsappUrl = formState.whatsappUrl.trim();
    if (
      !selectedBrand ||
      !trimmedName ||
      !trimmedAddress ||
      !trimmedOperationalHours ||
      !trimmedMapsUrl ||
      !trimmedWhatsappUrl ||
      !selectedImageFile ||
      !selectedProvinsi
    ) {
      setSubmitError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setSubmitError(null);
    if (isCreateSuccess || isCreateError) {
      resetOutletMutation();
    }

    const formData = new FormData();
    formData.append("nama", trimmedName);
    formData.append("lokasi", trimmedAddress);
    formData.append("jamOperasional", trimmedOperationalHours);
    formData.append("googleMapsLink", trimmedMapsUrl);
    formData.append("whatsappUrl", trimmedWhatsappUrl);
    formData.append("brandId", selectedBrand);
    formData.append("provinsi", selectedProvinsi);
    formData.append("image", selectedImageFile);

    mutateOutlet(formData);
  };

  const isSubmitDisabled = isCreatePending;

  React.useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="space-y-6">
      <nav className="text-sm font-medium text-[#9C1A1C]">
        <Link
          to="/outlet"
          className="text-[#9C1A1C]/70 transition-colors hover:text-[#9C1A1C]"
        >
          Daftar Outlet
        </Link>{" "}
        <span className="text-[#BFA7AC]">{">"}</span>{" "}
        <span className="text-[#9C1A1C]">Tambah Outlet</span>
      </nav>

      <Card className="border-none shadow-sm">
        <CardContent className="space-y-8 p-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#2E2E2E]">
              Upload Foto<span className="text-[#C1272D]">*</span>
            </Label>
            <p className="text-sm text-[#D74E4E]">
              Disarankan menggunakan foto dengan ukuran rasio 1:1
            </p>
            {imagePreviewUrl ? (
              <div className="space-y-4">
                <div className="relative rounded-3xl border border-[#D6DAE1] bg-[#F9FBFD] p-4">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="mx-auto max-h-96 rounded-2xl object-contain"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F]"
                  disabled={isCreatePending}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Ganti Foto
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  disabled={isCreatePending}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
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
                  accept="image/*"
                  disabled={isCreatePending}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Nama Outlet<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Masukan Nama Outlet"
                disabled={isCreatePending}
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Brand<span className="text-[#C1272D]">*</span>
              </Label>
              <Select
                value={selectedBrand}
                onValueChange={handleBrandChange}
                disabled={isBrandLoading || isCreatePending}
              >
                <SelectTrigger className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-left text-sm text-[#4F4F4F]">
                  <SelectValue
                    placeholder={
                      isBrandLoading ? "Memuat brand..." : "Pilih Brand Outlet"
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
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Alamat Outlet<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.address}
                onChange={(event) => handleChange("address", event.target.value)}
                placeholder="Jln. A Yani, Bandung"
                disabled={isCreatePending}
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Provinsi<span className="text-[#C1272D]">*</span>
              </Label>
              <Select
                value={selectedProvinsi}
                onValueChange={handleProvinsiChange}
              >
                <SelectTrigger className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-left text-sm text-[#4F4F4F]">
                  <SelectValue
                    placeholder="Pilih Provinsi"
                  />
                </SelectTrigger>
                <SelectContent>
                  {provinsiOptions.map((provinsi) => (
                    <SelectItem key={provinsi.id} value={provinsi.value}>
                      {provinsi.nama}
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
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Jam Operasional<span className="text-[#C1272D]">*</span>
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-[#6B7280]">
                    Mulai
                  </span>
                  <Input
                    type="time"
                    value={operationalHours.start}
                    onChange={(event) =>
                      handleOperationalHourChange("start", event.target.value)
                    }
                    disabled={isCreatePending}
                    className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-[#6B7280]">
                    Selesai
                  </span>
                  <Input
                    type="time"
                    value={operationalHours.end}
                    onChange={(event) =>
                      handleOperationalHourChange("end", event.target.value)
                    }
                    disabled={isCreatePending}
                    className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                URL Googlemaps<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.mapsUrl}
                onChange={(event) =>
                  handleChange("mapsUrl", event.target.value)
                }
                placeholder="https://maps.app.goo.gl/xxxxxx"
                disabled={isCreatePending}
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                URL Whatsapp<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.whatsappUrl}
                onChange={(event) =>
                  handleChange("whatsappUrl", event.target.value)
                }
                placeholder="https://wa.me/6281234567890?text=Halo%20saya%"
                disabled={isCreatePending}
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
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
                  Menyimpan...
                </>
              ) : (
                "Selesai"
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
