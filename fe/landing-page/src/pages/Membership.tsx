import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { apiClient } from '../lib/api-client';
import { fetchProvinces, fetchRegenciesByProvince } from '../lib/wilayah';
import outletIcon from '../assets/images/outlet_icon.svg';
import brandIcon from '../assets/images/brand_icon.svg';
import cityIcon from '../assets/images/city_icon.svg';
import heroIllustration from '../assets/images/member_hero.webp';
import vectorLine from '../assets/images/vector_line.svg';
import group from '../assets/images/group.svg';
import percent from '../assets/images/percent.svg';
import credit from '../assets/images/credit.svg';
import promoDown from '../assets/images/promo_down.svg';


const membershipFormSchema = z.object({
    nama: z.string().min(3, 'Nama minimal 3 karakter').max(100, 'Nama maksimal 100 karakter'),
    no_hp: z.string().min(10, 'Nomor Handphone minimal 10 digit').max(15, 'Nomor Handphone maksimal 15 digit').regex(/^[0-9]+$/, 'Nomor Handphone hanya boleh berisi angka'),
    email: z.string().email('Format email tidak valid'),
    jenis_kelamin: z.enum(['LAKI_LAKI', 'PEREMPUAN'], {
        error: () => ({ message: 'Jenis kelamin harus dipilih' })
    }),
    kota: z.string().min(3, 'Kota minimal 3 karakter').max(100, 'Kota maksimal 100 karakter'),
    tanggal_lahir: z.string().min(1, 'Tanggal lahir harus dipilih'),
});

type MembershipFormData = z.infer<typeof membershipFormSchema>;

async function submitMembershipApplication(data: MembershipFormData) {
    const response = await apiClient.post('/membership', data);
    return response.data;
}

type DashboardCounts = {
    totalUserCareer: number;
    totalBrand: number;
    totalBerita: number;
    totalOutlet: number;
};

async function fetchDashboardCounts() {
    const response = await apiClient.get<DashboardCounts>(
        `/dashboard`,
    );

    return response.data;
}

function Membership() {

    const { data: dashboardCounts } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => fetchDashboardCounts(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const { data: provinces = [] } = useQuery({
        queryKey: ["provinces"],
        queryFn: fetchProvinces,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const [selectedProvince, setSelectedProvince] = useState('');
    const [provinceSearchQuery, setProvinceSearchQuery] = useState('');

    const { data: cities = [] } = useQuery({
        queryKey: ["cities", selectedProvince],
        queryFn: () => fetchRegenciesByProvince(selectedProvince),
        enabled: !!selectedProvince,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const [citySearchQuery, setCitySearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [dialogState, setDialogState] = useState({
        open: false,
        type: 'success' as 'success' | 'error',
        title: '',
        message: ''
    });

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<MembershipFormData>({
        resolver: zodResolver(membershipFormSchema),
        mode: 'onBlur',
        defaultValues: {
            kota: ''
        }
    });

    const membershipMutation = useMutation({
        mutationFn: submitMembershipApplication,
        onSuccess: () => {
            setDialogState({
                open: true,
                type: 'success',
                title: 'Pendaftaran Berhasil!',
                message: 'Terima kasih telah mendaftar. Silahkan periksa email untuk melihat kartu membership anda.'
            });
            reset();
            setSelectedDate(undefined);
        },
        onError: (error: any) => {
            setDialogState({
                open: true,
                type: 'error',
                title: 'Pendaftaran Gagal',
                message: error.message || 'Terjadi kesalahan saat memproses pendaftaran Anda. Silakan coba lagi.'
            });
        }
    });

    const onSubmit = (data: MembershipFormData) => {
        membershipMutation.mutate(data);
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('form');
        if (formElement) {
            const offset = 80; // Offset in pixels to prevent form from being hidden behind headers
            const elementPosition = formElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <section className="relative bg-[#F9F9F9] py-16 md:py-24 m-2 md:m-0 rounded-md md:rounded-none overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/dots.png')] bg-center bg-cover bg-no-repeat opacity-20"></div>
                <div className="container mx-auto max-w-6xl relative px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-4 md:space-y-8 w-full">
                            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                                <div className="bg-white rounded-lg py-2 px-3 sm:px-4 shadow-sm flex items-center space-x-3">
                                    <img src={brandIcon} alt="Brand" className="w-5 h-5" />
                                    <span className="font-semibold text-xs sm:text-sm text-[#6E0112] font-jakarta">
                                        {dashboardCounts?.totalBrand} Brand Besar
                                    </span>
                                </div>
                                <div className="bg-white rounded-lg py-2 px-3 sm:px-4 shadow-sm flex items-center space-x-3">
                                    <img src={outletIcon} alt="Outlet" className="w-5 h-5" />
                                    <span className="font-semibold text-xs sm:text-sm text-[#6E0112] font-jakarta">{dashboardCounts?.totalOutlet} Outlet</span>
                                </div>
                                <div className="bg-white rounded-lg py-2 px-3 sm:px-4 shadow-sm flex items-center space-x-3">
                                    <img src={cityIcon} alt="City" className="w-4 h-5" />
                                    <span className="font-semibold text-xs sm:text-sm text-[#6E0112] font-jakarta ">12 kota besar Indonesia</span>
                                </div>
                            </div>

                            <div className="space-y-2 md:space-y-4 text-center lg:text-left">
                                <div className="">
                                    <span className="text-shadow-[0_0_4px_#6E0112,1px_0_0_#6E0112,1px_0_0_#6E0112,-1px_0_0_#6E0112,-1px_0_0_#6E0112,0_1px_0_#6E0112,0_1px_0_#6E0112,0_-1px_0_#6E0112,0_-1px_0_#6E0112] md:text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-runestars text-white whitespace-normal lg:whitespace-nowrap leading-tight">
                                        Jadi Member Enggal Group Indonesia
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row flex-wrap gap-x-2 gap-y-0 justify-center lg:justify-start items-center lg:items-end">
                                    <span className="text-shadow-[0_0_4px_#6E0112,1px_0_0_#6E0112,1px_0_0_#6E0112,-1px_0_0_#6E0112,-1px_0_0_#6E0112,0_1px_0_#6E0112,0_1px_0_#6E0112,0_-1px_0_#6E0112,0_-1px_0_#6E0112] md:text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-runestars text-white whitespace-normal lg:whitespace-nowrap leading-tight">
                                        &
                                    </span>
                                    <span className="text-shadow-[0_0_4px_#6E0112,1px_0_0_#6E0112,1px_0_0_#6E0112,-1px_0_0_#6E0112,-1px_0_0_#6E0112,0_1px_0_#6E0112,0_1px_0_#6E0112,0_-1px_0_#6E0112,0_-1px_0_#6E0112] md:text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFB835] font-runestars whitespace-normal lg:whitespace-nowrap leading-tight">
                                        Nikmati Keuntungannya
                                    </span>
                                </div>
                                <p className="text-sm md:text-base/relaxed text-[#585858] max-w-lg mx-auto lg:mx-0 font-jakarta">
                                    Diskon, promo eksklusif, dan kartu member digital
                                </p>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <button
                                    onClick={scrollToForm}
                                    className="text-sm md:text-base bg-black hover:bg-[#333] text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-xl transition-colors w-auto"
                                >
                                    Daftar Member Sekarang
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center mt-0 lg:mt-0">
                            <img src={heroIllustration} alt="Career Illustration" className="max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className=" py-16">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4">
                    <div className="mb-12 max-w-[400px]">
                        <div className="flex items-start justify-start mb-4">
                            <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
                        </div>
                        <h2 className="font-runestars mb-6">
                            <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-2xl sm:text-3xl md:text-4xl text-white whitespace-normal md:whitespace-nowrap">
                                Saya dapat apa kalau jadi member?
                            </span>
                        </h2>
                        <p className="text-base/relaxed text-[#585858] font-jakarta font-normal">
                            Nikmati berbagai keuntungan khusus untuk pelanggan setia Enggal Group Indonesia.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <img src={group} alt="Group" className="w-8 h-8" />
                            </div>
                            <p className="font-normal text-[#303030] font-jakarta">Harga spesial untuk member</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <img src={percent} alt="Training" className="w-8 h-8" />
                            </div>
                            <p className="font-normal text-[#303030] font-jakarta">Promo eksklusif member</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <img src={credit} alt="Career" className="w-8 h-8" />
                            </div>
                            <p className="font-normal text-[#303030] font-jakarta">Kartu member digital</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <img src={promoDown} alt="Multi-brand" className="w-8 h-8" />
                            </div>
                            <p className="font-normal text-[#303030] font-jakarta">Update promo lebih awal</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 relative">
                <div className="absolute right-0 top-0 hidden md:block">
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

                <div className="absolute right-1/12 top-1/12 hidden md:block">
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

                <div className="container mx-auto max-w-6xl px-4 text-center">
                    <div className="mb-12 relative">
                        <div className="flex justify-center mb-2">
                            <span className="font-runestars text-[#FFB835] text-5xl absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0">m</span>
                        </div>

                        <h2 className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl sm:text-4xl md:text-5xl font-runestars text-white mb-4">
                            CARA JADI MEMBER ENGGAL
                        </h2>
                        <p className="text-base text-[#585858] font-jakarta max-w-4xl mx-auto">
                            Proses cepat dan mudah untuk menikmati berbagai keuntungan sebagai member Enggal Group Indonesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="rounded-2xl overflow-hidden bg-[#F9F9F9] border border-gray-100 pb-2 group hover:shadow-lg transition-all duration-300">
                            <div className="relative h-[350px] bg-[#FFBD39] flex items-center justify-center pt-4 px-4 mx-4 my-4 rounded-xl">
                                <div className="absolute top-0 left-0 z-30">
                                    <span className="inline-block bg-[#A30000] text-white text-sm font-bold p-4 rounded-tl-xl rounded-br-lg">
                                        Step 1
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_2px,_transparent_1px)] bg-[length:20px_20px]"></div>
                                {/* Character Placeholder */}
                                <div className="w-full h-full bg-[#FFBD39] flex items-end justify-center">
                                    {/* Placeholder for person image */}
                                    <img src="/images/step1.webp" alt="Daftar Secara Online" className="w-full h-full object-cover z-20" />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute left-8 top-1/4 w-5 h-5 rotate-[30deg]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M16.2528 1.51297C17.6991 -0.0545821 20.2667 1.42783 19.6323 3.46408L17.6786 9.7346C17.4488 10.472 17.6642 11.2758 18.2319 11.7995L23.0591 16.2531C24.6266 17.6993 23.1442 20.2669 21.108 19.6325L14.8374 17.6788C14.1 17.4491 13.2963 17.6644 12.7726 18.2321L8.31897 23.0593C6.87274 24.6269 4.30511 23.1444 4.93954 21.1082L6.89324 14.8377C7.12298 14.1003 6.90761 13.2965 6.33995 12.7728L1.51274 8.31919C-0.0548091 6.87297 1.4276 4.30534 3.46385 4.93977L9.73438 6.89346C10.4718 7.12321 11.2755 6.90784 11.7993 6.34018L16.2528 1.51297Z"
                                            fill="#A30000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6 text-left">
                                <h3 className="font-bold text-xl text-[#1E1E1E] mb-2 font-jakarta">Daftar Secara Online</h3>
                                <p className="text-[#585858] text-sm leading-relaxed font-jakarta">
                                    Isi form pendaftaran dengan data diri yang valid melalui website resmi
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="rounded-2xl overflow-hidden bg-[#F9F9F9] border border-gray-100 pb-2 group hover:shadow-lg transition-all duration-300">
                            <div className="relative h-[350px] bg-[#A30000] flex items-center justify-center pt-4 px-4 mx-4 my-4 rounded-xl">
                                <div className="absolute top-0 left-0 z-30">
                                    <span className="inline-block bg-[#FFBD39] text-[#A30000] text-sm font-bold p-4 rounded-tl-xl rounded-br-lg">
                                        Step 2
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,189,57,0.2)_2px,_transparent_1px)] bg-[length:20px_20px]"></div>
                                {/* Character Placeholder */}
                                <div className="w-full h-full bg-[#A30000] flex items-end justify-center">
                                    {/* Placeholder for person image */}
                                    <img src="/images/step2.webp" alt="Verifikasi Data Member" className="h-full w-full object-cover z-20" />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-12 right-6 w-5 h-5 rotate-[30deg]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M16.2528 1.51297C17.6991 -0.0545821 20.2667 1.42783 19.6323 3.46408L17.6786 9.7346C17.4488 10.472 17.6642 11.2758 18.2319 11.7995L23.0591 16.2531C24.6266 17.6993 23.1442 20.2669 21.108 19.6325L14.8374 17.6788C14.1 17.4491 13.2963 17.6644 12.7726 18.2321L8.31897 23.0593C6.87274 24.6269 4.30511 23.1444 4.93954 21.1082L6.89324 14.8377C7.12298 14.1003 6.90761 13.2965 6.33995 12.7728L1.51274 8.31919C-0.0548091 6.87297 1.4276 4.30534 3.46385 4.93977L9.73438 6.89346C10.4718 7.12321 11.2755 6.90784 11.7993 6.34018L16.2528 1.51297Z"
                                            fill="#FFBD39"
                                        />
                                    </svg>
                                </div>
                                <div className="absolute bottom-20 left-6 w-5 h-5 rotate-[30deg]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M16.2528 1.51297C17.6991 -0.0545821 20.2667 1.42783 19.6323 3.46408L17.6786 9.7346C17.4488 10.472 17.6642 11.2758 18.2319 11.7995L23.0591 16.2531C24.6266 17.6993 23.1442 20.2669 21.108 19.6325L14.8374 17.6788C14.1 17.4491 13.2963 17.6644 12.7726 18.2321L8.31897 23.0593C6.87274 24.6269 4.30511 23.1444 4.93954 21.1082L6.89324 14.8377C7.12298 14.1003 6.90761 13.2965 6.33995 12.7728L1.51274 8.31919C-0.0548091 6.87297 1.4276 4.30534 3.46385 4.93977L9.73438 6.89346C10.4718 7.12321 11.2755 6.90784 11.7993 6.34018L16.2528 1.51297Z"
                                            fill="#FFBD39"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6 text-left">
                                <h3 className="font-bold text-xl text-[#1E1E1E] mb-2 font-jakarta">Verifikasi Data Member</h3>
                                <p className="text-[#585858] text-sm leading-relaxed font-jakarta">
                                    Data yang kamu kirim akan diverifikasi untuk memastikan kelancaran membership.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="rounded-2xl overflow-hidden bg-[#F9F9F9] border border-gray-100 pb-2 group hover:shadow-lg transition-all duration-300">
                            <div className="relative h-[350px] bg-[#FFBD39] flex items-center justify-center pt-4 px-4 mx-4 my-4 rounded-xl">
                                <div className="absolute top-0 left-0 z-30">
                                    <span className="inline-block bg-[#A30000] text-white text-sm font-bold p-4 rounded-tl-xl rounded-br-lg">
                                        Step 3
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_2px,_transparent_1px)] bg-[length:20px_20px]"></div>
                                {/* Character Placeholder */}
                                <div className="w-full h-full bg-[#FFBD39] flex items-end justify-center">
                                    {/* Placeholder for person image */}
                                    <img src="/images/step3.webp" alt="Dapat Kartu Member" className="h-full w-full object-cover z-20" />
                                </div>
                                <div className="absolute right-8 top-16 w-5 h-5 rotate-[30deg]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M16.2528 1.51297C17.6991 -0.0545821 20.2667 1.42783 19.6323 3.46408L17.6786 9.7346C17.4488 10.472 17.6642 11.2758 18.2319 11.7995L23.0591 16.2531C24.6266 17.6993 23.1442 20.2669 21.108 19.6325L14.8374 17.6788C14.1 17.4491 13.2963 17.6644 12.7726 18.2321L8.31897 23.0593C6.87274 24.6269 4.30511 23.1444 4.93954 21.1082L6.89324 14.8377C7.12298 14.1003 6.90761 13.2965 6.33995 12.7728L1.51274 8.31919C-0.0548091 6.87297 1.4276 4.30534 3.46385 4.93977L9.73438 6.89346C10.4718 7.12321 11.2755 6.90784 11.7993 6.34018L16.2528 1.51297Z"
                                            fill="#A30000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6 text-left">
                                <h3 className="font-bold text-xl text-[#1E1E1E] mb-2 font-jakarta">Dapat Kartu Member</h3>
                                <p className="text-[#585858] text-sm leading-relaxed font-jakarta">
                                    Kamu akan menerima kartu member digital yang siap digunakan untuk promo dan benefit khusus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Digital Member Card Section */}
            <section className="py-16 bg-white overflow-hidden">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-stretch">
                        {/* Left Side - Image Placeholder */}
                        <div className="w-full lg:w-1/2 relative rounded-2xl flex items-center justify-center p-">
                            {/* Placeholder for Card Image */}
                            <img src="/images/cardd.webp" alt="Kartu Member Digital" className="w-full h-auto object-contain" />
                        </div>

                        {/* Right Side - Content */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left bg-[#F9F9F9] p-4 rounded-2xl">
                            <div className="flex items-start justify-start mb-4">
                                <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
                            </div>

                            <h2 className="font-runestars mb-6">
                                <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl sm:text-4xl md:text-5xl text-white whitespace-normal">
                                    KARTU MEMBER DIGITAL
                                </span>
                            </h2>

                            <p className="text-[#585858] font-jakarta text-base/relaxed mb-8 max-w-lg">
                                Setiap member akan mendapatkan kartu member digital resmi yang dapat digunakan untuk menikmati promo dan keuntungan khusus di Enggal Group Indonesia.
                            </p>

                            <button
                                onClick={scrollToForm}
                                className="bg-[#1E1E1E] hover:bg-[#333] text-white font-semibold px-8 py-3 rounded-xl transition-colors w-fit font-jakarta"
                            >
                                Daftar Member Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Form Section */}
            <section className="py-16" id="form">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Promo/Image */}
                        <div className="bg-[#FFB835] rounded-2xl p-8 relative overflow-hidden h-full flex flex-col justify-start min-h-[500px]">
                            <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/dots.png')] bg-center bg-cover bg-no-repeat opacity-20"></div>

                            {/* Image Container */}
                            <div className="relative z-10 flex items-center justify-center mb-6">
                                <div className="w-full h-auto flex items-center justify-center bg-white rounded-md">
                                    <img src="/images/member_form.webp" alt="Daftar Member" className="w-full h-auto object-cover max-h-[350px] object-[50%_20%]" />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-0">
                                <h3 className="font-runestars">
                                    <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold md:text-2xl text-3xl text-white whitespace-normal block leading-tight">
                                        DAFTAR MEMBER Enggal Group Indonesia
                                    </span>
                                </h3>
                                <p className="font-jakarta font-medium pt-4 md:text-base text-sm">
                                    Lengkapi data berikut untuk mendapatkan kartu member digital dan berbagai keuntungan eksklusif.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="h-full flex flex-col justify-start">
                            <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Nama*</label>
                                    <input
                                        type="text"
                                        {...register('nama')}
                                        placeholder="Masukan nama kamu di sini"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 ${errors.nama ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        disabled={membershipMutation.isPending}
                                    />
                                    {errors.nama && (
                                        <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Nomor Handphone*</label>
                                    <input
                                        type="tel"
                                        {...register('no_hp')}
                                        placeholder="Masukan nomor HP Kamu di sini"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 ${errors.no_hp ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        disabled={membershipMutation.isPending}
                                    />
                                    {errors.no_hp && (
                                        <p className="text-red-500 text-xs mt-1">{errors.no_hp.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email*</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Masukan Email"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 ${errors.email ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        disabled={membershipMutation.isPending}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Jenis Kelamin*</label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                {...register('jenis_kelamin')}
                                                value="LAKI_LAKI"
                                                className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                disabled={membershipMutation.isPending}
                                            />
                                            <span className="text-sm text-gray-700">Laki-laki</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                {...register('jenis_kelamin')}
                                                value="PEREMPUAN"
                                                className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                disabled={membershipMutation.isPending}
                                            />
                                            <span className="text-sm text-gray-700">Perempuan</span>
                                        </label>
                                    </div>
                                    {errors.jenis_kelamin && (
                                        <p className="text-red-500 text-xs mt-1">{errors.jenis_kelamin.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Provinsi*</label>
                                    <Select
                                        value={selectedProvince}
                                        onValueChange={(value) => {
                                            setSelectedProvince(value);
                                            setValue('kota', '');
                                            setCitySearchQuery('');
                                            setProvinceSearchQuery('');
                                        }}
                                        disabled={membershipMutation.isPending}
                                        onOpenChange={(open) => {
                                            if (!open) {
                                                setProvinceSearchQuery('');
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="w-full border-gray-200">
                                            <SelectValue placeholder="Pilih provinsi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="p-2">
                                                <input
                                                    type="text"
                                                    placeholder="Cari provinsi..."
                                                    value={provinceSearchQuery}
                                                    onChange={(e) => setProvinceSearchQuery(e.target.value)}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                />
                                            </div>
                                            {provinces
                                                .filter(province =>
                                                    province.name.toLowerCase().includes(provinceSearchQuery.toLowerCase())
                                                )
                                                .map((province) => (
                                                    <SelectItem key={province.id} value={province.id}>
                                                        {province.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Kota/Kabupaten*</label>
                                    <Select
                                        value={watch('kota')}
                                        onValueChange={(value) => {
                                            setValue('kota', value);
                                            setCitySearchQuery('');
                                        }}
                                        disabled={membershipMutation.isPending || !selectedProvince}
                                        onOpenChange={(open) => {
                                            if (!open) {
                                                setCitySearchQuery('');
                                            }
                                        }}
                                    >
                                        <SelectTrigger
                                            className={`w-full ${errors.kota ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                        >
                                            <SelectValue placeholder={!selectedProvince ? "Pilih provinsi terlebih dahulu" : "Pilih kota/kabupaten"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="p-2">
                                                <input
                                                    type="text"
                                                    placeholder="Cari kota/kabupaten..."
                                                    value={citySearchQuery}
                                                    onChange={(e) => setCitySearchQuery(e.target.value)}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                />
                                            </div>
                                            {cities
                                                .filter(city =>
                                                    city.name.toLowerCase().includes(citySearchQuery.toLowerCase())
                                                )
                                                .map((city) => (
                                                    <SelectItem key={city.id} value={city.name}>
                                                        {city.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.kota && (
                                        <p className="text-red-500 text-xs mt-1">{errors.kota.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir*</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className={`w-full justify-start text-left font-normal ${!selectedDate ? 'text-gray-400' : ''
                                                    } ${errors.tanggal_lahir ? 'border-red-500' : 'border-gray-200'}`}
                                                disabled={membershipMutation.isPending}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {selectedDate ? format(selectedDate, 'dd-MM-yyyy') : 'Pilih tanggal'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                captionLayout='dropdown'
                                                selected={selectedDate}
                                                onSelect={(date) => {
                                                    setSelectedDate(date);
                                                    if (date) {
                                                        setValue('tanggal_lahir', date.toISOString().split('T')[0]);
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.tanggal_lahir && (
                                        <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={membershipMutation.isPending}
                                    className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base/relaxed py-3 rounded-lg transition-colors mt-auto"
                                >
                                    {membershipMutation.isPending ? 'Mengirim...' : 'Daftar Jadi Member'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success/Error Dialog */}
            <Dialog open={dialogState.open} onOpenChange={(open) => setDialogState({ ...dialogState, open })}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 font-bold">
                            {dialogState.title}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 pt-2">
                            {dialogState.message}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center">
                        <button
                            type="button"
                            onClick={() => setDialogState({ ...dialogState, open: false })}
                            className="px-6 py-2 rounded-lg font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                        >
                            Tutup
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Membership;
