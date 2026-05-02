import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function PhotoGallery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-black font-sans selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <header className="absolute top-0 left-0 w-full p-5 sm:p-8 md:p-12 lg:p-16 flex justify-between items-start z-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-[13px] sm:text-[16px] md:text-[20px] font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase font-logo leading-tight block">
            SKILL VENTURES
          </span>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-2 flex flex-col justify-center items-end gap-[6px] sm:gap-[8px] hover:opacity-70 transition-opacity mt-[-2px] sm:mt-0"
        >
          <div className="w-[30px] sm:w-[40px] h-[1px] bg-black"></div>
          <div className="w-[30px] sm:w-[40px] h-[1px] bg-black"></div>
          <div className="w-[30px] sm:w-[40px] h-[1px] bg-black"></div>
        </motion.button>
      </header>

      {/* Hero Banner Area */}
      <div className="w-full h-[50vh] sm:h-[60vh] overflow-hidden relative">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://ikrkh450vp.ufs.sh/f/I9lUDxELRxaOh01hwMBZv4xU02AgLQjdMiIyFHC6mDBThaEe" 
          alt="Banner"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max max-w-[90vw]">
          <div className="px-6 py-2 border border-white text-white rounded-full backdrop-blur-sm bg-black/10 uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold">
            SKILL VENTURES
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 sm:py-32 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[28px] sm:text-[40px] md:text-[52px] font-bold leading-[1.1] tracking-tight mb-8"
        >
          Increase Your Revenue with High-Quality Content.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[15px] sm:text-[18px] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-20"
        >
          Product and campaign photography is our core business. Annually, we create approximately 4 million images for PDP, EPDP, and on-location campaigns. Our philosophy: More emotion, more revenue.
        </motion.p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {[
            "https://ikrkh450vp.ufs.sh/f/I9lUDxELRxaOBo9U7XCZtVTEhw4dULHjurvf0i6xFcP7Gg29",
            "https://ikrkh450vp.ufs.sh/f/I9lUDxELRxaOg5Fn92H0HMKqLwYiSeJ92CNI7F81kE4pOaxj"
          ].map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm"
            >
              <img 
                src={src} 
                alt={`Gallery ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => navigate('/')}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-full font-bold tracking-widest text-xs uppercase hover:bg-gray-800 transition-colors z-50 flex items-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Home
      </motion.button>
    </div>
  );
}
