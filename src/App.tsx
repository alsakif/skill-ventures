/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PhotoGallery from './PhotoGallery';

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = [
    "https://ikrkh450vp.ufs.sh/f/I9lUDxELRxaOh01hwMBZv4xU02AgLQjdMiIyFHC6mDBThaEe",
    "https://ikrkh450vp.ufs.sh/f/I9lUDxELRxaOBo9U7XCZtVTEhw4dULHjurvf0i6xFcP7Gg29",
    "https://ikrkh450vp.ufs.sh/f/I9lUDxELRxaOg5Fn92H0HMKqLwYiSeJ92CNI7F81kE4pOaxj"
  ];

  const navigate = useNavigate();

  // Custom cursor state for second section
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fake progress for cinematic effect during initial assets load
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [progress]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(interval);
  }, [isLoading, slideImages.length]);

  // Intersection Observer to pause video when off-screen
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [isLoading]);

  const { scrollYProgress } = useScroll();
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-black text-white font-sans selection:bg-brand-pink selection:text-white">
      {/* Custom Cursor */}
      <AnimatePresence>
        {isHoveringSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-[100] w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-[#E12A3D] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
          >
            <span className="text-white font-bold tracking-[0.1em] text-xs sm:text-sm uppercase font-sans">
              MORE
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              y: '-100%',
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
            }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative overflow-hidden w-[200px] h-[1px] bg-white/10 mb-8">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-logo text-white/40 text-[10px] tracking-[0.4em] uppercase"
            >
              Loading {Math.min(progress, 100)}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full p-5 sm:p-8 md:p-12 lg:p-16 flex justify-between items-start z-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: isLoading ? 0 : 1.5 }}
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-[13px] sm:text-[16px] md:text-[20px] font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase font-logo leading-tight block">
            SKILL VENTURES
          </span>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: isLoading ? 0 : 1.5 }}
          className="p-2 flex flex-col justify-center items-end gap-[6px] sm:gap-[8px] hover:opacity-70 transition-opacity mt-[-2px] sm:mt-0"
        >
          <div className="w-[30px] sm:w-[40px] h-[1px] bg-white"></div>
          <div className="w-[30px] sm:w-[40px] h-[1px] bg-white"></div>
          <div className="w-[30px] sm:w-[40px] h-[1px] bg-white"></div>
        </motion.button>
      </header>

      {/* Hero Section */}
      <main className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="video-bg"
          >
            <source src="https://pub-a0930e4452164bec9244fdbdfb8477e8.r2.dev/model.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div 
          style={{ y: yTranslate }}
          className="relative z-20 flex flex-col items-center text-center space-y-[-2vw] sm:space-y-[-1vw] pointer-events-none select-none w-full max-w-full px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
            transition={{ duration: 1.2, delay: 1.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-[10vw] sm:text-[10vw] md:text-[8vw] outline-text outline-text-small tracking-[0.08em] sm:tracking-[0.05em] leading-[1]"
          >
            THE
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
            transition={{ duration: 1.2, delay: 1.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-[13.5vw] sm:text-[14vw] md:text-[15vw] outline-text tracking-[0.01em] sm:tracking-[0.02em] leading-[0.85]"
          >
            CONTENT
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 50 : 0 }}
            transition={{ duration: 1.2, delay: 2.0, ease: [0.33, 1, 0.68, 1] }}
            className="text-[11.5vw] sm:text-[12.5vw] md:text-[15vw] outline-text tracking-[0.01em] sm:tracking-[0.02em] leading-[0.85] w-full"
          >
            CREATORS
          </motion.h1>
        </motion.div>
      </main>

      {/* PHOTO Section */}
      <section 
        className={`relative h-screen w-full flex items-center justify-center bg-black overflow-hidden border-t border-white/5 cursor-none`}
        onClick={() => navigate('/photo')}
        onMouseEnter={() => setIsHoveringSection(true)}
        onMouseLeave={() => setIsHoveringSection(false)}
        onMouseMove={(e) => {
          setMousePos({ x: e.clientX, y: e.clientY });
        }}
      >
        
        {/* Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden text-[0px] pointer-events-none">
          <motion.div
            className="flex h-full w-full"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            {slideImages.map((src, idx) => (
              <div
                key={idx}
                className="w-full h-full shrink-0 relative"
              >
                <img 
                  src={src} 
                  className="w-full h-full object-cover pointer-events-none opacity-[0.85] sm:opacity-[0.95]" 
                  alt={`Slide ${idx + 1}`} 
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-[6vh] left-[6vw] flex items-center gap-[10px] z-20" onMouseEnter={(e) => e.stopPropagation()}>
          {slideImages.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={`rounded-full transition-all duration-500 ease-[0.33,1,0.68,1] flex items-center justify-center ${
                currentSlide === idx 
                  ? "w-3 h-3 bg-white scale-100 opacity-100" 
                  : "w-2 h-2 bg-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] scale-100 opacity-50 hover:opacity-100 hover:scale-110"
              }`}
              style={{ cursor: 'pointer' }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className="relative z-10 text-center pointer-events-none"
        >
          <h2 className="text-[20vw] sm:text-[22vw] outline-text tracking-[0.05em] leading-none select-none drop-shadow-2xl">
            PHOTO
          </h2>
        </motion.div>
        
        {/* Subtle background grain or glow can be added here if needed */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
      </section>

      {/* Contact Sidebar Button */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 50 : 0 }}
        transition={{ duration: 1, delay: 2.2, ease: "circOut" }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 overflow-hidden hidden sm:flex"
      >
        <button className="bg-brand-pink text-white px-[10px] sm:px-[14px] py-6 sm:py-10 rounded-l-xl flex flex-col items-center justify-center hover:pr-4 sm:hover:pr-6 transition-all duration-300">
          <span className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.2em] text-[10px] sm:text-[13px] font-[500] whitespace-nowrap">
            Contact us!
          </span>
        </button>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo" element={<PhotoGallery />} />
      </Routes>
    </BrowserRouter>
  );
}
