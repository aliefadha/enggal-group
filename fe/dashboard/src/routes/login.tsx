import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

type DashboardCounts = {
  totalUserCareer: number;
  totalBrand: number;
  totalBerita: number;
  totalOutlet: number;
};

async function fetchDashboardCounts() {
  const response = await apiClient.get<DashboardCounts>(`/dashboard`);
  return response.data;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const { auth } = Route.useRouteContext();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: dashboardCounts } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardCounts(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await auth.login(email, password);
      navigate({ to: redirect });
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "Invalid email or password";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="flex w-full max-w-6xl max-h-[650px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Left Side - Login Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 lg:px-12">
          <div className="mb-6">
            <img
              src="/images/logo_navbar.png"
              alt="Enggal Group Indonesia"
              className="mb-3 h-32 w-auto object-contain"
            />
            <h1 className="font-runestars text-4xl font-bold leading-tight lg:text-5xl">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] text-[#FFC04D]">
                SELAMAT
                DATANG
                ADMIN
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email<span className="text-[#6E0112]">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukan email disini"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#6E0112] focus:outline-none focus:ring-2 focus:ring-[#6E0112]/20"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password<span className="text-[#6E0112]">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukan Password Kamu"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm focus:border-[#6E0112] focus:outline-none focus:ring-2 focus:ring-[#6E0112]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#6E0112] py-3 text-sm font-semibold text-white transition hover:bg-[#5a010e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Memuat..." : "Masuk"}
            </button>
          </form>
        </div>

        {/* Right Side - Brand Grid */}
        <div className="hidden w-1/2 overflow-hidden rounded-r-2xl border-l border-gray-200 bg-white md:block">
          <div className="grid h-full grid-cols-4 grid-rows-5 overflow-hidden rounded-md">
            {/* Row 1 - Brand Logos */}
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/logo_navbar.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Enggal Group Indonesia"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/enhaii.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Enhaii"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/bakso_raja.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Bakso Raja"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/bakso_malang.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Bakso Malang Enggal"
              />
            </div>

            {/* Row 2 - Food Images */}
            <div className="col-span-1">
              <img
                src="/images/image1.jpg"
                className="h-full w-full object-cover"
                alt="Food 1"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/image2.jpg"
                className="h-full w-full object-cover"
                alt="Food 2"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/image3.jpg"
                className="h-full w-full object-cover"
                alt="Food 3"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/image3.jpg"
                className="h-full w-full object-cover"
                alt="Food 4"
              />
            </div>

            {/* Row 3 - Brand Logos */}
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/rang_kapau.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Rang Kapau"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/warung_kondang.svg"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Warung Kondang"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/ambun_suri.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Sarapan Pagi"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/warkop_agam.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Kedai Pical Agam"
              />
            </div>

            {/* Row 4 - Food Images */}
            <div className="col-span-1">
              <img
                src="/images/image4.jpg"
                className="h-full w-full object-cover"
                alt="Food 5"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/image5.jpg"
                className="h-full w-full object-cover"
                alt="Food 6"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/image4.jpg"
                className="h-full w-full object-cover"
                alt="Food 7"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/image3.jpg"
                className="h-full w-full object-cover"
                alt="Food 8"
              />
            </div>

            {/* Row 5 - Brand Logos and Stats */}
            <div className="flex items-center justify-center p-4">
              <img
                src="/images/bebek_sawahan.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Bebek Sawahan"
              />
            </div>
            <div className="flex items-center justify-center border border-gray-100 p-4">
              <img
                src="/images/kebab_zabab.png"
                className="max-h-[80%] max-w-[80%] object-contain"
                alt="Kebab Zababa"
              />
            </div>
            <div className="flex flex-col items-start justify-center bg-[#FFB835] p-4">
              <span className="text-4xl font-bold leading-none text-[#A71D28]">
                2008
              </span>
              <span className="mt-1 text-sm text-[#A71D28]">Est</span>
            </div>
            <div className="flex flex-col items-start justify-center bg-[#A71D28] p-4 text-[#FFB835]">
              <span className="flex gap-x-1 text-4xl font-bold leading-none">
                <span>{dashboardCounts?.totalBrand ?? 8}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mt-1"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
              <span className="mt-1 text-sm">Brand Besar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
