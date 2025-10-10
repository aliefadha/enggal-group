import React, { useState } from 'react';
import brandIcon from '../assets/images/brand_icon.svg';
import outletIcon from '../assets/images/outlet_icon.svg';
import cityIcon from '../assets/images/city_icon.svg';
import heroIllustration from '../assets/images/hero_illustration.png';
import vectorLine from '../assets/images/vector_line.svg';
import comfortIcon from '../assets/images/comfort_icon.svg';
import trainingIcon from '../assets/images/training_icon.svg';
import careerIcon from '../assets/images/career_icon.svg';
import multibrandIcon from '../assets/images/multibrand_icon.svg';
import uploadIcon from '../assets/images/upload_icon.svg';
import careerGroup from '../assets/images/career_group.png';
import LogoCarousel from '../components/LogoCarousel';

function Career() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    address: '',
    cv: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#F9F9F9] py-16 md:py-24">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/dots.png')] bg-center bg-cover bg-no-repeat opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-white rounded-lg py-2 px-4 shadow-sm flex items-center space-x-3">
                  <img src={brandIcon} alt="Brand" className="w-5 h-5" />
                  <span className="font-semibold text-sm text-[#6E0112] font-jakarta">8 Brand Besar</span>
                </div>
                <div className="bg-white rounded-lg py-2 px-4 shadow-sm flex items-center space-x-3">
                  <img src={outletIcon} alt="Outlet" className="w-5 h-5" />
                  <span className="font-semibold text-sm text-[#6E0112] font-jakarta">25 Outlet</span>
                </div>
                <div className="bg-white rounded-lg py-2 px-4 shadow-sm flex items-center space-x-3">
                  <img src={cityIcon} alt="City" className="w-4 h-5" />
                  <span className="font-semibold text-sm text-[#6E0112] font-jakarta ">12 kota besar Indonesia</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="">
                  <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-5xl  font-runestars text-white whitespace-nowrap">
                    Bergabunglah dengan Keluarga
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-5xl  font-runestars text-white whitespace-nowrap">
                    Besar,
                  </span>
                  <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-bold text-5xl text-[#FFB835] font-runestars whitespace-nowrap">
                    Enggal Group Indonesia
                  </span>
                </div>
                <p className="text-base/relaxed text-[#585858] max-w-lg font-jakarta">
                  Jadilah bagian dari komunitas yang tumbuh bersama, menciptakan pengalaman kuliner terbaik untuk semua.
                </p>
              </div>

              <button className="bg-black hover:bg-[#333] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
                Lamar Disini!
              </button>
            </div>

            <div className="flex justify-center">
              <img src={heroIllustration} alt="Career Illustration" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full py-9">
        <LogoCarousel />
      </div>

      {/* Why Join Us Section */}
      <section className=" py-16">
        <div className="container mx-auto max-w-6xl flex justify-between items-start">
          <div className="mb-12 max-w-[400px]">
            <div className="flex items-start justify-start mb-4">
              <img src={vectorLine} alt="Decorative line" className="w-16 h-5" />
            </div>
            <h2 className="font-runestars mb-6">
              <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-3xl md:text-4xl text-white whitespace-nowrap">
                Mengapa bergabung bersama kami?
              </span>
            </h2>
            <p className="text-base/relaxed text-[#585858] font-jakarta font-normal">
              Kami tumbuh bersama dalam satu keluarga besar yang saling mendukung.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <img src={comfortIcon} alt="Comfort" className="w-8 h-8" />
              </div>
              <p className="font-normal text-[#303030] font-jakarta">Lingkungan kerja yang nyaman & suportif.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <img src={trainingIcon} alt="Training" className="w-8 h-8" />
              </div>
              <p className="font-normal text-[#303030] font-jakarta">Program training & pengembangan diri.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <img src={careerIcon} alt="Career" className="w-8 h-8" />
              </div>
              <p className="font-normal text-[#303030] font-jakarta">Jenjang karir untuk tumbuh bersama grup.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <img src={multibrandIcon} alt="Multi-brand" className="w-8 h-8" />
              </div>
              <p className="font-normal text-[#303030] font-jakarta">Kesempatan karir multi-brand</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-stretch">
            <div className="bg-[#FFB835] rounded-lg p-6 text-white relative overflow-hidden h-full flex flex-col">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/images/dots.png')] bg-center bg-cover bg-no-repeat opacity-20"></div>
              <div className="relative z-10 space-y-6 max-w-[450px] mx-auto flex-1 flex flex-col justify-between">
                <div className='bg-white h-[380px] mx-auto rounded-md flex items-center justify-center overflow-hidden'>
                  <img src={careerGroup} alt="Career Group" className="w-full h-auto object-cover" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-runestars">
                    <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-4xl text-white whitespace-nowrap">
                      Yuk, Daftar Sekarang!
                    </span>
                  </h3>
                  <p className="font-jakarta font-medium text-black">
                    Silakan isi data kamu di form ini, kami akan hubungi kamu jika kita cocok!
                  </p>
                </div>
                <div className="bg-[#9C0000] rounded-lg p-4 w-full">
                  <h4 className="text-3xl text-[#FFB835] font-runestars mb-2">Visi</h4>
                  <p className="font-jakarta text-white font-semibold font-normal/relaxed">
                    Menjadi F&B group terkemuka di Indonesia yang nyaman untuk semua kalangan.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Application Form */}
            <div className="h-full flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukan nama kamu disini"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* WhatsApp Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nomor Whatsapp*</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Masukan nomor WA Kamu disini"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Masukan Email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Alamat Rumah*</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Masukan Alamat Lengkap"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* CV Upload Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Upload CV*</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="w-full px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-500 transition-colors">
                      <div className="flex flex-col items-center space-y-2">
                        <img src={uploadIcon} alt="Upload" className="w-8 h-9" />
                        <div className="text-sm text-gray-600">
                          {formData.cv ? (
                            <span className="text-orange-500 font-medium">{formData.cv.name}</span>
                          ) : (
                            <>
                              <span> Pilih file atau drop CV kamu disini!</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max. 5MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-[#333] text-white text-base/relaxed py-3 rounded-lg transition-colors mt-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Career;
