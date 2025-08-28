import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import proyectos from '../resources/proyectos.json';
const Proyectos = () => {
    const [lista, setLista] = useState([]);
    useEffect(() => {
        setLista(proyectos);
    }, []);
    return (_jsxs("main", { className: "container mx-auto px-4 py-8", children: [_jsx(Seo, { title: "Proyectos", description: "Nuestros desarrollos y obras destacados. Bequbo.", canonical: "https://www.bequbo.com.ar/proyectos" }), _jsx("h1", { className: "text-3xl font-bold text-primary mb-6 font-primary", children: "Proyectos" }), _jsx("div", { className: "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3", children: lista.map((p) => (_jsx(Link, { to: `/proyecto/${p.slug}`, children: _jsxs("div", { className: "bg-white shadow rounded-lg overflow-hidden", children: [_jsx("img", { src: p.imagenes?.[0], alt: p.nombre, className: "w-full h-60 object-cover", loading: "lazy", decoding: "async" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold text-primary mb-2 font-primary", children: p.nombre }), _jsx("p", { className: "text-gray-600", children: p.direccion })] })] }) }, p.slug))) })] }));
};
export default Proyectos;
