function Home() {
  return (
    <div className="max-w-6xl flex mx-auto w-full">
      <div className="bg-[url(/images/dots.png)] bg-[#A71D28] h-[800px] flex w-full items-center justify-center">
        <div className="flex flex-col items-center gap-y-4">
          <div className="flex gap-x-2 justify-center">
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
          <div className="flex gap-4 justify-center">
            <h1 className="text-[#FFB835] font-runestars text-6xl ">
              <span className="text-shadow-[1px_0_0_#6E0112,-1px_0_0_#6E0112,0_1px_0_#6E0112,0_-1px_0_#6E0112,1px_1px_0_#6E0112,-1px_-1px_0_#6E0112,1px_-1px_0_#6E0112,-1px_1px_0_#6E0112,2px_2px_0_#6E0112,-2px_-2px_0_#6E0112,2px_-2px_0_#6E0112,-2px_2px_0_#6E0112,3px_3px_0_#6E0112,-3px_-3px_0_#6E0112,3px_-3px_0_#6E0112,-3px_3px_0_#6E0112,4px_4px_0_#6E0112,-4px_-4px_0_#6E0112,4px_-4px_0_#6E0112,-4px_4px_0_#6E0112] font-bold text-6xl text-[#FFC04D]">
                RAGAM KULINER,
              </span>
            </h1>
            <h1 className="text-[#6E0112] font-runestars text-6xl ">
              <span className="text-shadow-[1px_0_0_white,-1px_0_0_white,0_1px_0_white,0_-1px_0_white,1px_1px_0_white,-1px_-1px_0_white,1px_-1px_0_white,-1px_1px_0_white,2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white,3px_3px_0_white,-3px_-3px_0_white,3px_-3px_0_white,-3px_3px_0_white,4px_4px_0_white,-4px_-4px_0_white,4px_-4px_0_white,-4px_4px_0_white] font-extrabold text-6xl text-[#6E0112]">
                SATU CERITA
              </span>
            </h1>
          </div>
          <div className="font-jakarta text-white max-w-[500px] text-center">
            Dari bakso prasmanan hingga kuliner Nusantara, kami hadirkan
            pengalaman makan otentik dan hangat untuk semua.
          </div>
          <a
            href="/brand"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-jakarta text-sm font-semibold uppercase text-[#303030] transition hover:bg-[#FFB835] hover:text-[#6E0112]"
          >
            Jelajahi Brand
          </a>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
