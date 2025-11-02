import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
    { src: '/images/image1.jpg', alt: "Gallery Image 1" },
    { src: '/images/image2.jpg', alt: "Gallery Image 2" },
    { src: '/images/image3.jpg', alt: "Gallery Image 3" },
];

const GAP = -10;

interface ImageCarouselProps {
    direction?: "left" | "right";
}

const ImageCarousel = ({ direction = "left" }: ImageCarouselProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: 300,
        height: 300
    });

    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 640) {
                // Mobile
                setDimensions({ width: 200, height: 200 });
            } else if (window.innerWidth < 1024) {
                // Tablet
                setDimensions({ width: 250, height: 250 });
            } else {
                // Desktop
                setDimensions({ width: 300, height: 300 });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const TOTAL_WIDTH = (dimensions.width + GAP) * images.length;

    return (
        <div className="w-full bg-transparent">
            <div className="overflow-hidden">
                <motion.div
                    className="flex items-center"
                    style={{ width: "max-content" }}
                    initial={{
                        x: direction === "left" ? 0 : -TOTAL_WIDTH
                    }}
                    animate={{
                        x: direction === "left" ? -TOTAL_WIDTH : 0
                    }}
                    transition={{
                        x: {
                            duration: isHovered ? 0 : 30,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {[...images, ...images, ...images, ...images].map((image, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center overflow-hidden relative group"
                            style={{
                                width: dimensions.width,
                                height: dimensions.height,
                                marginRight: GAP,
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover "
                                style={{ display: "block" }}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ImageCarousel;
