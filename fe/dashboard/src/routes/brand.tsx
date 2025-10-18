import * as React from "react";

import { createFileRoute } from "@tanstack/react-router";
import { Search, Pencil, Trash2, Upload, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/brand")({
  component: RouteComponent,
});

function RouteComponent() {
  const brands = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    name: "Bakso Malang Enggal",
    description: "Restoran bakso prasmanan pertama di Indonesia.",
  }));

  const [activeBrand, setActiveBrand] = React.useState<
    (typeof brands)[number] | null
  >(null);
  const [dialogMode, setDialogMode] = React.useState<"create" | "edit" | null>(
    null,
  );
  const [formState, setFormState] = React.useState({
    name: "",
    description: "",
  });
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleCloseDialog = () => {
    setDialogMode(null);
    setActiveBrand(null);
    setFormState({
      name: "",
      description: "",
    });
  };

  const handleSave = () => {
    if (dialogMode === "edit" && activeBrand) {
      // TODO: integrate update brand API once available
    } else if (dialogMode === "create") {
      // TODO: integrate create brand API once available
    }
    handleCloseDialog();
  };

  const handleEditBrand = (brand: (typeof brands)[number]) => {
    setActiveBrand(brand);
    setDialogMode("edit");
    setFormState({
      name: brand.name,
      description: brand.description,
    });
  };

  const handleCreateBrand = () => {
    setActiveBrand(null);
    setDialogMode("create");
    setFormState({
      name: "",
      description: "",
    });
  };

  const isDialogOpen = dialogMode !== null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[#9C1A1C]">Daftar Brand</h1>
      <Card className="border-none shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A25C67]" />
                <Input
                  placeholder="Cari Nama Brand"
                  className="h-12 rounded-2xl border border-[#F0F1F3] bg-[#F9FBFD] pl-11 text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
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
              onClick={handleCreateBrand}
              className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
            >
              <Plus className="mr-2 size-4" />
              Tambah Brand
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#F0F1F3] bg-white">
            <Table>
              <TableHeader className="bg-[#F6F7F9]">
                <TableRow className="border-b border-[#F0F1F3]">
                  <TableHead className="w-16 text-center text-[#9C1A1C]">
                    No
                  </TableHead>
                  <TableHead className="w-32 text-[#9C1A1C]">
                    Logo Brand
                  </TableHead>
                  <TableHead className="text-[#9C1A1C]">Nama Brand</TableHead>
                  <TableHead className="text-[#9C1A1C]">
                    Deskripsi Brand
                  </TableHead>
                  <TableHead className="w-32 text-center text-[#9C1A1C]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand, index) => (
                  <TableRow
                    key={brand.id}
                    className="border-b border-[#F0F1F3]"
                  >
                    <TableCell className="text-center text-sm text-[#4F4F4F]">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF3E0]" />
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[#4F4F4F]">
                      {brand.name}
                    </TableCell>
                    <TableCell className="text-sm text-[#6B7280]">
                      {brand.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          size="icon"
                          className="h-10 w-10 rounded-xl bg-[#FFB835] hover:bg-[#f5a118]"
                          type="button"
                          onClick={() => handleEditBrand(brand)}
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
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          }
        }}
      >
        <DialogContent className="max-w-2xl rounded-3xl p-8">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-semibold text-[#2E2E2E]">
              {dialogMode === "edit" ? "Edit Brand" : "Tambah Brand"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
                Upload Logo<span className="text-[#C1272D]">*</span>
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
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Nama Brand<span className="text-[#C1272D]">*</span>
              </Label>
              <Input
                value={formState.name}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder="Masukan Nama Brand"
                className="h-12 rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#2E2E2E]">
                Deskripsi Brand<span className="text-[#C1272D]">*</span>
              </Label>
              <Textarea
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                placeholder="Masukan Deskripsi Brand"
                className="min-h-[140px] rounded-2xl border border-[#D6DAE1] bg-white text-sm text-[#4F4F4F] ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#C1272D]/30 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              type="button"
              className="h-12 rounded-2xl border border-[#D6DAE1] bg-white px-6 text-sm font-medium text-[#4F4F4F]"
              onClick={handleCloseDialog}
            >
              Batal
            </Button>
            <Button
              type="button"
              className="h-12 rounded-2xl bg-[#6E0112] px-6 text-sm font-semibold text-white hover:bg-[#5a010e]"
              onClick={handleSave}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
