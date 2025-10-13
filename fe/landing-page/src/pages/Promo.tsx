import { useState } from "react";
import PromoCard from "../components/PromoCard";

function Promo() {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Sample brand data - replace with actual data from API or props
  const brands = [
    { id: "all", name: "Semua Brand" },
    { id: "brand1", name: "Enggal Bakery" },
    { id: "brand2", name: "Enggal Cafe" },
    { id: "brand3", name: "Enggal Resto" },
    { id: "brand4", name: "Enggal Mart" },
  ];

  // Sample promo data - replace with actual data from API
  const promoItems = [
    {
      id: 1,
      description: "Dapatkan Bakso Gratis untuk 50 customer pertama",
      brandId: "brand3", // Enggal Resto
      title: "Promo Re Opening",
      validUntil: "1 Oktober 2026",
      image: "/images/promo.png",
    },
    {
      id: 2,
      description: "Diskon 30% untuk pembelian roti kedua",
      brandId: "brand1", // Enggal Bakery
      title: "Promo Spesial",
      validUntil: "15 November 2026",
      image: "/images/promo.png",
    },
    {
      id: 3,
      description: "Buy 1 Get 1 untuk semua minuman kopi",
      brandId: "brand2", // Enggal Cafe
      title: "Promo Weekend",
      validUntil: "31 Desember 2026",
      image: "/images/promo.png",
    },
    {
      id: 4,
      description: "Diskon 20% untuk semua produk segar",
      brandId: "brand4", // Enggal Mart
      title: "Promo Bulanan",
      validUntil: "5 Januari 2027",
      image: "/images/promo.png",
    },
  ];

  // Filter promos based on selected brand
  const filteredPromos =
    selectedBrand === "all"
      ? promoItems
      : promoItems.filter((promo) => promo.brandId === selectedBrand);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-full relative">
      <div className="w-full">
        <img
          src="/images/banner-1.png"
          className="w-full h-full object-cover"
          alt="Promo"
        />
        <div className="flex h-2 w-full">
          <div className="w-1/3 bg-[#9C0000]"></div>
          <div className="w-1/3 bg-[#FFB835]"></div>
          <div className="w-1/3 bg-[#6E0112]"></div>
        </div>
      </div>
      <div className=" py-12 relative">
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[url('/images/dots_spaced.png')] bg-center bg-cover bg-no-repeat z-0 pointer-events-none left-0 -translate-x-1/4"></div>
        <div className="absolute z-0 pointer-events-none right-0 top-0">
          <svg
            width="207"
            height="250"
            viewBox="0 0 207 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M308.712 186.16C274.529 174.346 218.589 161.37 173.444 165.881M173.444 165.881C141.006 169.123 114.141 181.394 104.925 209.611C82.0039 279.791 181.123 234.923 173.444 165.881ZM173.444 165.881C171.893 151.931 165.981 136.994 153.821 121.819C95.95 49.5997 30.1061 16.1903 5.17394 5.17155"
              stroke="#E0E0E0"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-10 relative z-10 ">
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
                <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
                  Promo Eksklusif dari Setiap Brand
                </span>
                <div className="absolute -top-4 -right-4 w-[39.95px] h-[39.95px] rotate-[30deg]">
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
            <div className="flex justify-between items-center w-full">
              <p className="font-jakarta text-base/[24px] font-medium max-w-[450px]">
                Temukan penawaran spesial yang bisa kamu pilih sesuai dengan
                brand favoritmu.
              </p>
              {/* Brand Filter Dropdown */}
              <div className="relative">
                <div
                  className="inline-flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 gap-2 cursor-pointer hover:bg-gray-50 z-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0011 9.02539V16.9054C10.0411 17.2054 9.94111 17.5254 9.71111 17.7354C9.61859 17.8281 9.50871 17.9016 9.38773 17.9518C9.26676 18.002 9.13708 18.0278 9.00611 18.0278C8.87514 18.0278 8.74546 18.002 8.62448 17.9518C8.50351 17.9016 8.39362 17.8281 8.30111 17.7354L6.29111 15.7254C6.18211 15.6187 6.09922 15.4883 6.04892 15.3443C5.99861 15.2004 5.98225 15.0467 6.00111 14.8954V9.02539H5.97111L0.211108 1.64539C0.0487158 1.43692 -0.0245586 1.17265 0.00729555 0.910321C0.0391497 0.647992 0.173543 0.408937 0.381108 0.245391C0.571108 0.105391 0.781108 0.0253906 1.00111 0.0253906H15.0011C15.2211 0.0253906 15.4311 0.105391 15.6211 0.245391C15.8287 0.408937 15.9631 0.647992 15.9949 0.910321C16.0268 1.17265 15.9535 1.43692 15.7911 1.64539L10.0311 9.02539H10.0011Z"
                      fill="#9C0000"
                    />
                  </svg>
                  <span className="text-sm font-jakarta">
                    {brands.find((brand) => brand.id === selectedBrand)?.name ||
                      "Pilih Brand"}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-2 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                    {brands.map((brand) => (
                      <div
                        key={brand.id}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-16 relative z-10">
            {filteredPromos.length > 0 ? (
              filteredPromos.map((promo) => (
                <div
                  key={promo.id}
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/promo/1")}
                >
                  <PromoCard
                    id={promo.id}
                    title={promo.title}
                    description={promo.description}
                    validUntil={promo.validUntil}
                    image={promo.image}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 py-10 text-center">
                <p className="text-gray-500 font-medium">
                  Tidak ada promo tersedia untuk brand ini saat ini.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="absolute z-0 pointer-events-none left-0 bottom-0 ">
          <svg
            width="237"
            height="200"
            viewBox="0 0 237 251"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-72.0004 64.2172C-37.8172 76.0314 18.1226 89.0074 63.2676 84.496M63.2676 84.496C95.7062 81.2543 122.571 68.9839 131.787 40.7662C154.708 -29.414 55.5891 15.4544 63.2676 84.496ZM63.2676 84.496C64.8191 98.4463 70.7308 113.384 82.8905 128.558C140.762 200.778 206.606 234.187 231.538 245.206"
              stroke="#E0E0E0"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Promo;
