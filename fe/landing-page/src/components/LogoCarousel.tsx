import { motion } from "framer-motion";

const logos = [
    { src: '/bakso_malang.png', alt: "Bakso Malang" },
    { src: '/enhaii.png', alt: "Enhaii" },
    { src: '/rang_kapau.png', alt: "Rangkapau" },
    { src: '/bakso_raja.png', alt: "Bakso Raja" },
    { src: '/warung_kondang.svg', alt: "Warung Kondang" },
    { src: '/warkop_agam.png', alt: "Warkop Agam" },
    { src: '/bebek_sawahan.png', alt: "Bebek Sawahan" },
    { src: '/kebab_zabab.png', alt: "Kebab Zabab" },
];

const LOGO_WIDTH = 120;
const GAP = 30;
const TOTAL_WIDTH = (LOGO_WIDTH + GAP) * logos.length;

interface LogoCarouselProps {
    direction?: "left" | "right";
}

const LogoCarousel = ({ direction = "left" }: LogoCarouselProps) => {
    return (
        <div className="w-full bg-transparent">
            <div className="overflow-hidden">
                <motion.div
                    className="flex items-center"
                    style={{ width: "max-content" }}
                    animate={{
                        x: direction === "left" ? [0, -TOTAL_WIDTH] : [0, TOTAL_WIDTH]
                    }}
                    transition={{
                        x: {
                            duration: 40,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                >
                    {[...logos, ...logos, ...logos].map((logo, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center"
                            style={{
                                width: LOGO_WIDTH,
                                height: 96,
                                marginRight: GAP,
                                background: "#fff",
                                borderRadius: 8,
                                padding: 8,
                            }}
                        >
                            <img
                                src={`/images/${logo.src}`}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-fit opacity-80 hover:opacity-100 transition-opacity"
                                style={{ display: "block" }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default LogoCarousel; 