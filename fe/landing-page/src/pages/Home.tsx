function Home() {
  return (
    <div className="max-w-6xl flex mx-auto w-full gap-2">
      <div className="relative bg-[#A71D28] h-[650px] w-1/2 flex items-start justify-center rounded-md overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/dots.png')] bg-center bg-cover bg-no-repeat opacity-20"></div>

        <div className="absolute top-0 left-0 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="269"
            height="206"
            viewBox="0 0 269 206"
            fill="none"
          >
            <path
              d="M5 151C53.5 134.833 153.1 116.4 163.5 172C176.5 241.5 67.5 173 134 99.5C187.2 40.7 242.667 13.8333 263.5 5"
              stroke="#FFB835"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col gap-y-4 px-6 pt-60 self-stretch">
          <div className="flex gap-x-2 justify-left">
            <div className="px-4 py-2 bg-[#9C0000] text-white rounded-sm font-jakarta text-base/relaxed">
              8 Brand besar
            </div>
            <div className="px-4 py-2 bg-[#9C0000] text-white rounded-sm font-jakarta text-base/relaxed">
              25 Outlet
            </div>
            <div className="px-4 py-2 bg-[#9C0000] text-white rounded-sm font-jakarta text-base/relaxed">
              12 kota besar Indonesia
            </div>
          </div>
          <div className="flex gap-[9px]">
            <h1 className="text-[#FFB835] font-runestars">
              <span className="text-shadow-[1px_0_0_#6E0112,-1px_0_0_#6E0112,0_1px_0_#6E0112,0_-1px_0_#6E0112,1px_1px_0_#6E0112,-1px_-1px_0_#6E0112,1px_-1px_0_#6E0112,-1px_1px_0_#6E0112,2px_2px_0_#6E0112,-2px_-2px_0_#6E0112,2px_-2px_0_#6E0112,-2px_2px_0_#6E0112,3px_3px_0_#6E0112,-3px_-3px_0_#6E0112,3px_-3px_0_#6E0112,-3px_3px_0_#6E0112,4px_4px_0_#6E0112,-4px_-4px_0_#6E0112,4px_-4px_0_#6E0112,-4px_4px_0_#6E0112] font-bold text-5xl text-[#FFC04D]">
                RAGAM KULINER,
              </span>
            </h1>
            <h1 className="text-[#6E0112] font-runestars">
              <span className="text-shadow-[1px_0_0_white,-1px_0_0_white,0_1px_0_white,0_-1px_0_white,1px_1px_0_white,-1px_-1px_0_white,1px_-1px_0_white,-1px_1px_0_white,2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white,3px_3px_0_white,-3px_-3px_0_white,3px_-3px_0_white,-3px_3px_0_white,4px_4px_0_white,-4px_-4px_0_white,4px_-4px_0_white,-4px_4px_0_white] font-extrabold text-5xl text-[#6E0112]">
                SATU CERITA
              </span>
            </h1>
            <div className="absolute top-5/12 right-10 w-[39.95px] h-[39.95px] rotate-[30deg]">
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
          </div>
          <div className="font-jakarta text-white max-w-[500px] ">
            Dari bakso prasmanan hingga kuliner Nusantara, kami hadirkan
            pengalaman makan otentik dan hangat untuk semua.
          </div>
          <a
            href="/brand"
            className="mt-10 inline-flex w-fit items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-jakarta text-sm font-semibold uppercase text-[#303030] transition hover:bg-[#FFB835] hover:text-[#6E0112]"
          >
            Jelajahi Brand
          </a>
        </div>
      </div>
      <div className="bg-white border border-[#D9D9D9] rounded-md w-1/2 overflow-hidden h-[650px]">
        <div className="grid grid-cols-4 grid-rows-[repeat(5,1fr)] h-full">
          {/* Row 1 */}
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/logo_navbar.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 1"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/enhaii.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 2"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/bakso_raja.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 3"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/bakso_malang.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 4"
            />
          </div>

          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image1.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 5"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image2.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 6"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image3.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 7"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image3.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 8"
            />
          </div>

          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/rang_kapau.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 9"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/warung_kondang.svg"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 10"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/ambun_suri.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 11"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/warkop_agam.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 12"
            />
          </div>

          {/* Row 4 */}
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image4.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 13"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image5.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 14"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image4.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 15"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/image3.jpg"
              className="w-full h-36 object-cover"
              alt="Logo 16"
            />
          </div>

          {/* Row 5 */}
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/bebek_sawahan.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 17"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center">
            <img
              src="/images/kebab_zabab.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Logo 18"
            />
          </div>
          <div className="border border-gray-300 p-2 flex flex-col items-start justify-center bg-[#FFB835] font-jakarta">
            <span className="text-[#6E0112] text-3xl font-bold leading-none">
              2008
            </span>
            <span className="text-[#6E0112] mt-1 text-left">Est</span>
          </div>

          <div className="border border-gray-300 p-2 flex flex-col items-start justify-center bg-[#9C0000] text-[#FFB835]">
            <span className="text-3xl font-bold leading-none text-left">8</span>
            <span className="mt-1">Brand Besar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
