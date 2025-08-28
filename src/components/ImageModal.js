import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';
const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev, }) => {
    const handlers = useSwipeable({
        onSwipedLeft: () => onNext(),
        onSwipedRight: () => onPrev(),
        trackMouse: true,
    });
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
    const current = images?.[currentIndex];
    return (_jsxs("div", { className: "fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50", ...handlers, role: "dialog", "aria-modal": "true", "aria-label": "Galer\u00EDa de im\u00E1genes", onClick: onClose, children: [_jsx("button", { className: "absolute top-4 right-4 text-white text-3xl z-10", onClick: (e) => {
                    e.stopPropagation();
                    onClose();
                }, "aria-label": "Cerrar", children: _jsx(FaTimes, {}) }), images && images.length > 1 && (_jsx("button", { className: "absolute left-4 text-white text-3xl z-10", onClick: (e) => {
                    e.stopPropagation();
                    onPrev();
                }, "aria-label": "Anterior", children: _jsx(FaChevronLeft, {}) })), current && (_jsx("img", { src: current, alt: "Obra", className: "max-w-full max-h-screen object-contain transition-all duration-300", onClick: (e) => e.stopPropagation() })), images && images.length > 1 && (_jsx("button", { className: "absolute right-4 text-white text-3xl z-10", onClick: (e) => {
                    e.stopPropagation();
                    onNext();
                }, "aria-label": "Siguiente", children: _jsx(FaChevronRight, {}) }))] }));
};
export default ImageModal;
