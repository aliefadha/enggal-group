import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GAP = 0;

type CarouselImage = {
    src: string;
    alt: string;
    instagramUrl?: string;
};

interface ImageCarouselProps {
    direction?: "left" | "right";
    images?: CarouselImage[];
}

const ImageCarousel = ({ direction = "left", images = [] }: ImageCarouselProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: 400,
        height: 500
    });

    // Default fallback images if no images provided
    const defaultImages: CarouselImage[] = [
        { src: '/images/image1.jpg', alt: "Gallery Image 1" },
        { src: '/images/image2.jpg', alt: "Gallery Image 2" },
        { src: '/images/image3.jpg', alt: "Gallery Image 3" },
    ];

    const displayImages = images.length > 0 ? images : defaultImages;

    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 640) {
                // Mobile
                setDimensions({ width: 200, height: 250 });
            } else if (window.innerWidth < 1024) {
                // Tablet
                setDimensions({ width: 250, height: 312.5 });
            } else {
                // Desktop
                setDimensions({ width: 300, height: 375 });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const TOTAL_WIDTH = (dimensions.width + GAP) * displayImages.length;

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
                    {[...displayImages, ...displayImages, ...displayImages, ...displayImages].map((image, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center overflow-hidden relative group"
                            style={{
                                width: dimensions.width,
                                height: dimensions.height,
                                marginRight: GAP,
                            }}
                        >
                            {image.instagramUrl ? (
                                <a href={image.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full block relative">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                        style={{ display: "block", aspectRatio: 4 / 5 }}
                                    />
                                    {/* Hover overlay with caption */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                        <div className="text-center">
                                            <p className="text-white text-sm md:text-base font-medium mb-2">{image.alt}</p>
                                            <svg
                                                className="w-6 h-6 mx-auto text-white"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                        style={{ display: "block", aspectRatio: 4 / 5 }}
                                    />
                                    {/* Hover overlay with caption */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                        <p className="text-white text-sm md:text-base font-medium text-center">{image.alt}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ImageCarousel;
