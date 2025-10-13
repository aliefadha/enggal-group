import { useState } from "react";
import vectorLine from "../assets/images/vector_line.svg";
import TeamCard from "../components/TeamCard";

function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);

  // Sample brand data - replace with actual data from API or props
  const brands = [
    { id: "all", name: "Semua Brand" },
    { id: "brand1", name: "Enggal Bakery" },
    { id: "brand2", name: "Enggal Cafe" },
    { id: "brand3", name: "Enggal Resto" },
    { id: "brand4", name: "Enggal Mart" },
  ];

  // Major cities in Indonesia
  const cities = [
    { id: "all", name: "Semua Kota" },
    { id: "jakarta", name: "Jakarta" },
    { id: "surabaya", name: "Surabaya" },
    { id: "bandung", name: "Bandung" },
    { id: "medan", name: "Medan" },
    { id: "semarang", name: "Semarang" },
    { id: "makassar", name: "Makassar" },
    { id: "palembang", name: "Palembang" },
    { id: "tangerang", name: "Tangerang" },
    { id: "depok", name: "Depok" },
    { id: "bekasi", name: "Bekasi" },
    { id: "yogyakarta", name: "Yogyakarta" },
    { id: "malang", name: "Malang" },
  ];

  // Sample outlet data
  const outlets = [
    {
      id: 1,
      city: "BANDUNG",
      name: "Bakso Malang Enggal",
      address:
        "Jl. Gatot Subroto, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat 40263",
      hours: "10:00 - 20:00",
      image: "/images/outlet.png",
      cityId: "bandung",
    },
    {
      id: 2,
      city: "JAKARTA",
      name: "Enggal Bakery",
      address:
        "Jl. Sudirman No. 123, Kec. Tanah Abang, Jakarta Pusat, DKI Jakarta 10220",
      hours: "08:00 - 22:00",
      image: "/images/outlet.png",
      cityId: "jakarta",
    },
    {
      id: 3,
      city: "SURABAYA",
      name: "Enggal Cafe",
      address: "Jl. Pemuda No. 45, Kec. Genteng, Surabaya, Jawa Timur 60271",
      hours: "09:00 - 21:00",
      image: "/images/outlet.png",
      cityId: "surabaya",
    },
    {
      id: 4,
      city: "MEDAN",
      name: "Enggal Resto",
      address:
        "Jl. Imam Bonjol No. 67, Kec. Medan Petisah, Medan, Sumatera Utara 20154",
      hours: "11:00 - 23:00",
      image: "/images/outlet.png",
      cityId: "medan",
    },
  ];

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Muhammad Firdan",
      position: "CEO",
      image: "/images/ceo.png",
      linkedinUrl: "https://linkedin.com/in/muhammad-firdan",
      instagramUrl: "https://instagram.com/muhammad.firdan",
    },
    {
      id: 2,
      name: "Sarah Wijaya",
      position: "COO",
      image: "/images/ceo.png",
      linkedinUrl: "https://linkedin.com/in/sarah-wijaya",
      instagramUrl: "https://instagram.com/sarah.wijaya",
    },
    {
      id: 3,
      name: "Ahmad Rahman",
      position: "Head of Marketing",
      image: "/images/ceo.png",
      linkedinUrl: "https://linkedin.com/in/ahmad-rahman",
      instagramUrl: "https://instagram.com/ahmad.rahman",
    },
    {
      id: 4,
      name: "Ahmad Rahman",
      position: "Head of Marketing",
      image: "/images/ceo.png",
      linkedinUrl: "https://linkedin.com/in/ahmad-rahman",
      instagramUrl: "https://instagram.com/ahmad.rahman",
    },
    {
      id: 5,
      name: "Ahmad Rahman",
      position: "Head of Marketing",
      image: "/images/ceo.png",
      linkedinUrl: "https://linkedin.com/in/ahmad-rahman",
      instagramUrl: "https://instagram.com/ahmad.rahman",
    },
  ];

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setIsDropdownOpen(false);
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    setIsCityDropdownOpen(false);
  };

  return (
    <section className="">
      <div className="flex gap-2 py-10 max-w-6xl container px-4 w-full mx-auto">
        <div className="relative bg-[#A71D28] h-[650px] w-full lg:w-1/2  flex items-start justify-center rounded-md overflow-hidden">
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

          <div className="relative z-10 flex flex-col gap-y-4 px-6 pt-16 lg:pt-52 self-stretch">
            <div className="flex flex-col lg:flex-row gap-2 justify-left">
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
                12 kota besar Indonesia
              </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-2 gap-2">
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
        <div className="bg-white border border-[#D9D9D9] rounded-md w-1/2 overflow-hidden h-[650px] hidden md:block">
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

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 py-8 lg:py-16 max-w-6xl container px-8 w-full mx-auto">
        <div className="w-full lg:w-4/12 relative">
          <div className="bg-[#FFB835] rounded-md relative h-full ">
            <div className="absolute inset-0 z-10 pointer-events-none bg-[url('/images/dots_spaced.png')] bg-left bg-contain bg-no-repeat opacity-30"></div>
            <div className="absolute inset-0 w-full h-full">
              <svg
                className="w-full h-auto max-w-[350px] sm:max-w-[396px]"
                viewBox="0 0 396 252"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 245C41.5254 218.997 91.7225 172.201 117.379 124.436M117.379 124.436C135.815 90.1147 141.58 55.2927 119.757 27.3245C65.4806 -42.2352 43.8104 85.9707 117.379 124.436ZM117.379 124.436C132.244 132.208 150.998 136.316 174.156 134.389C284.374 125.217 361.437 82.2396 389 64.8768"
                  stroke="#EA9800"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="absolute right-4 sm:right-8 top-1/4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2297 0.649999C22.6759 -0.917554 25.2435 0.56486 24.6091 2.6011L21.5918 12.2855C21.362 13.0228 21.5774 13.8266 22.1451 14.3503L29.6003 21.2286C31.1679 22.6748 29.6855 25.2424 27.6492 24.608L17.9649 21.5907C17.2275 21.3609 16.4237 21.5763 15.9 22.1439L9.02174 29.5992C7.57552 31.1668 5.00789 29.6843 5.64232 27.6481L8.65965 17.9637C8.8894 17.2264 8.67403 16.4226 8.10637 15.8989L0.651107 9.02063C-0.916446 7.57441 0.565968 5.00678 2.60221 5.64121L12.2866 8.65854C13.024 8.88829 13.8277 8.67292 14.3515 8.10526L21.2297 0.649999Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="absolute left-4 sm:left-8 top-1/4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2277 0.649999C22.6739 -0.917554 25.2416 0.56486 24.6072 2.6011L21.5898 12.2855C21.3601 13.0228 21.5754 13.8266 22.1431 14.3503L29.5984 21.2286C31.1659 22.6748 29.6835 25.2424 27.6473 24.608L17.9629 21.5907C17.2255 21.3609 16.4217 21.5763 15.898 22.1439L9.01979 29.5992C7.57356 31.1668 5.00594 29.6843 5.64036 27.6481L8.6577 17.9637C8.88744 17.2264 8.67207 16.4226 8.10441 15.8989L0.649154 9.02063C-0.918399 7.57441 0.564015 5.00678 2.60026 5.64121L12.2846 8.65854C13.022 8.88829 13.8258 8.67292 14.3495 8.10526L21.2277 0.649999Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex items-end justify-center h-full">
              <img
                src="/images/ceo.png"
                alt="Enggal Group CEO"
                className="relative z-10 h-5/6 w-auto object-cover"
              />
            </div>

            <div className="absolute top-4 sm:top-6 -left-3 sm:-left-6 z-20 bg-[#A71D28] text-white px-3 sm:px-6 py-2 sm:py-4 rounded-md flex items-center shadow-lg">
              <svg
                width="19"
                height="20"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.13003 1.65575C0.945774 2.01591 0.855172 2.46211 0.673969 3.35251L0.0652071 6.34385C-0.0210692 6.75171 -0.0217375 7.17259 0.0632433 7.58071C0.148224 7.98883 0.317066 8.37561 0.559432 8.71738C0.801798 9.05914 1.11259 9.3487 1.47278 9.56832C1.83297 9.78795 2.23498 9.93301 2.6542 9.99465C3.07342 10.0563 3.50103 10.0332 3.91085 9.92676C4.32067 9.82034 4.70408 9.63284 5.0376 9.37574C5.37113 9.11864 5.64775 8.79735 5.85054 8.43153C6.05333 8.06572 6.17801 7.66308 6.21696 7.24826L6.28822 6.55795C6.24964 6.99699 6.30467 7.4391 6.4498 7.85605C6.59493 8.273 6.82697 8.65562 7.13108 8.97945C7.43519 9.30328 7.8047 9.5612 8.21598 9.73674C8.62727 9.91229 9.07129 10.0016 9.51969 9.99893C9.96808 9.99627 10.411 9.90172 10.8201 9.72133C11.2292 9.54093 11.5955 9.27864 11.8956 8.95124C12.1957 8.62383 12.4231 8.2385 12.5631 7.81986C12.7031 7.40122 12.7527 6.95848 12.7087 6.51993L12.783 7.24826C12.822 7.66308 12.9467 8.06572 13.1495 8.43153C13.3523 8.79735 13.6289 9.11864 13.9624 9.37574C14.2959 9.63284 14.6793 9.82034 15.0892 9.92676C15.499 10.0332 15.9266 10.0563 16.3458 9.99465C16.765 9.93301 17.167 9.78795 17.5272 9.56832C17.8874 9.3487 18.1982 9.05914 18.4406 8.71738C18.6829 8.37561 18.8518 7.98883 18.9368 7.58071C19.0217 7.17259 19.0211 6.75171 18.9348 6.34385L18.326 3.35251C18.1448 2.46211 18.0542 2.01691 17.87 1.65575C17.678 1.27961 17.4077 0.947363 17.0765 0.680557C16.7454 0.413751 16.3609 0.218354 15.948 0.107048C15.551 1.11809e-07 15.0888 0 14.1645 0H4.83554C3.9112 0 3.44903 1.11809e-07 3.05201 0.107048C2.63908 0.218354 2.25457 0.413751 1.92346 0.680557C1.59235 0.947363 1.32202 1.27961 1.13003 1.65575ZM15.8818 11.5052C16.6772 11.5072 17.4596 11.3069 18.153 10.9239V12.0054C18.153 15.7781 18.153 17.6649 16.9599 18.8365C15.9999 19.7809 14.5696 19.964 12.045 20V16.5074C12.045 15.572 12.045 15.1048 11.8404 14.7566C11.7064 14.5285 11.5136 14.3391 11.2815 14.2074C10.9272 14.0063 10.4518 14.0063 9.5 14.0063C8.54817 14.0063 8.07277 14.0063 7.71851 14.2074C7.48639 14.3391 7.29364 14.5285 7.15963 14.7566C6.95501 15.1048 6.95501 15.572 6.95501 16.5074V20C4.43038 19.964 3.00009 19.7799 2.04012 18.8365C0.847028 17.6649 0.847028 15.7781 0.847028 12.0054V10.9239C1.5407 11.3071 2.32346 11.5073 3.1192 11.5052C4.29563 11.5059 5.42827 11.0667 6.2872 10.2766C7.1624 11.0693 8.30982 11.5081 9.5 11.5052C10.6902 11.5081 11.8376 11.0693 12.7128 10.2766C13.5717 11.0667 14.7054 11.5059 15.8818 11.5052Z"
                  fill="#FFB835"
                />
              </svg>
              <span className="font-bold mr-1 sm:mr-2 text-lg sm:text-xl lg:text-2xl">
                25{" "}
                <sup className="font-normal text-xs sm:text-sm lg:text-base">
                  Outlet
                </sup>
              </span>
            </div>

            <div className="absolute bottom-1/3 sm:bottom-1/4 -right-3 sm:-right-6 z-20 bg-[#A71D28] text-white px-3 sm:px-6 py-2 sm:py-4 rounded-md flex items-center shadow-lg">
              <svg
                width="21"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0"
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
              <span className="font-bold mr-1 sm:mr-2 text-lg sm:text-xl lg:text-2xl">
                8{" "}
                <sup className="font-normal text-xs sm:text-sm lg:text-base">
                  Brand
                </sup>
              </span>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 -left-3 sm:-left-6 z-20 bg-[#A71D28] text-white px-3 sm:px-6 py-2 sm:py-4 rounded-md flex items-center shadow-lg">
              <svg
                width="16"
                height="20"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.32444 18.7368C6.86311 19.187 7.42489 19.5985 8 20C8.57635 19.6038 9.1354 19.1823 9.67556 18.7368C10.576 17.988 11.4234 17.176 12.2116 16.3068C14.0284 14.2946 16 11.3775 16 8.103C16 7.0389 15.7931 5.98522 15.391 5.00211C14.989 4.01901 14.3997 3.12575 13.6569 2.37331C12.914 1.62088 12.0321 1.02402 11.0615 0.616804C10.0909 0.20959 9.05058 0 8 0C6.94943 0 5.90914 0.20959 4.93853 0.616804C3.96793 1.02402 3.08601 1.62088 2.34315 2.37331C1.60028 3.12575 1.011 4.01901 0.608964 5.00211C0.206926 5.98522 -1.56548e-08 7.0389 0 8.103C0 11.3775 1.97156 14.2937 3.78844 16.3068C4.57655 17.1763 5.42397 17.9877 6.32444 18.7368ZM8 11.0291C7.23382 11.0291 6.49902 10.7208 5.95725 10.1721C5.41548 9.6233 5.11111 8.87904 5.11111 8.103C5.11111 7.32695 5.41548 6.58269 5.95725 6.03395C6.49902 5.4852 7.23382 5.17692 8 5.17692C8.76618 5.17692 9.50098 5.4852 10.0428 6.03395C10.5845 6.58269 10.8889 7.32695 10.8889 8.103C10.8889 8.87904 10.5845 9.6233 10.0428 10.1721C9.50098 10.7208 8.76618 11.0291 8 11.0291Z"
                  fill="#FFB835"
                />
              </svg>
              <span className="font-bold mr-1 sm:mr-2 text-lg sm:text-xl lg:text-2xl">
                12{" "}
                <sup className="font-normal text-xs sm:text-sm lg:text-base">
                  Kota Besar
                </sup>
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center bg-[#F7F7F7F8] p-4 lg:p-6 rounded-xl">
          <div className="flex items-start justify-start mb-4">
            <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
          </div>
          <h2 className="font-runestars mb-4">
            <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-2xl md:text-3xl lg:text-4xl text-white">
              Menyatukan Orang Lewat Meja Makan
            </span>
          </h2>

          <p className="text-[#4D3200] font-jakarta mb-6 lg:mb-8 italic text-sm lg:text-base">
            Kami percaya bahwa makanan tidak hanya soal rasa, tetapi juga
            pengalaman. Enggal Group hadir untuk menyatukan orang-orang lewat
            kuliner dari meja makan. Dengan berbagai inovasi dan pelayanan
            prima, kami berkomitmen untuk terus berkembang dan menjadi bagian
            dari cerita kuliner Indonesia.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full sm:w-3/4 py-2 px-4 bg-white rounded-lg gap-4 sm:gap-0">
            <div className="flex flex-col items-start">
              <h3 className="text-[#303030] font-jakarta text-sm lg:text-lg font-semibold">
                Muhammad Firdan
              </h3>
              <p className="text-[#666666] font-jakarta">Enggal Group CEO</p>
            </div>

            <div className="flex gap-x-3 items-center">
              <a
                href="https://linkedin.com"
                className="bg-[#FFB835] hover:bg-[#A71D28] hover:text-white text-[#A71D28] p-2 rounded-md transition-colors flex items-center justify-center w-10 h-10"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="bg-[#FFB835] hover:bg-[#A71D28] hover:text-white text-[#A71D28] p-2 rounded-md transition-colors flex items-center justify-center w-10 h-10"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 flex justify-between max-w-6xl container px-4 w-full mx-auto">
        <div className="flex flex-col items-start justify-start w-full lg:w-1/4">
          <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
          <h2 className="font-runestars mb-2">
            <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
              Cerita Kami
            </span>
          </h2>
          <p className="font-jakarta font-medium ">
            Dari Bakso Prasmanan Pertama di Indonesia hingga Multi-brand Kuliner
            untuk Semua Kalangan
          </p>
        </div>
        <div className="flex flex-col w-7/12">
          <div className="flex items-stretch gap-8">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-3 h-3 bg-[#9C0000]"></div>
              <div className="h-full w-0.5 bg-[#FFB835]"></div>
            </div>
            <div className="flex flex-col gap-y-10 w-full pb-16 mb-16 border-b-2 border-dashed border-[#CDCDCD]">
              <p className="text-[#9C0000] font-jakarta font-bold text-xl">
                2008
              </p>
              <div className="flex justify-between">
                <h1 className="font-runestars text-2xl">LAHIRNYA PERJALANAN</h1>
                <p className="font-jakarta text-sm max-w-[250px]">
                  Awal mula Enggal Group dimulai dari Bakso Malang Enggal tahun
                  di Palembang.
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <img
                  src="/images/2008.jpg"
                  className="w-[250px] rounded-md object-cover"
                />
                <img
                  src="/images/2008.jpg"
                  className="w-[250px] rounded-md object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex items-stretch gap-8">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-3 h-3 bg-[#9C0000]"></div>
              <div className="h-full w-0.5 bg-[#FFB835]"></div>
            </div>
            <div className="flex flex-col gap-y-10 w-full pb-16 mb-16 border-b-2 border-dashed border-[#CDCDCD]">
              <p className="text-[#9C0000] font-jakarta font-bold text-xl">
                2008
              </p>
              <div className="flex justify-between">
                <h1 className="font-runestars text-2xl">LAHIRNYA PERJALANAN</h1>
                <p className="font-jakarta text-sm max-w-[250px]">
                  Awal mula Enggal Group dimulai dari Bakso Malang Enggal tahun
                  di Palembang.
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <img
                  src="/images/2008.jpg"
                  className="w-[250px] rounded-md object-cover"
                />
                <img
                  src="/images/2008.jpg"
                  className="w-[250px] rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 flex flex-col gap-y-10 max-w-6xl container px-4 w-full mx-auto">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-y-4 items-start justify-start w-full lg:w-1/3">
            <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
            <h2 className="font-runestars">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
                Brand Kami
              </span>
            </h2>
            <p className="font-jakarta font-medium ">
              Dari Bakso Prasmanan Pertama di Indonesia hingga Multi-brand
              Kuliner untuk Semua Kalangan
            </p>
          </div>
          <svg
            className="hidden lg:block"
            width="277"
            height="51"
            viewBox="0 0 277 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 45.3986C44.8398 22.3284 122.032 -15.2383 112.081 19.0567C99.6433 61.9255 194.208 -19.9674 179.902 18.5727C165.597 57.1129 280.454 -15.7692 270.515 13.105"
              stroke="#FFB835"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="lg:flex justify-center gap-x-8 hidden">
          <div className="bg-white border border-[#D9D9D9] rounded-md w-1/2 flex-1">
            <div className="grid grid-cols-3 h-full">
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/bakso_malang.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Bakso Malang Enggal"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/bakso_raja.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Bakso Raja"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/enhaii.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Enhaii"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/rang_kapau.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Rang Kapau"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white rounded">
                <img
                  src="/images/warung_kondang.svg"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Warung Kondang"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/ambun_suri.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Sarapan Pagi"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/warkop_agam.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Kedai Pical Agam"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/bebek_sawahan.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Bebek Sawahan"
                />
              </div>
              <div className="border border-gray-100 flex items-center justify-center aspect-square bg-white">
                <img
                  src="/images/kebab_zabab.png"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  alt="Kebab Zababa"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex-1 flex flex-col">
            <img
              src="/images/brand_image.jpg"
              className="w-full object-cover rounded-t-xl flex-1"
            />
            <div className="p-4 bg-[#FFB835] flex items-center rounded-b-xl">
              <img
                src="/images/bakso_malang.png"
                className="max-w-24 aspect-square object-contain"
                alt="Bakso Malang Enggal"
              />
              <div className="mx-2 w-1 bg-[#EA9800] h-12"></div>
              <div>
                <h1 className="font-jakarta font-bold text-xl text-[#A71D28]">
                  Bakso Malang
                </h1>
                <p className="font-jakarta text-[#845600]">
                  Bakso Prasmanan Pertama di Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-10 flex flex-col gap-y-8 md:gap-y-10 max-w-6xl container px-4 w-full mx-auto">
        <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:items-center gap-6 lg:gap-4">
          <div className="flex flex-col gap-3 md:gap-4 items-start justify-start w-full lg:w-1/3">
            <img
              src={vectorLine}
              alt="Decorative line"
              className="w-12 h-4 md:w-16 md:h-5"
            />
            <h2 className="font-runestars">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
                Our Outlet
              </span>
            </h2>
            <p className="font-jakarta font-medium text-sm md:text-base leading-relaxed">
              25 Outlet di 12 Kota Besar di Indonesia, Satu Cita Rasa Nusantara
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4 w-full lg:w-auto">
            {/* Brand Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div
                className="inline-flex items-center bg-white border border-gray-300 rounded-md px-3 md:px-4 py-2 gap-2 cursor-pointer hover:bg-gray-50 z-50 w-full sm:w-auto justify-between sm:justify-start"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="17"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-4 md:h-[19px]"
                  >
                    <path
                      d="M10.0011 9.02539V16.9054C10.0411 17.2054 9.94111 17.5254 9.71111 17.7354C9.61859 17.8281 9.50871 17.9016 9.38773 17.9518C9.26676 18.002 9.13708 18.0278 9.00611 18.0278C8.87514 18.0278 8.74546 18.002 8.62448 17.9518C8.50351 17.9016 8.39362 17.8281 8.30111 17.7354L6.29111 15.7254C6.18211 15.6187 6.09922 15.4883 6.04892 15.3443C5.99861 15.2004 5.98225 15.0467 6.00111 14.8954V9.02539H5.97111L0.211108 1.64539C0.0487158 1.43692 -0.0245586 1.17265 0.00729555 0.910321C0.0391497 0.647992 0.173543 0.408937 0.381108 0.245391C0.571108 0.105391 0.781108 0.0253906 1.00111 0.0253906H15.0011C15.2211 0.0253906 15.4311 0.105391 15.6211 0.245391C15.8287 0.408937 15.9631 0.647992 15.9949 0.910321C16.0268 1.17265 15.9535 1.43692 15.7911 1.64539L10.0311 9.02539H10.0011Z"
                      fill="#9C0000"
                    />
                  </svg>
                  <span className="text-xs md:text-sm font-jakarta truncate">
                    {brands.find((brand) => brand.id === selectedBrand)?.name ||
                      "Pilih Brand"}
                  </span>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform flex-shrink-0 md:w-4 md:h-4 ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#303030"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Brand Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                  {brands.map((brand) => (
                    <div
                      key={brand.id}
                      className={`px-4 py-2 text-xs md:text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedBrand === brand.id
                          ? "bg-gray-50 font-medium text-[#9C0000]"
                          : ""
                      }`}
                      onClick={() => handleBrandSelect(brand.id)}
                    >
                      {brand.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* City Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div
                className="inline-flex items-center bg-white border border-gray-300 rounded-md px-3 md:px-4 py-2 gap-2 cursor-pointer hover:bg-gray-50 z-50 w-full sm:w-auto justify-between sm:justify-start"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-4 md:h-5"
                  >
                    <path
                      d="M6.32444 18.7368C6.86311 19.187 7.42489 19.5985 8 20C8.57635 19.6038 9.1354 19.1823 9.67556 18.7368C10.576 17.988 11.4234 17.176 12.2116 16.3068C14.0284 14.2946 16 11.3775 16 8.103C16 7.0389 15.7931 5.98522 15.391 5.00211C14.989 4.01901 14.3997 3.12575 13.6569 2.37331C12.914 1.62088 12.0321 1.02402 11.0615 0.616804C10.0909 0.20959 9.05058 0 8 0C6.94943 0 5.90914 0.20959 4.93853 0.616804C3.96793 1.02402 3.08601 1.62088 2.34315 2.37331C1.60028 3.12575 1.011 4.01901 0.608964 5.00211C0.206926 5.98522 -1.56548e-08 7.0389 0 8.103C0 11.3775 1.97156 14.2937 3.78844 16.3068C4.57655 17.1763 5.42397 17.9877 6.32444 18.7368ZM8 11.0291C7.23382 11.0291 6.49902 10.7208 5.95725 10.1721C5.41548 9.6233 5.11111 8.87904 5.11111 8.103C5.11111 7.32695 5.41548 6.58269 5.95725 6.03395C6.49902 5.4852 7.23382 5.17692 8 5.17692C8.76618 5.17692 9.50098 5.4852 10.0428 6.03395C10.5845 6.58269 10.8889 7.32695 10.8889 8.103C10.8889 8.87904 10.5845 9.6233 10.0428 10.1721C9.50098 10.7208 8.76618 11.0291 8 11.0291Z"
                      fill="#9C0000"
                    />
                  </svg>
                  <span className="text-xs md:text-sm font-jakarta truncate">
                    {cities.find((city) => city.id === selectedCity)?.name ||
                      "Pilih Kota"}
                  </span>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform flex-shrink-0 md:w-4 md:h-4 ${isCityDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#303030"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* City Dropdown Menu */}
              {isCityDropdownOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                  {cities.map((city) => (
                    <div
                      key={city.id}
                      className={`px-4 py-2 text-xs md:text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedCity === city.id
                          ? "bg-gray-50 font-medium text-[#9C0000]"
                          : ""
                      }`}
                      onClick={() => handleCitySelect(city.id)}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Outlet Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {outlets
            .filter(
              (outlet) =>
                selectedCity === "all" || outlet.cityId === selectedCity,
            )
            .map((outlet) => (
              <div
                key={outlet.id}
                className="bg-[#F7F7F7F8] rounded-lg overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image Section */}
                  <div className="w-full sm:w-1/3 h-48 sm:h-auto px-3 py-4 sm:px-4 sm:py-6">
                    <img
                      src={outlet.image}
                      alt={outlet.name}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = "/images/outlet.png";
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="w-full sm:w-2/3 p-3 sm:p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-runestars font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-2">
                        {outlet.city}
                      </h3>

                      {/* Address */}
                      <div className="flex items-start mb-3">
                        <svg
                          width="14"
                          height="18"
                          viewBox="0 0 16 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 mt-1 flex-shrink-0 w-3 h-4 sm:w-4 sm:h-5"
                        >
                          <path
                            d="M6.32444 18.7368C6.86311 19.187 7.42489 19.5985 8 20C8.57635 19.6038 9.1354 19.1823 9.67556 18.7368C10.576 17.988 11.4234 17.176 12.2116 16.3068C14.0284 14.2946 16 11.3775 16 8.103C16 7.0389 15.7931 5.98522 15.391 5.00211C14.989 4.01901 14.3997 3.12575 13.6569 2.37331C12.914 1.62088 12.0321 1.02402 11.0615 0.616804C10.0909 0.20959 9.05058 0 8 0C6.94943 0 5.90914 0.20959 4.93853 0.616804C3.96793 1.02402 3.08601 1.62088 2.34315 2.37331C1.60028 3.12575 1.011 4.01901 0.608964 5.00211C0.206926 5.98522 -1.56548e-08 7.0389 0 8.103C0 11.3775 1.97156 14.2937 3.78844 16.3068C4.57655 17.1763 5.42397 17.9877 6.32444 18.7368ZM8 11.0291C7.23382 11.0291 6.49902 10.7208 5.95725 10.1721C5.41548 9.6233 5.11111 8.87904 5.11111 8.103C5.11111 7.32695 5.41548 6.58269 5.95725 6.03395C6.49902 5.4852 7.23382 5.17692 8 5.17692C8.76618 5.17692 9.50098 5.4852 10.0428 6.03395C10.5845 6.58269 10.8889 7.32695 10.8889 8.103C10.8889 8.87904 10.5845 9.6233 10.0428 10.1721C9.50098 10.7208 8.76618 11.0291 8 11.0291Z"
                            fill="#FFB835"
                          />
                        </svg>
                        <p className="text-xs sm:text-sm text-gray-600 font-jakarta leading-relaxed">
                          {outlet.address}
                        </p>
                      </div>

                      {/* Hours */}
                      <div className="flex items-center mb-3 sm:mb-4">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4"
                        >
                          <path
                            d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14.4C4.41766 14.4 1.6 11.5823 1.6 8C1.6 4.41766 4.41766 1.6 8 1.6C11.5823 1.6 14.4 4.41766 14.4 8C14.4 11.5823 11.5823 14.4 8 14.4ZM8.8 4H7.2V8.8L11.2 11.2L12 9.92L8.8 8V4Z"
                            fill="#FFB835"
                          />
                        </svg>
                        <p className="text-xs sm:text-sm text-gray-600 font-jakarta">
                          {outlet.hours}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button className="bg-[#9C0000] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-jakarta font-medium hover:bg-[#7A0000] transition-colors w-full sm:w-auto">
                        Reservasi Disini
                      </button>
                      <button className="text-[#9C0000] hover:underline px-3 py-2 sm:px-4 sm:py-2 rounded-md font-jakarta font-medium transition-colors flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm w-full sm:w-auto">
                        Lihat di Maps
                        <svg
                          className="ml-1 sm:ml-2"
                          width="16"
                          height="12"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 7.02637L17 7.02637M17 7.02637L11 13.0264M17 7.02637L11 1.02637"
                            stroke="#9C0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-[#F7F7F7] py-20 w-full relative">
        <div className="absolute right-0 top-0">
          <svg
            width="205"
            height="298"
            viewBox="0 0 205 298"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M367.758 221.883C326.907 207.765 260.055 192.258 206.104 197.649M206.104 197.649C167.338 201.523 135.232 216.187 124.219 249.909C96.827 333.779 215.28 280.158 206.104 197.649ZM206.104 197.649C204.25 180.977 197.185 163.126 182.653 144.992C113.493 58.6849 34.8059 18.7585 5.01042 5.59044"
              stroke="#E0E0E0"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div className="absolute right-1/12 top-1/12">
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.03047 9.06456C-1.94401 4.63935 3.14854 -0.746291 7.7331 1.97616L22.2053 10.5702C23.8655 11.5561 25.945 11.4979 27.5476 10.4207L41.5167 1.03114C45.9419 -1.94333 51.3276 3.14921 48.6051 7.73377L40.0111 22.206C39.0252 23.8662 39.0834 25.9457 40.1606 27.5482L49.5502 41.5174C52.5246 45.9426 47.4321 51.3283 42.8475 48.6058L28.3753 40.0118C26.7151 39.0259 24.6356 39.0841 23.0331 40.1612L9.06388 49.5508C4.63868 52.5253 -0.746966 47.4328 1.97548 42.8482L10.5695 28.376C11.5554 26.7157 11.4972 24.6363 10.4201 23.0337L1.03047 9.06456Z"
              fill="#E0E0E0"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-y-4 items-center justify-center w-full mx-auto max-w-md text-center mb-16">
          <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
          <h2 className="font-runestars">
            <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-4xl md:text-5xl text-white whitespace-nowrap">
              OUR TEAM
            </span>
          </h2>
          <p className="font-jakarta font-medium ">
            Bekerja bersama untuk menghadirkan pengalaman kuliner terbaik
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <TeamCard
                key={member.id}
                id={member.id}
                name={member.name}
                position={member.position}
                image={member.image}
                linkedinUrl={member.linkedinUrl}
                instagramUrl={member.instagramUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
