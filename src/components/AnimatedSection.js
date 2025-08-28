import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
const AnimatedSection = ({ children, delay = 0 }) => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay }, viewport: { once: true, amount: 0.3 }, children: children }));
};
export default AnimatedSection;
