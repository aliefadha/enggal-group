type RelatedNewsItem = {
  id: number;
  date: string;
  title: string;
  thumbnail: string;
  href: string;
};

type OtherNewsItem = {
  id: number;
  date: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  href: string;
};

function BeritaDetail() {
  const relatedNews: RelatedNewsItem[] = Array.from(
    { length: 3 },
    (_, index) => ({
      id: index + 1,
      date: "27 September 2025",
      title:
        "Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB",
      thumbnail: "/images/berita_1.png",
      href: `/berita/${index + 1}`,
    }),
  );

  const otherNews: OtherNewsItem[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    date: "27 September 2025",
    title:
      "Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB",
    thumbnail: "/images/berita_1.png",
    excerpt: "Kabar gembira untuk para pecinta kuliner! Bakso...",
    href: `/berita/${index + 1}`,
  }));

  return (
    <div className="font-jakarta">
      <div className="flex h-2 w-full mb-10">
        <div className="h-full w-1/3 bg-[#9C0000]" />
        <div className="h-full w-1/3 bg-[#FFB835]" />
        <div className="h-full w-1/3 bg-[#6E0112]" />
      </div>
      <div className="container mx-auto flex w-full flex-col gap-y-10 px-10">
        <div className="flex items-center gap-10">
          <a href="/" className="text-[#727272]">
            Home
          </a>
          <span className="text-[#727272]">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.07692 0L0 1.16667L5.69231 7L0 12.8333L1.07692 14L8 7L1.07692 0Z"
                fill="#727272"
              />
            </svg>
          </span>
          <a href="/berita" className="text-[#727272]">
            Berita
          </a>
          <span className="text-[#727272]">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.07692 0L0 1.16667L5.69231 7L0 12.8333L1.07692 14L8 7L1.07692 0Z"
                fill="#727272"
              />
            </svg>
          </span>
          <p className="rounded-sm bg-[#9C0000] p-2 font-medium text-white">
            Buka Berita
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <div className="w-full flex-1">
            <img
              src="/images/berita_1.png"
              alt="Bakso Malang"
              className="mx-auto w-full object-cover"
            />
            <div className="my-9 flex flex-col gap-y-8">
              <div className="flex items-center gap-7">
                <div className="bg-[#9C0000] py-1 px-2 text-sm font-medium text-white">
                  27 September 2025, 12:00
                </div>
                <div className="h-4 w-[1px] bg-[#878787]" />
                <div className="font-medium tracking-tighter text-[#878787]">
                  Penulis: John Doe
                </div>
              </div>
              <div>
                <h1 className="mb-16 text-3xl font-bold">
                  Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama
                  Anwar BAB
                </h1>
                <p className="text-justify font-medium tracking-tight">
                  <strong> Lippo Cikarang, 27 September 2025 </strong>–
                  Antusiasme pecinta kuliner di Lippo Cikarang begitu terasa
                  pada acara pembukaan resmi outlet terbaru Bakso Malang Enggal.
                  Peresmian ini semakin meriah dengan kehadiran Anwar BAB,
                  komedian sekaligus food enthusiast yang kini menjadi brand
                  ambassador Bakso Malang Enggal.
                  <br /> <br /> Acara peresmian berlangsung meriah dengan
                  kehadiran Anwar BAB, komedian sekaligus selebriti yang dikenal
                  dekat dengan dunia kuliner. Sebagai brand ambassador, Anwar
                  BAB tampil penuh semangat, menyapa para pengunjung dan berbagi
                  pengalaman seru menikmati bakso prasmanan khas Enggal.
                  Kehadirannya sukses mengundang gelak tawa sekaligus
                  menciptakan suasana hangat di tengah ratusan tamu yang hadir.
                  <br /> <br /> Selain hiburan dari Anwar BAB, grand opening
                  juga diramaikan dengan berbagai promo menarik, mulai dari
                  bakso gratis untuk 100 pengunjung pertama hingga diskon menu
                  spesial selama periode pembukaan. Tak heran, sejak pagi
                  antrean panjang sudah terlihat di depan outlet.
                  <br /> <br /> Dengan dibukanya outlet terbaru ini, Bakso
                  Malang Enggal berharap dapat terus menjadi pilihan utama
                  masyarakat untuk menikmati bakso dengan konsep berbeda. Lippo
                  Cikarang dipilih karena dinilai sebagai kawasan strategis
                  dengan pertumbuhan komunitas yang dinamis dan beragam.
                  <br /> <br /> Kehadiran Bakso Malang Enggal di Lippo Cikarang
                  menandai langkah penting dalam perjalanan ekspansi kuliner
                  Enggal Group. Lebih dari sekadar membuka outlet baru, acara
                  ini menunjukkan bahwa makanan mampu menghadirkan kebersamaan,
                  tawa, dan pengalaman berharga di setiap meja makan.
                </p>
              </div>
            </div>
          </div>

          <aside className="relative w-full lg:max-w-xs">
            <div className="mb-2">
              <svg
                width="67"
                height="19"
                viewBox="0 0 67 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 16.0267C11 9.36005 28.5 -2.17329 26.5 5.02671C24.5 12.2267 21 15.36 19.5 16.0267C27.3333 9.6934 42.7 -1.37323 41.5 5.02671C40.3 11.4267 37.6667 15.0267 36.5 16.0267C45.8333 8.69338 63.6 -3.77329 60 5.02671C56.4 13.8267 61.5 16.0267 64.5 16.0267"
                  stroke="#FFB835"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="font-runestars relative mb-6">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] whitespace-nowrap text-3xl font-extrabold text-white">
                BERITA LAINNYA!
              </span>
            </h2>
            <div className="flex flex-col divide-y divide-[#C1C1C1]">
              {relatedNews.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-[100px] w-[100px] rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-[#9C0000]">{item.date}</p>
                    <p className="text-sm font-semibold text-[#585858]">
                      {item.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-10 mb-16">
          <div className="mb-8">
            <div className="mb-2">
              <svg
                width="67"
                height="19"
                viewBox="0 0 67 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 16.0267C11 9.36005 28.5 -2.17329 26.5 5.02671C24.5 12.2267 21 15.36 19.5 16.0267C27.3333 9.6934 42.7 -1.37323 41.5 5.02671C40.3 11.4267 37.6667 15.0267 36.5 16.0267C45.8333 8.69338 63.6 -3.77329 60 5.02671C56.4 13.8267 61.5 16.0267 64.5 16.0267"
                  stroke="#FFB835"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="font-runestars relative mb-6">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] whitespace-nowrap text-3xl font-extrabold text-white md:text-4xl">
                BERITA ENGGAL
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-16">
            {otherNews.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="overflow-hidden rounded-lg bg-[#F7F7F7] shadow-sm "
              >
                <div className="m-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-[200px] w-full object-cover sm:h-[250px] md:h-[300px]"
                    />
                    <div className="absolute bottom-0 left-0 bg-[#9C0000] p-2 text-xs font-medium text-white md:p-2.5 md:text-sm">
                      {item.date}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-3 text-base font-bold text-[#1E1E1E] md:mb-6 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9B9B9B]">
                    {item.excerpt}
                    <span className="ml-1 font-bold text-[#9C0000]">
                      Baca Selengkapnya
                    </span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BeritaDetail;
