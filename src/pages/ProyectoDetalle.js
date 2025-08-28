import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import proyectos from '../resources/proyectos.json';
import { FaChevronLeft, FaChevronRight, FaChevronLeft as FaArrowBack } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, } from '../components/ui/carousel';
export default function ProyectoDetalle() {
    const { slug } = useParams();
    const proyecto = proyectos.find((p) => p.slug === slug);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNext = useCallback(() => {
        if (!proyecto)
            return;
        setCurrentIndex((prev) => (prev + 1) % proyecto.imagenes.length);
    }, [proyecto]);
    const goToPrev = useCallback(() => {
        if (!proyecto)
            return;
        setCurrentIndex((prev) => (prev === 0 ? proyecto.imagenes.length - 1 : prev - 1));
    }, [proyecto]);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isModalOpen)
                return;
            if (e.key === 'ArrowRight')
                goToNext();
            if (e.key === 'ArrowLeft')
                goToPrev();
            if (e.key === 'Escape')
                setIsModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, goToNext, goToPrev]);
    useEffect(() => {
        if (!isModalOpen)
            return;
        let startX = 0;
        let endX = 0;
        const onTouchStart = (e) => {
            startX = e.changedTouches[0].clientX;
        };
        const onTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (diff > 50)
                goToNext();
            if (diff < -50)
                goToPrev();
        };
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchend', onTouchEnd);
        return () => {
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isModalOpen, goToNext, goToPrev]);
    if (!proyecto) {
        return _jsx("div", { className: "p-8 text-center", children: "Proyecto no encontrado." });
    }
    const ogImage = proyecto.imagenes?.[0];
    return (_jsxs("div", { className: "bg-[#f2f2f2] text-gray-800 min-h-screen", children: [_jsx(Seo, { title: proyecto.nombre, description: `${proyecto.nombre} – ${proyecto.direccion}`, canonical: `https://www.bequbo.com.ar/proyecto/${proyecto.slug}`, image: ogImage }), _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs(Link, { to: "/proyectos", className: "flex items-center text-primary mb-4", children: [_jsx(FaArrowBack, { className: "mr-2" }), " Volver a Proyectos"] }), _jsx("h1", { className: "text-4xl font-primary text-primary mb-4", children: proyecto.nombre }), _jsx("p", { className: "text-gray-600 mb-8", children: proyecto.direccion }), _jsxs(Carousel, { className: "relative mb-8", children: [_jsx(CarouselContent, { children: proyecto.imagenes.map((src, idx) => (_jsx(CarouselItem, { className: "basis-full", children: _jsx("img", { src: src, alt: `${proyecto.nombre} imagen ${idx + 1}`, className: "w-full h-[800px] object-cover object-bottom cursor-pointer rounded-lg", onClick: () => {
                                            setCurrentIndex(idx);
                                            setIsModalOpen(true);
                                        }, loading: "lazy", decoding: "async" }) }, idx))) }), proyecto.imagenes.length > 1 && (_jsxs(_Fragment, { children: [_jsx(CarouselPrevious, { className: "left-3 top-1/2 -translate-y-1/2" }), _jsx(CarouselNext, { className: "right-3 top-1/2 -translate-y-1/2" })] }))] }), proyecto.caracteristicas?.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-6 mb-8", children: proyecto.caracteristicas.map((c, idx) => (_jsxs("div", { className: "flex flex-col items-center text-center", children: [c.icono && (_jsx("img", { src: c.icono, alt: c.descripcion, className: "h-12 mb-2", loading: "lazy", decoding: "async" })), _jsx("p", { className: "text-sm", children: c.descripcion })] }, idx))) })), proyecto.mapEmbedUrl && (_jsx("div", { className: "mb-8", children: _jsx("iframe", { src: proyecto.mapEmbedUrl, width: "100%", height: "350", allowFullScreen: true, loading: "lazy", className: "rounded shadow", style: { border: 0 }, title: `Mapa de ${proyecto.nombre}` }) }))] }), isModalOpen && (_jsxs("div", { className: "fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50", onClick: () => setIsModalOpen(false), role: "dialog", "aria-modal": "true", children: [_jsx("button", { onClick: () => setIsModalOpen(false), className: "absolute top-4 right-4 text-white text-3xl", "aria-label": "Cerrar", children: _jsx(IoMdClose, {}) }), proyecto.imagenes.length > 1 && (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            goToPrev();
                        }, className: "absolute left-4 text-white text-3xl p-2 bg-black/40 hover:bg-black/60 rounded-full", "aria-label": "Anterior", children: _jsx(FaChevronLeft, {}) })), _jsx("img", { src: proyecto.imagenes[currentIndex], alt: `${proyecto.nombre} imagen ${currentIndex + 1}`, className: "max-h-[90vh] max-w-[90vw] object-contain", onClick: (e) => e.stopPropagation() }), proyecto.imagenes.length > 1 && (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            goToNext();
                        }, className: "absolute right-4 text-white text-3xl p-2 bg-black/40 hover:bg-black/60 rounded-full", "aria-label": "Siguiente", children: _jsx(FaChevronRight, {}) })), _jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded", children: [currentIndex + 1, " / ", proyecto.imagenes.length] })] }))] }));
}
