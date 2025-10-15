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
      <div className="block md:hidden">
        <div className="h-[150px] md:h-[300px] relative">
          <div className="absolute inset-0 bg-[url('/images/dots_berita.png')] bg-center bg-cover bg-repeat-x overflow-hidden">
            <div className="absolute top-0 right-0 hidden md:block">
              <svg width="229" height="269" viewBox="0 0 229 269" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M293 198.032C238.965 176.658 127.999 152.286 116.412 225.797C101.928 317.686 223.368 227.12 149.279 129.942C90.0074 52.2004 28.2108 16.6789 5.00001 5" stroke="#FFB835" stroke-width="10" stroke-linecap="round" />
              </svg>
            </div>
            <div className="absolute bottom-1/4 right-4 hidden md:block">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.639 1.20521C15.909 -0.339024 18.3912 0.91164 17.9059 2.8513L16.4115 8.82438C16.2358 9.52679 16.4802 10.2676 17.0394 10.7276L21.7948 14.6387C23.339 15.9088 22.0884 18.391 20.1487 17.9057L14.1756 16.4113C13.4732 16.2355 12.7324 16.4799 12.2724 17.0391L8.36128 21.7945C7.0912 23.3388 4.609 22.0881 5.09429 20.1485L6.58874 14.1754C6.76448 13.473 6.52007 12.7321 5.96086 12.2722L1.20545 8.36104C-0.338785 7.09096 0.911879 4.60876 2.85154 5.09406L8.82462 6.5885C9.52703 6.76424 10.2679 6.51984 10.7278 5.96062L14.639 1.20521Z" fill="#9C0000" />
              </svg>
            </div>
            <div className="absolute bottom-1/2 right-24 hidden md:block">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25928 3.10019C8.91785 0.164274 12.7951 -1.19565 14.3623 1.31031L19.1887 9.02728C19.7563 9.93477 20.7956 10.4344 21.8588 10.3107L30.8998 9.25928C33.8357 8.91785 35.1956 12.7951 32.6897 14.3623L24.9727 19.1887C24.0652 19.7563 23.5656 20.7956 23.6893 21.8588L24.7407 30.8998C25.0822 33.8357 21.2049 35.1956 19.6377 32.6897L14.8113 24.9727C14.2437 24.0652 13.2044 23.5656 12.1412 23.6893L3.10019 24.7407C0.164274 25.0822 -1.19565 21.2049 1.31031 19.6377L9.02728 14.8113C9.93477 14.2437 10.4344 13.2044 10.3107 12.1412L9.25928 3.10019Z" fill="#9C0000" />
              </svg>

            </div>
            <div className="max-w-4xl mx-auto relative h-full flex justify-between items-center">
              <div className="px-4 md:px-0 ">
                <div className="mb-4">
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
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div className="relative max-w-[450px]">
                  <h2 className="font-runestars mb-6 relative">
                    <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-bold text-3xl md:text-6xl text-[#FFB835] font-runestars whitespace-nowrap">
                      Berita
                    </span>
                    <div className="absolute -top-4 -right-10 w-[39.95px] h-[39.95px] rotate-[30deg] hidden md:block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16.2528 1.51297C17.6991 -0.0545821 20.2667 1.42783 19.6323 3.46408L17.6786 9.7346C17.4488 10.472 17.6642 11.2758 18.2319 11.7995L23.0591 16.2531C24.6266 17.6993 23.1442 20.2669 21.108 19.6325L14.8374 17.6788C14.1 17.4491 13.2963 17.6644 12.7726 18.2321L8.31897 23.0593C6.87274 24.6269 4.30511 23.1444 4.93954 21.1082L6.89324 14.8377C7.12298 14.1003 6.90761 13.2965 6.33995 12.7728L1.51274 8.31919C-0.0548091 6.87297 1.4276 4.30534 3.46385 4.93977L9.73438 6.89346C10.4718 7.12321 11.2755 6.90784 11.7993 6.34018L16.2528 1.51297Z"
                          fill="#FFB835"
                        />
                      </svg>
                    </div>
                  </h2>
                </div>
              </div>
              <img src="/images/berita_cover.png" alt="berita" className="w-[300px] hidden md:block" />
            </div>
          </div>
        </div>

        <div className="flex h-2 w-full">
          <div className="w-1/3 bg-[#9C0000]"></div>
          <div className="w-1/3 bg-[#FFB835]"></div>
          <div className="w-1/3 bg-[#6E0112]"></div>
        </div>
      </div>
      <div className="container mx-auto flex w-full flex-col gap-y-10 px-4 md:px-10 mt-10">
        <div className="flex items-center gap-3 md:gap-10">
          <a href="/" className="text-[#727272] text-sm md:text-base">
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
          <a href="/berita" className="text-[#727272] text-sm md:text-base">
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
          <p className="rounded-sm bg-[#9C0000] p-2 font-medium text-white text-sm md:text-base">
            Buka Berita
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <div className="w-full flex-1">
            <img
              src="/images/berita_1.png"
              alt="Bakso Malang"
              className="mx-auto w-full object-cover rounded-md"
            />
            <div className="my-9 flex flex-col gap-y-8">
              <div className="flex items-center gap-4 md:gap-7">
                <div className="bg-[#9C0000] py-1 px-2 text-xs md:text-sm font-medium text-white ">
                  27 September 2025, 12:00
                </div>
                <div className="h-4 w-[1px] bg-[#878787]" />
                <div className="font-medium text-sm tracking-[-2%] text-[#878787]">
                  Penulis: John Doe
                </div>
              </div>
              <div>
                <h1 className="mb-4 lg:mb-16 text-2xl md:text-3xl font-bold">
                  Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama
                  Anwar BAB
                </h1>
                <p className="text-justify font-medium text-sm md:text-base tracking-[0.5%]">
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
            <div className="hidden md:flex flex-col divide-y divide-[#C1C1C1]">
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
            <div className="md:hidden flex flex-col gap-y-4">
              <div
                className="bg-[#F7F7F7] rounded-lg overflow-hidden flex p-4 items-center md:items-start gap-2  md:gap-4 cursor-pointer"
                onClick={() => (window.location.href = "/berita/1")}
              >
                <img src="/images/berita_1.png" alt="Bakso Malang" className="w-[100px] h-[80px] md:w-[150px] md:h-[120px] object-cover rounded-md" />
                <div className="flex flex-col gap-y-2">
                  <div className="text-[#9C0000] text-sm font-medium mb-1">27 September 2025</div>
                  <h3 className="font-semibold text-sm">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h3>
                </div>
              </div>
              <div
                className="bg-[#F7F7F7] rounded-lg overflow-hidden flex p-4 items-center md:items-start gap-2  md:gap-4 cursor-pointer"
                onClick={() => (window.location.href = "/berita/1")}
              >
                <img src="/images/berita_1.png" alt="Bakso Malang" className="w-[100px] h-[80px] md:w-[150px] md:h-[120px] object-cover rounded-md" />
                <div className="flex flex-col gap-y-2">
                  <div className="text-[#9C0000] text-sm font-medium mb-1">27 September 2025</div>
                  <h3 className="font-semibold text-sm">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h3>
                </div>
              </div>
              <div
                className="bg-[#F7F7F7] rounded-lg overflow-hidden flex p-4 items-center md:items-start gap-2  md:gap-4 cursor-pointer"
                onClick={() => (window.location.href = "/berita/1")}
              >
                <img src="/images/berita_1.png" alt="Bakso Malang" className="w-[100px] h-[80px] md:w-[150px] md:h-[120px] object-cover rounded-md" />
                <div className="flex flex-col gap-y-2">
                  <div className="text-[#9C0000] text-sm font-medium mb-1">27 September 2025</div>
                  <h3 className="font-semibold text-sm">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h3>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-10 mb-16 hidden md:block">
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

        <section className="my-10 mb-16 block md:hidden bg-[#F7F7F7] p-4 rounded-lg">
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
                Promo
              </span>
            </h2>
          </div>
          <div className="flex md:hidden flex-col divide-y divide-[#C1C1C1]">
            <a
              href="/promo/1"
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <img
                src="/images/promo.png"
                alt="promo"
                className="h-[80px] w-[60px] rounded-lg object-cover"
              />
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold">Promo Re Opening</p>
                <p className="text-sm  text-[#9B9B9B]">
                  Dapatkan Bakso Gratis untuk 50
                  customer pertama
                </p>
              </div>
            </a>
            <a
              href="/promo/1"
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <img
                src="/images/promo.png"
                alt="promo"
                className="h-[80px] w-[60px] rounded-lg object-cover"
              />
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold">Promo Re Opening</p>
                <p className="text-sm  text-[#9B9B9B]">
                  Dapatkan Bakso Gratis untuk 50
                  customer pertama
                </p>
              </div>
            </a>
            <a
              href="/promo/1"
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <img
                src="/images/promo.png"
                alt="promo"
                className="h-[80px] w-[60px] rounded-lg object-cover"
              />
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold">Promo Re Opening</p>
                <p className="text-sm  text-[#9B9B9B]">
                  Dapatkan Bakso Gratis untuk 50
                  customer pertama
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BeritaDetail;
