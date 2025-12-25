import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E1E1E] pb-20 pt-16">
      {/* Call to Action */}
      <div className="container mx-auto mb-20 max-w-6xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-xl bg-[#9C0000] p-8 sm:p-10 lg:p-16">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/dots.png')] bg-contain bg-center bg-repeat-x opacity-20" />
          <div className="relative z-10 max-w-6xl">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-jakarta text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white">
                  Setiap interaksi adalah awal dari hubungan yang bermakna.
                </h2>
                <p className="max-w-sm font-jakarta text-sm text-[#FFC3C3] sm:text-base md:text-lg lg:hidden mt-4">
                  Kami terbuka untuk kerja sama strategis, dari kemitraan bisnis hingga kolaborasi kreatif.
                </p>
                <button className="mt-8 rounded-xl bg-white py-3 px-6 font-jakarta text-sm md:text-base font-medium transition-all hover:bg-opacity-90 lg:mt-10">
                  <a href="https://wa.me/6281313894340" >
                    Hubungi Kami
                  </a>
                </button>
              </div>
              <p className="max-w-sm font-jakarta text-base md:text-lg lg:text-xl text-[#FFC3C3] lg:block hidden">
                Kami terbuka untuk kerja sama strategis, dari kemitraan bisnis hingga kolaborasi kreatif.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-10 hidden md:block">
            <svg width="273" height="166" viewBox="0 0 273 166" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 160.379C28.5779 143.375 62.6906 112.818 79.6813 81.7194M79.6813 81.7194C91.8898 59.374 95.2582 36.7494 79.5263 18.673C40.3996 -26.2846 27.6883 57.0156 79.6813 81.7194ZM79.6813 81.7194C90.1869 86.711 103.334 89.3102 119.439 87.9758C196.086 81.6246 248.995 53.4492 267.882 42.0793"
                stroke="#FFB835"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto max-w-6xl px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col gap-8 col-start-1 md:col-span-2 justify-between">
            <img src="/images/enggal_white.png" className="w-32 md:w-40 md:mb-0 mb-14" alt="Enggal Group" />
            <div className="md:flex flex-col gap-4 hidden">
              <h1 className="font-jakarta text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">Lokasi Head Office</h1>
              <div className="flex items-start gap-3">
                <a href="https://maps.app.goo.gl/TyYZHSyybnLpMLCt6" className='flex items-start gap-3'>
                  <svg width="16" height="16" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.32444 19.5713C6.86311 20.0215 7.42489 20.4329 8 20.8345C8.57635 20.4382 9.1354 20.0168 9.67556 19.5713C10.576 18.8224 11.4234 18.0104 12.2116 17.1413C14.0284 15.1291 16 12.212 16 8.93747C16 7.87337 15.7931 6.81969 15.391 5.83659C14.989 4.85349 14.3997 3.96022 13.6569 3.20779C12.914 2.45535 12.0321 1.85849 11.0615 1.45128C10.0909 1.04406 9.05058 0.834473 8 0.834473C6.94943 0.834473 5.90914 1.04406 4.93853 1.45128C3.96793 1.85849 3.08601 2.45535 2.34315 3.20779C1.60028 3.96022 1.011 4.85349 0.608964 5.83659C0.206926 6.81969 -1.56548e-08 7.87337 0 8.93747C0 12.212 1.97156 15.1282 3.78844 17.1413C4.57655 18.0107 5.42397 18.8221 6.32444 19.5713ZM8 11.8636C7.23382 11.8636 6.49902 11.5553 5.95725 11.0065C5.41548 10.4578 5.11111 9.71352 5.11111 8.93747C5.11111 8.16143 5.41548 7.41716 5.95725 6.86842C6.49902 6.31967 7.23382 6.01139 8 6.01139C8.76618 6.01139 9.50098 6.31967 10.0428 6.86842C10.5845 7.41716 10.8889 8.16143 10.8889 8.93747C10.8889 9.71352 10.5845 10.4578 10.0428 11.0065C9.50098 11.5553 8.76618 11.8636 8 11.8636Z" fill="white" />
                  </svg>
                  <p className="font-jakarta text-sm sm:text-base md:text-base leading-relaxed text-[#CECECE]">
                    Jl. Boulevard Kota Wisata No.26 Blok C1, <br /> Kel. Ciangsana, Kec. Gn. Putri, <br /> Kabupaten Bogor, Jawa Barat 16968
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div className='flex justify-between gap-x-4 col-start-1 lg:col-start-4 col-span-3'>
            <div className="text-left">
              <h3 className="mb-4 font-jakarta text-base sm:text-lg md:text-xl font-bold text-white">Navigasi</h3>
              <ul className="space-y-4 font-jakarta text-sm md:text-base font-light text-[#CECECE] md:space-y-6">
                <li>
                  <Link to="/">Beranda</Link>
                </li>
                <li>
                  <Link to="/">Cerita Kami</Link>
                </li>
                <li>
                  <Link to="/brand">Brand</Link>
                </li>
                <li>
                  <Link to="/outlet">Outlet</Link>
                </li>
                <li>
                  <Link to="/team">Tim</Link>
                </li>
                <li>
                  <Link to="/contact">Kontak</Link>
                </li>
                <li>
                  <Link to="/career">Karir</Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-2 text-left">
              <div>
                <h3 className="mb-4 font-jakarta text-base sm:text-lg md:text-xl font-bold text-white">Kontak Kami</h3>
                <ul className="space-y-4 font-jakarta text-sm md:text-base font-light text-[#CECECE] md:space-y-6">
                  <li className="flex items-center gap-4 justify-start">
                    <svg width="20" height="20" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM17.6 4.25L10.53 8.67C10.21 8.87 9.79 8.87 9.47 8.67L2.4 4.25C2.15 4.09 2 3.82 2 3.53C2 2.96 2.61 2.6 3.09 2.87L10 7L16.91 2.87C17.39 2.6 18 2.96 18 3.53C18 3.82 17.85 4.09 17.6 4.25Z" fill="#CECECE" />
                    </svg>
                    <a href="mailto:contact@enggal.id" className="font-jakarta text-sm text-[#CECECE] hover:text-white transition-colors">contact@enggal.id</a>
                  </li>
                  <li className="flex items-center gap-4 justify-start">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.35239 0C4.52703 2.47136e-06 4.69849 0.0467401 4.84898 0.135363C4.99947 0.223986 5.1235 0.351265 5.2082 0.503992L6.40506 2.65991C6.48223 2.79898 6.52434 2.95476 6.52775 3.11377C6.53117 3.27278 6.49577 3.43023 6.42463 3.57248L5.27181 5.8791C5.27181 5.8791 5.60601 7.59708 7.00447 8.99602C8.40341 10.3945 10.1155 10.7233 10.1155 10.7233L12.4217 9.56999C12.564 9.49876 12.7215 9.46332 12.8806 9.46673C13.0397 9.47014 13.1956 9.51231 13.3347 9.58956L15.4975 10.7923C15.6499 10.8771 15.7768 11.0012 15.8651 11.1516C15.9535 11.3019 16.0001 11.4732 16 11.6476V14.1299C16 15.3943 14.8256 16.3073 13.6278 15.9032C11.1675 15.0728 7.34845 13.4923 4.92782 11.0717C2.50768 8.65106 0.926706 4.83246 0.0968311 2.3717C-0.307342 1.17435 0.605717 0 1.8701 0H4.35239Z" fill="#CECECE" />
                    </svg>
                    <a href="https://wa.me/6281313894340" className="font-jakarta text-sm text-[#CECECE] hover:text-white transition-colors">+62-813-1389-4340 (Partnership)</a>
                  </li>
                  <li className="flex items-center gap-4 justify-start">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.35239 0C4.52703 2.47136e-06 4.69849 0.0467401 4.84898 0.135363C4.99947 0.223986 5.1235 0.351265 5.2082 0.503992L6.40506 2.65991C6.48223 2.79898 6.52434 2.95476 6.52775 3.11377C6.53117 3.27278 6.49577 3.43023 6.42463 3.57248L5.27181 5.8791C5.27181 5.8791 5.60601 7.59708 7.00447 8.99602C8.40341 10.3945 10.1155 10.7233 10.1155 10.7233L12.4217 9.56999C12.564 9.49876 12.7215 9.46332 12.8806 9.46673C13.0397 9.47014 13.1956 9.51231 13.3347 9.58956L15.4975 10.7923C15.6499 10.8771 15.7768 11.0012 15.8651 11.1516C15.9535 11.3019 16.0001 11.4732 16 11.6476V14.1299C16 15.3943 14.8256 16.3073 13.6278 15.9032C11.1675 15.0728 7.34845 13.4923 4.92782 11.0717C2.50768 8.65106 0.926706 4.83246 0.0968311 2.3717C-0.307342 1.17435 0.605717 0 1.8701 0H4.35239Z" fill="#CECECE" />
                    </svg>
                    <a href="https://wa.me/6281313894410" className="font-jakarta text-sm text-[#CECECE] hover:text-white transition-colors">+62-813-1389-4410 (Customer Care)</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-jakarta text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">Ikuti Kami</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-start">
                  <a href="https://www.instagram.com/enggalgroup" className="flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#4F4F4F]">
                    <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.7833 -0.00927734C14.0883 -0.00579735 14.7507 0.00116264 15.3226 0.0174026L15.5476 0.0255226C15.8075 0.0348025 16.0638 0.0464025 16.3735 0.0603225C17.6078 0.118322 18.4499 0.313202 19.1889 0.599722C19.9545 0.894361 20.5994 1.2934 21.2444 1.9372C21.8345 2.51689 22.2909 3.21838 22.5819 3.99271C22.8684 4.73163 23.0633 5.57379 23.1213 6.80919C23.1352 7.11775 23.1468 7.37411 23.156 7.63511L23.163 7.86015C23.1804 8.43087 23.1874 9.09323 23.1897 10.3982L23.1908 11.2636V12.7832C23.1937 13.6293 23.1848 14.4754 23.1642 15.3213L23.1572 15.5463C23.1479 15.8073 23.1363 16.0637 23.1224 16.3722C23.0644 17.6076 22.8672 18.4486 22.5819 19.1887C22.2909 19.963 21.8345 20.6645 21.2444 21.2442C20.6647 21.8343 19.9632 22.2907 19.1889 22.5817C18.4499 22.8682 17.6078 23.0631 16.3735 23.1211L15.5476 23.1559L15.3226 23.1628C14.7507 23.1791 14.0883 23.1872 12.7833 23.1895L11.918 23.1907H10.3996C9.55306 23.1937 8.70656 23.1848 7.86032 23.164L7.63528 23.157C7.35991 23.1466 7.0846 23.1346 6.80936 23.1211C5.57512 23.0631 4.73296 22.8682 3.99289 22.5817C3.21897 22.2906 2.51788 21.8341 1.93853 21.2442C1.34803 20.6646 0.891179 19.9631 0.599893 19.1887C0.313374 18.4498 0.118494 17.6076 0.060494 16.3722L0.0256941 15.5463L0.0198942 15.3213C-0.00148912 14.4754 -0.0111568 13.6293 -0.00910582 12.7832V10.3982C-0.0123166 9.55212 -0.00380902 8.70601 0.0164142 7.86015L0.0245342 7.63511C0.0338142 7.37411 0.0454141 7.11775 0.0593341 6.80919C0.117334 5.57379 0.312214 4.73279 0.598733 3.99271C0.890698 3.21807 1.34835 2.51654 1.93969 1.9372C2.51871 1.3474 3.21939 0.890966 3.99289 0.599722C4.73296 0.313202 5.57396 0.118322 6.80936 0.0603225C7.11792 0.0464025 7.37544 0.0348025 7.63528 0.0255226L7.86032 0.0185625C8.70618 -0.00204742 9.55229 -0.0109416 10.3984 -0.00811743L12.7833 -0.00927734ZM11.5909 5.79071C10.0526 5.79071 8.57737 6.40178 7.48966 7.48949C6.40195 8.5772 5.79088 10.0524 5.79088 11.5907C5.79088 13.129 6.40195 14.6042 7.48966 15.6919C8.57737 16.7796 10.0526 17.3907 11.5909 17.3907C13.1291 17.3907 14.6044 16.7796 15.6921 15.6919C16.7798 14.6042 17.3909 13.129 17.3909 11.5907C17.3909 10.0524 16.7798 8.5772 15.6921 7.48949C14.6044 6.40178 13.1291 5.79071 11.5909 5.79071ZM11.5909 8.11071C12.0479 8.11063 12.5004 8.20057 12.9227 8.37538C13.3449 8.5502 13.7286 8.80647 14.0518 9.12956C14.375 9.45266 14.6314 9.83625 14.8063 10.2584C14.9813 10.6806 15.0714 11.1331 15.0714 11.5901C15.0715 12.0471 14.9816 12.4997 14.8068 12.9219C14.632 13.3441 14.3757 13.7278 14.0526 14.051C13.7295 14.3742 13.3459 14.6306 12.9237 14.8056C12.5015 14.9805 12.049 15.0706 11.592 15.0707C10.6691 15.0707 9.78393 14.7041 9.13131 14.0514C8.47868 13.3988 8.11204 12.5137 8.11204 11.5907C8.11204 10.6677 8.47868 9.7826 9.13131 9.12997C9.78393 8.47735 10.6691 8.11071 11.592 8.11071M17.682 4.05071C17.2975 4.05071 16.9286 4.20348 16.6567 4.47541C16.3848 4.74734 16.232 5.11615 16.232 5.50071C16.232 5.88528 16.3848 6.25409 16.6567 6.52602C16.9286 6.79794 17.2975 6.95071 17.682 6.95071C18.0666 6.95071 18.4354 6.79794 18.7073 6.52602C18.9793 6.25409 19.132 5.88528 19.132 5.50071C19.132 5.11615 18.9793 4.74734 18.7073 4.47541C18.4354 4.20348 18.0666 4.05071 17.682 4.05071Z" fill="white" />
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@lifeatenggalgroup" className="flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#4F4F4F]">
                    <svg className="h-5 w-5 md:h-6 md:w-6 fill-white" id="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
                    </svg>
                  </a>
                  <a href='https://www.linkedin.com/company/enggalgroup' className="flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#4F4F4F]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 fill-white">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 flex flex-col gap-4 md:hidden mt-10 w-full">
          <h1 className="font-jakarta text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">Headoffice Location</h1>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.32444 19.5713C6.86311 20.0215 7.42489 20.4329 8 20.8345C8.57635 20.4382 9.1354 20.0168 9.67556 19.5713C10.576 18.8224 11.4234 18.0104 12.2116 17.1413C14.0284 15.1291 16 12.212 16 8.93747C16 7.87337 15.7931 6.81969 15.391 5.83659C14.989 4.85349 14.3997 3.96022 13.6569 3.20779C12.914 2.45535 12.0321 1.85849 11.0615 1.45128C10.0909 1.04406 9.05058 0.834473 8 0.834473C6.94943 0.834473 5.90914 1.04406 4.93853 1.45128C3.96793 1.85849 3.08601 2.45535 2.34315 3.20779C1.60028 3.96022 1.011 4.85349 0.608964 5.83659C0.206926 6.81969 -1.56548e-08 7.87337 0 8.93747C0 12.212 1.97156 15.1282 3.78844 17.1413C4.57655 18.0107 5.42397 18.8221 6.32444 19.5713ZM8 11.8636C7.23382 11.8636 6.49902 11.5553 5.95725 11.0065C5.41548 10.4578 5.11111 9.71352 5.11111 8.93747C5.11111 8.16143 5.41548 7.41716 5.95725 6.86842C6.49902 6.31967 7.23382 6.01139 8 6.01139C8.76618 6.01139 9.50098 6.31967 10.0428 6.86842C10.5845 7.41716 10.8889 8.16143 10.8889 8.93747C10.8889 9.71352 10.5845 10.4578 10.0428 11.0065C9.50098 11.5553 8.76618 11.8636 8 11.8636Z" fill="white" />
            </svg>
            <p className="font-jakarta text-sm sm:text-base md:text-base leading-relaxed text-[#CECECE]">
              Jl. Boulevard Kota Wisata No.26 Blok C1, <br /> Kel. Ciangsana, Kec. Gn. Putri, <br /> Kabupaten Bogor, Jawa Barat 16968
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
