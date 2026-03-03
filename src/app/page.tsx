"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const Navigation = () => {
  const { user, profile, isAuthenticated, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // Get display name/email for logged in user
  const displayName = profile?.fc_username 
    ? `@${profile.fc_username}` 
    : user?.email?.split('@')[0] || 'User';

  return (
    <nav className="sticky top-0 z-50 bg-[#EACCD4] border-b border-[#007A5E]/20 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-baseline group">
          <span className="font-impact text-3xl uppercase tracking-tighter group-hover:tracking-normal transition-all duration-300">Bloom</span>
          <span className="font-times italic text-3xl font-normal ml-0.5">scroll</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide uppercase">
          <a href="#features" className="hover:text-[#004a39] hover:underline decoration-1 underline-offset-4">Manifesto</a>
          <a href="#library" className="hover:text-[#004a39] hover:underline decoration-1 underline-offset-4">Library</a>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="hidden sm:flex items-center gap-2 font-bold text-sm uppercase hover:opacity-70"
              >
                <span className="w-8 h-8 bg-[#007A5E] rounded-full flex items-center justify-center text-[#EACCD4] text-xs">
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <span className="hidden md:inline">{displayName}</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 bg-white border border-[#007A5E]/20 rounded-lg shadow-xl min-w-[180px] py-2">
                  <div className="px-4 py-2 text-xs text-[#007A5E]/60 border-b border-[#007A5E]/10">
                    {user?.email || profile?.fc_username}
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-[#007A5E]/10 text-[#007A5E]"
                    onClick={() => setShowMenu(false)}
                  >
                    📊 My Profile
                  </Link>
                  <Link
                    href="/app"
                    className="block px-4 py-2 text-sm hover:bg-[#007A5E]/10 text-[#007A5E]"
                    onClick={() => setShowMenu(false)}
                  >
                    📖 Continue Reading
                  </Link>
                  <button
                    onClick={() => { signOut(); setShowMenu(false); }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-[#007A5E]/10 text-[#007A5E]/60"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="hidden sm:block font-bold text-sm uppercase hover:opacity-70">Log in</Link>
          )}
          <Link href="/app" className="flex items-center gap-2 px-5 py-2.5 border border-[#007A5E] bg-[#007A5E] text-[#EACCD4] font-bold text-sm uppercase hover:bg-transparent hover:text-[#007A5E] transition-all">
            <span>Start Reading</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <header className="relative overflow-hidden pt-20 pb-32 border-b border-[#007A5E]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-8 z-10">
          <div className="inline-flex items-center gap-3 border border-[#007A5E] px-4 py-1.5 w-fit bg-white/10 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest">Daily Curated Wisdom</span>
            <span className="text-xs">◆</span>
            <span className="text-xs font-times italic">Est. 2024</span>
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl leading-[0.85] font-impact uppercase tracking-tight">
            Bloom<br />
            <span className="font-times italic font-normal tracking-normal text-6xl md:text-7xl lg:text-8xl block mt-2 ml-2">Your Mind</span>
          </h1>
          <p className="text-xl md:text-2xl font-times italic max-w-xl leading-relaxed opacity-90">
            Replace mindless scrolling with meaningful wisdom.
            <span className="not-italic font-helvetica text-lg block mt-4 opacity-80">
              Digestible 60-second summaries of history&apos;s greatest ideas, delivered daily to your phone.
            </span>
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/app" className="px-8 py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-wide hover:bg-[#004a39] transition-colors border border-[#007A5E]">
              Start Reading Free
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-8 text-xs font-bold uppercase tracking-widest opacity-60">
            <span className="flex items-center gap-2"><span className="text-lg">◆</span> Philosophy</span>
            <span className="flex items-center gap-2"><span className="text-lg">◆</span> History</span>
            <span className="flex items-center gap-2"><span className="text-lg">◆</span> Science</span>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative border border-[#007A5E] p-4 bg-[#EACCD4] z-10 rotate-2 hover:rotate-0 transition-transform duration-500 origin-bottom-right">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#007A5E] flex items-center justify-center rounded-full text-[#EACCD4] z-20 animate-pulse">
              <span className="font-times italic text-xl">New</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" 
              alt="Classic Statue" 
              className="w-full h-[600px] object-cover grayscale-img border border-[#007A5E]/20"
            />
            <div className="absolute bottom-10 left-10 right-10 bg-[#EACCD4]/90 border border-[#007A5E] p-6 backdrop-blur-md">
              <div className="text-xs font-bold mb-2 flex justify-between">
                <span>TODAY&apos;S READ</span>
                <span>60s</span>
              </div>
              <h3 className="font-impact text-4xl uppercase leading-none mb-1">Marcus Aurelius</h3>
              <p className="font-times italic text-xl">Meditations on Resilience</p>
            </div>
          </div>
          <div className="absolute top-10 -right-10 w-full h-full border border-[#007A5E] opacity-20 -z-10"></div>
          <div className="absolute top-20 -right-20 w-full h-full border border-[#007A5E] opacity-10 -z-10"></div>
        </div>
      </div>
    </header>
  );
};

const MarqueeBanner = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap border-b border-[#007A5E] bg-[#007A5E] text-[#EACCD4] py-3">
      <div className="inline-block animate-marquee">
        <span className="mx-8 font-impact text-xl uppercase tracking-widest">Ideas that matter</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-times italic text-xl">Seneca</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-impact text-xl uppercase tracking-widest">No Ads</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-times italic text-xl">Plato</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-impact text-xl uppercase tracking-widest">Curated Daily</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-times italic text-xl">Curie</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-impact text-xl uppercase tracking-widest">Ideas that matter</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-times italic text-xl">Seneca</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-impact text-xl uppercase tracking-widest">No Ads</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-times italic text-xl">Plato</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-impact text-xl uppercase tracking-widest">Curated Daily</span>
        <span className="mx-4 text-[#4D9E8A]">◆</span>
        <span className="mx-8 font-times italic text-xl">Curie</span>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 border-b border-[#007A5E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#007A5E] border border-[#007A5E]">
          <div className="bg-[#EACCD4] p-12 hover:bg-[#e0bcc5] transition-colors group">
            <div className="w-12 h-12 border border-[#007A5E] flex items-center justify-center mb-8 font-times italic text-2xl group-hover:bg-[#007A5E] group-hover:text-[#EACCD4] transition-colors">
              i
            </div>
            <h3 className="font-impact text-3xl uppercase mb-4">Daily Bliss</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              Wake up to one curated idea. No endless feeds, no algorithm chasing your attention. Just one powerful thought to start your day.
            </p>
          </div>
          <div className="bg-[#EACCD4] p-12 hover:bg-[#e0bcc5] transition-colors group border-t md:border-t-0 md:border-l border-[#007A5E]/20">
            <div className="w-12 h-12 border border-[#007A5E] flex items-center justify-center mb-8 font-times italic text-2xl group-hover:bg-[#007A5E] group-hover:text-[#EACCD4] transition-colors">
              ii
            </div>
            <h3 className="font-impact text-3xl uppercase mb-4">60 Seconds</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              We distill complex books and theories into 60-second reads. Perfect for your commute, coffee break, or morning ritual.
            </p>
          </div>
          <div className="bg-[#EACCD4] p-12 hover:bg-[#e0bcc5] transition-colors group border-t md:border-t-0 md:border-l border-[#007A5E]/20">
            <div className="w-12 h-12 border border-[#007A5E] flex items-center justify-center mb-8 font-times italic text-2xl group-hover:bg-[#007A5E] group-hover:text-[#EACCD4] transition-colors">
              iii
            </div>
            <h3 className="font-impact text-3xl uppercase mb-4">Save & Grow</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              Build your personal library of wisdom. Save your favorites, categorize them, and revisit them whenever you need perspective.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ArticleCardProps {
  category: string;
  image: string;
  author: string;
  title: string;
  quote: string;
}

const ArticleCard = ({ category, image, author, title, quote }: ArticleCardProps) => {
  return (
    <Link href="/app">
      <article className="min-w-[340px] md:min-w-[400px] bg-[#EACCD4] text-[#007A5E] p-6 snap-center border-l-4 border-[#4D9E8A] hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
        <div className="flex justify-between items-center text-xs font-bold mb-6 border-b border-[#007A5E]/10 pb-4">
          <span className="flex items-center gap-2">◆ {category}</span>
          <span className="opacity-60">60s read</span>
        </div>
        <div className="h-48 bg-black mb-6 overflow-hidden relative group">
          <img 
            src={image} 
            alt={author}
            className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <h3 className="font-impact text-4xl uppercase leading-none mb-2">{author}</h3>
        <h4 className="font-times italic text-2xl mb-4">{title}</h4>
        <p className="text-sm leading-relaxed border-l-2 border-[#007A5E] pl-4 opacity-80">
          {quote}
        </p>
      </article>
    </Link>
  );
};

const Library = () => {
  return (
    <section id="library" className="py-32 bg-[#007A5E] text-[#EACCD4] overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#EACCD4 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-impact text-6xl md:text-8xl uppercase leading-none mb-4">The Library</h2>
            <p className="font-times italic text-2xl md:text-3xl text-[#4D9E8A]">Timeless wisdom for modern minds.</p>
          </div>
          <Link href="/app" className="text-[#EACCD4] border-b border-[#EACCD4] pb-1 uppercase font-bold text-sm tracking-widest hover:text-[#4D9E8A] hover:border-[#4D9E8A] transition-colors">
            Explore Archive →
          </Link>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
          <ArticleCard
            category="PHILOSOPHY"
            image="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop"
            author="Seneca"
            title="On Shortness of Life"
            quote='"It is not that we have a short time to live, but that we waste a lot of it."'
          />
          <ArticleCard
            category="SCIENCE"
            image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop"
            author="Feynman"
            title="The Pleasure of Finding"
            quote='"The first principle is that you must not fool yourself and you are the easiest person to fool."'
          />
          <ArticleCard
            category="HISTORY"
            image="https://images.unsplash.com/photo-1555679427-1f6dfcce943b?q=80&w=600&auto=format&fit=crop"
            author="Machiavelli"
            title="The Prince"
            quote='"Entrepreneurs are simply those who understand that there is little difference between obstacle and opportunity."'
          />
          <article className="min-w-[340px] md:min-w-[400px] bg-[#007A5E] border border-[#EACCD4] p-6 snap-center flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-[#4D9E8A] transition-colors">
            <div className="w-20 h-20 border border-[#EACCD4] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-4xl">→</span>
            </div>
            <h3 className="font-impact text-3xl uppercase text-[#EACCD4] mb-2">View All 1000+</h3>
            <p className="font-times italic text-[#EACCD4] opacity-80">Join to access the full archive</p>
          </article>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#007A5E] text-[#EACCD4] pt-20 pb-10 border-t border-[#EACCD4]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-baseline mb-6">
              <span className="font-impact text-5xl uppercase tracking-tighter">Bloom</span>
              <span className="font-times italic text-5xl font-normal ml-1 text-[#4D9E8A]">scroll</span>
            </Link>
            <p className="max-w-sm font-times italic text-lg opacity-70">
              Bloom your mind. Daily wisdom, one scroll at a time.
            </p>
          </div>
          <div>
            <h4 className="font-impact text-lg uppercase tracking-widest mb-6 text-[#4D9E8A]">Platform</h4>
            <ul className="space-y-3 font-helvetica text-sm font-bold opacity-80">
              <li><span className="opacity-50">iOS App (Coming Soon)</span></li>
              <li><span className="opacity-50">Android App (Coming Soon)</span></li>
              <li><Link href="/app" className="hover:text-[#4D9E8A] transition-colors">Web Reader</Link></li>
              <li><Link href="/profile" className="hover:text-[#4D9E8A] transition-colors">My Stats</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-impact text-lg uppercase tracking-widest mb-6 text-[#4D9E8A]">Company</h4>
            <ul className="space-y-3 font-helvetica text-sm font-bold opacity-80">
              <li><a href="#" className="hover:text-[#4D9E8A] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#4D9E8A] transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-[#4D9E8A] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#4D9E8A] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#EACCD4]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
          <div>© 2025 Bloomscroll</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#4D9E8A]">Privacy</a>
            <a href="#" className="hover:text-[#4D9E8A]">Terms</a>
            <a href="https://twitter.com/bloomscroll" className="hover:text-[#4D9E8A]">Twitter</a>
            <a href="https://instagram.com/bloomscroll" className="hover:text-[#4D9E8A]">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function HomePage() {
  return (
    <div className="bg-[#EACCD4] text-[#007A5E] font-helvetica min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <MarqueeBanner />
      <Features />
      <Library />
      <Footer />
    </div>
  );
}
