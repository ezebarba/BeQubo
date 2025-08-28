import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SmartImage({ source, alt, className, priority }) {
    const { img, sources } = source ?? {};
    const loading = priority ? 'eager' : 'lazy';
    return (_jsxs("picture", { children: [Array.isArray(sources) &&
                sources.map((s, i) => (_jsx("source", { srcSet: s.srcset, type: s.type, sizes: "100vw" }, i))), _jsx("img", { src: img?.src ?? source, alt: alt, className: className, loading: loading, decoding: "async", style: { width: '100%', height: 'auto', display: 'block' } })] }));
}
