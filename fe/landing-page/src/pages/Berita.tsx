function Berita() {
  return (
    <section className="relative bg-[#F9F9F9]">
      <div className="mb-9">
        <div className="h-[300px] relative">
          <div className="absolute inset-0 bg-[url('/images/dots_berita.png')] bg-center bg-cover bg-repeat-x overflow-hidden">
            <div className="max-w-2xl mx-auto relative h-full">
              <img src="/images/berita_cover.png" alt="berita" className="absolute bottom-0 right-0 transform translate-x-1/2 w-[300px] object-cover" />
            </div>
          </div>
        </div>

        <div className="flex h-2 w-full">
          <div className="w-1/3 bg-[#9C0000]"></div>
          <div className="w-1/3 bg-[#FFB835]"></div>
          <div className="w-1/3 bg-[#6E0112]"></div>
        </div>
      </div>

      <div className="container px-20 mx-auto py-8 font-jakarta">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-[#F7F7F7] rounded-lg overflow-hidden shadow-sm ">
            <div className="relative">
              <img src="/images/berita_1.png" alt="Bakso Malang" className="w-full h-[400px] object-cover" />
              <div className="absolute bottom-0 left-0 bg-[#9C0000] text-white p-2.5 font-medium">
                27 September 2025
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl text-[#1E1E1E] font-bold mb-6">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h2>
              <p className="text-[#9B9B9B] mb-8 truncate">Kabar gembira untuk para pecinta kuliner! Bakso...
                <span>
                  <a href="#" className="text-[#9C0000] font-bold hover:underline">Baca Selengkapnya</a>
                </span>
              </p>
            </div>
          </div>

          {/* Sidebar News Cards */}
          <div className="space-y-6">
            {/* News Card 1 */}
            <div className="bg-[#F7F7F7] rounded-lg overflow-hidden shadow-sm flex p-4 items-start gap-4">
              <img src="/images/berita_1.png" alt="Bakso Malang" className="w-[150px] h-[120px] object-cover rounded-md py-4" />
              <div className="flex flex-col gap-y-2">
                <div className="text-[#9C0000] text-sm font-medium mb-1">27 September 2025</div>
                <h3 className="font-semibold text-sm">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h3>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-[#F7F7F7] rounded-lg overflow-hidden shadow-sm flex p-4 items-start gap-4">
              <img src="/images/berita_1.png" alt="Bakso Malang" className="w-[150px] h-[120px] object-cover rounded-md py-4" />
              <div className="flex flex-col gap-y-2">
                <div className="text-[#9C0000] text-sm font-medium mb-1">27 September 2025</div>
                <h3 className="font-semibold text-sm">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h3>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-[#F7F7F7] rounded-lg overflow-hidden shadow-sm flex p-4 items-start gap-4">
              <img src="/images/berita_1.png" alt="Bakso Malang" className="w-[150px] h-[120px] object-cover rounded-md py-4" />
              <div className="flex flex-col gap-y-2">
                <div className="text-[#9C0000] text-sm font-medium mb-1">27 September 2025</div>
                <h3 className="font-semibold text-sm">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="mb-2">
              <svg width="67" height="19" viewBox="0 0 67 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16.0267C11 9.36005 28.5 -2.17329 26.5 5.02671C24.5 12.2267 21 15.36 19.5 16.0267C27.3333 9.6934 42.7 -1.37323 41.5 5.02671C40.3 11.4267 37.6667 15.0267 36.5 16.0267C45.8333 8.69338 63.6 -3.77329 60 5.02671C56.4 13.8267 61.5 16.0267 64.5 16.0267" stroke="#FFB835" stroke-width="4" stroke-linecap="round" />
              </svg>
            </div>
            <h2 className="font-runestars mb-6 relative">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
                BERITA ENGGAL
              </span>
            </h2>
          </div>
          <div className="my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-y-16">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((item: number) => (
              <div className="bg-[#F7F7F7] rounded-lg overflow-hidden shadow-sm " key={item}>
                <div className="m-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src="/images/berita_1.png" alt="Bakso Malang" className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover" />
                    <div className="absolute bottom-0 left-0 bg-[#9C0000] text-white p-2 md:p-2.5 font-medium text-xs md:text-sm">
                      27 September 2025
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-[#1E1E1E] font-bold text-base md:text-lg mb-3 md:mb-6 line-clamp-2">Bakso Malang Enggal Resmi Hadir di Lippo Cikarang bersama Anwar BAB</h2>
                  <div className="text-[#9B9B9B] text-sm md:text-base">
                    Kabar gembira untuk para pecinta kuliner! Bakso...
                    <a href="#" className="text-[#9C0000] font-bold hover:underline ml-1">Baca Selengkapnya</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

export default Berita;
