import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const ImageCarousel = ({ images, height = 'h-80' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (!images || images.length <= 1)
            return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);
    const current = images?.[currentIndex];
    return (_jsxs("div", { className: `relative w-full overflow-hidden ${height}`, children: [current ? (_jsx("img", { src: current, alt: `Imagen ${currentIndex + 1}`, className: "w-full h-full object-cover rounded", loading: "lazy", decoding: "async" })) : (_jsx("div", { className: "w-full h-full bg-gray-200 rounded" })), images && images.length > 1 && (_jsxs("div", { className: "absolute bottom-2 right-2 bg-white/70 text-xs px-2 py-1 rounded", children: [currentIndex + 1, "/", images.length] }))] }));
};
export default ImageCarousel;
