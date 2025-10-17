-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "penulis" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);
