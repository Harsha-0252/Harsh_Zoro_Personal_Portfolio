import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered reveal wrapper.
 * Wrap any section content in <Reveal> and it fades/slides in the first
 * time it enters the viewport. Set `stagger` to animate direct children
 * one after another (e.g. commit rows, project cards, skill groups).
 */
export default function Reveal({ children, className = "", as = "div", stagger = false, delay = 0, y = 28, amount = 0.2 }) {
    const reduceMotion = useReducedMotion();
    const Tag = motion[as] || motion.div;

    if (reduceMotion) {
        const Plain = as;
        return <Plain className={className}>{children}</Plain>;
    }

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: stagger ? 0.09 : 0, delayChildren: delay } },
    };
    const item = {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    if (!stagger) {
        return (
            <Tag
                className={className}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount }}
                variants={item}
                transition={{ ...item.show.transition, delay }}
            >
                {children}
            </Tag>
        );
    }

    return (
        <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={container}>
            {children}
        </Tag>
    );
}

// Use with `stagger` on a parent whose children are motion items:
export const RevealItem = ({ children, className = "", y = 20 }) => {
    const reduceMotion = useReducedMotion();
    if (reduceMotion) return <div className={className}>{children}</div>;
    return (
        <motion.div className={className} variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
            {children}
        </motion.div>
    );
};
