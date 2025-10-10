function Promo() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section with Title and Description */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-0.5 w-8 bg-[#A71D28]"></div>
          <h2 className="text-2xl font-bold text-[#A71D28]">Promo Eksklusif dari Setiap Brand</h2>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Temukan penawaran spesial yang bisa kamu pilih sesuai dengan brand favoritmu.
        </p>
      </div>

      {/* Brand Filter Dropdown */}
      <div className="mb-8">
        <div className="inline-flex items-center border border-gray-300 rounded-md px-4 py-2 gap-2 cursor-pointer">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" 
              fill="#303030"
            />
          </svg>
          <span className="text-sm font-medium">Pilih Brand</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
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
      </div>

      {/* Promo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Promo Card 1 */}
        <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative h-48 bg-gray-200">
            {/* Replace with actual promo image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-[#A71D28] text-white text-xs px-3 py-1 rounded-sm">Promo Re Opening</span>
              <h3 className="text-white font-medium mt-2">Dapatkan Bakso Gratis untuk 50 customer pertama</h3>
            </div>
          </div>
          <div className="bg-[#FFB835] px-4 py-3 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 4.03 13.97 0 9 0ZM9 16.2C5.03 16.2 1.8 12.97 1.8 9C1.8 5.03 5.03 1.8 9 1.8C12.97 1.8 16.2 5.03 16.2 9C16.2 12.97 12.97 16.2 9 16.2ZM9.45 4.5H8.1V9.9L12.825 12.735L13.5 11.655L9.45 9.225V4.5Z" 
                  fill="#303030"
                />
              </svg>
              <span className="text-sm font-medium">Berlaku Hingga 1 Oktober 2026</span>
            </div>
          </div>
        </div>

        {/* Promo Card 2 */}
        <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative h-48 bg-gray-200">
            {/* Replace with actual promo image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-[#A71D28] text-white text-xs px-3 py-1 rounded-sm">Promo Re Opening</span>
              <h3 className="text-white font-medium mt-2">Dapatkan Bakso Gratis untuk 50 customer pertama</h3>
            </div>
          </div>
          <div className="bg-[#FFB835] px-4 py-3 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 4.03 13.97 0 9 0ZM9 16.2C5.03 16.2 1.8 12.97 1.8 9C1.8 5.03 5.03 1.8 9 1.8C12.97 1.8 16.2 5.03 16.2 9C16.2 12.97 12.97 16.2 9 16.2ZM9.45 4.5H8.1V9.9L12.825 12.735L13.5 11.655L9.45 9.225V4.5Z" 
                  fill="#303030"
                />
              </svg>
              <span className="text-sm font-medium">Berlaku Hingga 1 Oktober 2026</span>
            </div>
          </div>
        </div>

        {/* Promo Card 3 */}
        <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative h-48 bg-gray-200">
            {/* Replace with actual promo image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-[#A71D28] text-white text-xs px-3 py-1 rounded-sm">Promo Re Opening</span>
              <h3 className="text-white font-medium mt-2">Dapatkan Bakso Gratis untuk 50 customer pertama</h3>
            </div>
          </div>
          <div className="bg-[#FFB835] px-4 py-3 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 4.03 13.97 0 9 0ZM9 16.2C5.03 16.2 1.8 12.97 1.8 9C1.8 5.03 5.03 1.8 9 1.8C12.97 1.8 16.2 5.03 16.2 9C16.2 12.97 12.97 16.2 9 16.2ZM9.45 4.5H8.1V9.9L12.825 12.735L13.5 11.655L9.45 9.225V4.5Z" 
                  fill="#303030"
                />
              </svg>
              <span className="text-sm font-medium">Berlaku Hingga 1 Oktober 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;
