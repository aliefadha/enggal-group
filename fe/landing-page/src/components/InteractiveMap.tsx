import { useState } from "react";

interface BrandInfo {
  name: string;
  description: string;
  position: { top: string; left: string };
  size: { width: string; height: string };
}

const brands: BrandInfo[] = [
  {
    name: "Enhaii",
    description: "Kedai kopi modern dengan cita rasa khas Nusantara",
    position: { top: "0", left: "22%" },
    size: { width: "8%", height: "10%" },
  },
  {
    name: "Bakso Raja",
    description: "Bakso berkualitas dengan resep turun temurun",
    position: { top: "10%", left: "64%" },
    size: { width: "10%", height: "8%" },
  },
  {
    name: "Bebek Sawahan",
    description: "Bebek premium terbaik",
    position: { top: "26%", left: "40%" },
    size: { width: "7%", height: "8%" },
  },
  {
    name: "Lapau Kang Kapau",
    description: "Masakan Padang autentik dengan cita rasa istimewa",
    position: { top: "42%", left: "-1%" },
    size: { width: "10%", height: "10%" },
  },
  {
    name: "Kebab Zabbab",
    description: "Kebab lezat dengan berbagai pilihan topping",
    position: { top: "68%", left: "14%" },
    size: { width: "8%", height: "8%" },
  },
  {
    name: "Warung Kondang",
    description: "Warung makan tradisional dengan menu khas Melayu",
    position: { top: "64%", left: "58%" },
    size: { width: "10%", height: "8%" },
  },
  {
    name: "Bakso Malang Enggal",
    description: "Bakso malang legendaris dengan kuah gurih",
    position: { top: "82%", left: "30%" },
    size: { width: "12%", height: "10%" },
  },
  {
    name: "Warkop Putra Agam",
    description: "Kuliner khas dengan suasana asri dan nyaman",
    position: { top: "93%", left: "63%" },
    size: { width: "12%", height: "6%" },
  },
];

const InteractiveMap = () => {
  const [selectedBrand, setSelectedBrand] = useState<BrandInfo | null>(null);

  return (
    <div className="relative inline-block w-5/6">
      <img src="/images/map.png" className="w-full h-auto" alt="Peta Brand Indonesia" />

      {/* Clickable areas with text below */}
      {brands.map((brand, index) => {
        const isSelected = selectedBrand?.name === brand.name;
        return (
          <div key={index}>
            <button
              className="absolute cursor-pointer hover:bg-yellow-300/20 transition-all duration-200 rounded-full"
              style={{
                top: brand.position.top,
                left: brand.position.left,
                width: brand.size.width,
                height: brand.size.height,
              }}
              onClick={() => setSelectedBrand(isSelected ? null : brand)}
              title={brand.name}
            />

            {/* Text shown below logo when selected */}
            {isSelected && (
              <div
                className="absolute z-10 w-[200px] text-center"
                style={{
                  top: brand.position.top === "0"
                    ? `calc(${brand.size.height} + 2px)`
                    : `calc(${brand.position.top} + ${brand.size.height} + 2px)`,
                  left: `calc(${brand.position.left} + ${brand.size.width} / 2 - 100px)`,
                }}
              >
                <span className="text-shadow-[0_0_6px_#6E0112,1px_0_0_#6E0112,2px_0_0_#6E0112,-1px_0_0_#6E0112,-2px_0_0_#6E0112,0_1px_0_#6E0112,0_2px_0_#6E0112,0_-1px_0_#6E0112,0_-2px_0_#6E0112,1px_1px_0_#6E0112,2px_2px_0_#6E0112,-1px_-1px_0_#6E0112,-2px_-2px_0_#6E0112,1px_-1px_0_#6E0112,2px_-2px_0_#6E0112,-1px_1px_0_#6E0112,-2px_2px_0_#6E0112] font-extrabold text-base text-white leading-tight">
                  2
                </span>
                <br />
                <span className="text-[#A16800] font-jakarta font-medium">
                  OUTLET
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveMap;
