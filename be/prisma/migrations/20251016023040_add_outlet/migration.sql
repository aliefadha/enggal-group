-- CreateTable
CREATE TABLE "Outlet" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "jamOperasional" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
