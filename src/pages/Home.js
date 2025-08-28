import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Seo from '@/components/Seo';
export default function Home() {
    return (_jsxs("main", { children: [_jsx(Seo, { title: "Inicio", description: "Conoc\u00E9 los proyectos y desarrollos de Bequbo.", canonical: "https://www.bequbo.com.ar/" }), _jsx("section", { children: _jsx("video", { src: "/videos/videohome.mp4", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", style: {
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        maxHeight: '92vh',
                        objectFit: 'cover'
                    } }) })] }));
}
