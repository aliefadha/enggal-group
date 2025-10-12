function Home() {
  return (
    <div className="max-w-6xl flex mx-auto w-full gap-2 py-10">
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

        <div className="relative z-10 flex flex-col gap-y-4 px-6 pt-52 self-stretch">
          <div className="flex gap-x-2 justify-left">
            <div className="px-4 py-2 bg-[#9C0000] text-white rounded-sm font-jakarta text-sm flex items-center">
              <svg
                width="21"
                className="w-5 h-5 mr-2"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9795 0.282544C11.0307 -0.0941813 9.96934 -0.0941813 9.02055 0.282544L6.72105 1.19567L16.7927 5.03119L20.3354 3.69132C20.1897 3.57399 20.0269 3.47867 19.8523 3.40854L11.9795 0.282544ZM21 5.09288L11.2875 8.76799V20C11.5227 19.9534 11.7534 19.8852 11.9795 19.7954L19.8523 16.6694C20.1915 16.5348 20.4819 16.3042 20.6863 16.0071C20.8908 15.71 21 15.3598 21 15.0015V5.09288ZM9.7125 20V8.76799L0 5.09288V15.0025C0.000206869 15.3607 0.10953 15.7106 0.313978 16.0075C0.518427 16.3045 0.8087 16.5349 1.14765 16.6694L9.02055 19.7954C9.24665 19.8845 9.4773 19.952 9.7125 20ZM0.66465 3.69132L10.5 7.4127L14.6128 5.85587L4.5927 2.04092L1.14765 3.40854C0.96845 3.47984 0.80745 3.5741 0.66465 3.69132Z"
                  fill="#FFB835"
                />
              </svg>
              8 Brand Besar
            </div>
            <div className="px-4 py-2 bg-[#9C0000] text-white rounded-sm font-jakarta text-sm flex items-center">
              <svg
                width="19"
                height="20"
                className="w-5 h-5 mr-2"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.13003 1.65575C0.945774 2.01591 0.855172 2.46211 0.673969 3.35251L0.0652071 6.34385C-0.0210692 6.75171 -0.0217375 7.17259 0.0632433 7.58071C0.148224 7.98883 0.317066 8.37561 0.559432 8.71738C0.801798 9.05914 1.11259 9.3487 1.47278 9.56832C1.83297 9.78795 2.23498 9.93301 2.6542 9.99465C3.07342 10.0563 3.50103 10.0332 3.91085 9.92676C4.32067 9.82034 4.70408 9.63284 5.0376 9.37574C5.37113 9.11864 5.64775 8.79735 5.85054 8.43153C6.05333 8.06572 6.17801 7.66308 6.21696 7.24826L6.28822 6.55795C6.24964 6.99699 6.30467 7.4391 6.4498 7.85605C6.59493 8.273 6.82697 8.65562 7.13108 8.97945C7.43519 9.30328 7.8047 9.5612 8.21598 9.73674C8.62727 9.91229 9.07129 10.0016 9.51969 9.99893C9.96808 9.99627 10.411 9.90172 10.8201 9.72133C11.2292 9.54093 11.5955 9.27864 11.8956 8.95124C12.1957 8.62383 12.4231 8.2385 12.5631 7.81986C12.7031 7.40122 12.7527 6.95848 12.7087 6.51993L12.783 7.24826C12.822 7.66308 12.9467 8.06572 13.1495 8.43153C13.3523 8.79735 13.6289 9.11864 13.9624 9.37574C14.2959 9.63284 14.6793 9.82034 15.0892 9.92676C15.499 10.0332 15.9266 10.0563 16.3458 9.99465C16.765 9.93301 17.167 9.78795 17.5272 9.56832C17.8874 9.3487 18.1982 9.05914 18.4406 8.71738C18.6829 8.37561 18.8518 7.98883 18.9368 7.58071C19.0217 7.17259 19.0211 6.75171 18.9348 6.34385L18.326 3.35251C18.1448 2.46211 18.0542 2.01691 17.87 1.65575C17.678 1.27961 17.4077 0.947363 17.0765 0.680557C16.7454 0.413751 16.3609 0.218354 15.948 0.107048C15.551 1.11809e-07 15.0888 0 14.1645 0H4.83554C3.9112 0 3.44903 1.11809e-07 3.05201 0.107048C2.63908 0.218354 2.25457 0.413751 1.92346 0.680557C1.59235 0.947363 1.32202 1.27961 1.13003 1.65575ZM15.8818 11.5052C16.6772 11.5072 17.4596 11.3069 18.153 10.9239V12.0054C18.153 15.7781 18.153 17.6649 16.9599 18.8365C15.9999 19.7809 14.5696 19.964 12.045 20V16.5074C12.045 15.572 12.045 15.1048 11.8404 14.7566C11.7064 14.5285 11.5136 14.3391 11.2815 14.2074C10.9272 14.0063 10.4518 14.0063 9.5 14.0063C8.54817 14.0063 8.07277 14.0063 7.71851 14.2074C7.48639 14.3391 7.29364 14.5285 7.15963 14.7566C6.95501 15.1048 6.95501 15.572 6.95501 16.5074V20C4.43038 19.964 3.00009 19.7799 2.04012 18.8365C0.847028 17.6649 0.847028 15.7781 0.847028 12.0054V10.9239C1.5407 11.3071 2.32346 11.5073 3.1192 11.5052C4.29563 11.5059 5.42827 11.0667 6.2872 10.2766C7.1624 11.0693 8.30982 11.5081 9.5 11.5052C10.6902 11.5081 11.8376 11.0693 12.7128 10.2766C13.5717 11.0667 14.7054 11.5059 15.8818 11.5052Z"
                  fill="#FFB835"
                />
              </svg>
              25 Outlet
            </div>
            <div className="px-4 py-2 bg-[#9C0000] text-white rounded-sm font-jakarta text-sm flex items-center">
              <svg
                width="16"
                height="20"
                className="w-5 h-5 mr-2"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.32444 18.7368C6.86311 19.187 7.42489 19.5985 8 20C8.57635 19.6038 9.1354 19.1823 9.67556 18.7368C10.576 17.988 11.4234 17.176 12.2116 16.3068C14.0284 14.2946 16 11.3775 16 8.103C16 7.0389 15.7931 5.98522 15.391 5.00211C14.989 4.01901 14.3997 3.12575 13.6569 2.37331C12.914 1.62088 12.0321 1.02402 11.0615 0.616804C10.0909 0.20959 9.05058 0 8 0C6.94943 0 5.90914 0.20959 4.93853 0.616804C3.96793 1.02402 3.08601 1.62088 2.34315 2.37331C1.60028 3.12575 1.011 4.01901 0.608964 5.00211C0.206926 5.98522 -1.56548e-08 7.0389 0 8.103C0 11.3775 1.97156 14.2937 3.78844 16.3068C4.57655 17.1763 5.42397 17.9877 6.32444 18.7368ZM8 11.0291C7.23382 11.0291 6.49902 10.7208 5.95725 10.1721C5.41548 9.6233 5.11111 8.87904 5.11111 8.103C5.11111 7.32695 5.41548 6.58269 5.95725 6.03395C6.49902 5.4852 7.23382 5.17692 8 5.17692C8.76618 5.17692 9.50098 5.4852 10.0428 6.03395C10.5845 6.58269 10.8889 7.32695 10.8889 8.103C10.8889 8.87904 10.5845 9.6233 10.0428 10.1721C9.50098 10.7208 8.76618 11.0291 8 11.0291Z"
                  fill="#FFB835"
                />
              </svg>
              12 kota besar Indonesia
            </div>
          </div>
          <div className="flex flex-row mt-2 gap-2">
            <h1 className="text-[#FFB835] font-runestars">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-bold text-5xl text-[#FFC04D]">
                RAGAM KULINER,
              </span>
            </h1>
            <div className="flex items-center relative">
              <h1 className="text-white font-runestars">
                <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-5xl">
                  SATU CERITA
                </span>
              </h1>
              <div className="absolute right-[-40px] top-[-10px] w-[30px] h-[30px] rotate-[30deg]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
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
          </div>
          <div className="font-jakarta text-white max-w-[500px] mt-2">
            Dari bakso prasmanan hingga kuliner Nusantara, kami hadirkan
            pengalaman makan otentik dan hangat untuk semua.
          </div>
          <a
            href="/brand"
            className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-jakarta text-sm font-semibold  text-[#303030] transition hover:bg-[#FFB835] hover:text-[#6E0112]"
          >
            Jelajahi Brand
          </a>
        </div>
      </div>
      <div className="bg-white border border-[#D9D9D9] rounded-md w-1/2 overflow-hidden h-[650px]">
        <div className="grid grid-cols-4 grid-rows-5 h-full rounded-md overflow-hidden">
          {/* Row 1 - Brand Logos */}
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/logo_navbar.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Enggal Group Indonesia"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/enhaii.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Enhaii"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/bakso_raja.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Bakso Raja"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/bakso_malang.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Bakso Malang Enggal"
            />
          </div>

          {/* Row 2 - Food Images */}
          <div className="col-span-1">
            <img
              src="/images/image1.jpg"
              className="w-full h-full object-cover"
              alt="Food 1"
            />
          </div>
          <div className="col-span-1">
            <img
              src="/images/image2.jpg"
              className="w-full h-full object-cover"
              alt="Food 2"
            />
          </div>
          <div className="col-span-1">
            <img
              src="/images/image3.jpg"
              className="w-full h-full object-cover"
              alt="Food 3"
            />
          </div>
          <div className="col-span-1">
            <img
              src="/images/image3.jpg"
              className="w-full h-full object-cover"
              alt="Food 4"
            />
          </div>

          {/* Row 3 - Brand Logos */}
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/rang_kapau.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Rang Kapau"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/warung_kondang.svg"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Warung Kondang"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/ambun_suri.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Sarapan Pagi"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/warkop_agam.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Kedai Pical Agam"
            />
          </div>

          {/* Row 4 - Food Images */}
          <div className="col-span-1">
            <img
              src="/images/image4.jpg"
              className="w-full h-full object-cover"
              alt="Food 5"
            />
          </div>
          <div className="col-span-1">
            <img
              src="/images/image5.jpg"
              className="w-full h-full object-cover"
              alt="Food 6"
            />
          </div>
          <div className="col-span-1">
            <img
              src="/images/image4.jpg"
              className="w-full h-full object-cover"
              alt="Food 7"
            />
          </div>
          <div className="col-span-1">
            <img
              src="/images/image3.jpg"
              className="w-full h-full object-cover"
              alt="Food 8"
            />
          </div>

          <div className="col-span-1 flex items-center justify-center p-4">
            <img
              src="/images/bebek_sawahan.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Bebek Sawahan"
            />
          </div>
          <div className="border border-gray-100 flex items-center justify-center p-4">
            <img
              src="/images/kebab_zabab.png"
              className="max-w-[80%] max-h-[80%] object-contain"
              alt="Kebab Zababa"
            />
          </div>
          <div className=" p-4 flex flex-col items-start justify-center bg-[#FFB835]">
            <span className="text-[#A71D28] text-4xl font-bold leading-none">
              2008
            </span>
            <span className="text-[#A71D28] mt-1 text-sm">Est</span>
          </div>
          <div className="p-4 flex flex-col items-start justify-center bg-[#A71D28] text-[#FFB835]">
            <span className="text-4xl font-bold leading-none flex gap-x-1">
              8
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5545 0.654239C13.0005 -0.757801 15.3895 0.621465 14.8896 2.5798L13.8497 6.65408C13.6772 7.32997 13.8693 8.04691 14.3566 8.54599L17.2944 11.5545C18.7064 13.0005 17.3271 15.3895 15.3688 14.8896L11.2945 13.8497C10.6186 13.6772 9.9017 13.8693 9.40262 14.3567L6.39414 17.2944C4.9481 18.7064 2.55914 17.3272 3.05898 15.3688L4.09889 11.2945C4.2714 10.6187 4.0793 9.90172 3.59195 9.40264L0.654226 6.39416C-0.757814 4.94811 0.621452 2.55916 2.57978 3.059L6.65407 4.0989C7.32995 4.27141 8.04689 4.07931 8.54597 3.59197L11.5545 0.654239Z"
                  fill="#FFB835"
                />
              </svg>
            </span>
            <span className="mt-1 text-sm">Brand Besar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
