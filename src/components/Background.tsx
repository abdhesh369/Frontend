
import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const CosmicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let stars: { x: number; y: number; size: number; speed: number; opacity: number; twinkleSpeed: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            stars = [];
            const starCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 3000);
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.offsetWidth,
                    y: Math.random() * canvas.offsetHeight,
                    size: Math.random() * 2.5 + 0.5,
                    speed: Math.random() * 0.3 + 0.05,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.02 + 0.005
                });
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let time = 0;
        const animate = () => {
            time += 0.016;
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            stars.forEach((star) => {
                const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.x) * 0.3 + 0.7;
                const currentOpacity = star.opacity * twinkle;

                const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
                gradient.addColorStop(0.5, `rgba(200, 220, 255, ${currentOpacity * 0.5})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.fill();

                star.y -= star.speed * 0.15;
                if (star.y < -10) {
                    star.y = canvas.offsetHeight + 10;
                    star.x = Math.random() * canvas.offsetWidth;
                }
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />;
};

const FloatingParticles = () => {
    const particles = useMemo(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 10 + Math.random() * 8,
            size: 3 + Math.random() * 6,
            color: Math.random() > 0.5 ? 'cyan' : 'purple'
        })), []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color === 'cyan'
                            ? 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(0, 212, 255, 0.2) 50%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
                        boxShadow: p.color === 'cyan'
                            ? '0 0 10px rgba(0, 212, 255, 0.6), 0 0 20px rgba(0, 212, 255, 0.3)'
                            : '0 0 10px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)'
                    }}
                    animate={{
                        y: [-30, 30, -30],
                        x: [-20, 20, -20],
                        opacity: [0.2, 0.9, 0.2],
                        scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
};

export const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050510]">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0520] to-[#0d0525] opacity-90" />

            <CosmicBackground />
            <FloatingParticles />
        </div>
    );
}
