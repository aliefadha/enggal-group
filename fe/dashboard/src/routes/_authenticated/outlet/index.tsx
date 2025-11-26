import * as React from "react";

import { Link, createFileRoute } from "@tanstack/react-router";
import { Filter, Loader2, Plus, Search, Trash2 } from "lucide-react";

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
import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Edit from "@/assets/icons/edit.svg";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/outlet/")({
  component: RouteComponent,
});

type OutletItem = {
  id: string;
  nama: string;
  kota: string;
  brand: {
    id: string;
    nama: string;
  };
  jamOperasional: string;
  whatsappUrl: string;
  googleMapsLink: string;
  lokasi: string;
  image: string;
};

type OutletListMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
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

async function fetchOutlet({
  page,
  limit,
  brandId,
}: {
  page: number;
  limit: number;
  brandId?: string;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (brandId) {
    params.set("brandId", brandId);
  }

  const response = await apiClient.get<OutletItem[], OutletListMeta>(
    `/outlet?${params}`,
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

function RouteComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pagination, setPagination] = React.useState({ page: 1, limit: 15 });
  const [selectedBrandId, setSelectedBrandId] = React.useState<
    string | undefined
  >(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { data: brandOptions = [], isLoading: isBrandLoading } = useQuery({
    queryKey: ["brands", "options"],
    queryFn: fetchBrandOptions,
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "outlets",
      pagination.page,
      pagination.limit,
      selectedBrandId ?? null,
    ],
    queryFn: () =>
      fetchOutlet({
        ...pagination,
        brandId: selectedBrandId,
      }),
  });

  const outlets = React.useMemo(() => {
    const items = data?.data ?? [];
    return items.filter((item) =>
      (item.nama ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.data, searchTerm]);

  const totalItems = data?.meta.total ?? 0;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / pagination.limit) : 1;
  const startItemIndex =
    totalItems === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endItemIndex =
    totalItems === 0
      ? 0
      : Math.min(pagination.page * pagination.limit, totalItems);
  const isPrevDisabled = pagination.page <= 1 || isLoading;
  const isNextDisabled = pagination.page >= totalPages || isLoading;
  const shouldShowPagination = totalPages > 1 && !isError;

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    setPagination((prev) => ({
      page: 1,
      limit: Number.isNaN(newLimit) ? prev.limit : newLimit,
    }));
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrandId(value === "all" ? undefined : value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setPagination((prev) => {
      if (direction === "prev") {
        const nextPage = Math.max(prev.page - 1, 1);
        return { ...prev, page: nextPage };
      }

      const nextPage = Math.min(prev.page + 1, totalPages);
      return { ...prev, page: nextPage };
    });
  };

  const deleteOutletMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/outlet/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlets"] });
      toast.success("Outlet berhasil dihapus.");
    },
    onError: (mutationError: unknown) => {
      const message =
        mutationError instanceof ApiError
          ? mutationError.message || "Gagal menghapus outlet."
          : mutationError instanceof Error
            ? mutationError.message
            : "Gagal menghapus outlet. Silakan coba lagi.";
      toast.error(message);
    },
    onSettled: () => {
      setDeleteTargetId(null);
    },
  });

  const { mutate: deleteOutlet, isPending: isDeletePending } =
    deleteOutletMutation;

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    deleteOutlet(id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[#9C1A1C]">Daftar Outlet</h1>
      <Card className="border-none shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A25C67]" />
                <Input
                  placeholder="Cari Outlet"
                  className="h-12 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] pl-11 text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <Select
                value={selectedBrandId ?? "all"}
                onValueChange={handleBrandChange}
                disabled={isBrandLoading}
              >
                <SelectTrigger className="relative h-12 w-full min-w-[12rem] rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] pl-11 pr-4 text-left text-sm font-medium text-[#4F4F4F] focus:ring-0 focus:ring-offset-0 md:w-60">
                  <Filter className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A25C67]" />
                  <SelectValue placeholder="Semua brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua brand</SelectItem>
                  {brandOptions.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button
              type="button"
              asChild
              className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
            >
              <Link to="/outlet/create">
                <Plus className="mr-2 size-4" />
                Tambah Outlet
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
                  <TableHead className="text-[#9C1A1C]">Nama Outlet</TableHead>
                  <TableHead className="w-48 text-[#9C1A1C]">Brand</TableHead>
                  <TableHead className="w-40 text-[#9C1A1C]">
                    Jam Operasional
                  </TableHead>
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
                        Memuat data outlet...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-[#C1272D]"
                    >
                      Terjadi kesalahan saat memuat data outlet.
                      <br />
                      <span className="text-xs text-[#9C1A1C]/70">
                        {(error as Error)?.message ?? "Silakan coba lagi."}
                      </span>
                    </TableCell>
                  </TableRow>
                ) : outlets.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-[#6B7280]"
                    >
                      Tidak ada outlet yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  outlets.map((outlet, index) => (
                    <TableRow
                      key={outlet.id}
                      className="border-b border-[#F0F1F3]"
                    >
                      <TableCell className="text-center text-sm text-[#4F4F4F]">
                        {(pagination.page - 1) * pagination.limit + index + 1}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-[#4F4F4F]">
                        {outlet.nama}
                      </TableCell>
                      <TableCell className="text-sm text-[#6B7280]">
                        {outlet.brand.nama}
                      </TableCell>
                      <TableCell className="text-sm text-[#6B7280]">
                        {outlet.jamOperasional}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            size="icon"
                            type="button"
                            asChild
                            className="h-10 w-10 rounded-xl bg-[#FFECC9] hover:bg-[#FFD700]"
                          >
                            <Link
                              to="/outlet/$outletId/edit"
                              params={{ outletId: outlet.id }}
                            >
                              <img
                                src={Edit}
                                alt="Edit outlet"
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
                                  isDeletePending &&
                                  deleteTargetId === outlet.id
                                }
                              >
                                {isDeletePending &&
                                  deleteTargetId === outlet.id ? (
                                  <Loader2 className="size-4 animate-spin text-white" />
                                ) : (
                                  <Trash2 className="size-4 text-white" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Hapus outlet ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tindakan ini tidak dapat dibatalkan. Outlet
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
                                    deleteTargetId === outlet.id
                                  }
                                  onClick={() => handleDelete(outlet.id)}
                                >
                                  {isDeletePending &&
                                    deleteTargetId === outlet.id ? (
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
          {shouldShowPagination ? (
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#6B7280]">
                Menampilkan {startItemIndex}-{endItemIndex} dari {totalItems}{" "}
                outlet
              </p>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-2xl border border-[#D6DAE1] bg-white px-4 text-sm font-medium text-[#4F4F4F]"
                  onClick={() => handlePageChange("prev")}
                  disabled={isPrevDisabled}
                >
                  Sebelumnya
                </Button>
                <span className="text-sm font-medium text-[#4F4F4F]">
                  Halaman {pagination.page} dari {totalPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-2xl border border-[#D6DAE1] bg-white px-4 text-sm font-medium text-[#4F4F4F]"
                  onClick={() => handlePageChange("next")}
                  disabled={isNextDisabled}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
