import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // If user is logged in, redirect them to their feed
  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070B14] text-white overflow-x-hidden selection:bg-primary-accent selection:text-white">
      
      {/* Landing Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#070B14]/85 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <span className="text-white font-bold font-mono text-sm">{"</>"}</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white transition-colors">
              Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Tinder</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors hidden sm:block">About Platform</a>
            <Link 
              to="/login"
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              Log In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-accent/20 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite] pointer-events-none"></div>
        
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" style={{ animationDuration: '3s' }}></div>
           <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-primary-accent rounded-full shadow-[0_0_15px_#7c3aed] animate-pulse" style={{ animationDuration: '4s' }}></div>
           <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-secondary-accent rounded-full shadow-[0_0_15px_#06b6d4] animate-pulse" style={{ animationDuration: '2.5s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">The #1 Developer Network</span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              Connect.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-purple-400 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              Collaborate.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-accent to-cyan-400 animate-slide-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
              Code.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
            Join the most exclusive network of developers building the future. Discover elite talent, find experienced mentors, and ship faster together.
          </p>

          <div className="mt-12 animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '1000ms', animationFillMode: 'both' }}>
             <Link 
               to="/login"
               className="h-14 px-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-extrabold text-lg flex items-center justify-center shadow-[0_10px_30px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.6)] transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
             >
               Join DevTinder Now
             </Link>
             <a 
               href="#about"
               className="h-14 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-lg flex items-center justify-center border border-white/10 transition-all duration-300 w-full sm:w-auto"
             >
               Learn More
             </a>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-[#04060A]">
        {/* Divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
           <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Why developers choose DevTinder</h2>
             <p className="text-gray-400 text-lg">We've built the ultimate platform for engineers to connect, share ideas, and build the next generation of software.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-primary-accent/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-primary-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Find Your Co-Founder</h3>
                <p className="text-gray-400 leading-relaxed">Swipe through profiles of talented engineers matching your tech stack. Build your dream team and launch that startup you've been talking about.</p>
              </div>

              {/* Feature 2 */}
              <div className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-secondary-accent/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-secondary-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Level Up Your Skills</h3>
                <p className="text-gray-400 leading-relaxed">Connect with senior developers and mentors who have been there before. Get code reviews, architecture advice, and career guidance.</p>
              </div>

              {/* Feature 3 */}
              <div className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Build the Future</h3>
                <p className="text-gray-400 leading-relaxed">Join exclusive projects, contribute to open source, and discover opportunities you won't find on traditional job boards.</p>
              </div>

           </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#04060A]">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DevTinder. Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
