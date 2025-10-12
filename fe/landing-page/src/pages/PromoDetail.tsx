import PromoCard from '../components/PromoCard';

function PromoDetail() {
    return (
        <div className="w-full container px-24 mx-auto flex flex-col gap-y-10">
            <div className="flex justify-start items-center gap-10">
                <a href="/" className="font-jakarta text-[#727272]">Home</a>
                <span className="text-[#727272]">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.07692 0L0 1.16667L5.69231 7L0 12.8333L1.07692 14L8 7L1.07692 0Z" fill="#727272" />
                    </svg>
                </span>
                <a href="/promo" className="font-jakarta text-[#727272]">Promo</a>
                <span className="text-[#727272]">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.07692 0L0 1.16667L5.69231 7L0 12.8333L1.07692 14L8 7L1.07692 0Z" fill="#727272" />
                    </svg>
                </span>
                <p className="font-jakarta text-white font-medium bg-[#9C0000] p-2 rounded-sm">Detail Promo</p>
            </div>
            <div className="flex gap-10">
                <div className="flex flex-col gap-y-6">
                    <div className="bg-[#F7F7F7] px-4 py-6 rounded-lg">
                        <img src="/images/promo.png" alt="promo" className="w-[350px] h-auto rounded-xl" />
                    </div>
                    <div className="bg-[#FFB835] w-full flex p-6 gap-6 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12V21.3333C24 22.0406 23.719 22.7189 23.219 23.219C22.7189 23.719 22.0406 24 21.3333 24H2.66667C1.95942 24 1.28115 23.719 0.781048 23.219C0.280951 22.7189 0 22.0406 0 21.3333V12H24ZM17.3333 0C17.687 0 18.0261 0.140476 18.2761 0.390524C18.5262 0.640573 18.6667 0.979711 18.6667 1.33333V2.66667H21.3333C22.0406 2.66667 22.7189 2.94762 23.219 3.44772C23.719 3.94781 24 4.62609 24 5.33333V9.33333H0V5.33333C0 4.62609 0.280951 3.94781 0.781048 3.44772C1.28115 2.94762 1.95942 2.66667 2.66667 2.66667H5.33333V1.33333C5.33333 0.979711 5.47381 0.640573 5.72386 0.390524C5.97391 0.140476 6.31305 0 6.66667 0C7.02029 0 7.35943 0.140476 7.60948 0.390524C7.85952 0.640573 8 0.979711 8 1.33333V2.66667H16V1.33333C16 0.979711 16.1405 0.640573 16.3905 0.390524C16.6406 0.140476 16.9797 0 17.3333 0Z" fill="#9C0000" />
                        </svg>
                        <p className="font-jakarta text-[#9C0000] font-medium">
                            Berlaku Hingga 1 Oktober 2026
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 w-2/3">
                    <h2 className="font-runestars">
                        <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
                            Promo
                        </span>
                    </h2>
                    <h1 className="font-jakarta font-bold text-[40px] w-[500px]">
                        Re Opening Bakso Malang
                    </h1>
                    <p className="text-[#9B9B9B] font-jakarta">
                        Dapatkan Bakso Gratis untuk 50  customer pertama
                    </p>
                    <div className="font-jakarta mt-10 flex flex-col gap-y-10">
                        <div>
                            <p className="font-bold mb-2 ">Deskripsi Promo</p>
                            <p className="text-[#1E1E1E] font-meidum text-justify tracking-wide leading-[32px]">Dalam rangka re-opening, Bakso Malang Enggal menghadirkan promo spesial untuk pelanggan setia. Setiap pengunjung berkesempatan menikmati semangkuk bakso gratis untuk 100 orang pertama setiap harinya, serta diskon hingga 50% untuk menu pilihan selama periode berlangsung. Selain itu, tersedia juga hadiah menarik dan voucher khusus untuk pembelian berikutnya agar pengalaman kuliner Anda semakin menyenangkan.</p>
                        </div>
                        <div>
                            <p className="font-bold mb-2 ">Syarat & Ketentuan</p>
                            <p className="text-[#1E1E1E] font-meidum text-justify tracking-wide leading-[32px]">Promo ini berlaku hanya pada outlet dan tanggal yang telah ditentukan. Setiap pengunjung berhak mendapatkan promo maksimal satu kali per transaksi atau per orang, baik untuk dine-in maupun take away, namun tidak berlaku untuk layanan delivery online. Menu gratis dan diskon tersedia selama persediaan masih ada, serta tidak dapat digabungkan dengan promo lain, voucher, atau potongan harga lainnya. Untuk menu diskon, harga sudah termasuk PPN sesuai daftar menu yang ditentukan. Pihak manajemen Bakso Malang Enggal berhak melakukan perubahan atau menghentikan promo sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="relative my-10">
                    <div className="mb-2">
                        <svg width="67" height="19" viewBox="0 0 67 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 16.0267C11 9.36005 28.5 -2.17329 26.5 5.02671C24.5 12.2267 21 15.36 19.5 16.0267C27.3333 9.6934 42.7 -1.37323 41.5 5.02671C40.3 11.4267 37.6667 15.0267 36.5 16.0267C45.8333 8.69338 63.6 -3.77329 60 5.02671C56.4 13.8267 61.5 16.0267 64.5 16.0267" stroke="#FFB835" stroke-width="4" stroke-linecap="round" />
                        </svg>
                    </div>
                    <h2 className="font-runestars mb-6 relative">
                        <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
                            Rekomendasi Promo lainnya!
                        </span>
                        <div className="absolute -top-4 left-1/3 w-[39.95px] h-[39.95px] rotate-[30deg]">
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
                    <p className="font-jakarta text-[#585858]">Jangan lewatkan pilihan promo menarik yang sudah kami siapkan.</p>
                </div>
                <div className="flex flex-col gap-y-16 my-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-16 relative z-10">
                        <PromoCard
                            id="promo1"
                            title="Promo Spesial"
                            description="Diskon 30% untuk pembelian roti kedua"
                            validUntil="15 November 2026"
                            image="/images/promo.png"
                        />

                        <PromoCard
                            id="promo2"
                            title="Bakso Malang"
                            description="Beli 2 porsi bakso, gratis 1 es teh"
                            validUntil="20 Desember 2026"
                            image="/images/promo.png"
                        />

                        <PromoCard
                            id="promo3"
                            title="Mie Ayam Spesial"
                            description="Diskon 25% untuk pembelian paket keluarga"
                            validUntil="5 Januari 2027"
                            image="/images/promo.png"
                        />

                        <PromoCard
                            id="promo4"
                            title="Sate Ayam"
                            description="Beli 10 tusuk, gratis 5 tusuk"
                            validUntil="10 Februari 2027"
                            image="/images/promo.png"
                        />

                        <PromoCard
                            id="promo5"
                            title="Nasi Goreng"
                            description="Diskon 40% untuk pembelian kedua"
                            validUntil="18 Maret 2027"
                            image="/images/promo.png"
                        />

                        <PromoCard
                            id="promo6"
                            title="Soto Ayam"
                            description="Gratis kerupuk untuk setiap pembelian"
                            validUntil="22 April 2027"
                            image="/images/promo.png"
                        />
                    </div>
                    <div className='mx-auto'>
                        <a className='bg-[#1E1E1E] rounded-xl py-4 px-6 font-jakarta text-white font-medium' href='/promo'>
                            Lihat Promo Lebih Lengkap
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromoDetail;