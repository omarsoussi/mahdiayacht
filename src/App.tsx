import { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';
import { translations, projectImages, type Language } from './data';

// Load static assets using Vite's glob so production builds emit only the files we use
// include possible mobile-specific variants so we can auto-prefer them when available
const assetFiles = import.meta.glob('./assets/{view.mp4,view-mobile.mp4,view-small.mp4,logo.png,profile/*,services/*}', { as: 'url', eager: true }) as Record<string, string>;
const galleryFiles = import.meta.glob('./gallery/*', { as: 'url', eager: true }) as Record<string, string>;

// Capture a single asset version at module-load time so it stays stable across renders
const ASSET_VERSION = String(Math.floor(Date.now() / 1000));
import { Menu, X, ChevronDown, Ship, Award, Settings, AlertTriangle, Mail, Phone, MapPin, Image } from 'lucide-react';
import CountUp from './components/CountUp';

// Inline gallery component placed here for simplicity
function GalleryComponent({ items, filterType, allActive }: { items: Array<{ type: 'img' | 'video'; src: string }>; filterType?: 'img' | 'video'; allActive?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [autoEnabled, setAutoEnabled] = useState(true);
  const len = items.length;
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const it = items[selected];
    if (it?.type === 'video') {
      const v = videoRefs.current[selected];
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    }
  }, [selected, items]);

  useEffect(() => {
    let id: number | undefined;
    const it = items[selected];
    if (autoEnabled && it?.type === 'img') {
      id = window.setInterval(() => setSelected((s) => (s + 1) % len), 2000);
    }
    return () => { if (id) window.clearInterval(id); };
  }, [selected, autoEnabled, items, len]);

  useEffect(() => setSelected(0), [items]);

  const prev = () => setSelected((s) => (s - 1 + len) % len);
  const next = () => setSelected((s) => (s + 1) % len);

  return (
    <div className="relative">
      <div className="gallery-inner">
        {items.map((it, idx) => (
          <div className="gallery__item" key={idx}>
            <input type="radio" id={`img-${idx}`} checked={selected === idx} onChange={() => setSelected(idx)} name="gallery" className="gallery__selector" />

            {it.type === 'img' ? (
              <div className="gallery__bg" style={{ backgroundImage: `url(${it.src})` }} />
            ) : (
              <video className="gallery__bg-video" src={it.src} muted loop playsInline autoPlay ref={(el) => (videoRefs.current[idx] = el)} />
            )}

            {it.type === 'img' ? (
              <img className="gallery__img" src={it.src} alt={`gallery-${idx}`} />
            ) : (
              <video className="gallery__img" src={it.src} muted playsInline ref={(el) => (videoRefs.current[idx] = el)} onEnded={() => { if (autoEnabled) next(); }} autoPlay />
            )}

            <div aria-hidden className={`media-overlay ${it.type === 'img' ? 'overlay-img' : 'overlay-video'} ${(allActive || filterType === it.type) ? 'active' : ''} ${allActive ? 'all-active' : ''}`} />
          </div>
        ))}
      </div>

      <button aria-label="Previous" onClick={() => { setAutoEnabled(false); prev(); }} className="absolute gallery-nav left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20">‹</button>
      <button aria-label="Next" onClick={() => { setAutoEnabled(false); next(); }} className="absolute gallery-nav right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20">›</button>

      <div className="gallery-thumbs mt-4 flex gap-0 overflow-x-auto justify-center">
        {items.map((it, idx) => (
          <label key={idx} htmlFor={`img-${idx}`} data-type={it.type} className={`gallery__thumb inline-block cursor-pointer filtered ${(allActive || filterType === it.type) ? 'active' : ''} ${allActive ? 'all-active' : ''}`} onClick={() => { setSelected(idx); setAutoEnabled(false); }}>
            {it.type === 'img' ? <img src={it.src} alt={`thumb-${idx}`} /> : <video src={it.src} muted loop playsInline className="gallery__thumb-video" />}
          </label>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('it');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLVideoElement | null>(null);
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const [heroSrc, setHeroSrc] = useState<string | null>(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  
  // Small helper to force a repaint / compositing on mobile browsers
  const forceRepaint = (el?: HTMLElement | null) => {
    if (!el) return;
    try {
      el.style.transform = 'translateZ(0)';
      el.style.willChange = 'transform, opacity';
      // read a layout property to force sync reflow/paint
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      void (el.offsetHeight);
      requestAnimationFrame(() => {
        try {
          if (el) el.style.willChange = '';
        } catch {}
      });
    } catch {}
  };
  
  const t = translations[language];

  // Track small-screen state so we can apply inline crop reliably
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const onResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const rawEmail = String(t.contact.info.email || '');
  const primaryEmail = rawEmail.split('/')[0].trim();
  const phoneRaw = String(t.contact.info.phone || '');
  const phoneParts = phoneRaw
    .split('/')
    .map((p) => p.trim())
    .filter(Boolean);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    String(t.contact.info.location || '')
  )}`;
  const instagramHref = 'https://www.instagram.com/mahdia_yacht/';

  const serviceImages = [
    `${assetFiles['./assets/services/img1.png']}?v=${ASSET_VERSION}`,
    `${assetFiles['./assets/services/img2.png']}?v=${ASSET_VERSION}`,
    `${assetFiles['./assets/services/img3.png']}?v=${ASSET_VERSION}`,
  ];
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setServiceIndex((i) => (i + 1) % serviceImages.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Immediately pick a hero source on mount; prefer a mobile-optimized file for small screens
  useEffect(() => {
    if (heroSrc) return;
    const mobileCandidate = (assetFiles['./assets/view-mobile.mp4'] || assetFiles['./assets/view-small.mp4']) as string | undefined;
    const isSmall = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const chosen = isSmall && mobileCandidate ? `${mobileCandidate}?v=${ASSET_VERSION}` : `${assetFiles['./assets/view.mp4']}?v=${ASSET_VERSION}`;
    setHeroSrc(chosen);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  // Ensure the hero video actually begins playback and add loaded class on canplay
  useEffect(() => {
    if (!heroSrc) return; // wait until source is set
    const v = heroRef.current;
    if (!v) return;
    const onCanPlay = () => {
      v.classList.add('loaded');
      forceRepaint(v);
      // attempt to play when canplay
      v.play()
        .then(() => {
          setAutoplayFailed(false);
          forceRepaint(v);
        })
        .catch(() => {
          // we'll handle retries separately
        });
    };

    const onPlaying = () => {
      setAutoplayFailed(false);
      v.classList.add('loaded');
      forceRepaint(v);
      // small resize nudge can help some WebKit devices repaint
      setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
    };

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('playing', onPlaying);

    // Try to play immediately (muted videos normally allowed to autoplay)
    v.play().catch(() => {});

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('playing', onPlaying);
    };
  }, [heroSrc]);

  // Detect a stalled/frozen video state on mobile and attempt force-reloads or swap to mobile variant
  useEffect(() => {
    if (!heroSrc) return;
    const v = heroRef.current;
    if (!v) return;

    let checks = 0;
    const maxChecks = 4;
    const checkInterval = 900;
    const mobileCandidate = (assetFiles['./assets/view-mobile.mp4'] || assetFiles['./assets/view-small.mp4']) as string | undefined;

    const intervalId = window.setInterval(() => {
      checks += 1;
      // if already playing, stop checks
      if (!v.paused && v.currentTime > 0) {
        clearInterval(intervalId);
        return;
      }

      // If the video has data but hasn't progressed, try force reloads
      if (v.readyState >= 2) {
        try {
          // small repaint nudge
          forceRepaint(v);
          // try calling load() then play()
          v.pause();
          v.currentTime = 0;
          // If we have a mobile-encoded candidate and we're on a small screen, switch to it
          if (mobileCandidate && window.innerWidth < 768) {
            if (v.currentSrc !== `${mobileCandidate}?v=${ASSET_VERSION}`) {
              v.src = `${mobileCandidate}?v=${ASSET_VERSION}`;
              v.load();
            }
          } else {
            // reassign src to itself to force re-decode
            const cur = v.currentSrc;
            v.src = cur;
            v.load();
          }
          v.play().catch(() => {});
        } catch {}
      }

      if (checks >= maxChecks) {
        clearInterval(intervalId);
        // if still stuck, surface the play button for user to manually start
        setAutoplayFailed(true);
      }
    }, checkInterval);

    return () => clearInterval(intervalId);
  }, [heroSrc]);

  // Mobile fallback: attempt to play on first user touch if autoplay is blocked
  useEffect(() => {
    if (!heroSrc) return;
    const v = heroRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {});
      document.removeEventListener('touchstart', tryPlay);
    };

    document.addEventListener('touchstart', tryPlay, { passive: true });
    return () => document.removeEventListener('touchstart', tryPlay);
  }, [heroSrc]);

  // Detect if this is a touch device (used to always surface play control)
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Retry autoplay a few times; if it still doesn't start, show a tap-to-play fallback
  useEffect(() => {
    if (!heroSrc) return;
    const v = heroRef.current;
    if (!v) return;
    let attempts = 0;
    const maxAttempts = 4;
    const id = setInterval(() => {
      if (!v) return;
      // if already playing, stop retries
      if (!v.paused && v.currentTime > 0) {
        setAutoplayFailed(false);
        clearInterval(id);
        return;
      }
      attempts += 1;
      v.play()
        .then(() => {
          setAutoplayFailed(false);
          // force a repaint when autoplay succeeds after retry
          forceRepaint(v);
          clearInterval(id);
        })
        .catch(() => {
          if (attempts >= maxAttempts) {
            setAutoplayFailed(true);
            clearInterval(id);
          }
        });
    }, 900);

    return () => clearInterval(id);
  }, [heroSrc]);

  // Scroll animations: reveal, scale, glow and parallax
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    // IntersectionObserver for reveal/scale/glow
    const elems = Array.from(document.querySelectorAll<HTMLElement>('[data-animate], .reveal, .scale-in, .glow'));
    if (elems.length) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      elems.forEach((el, i) => {
        el.style.setProperty('--delay', `${i * 80}ms`);
        io.observe(el);
      });
    }

    // Parallax: elements with data-parallax attribute
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        parallaxEls.forEach((el) => {
          const speedAttr = el.getAttribute('data-parallax-speed');
          const speed = speedAttr ? parseFloat(speedAttr) : 0.18;
          const rect = el.getBoundingClientRect();
          const offset = (rect.top + scrollY) * speed * -1;
          el.style.transform = `translate3d(0, ${offset * 0.06}px, 0)`;
        });
      });
    };

    if (parallaxEls.length) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`site-header fixed top-0 left-0 right-0 z-50 bg-transparent md:bg-[#147e9a] shadow-none transition-all duration-300 ${isScrolled ? 'md:shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 py-3">
          {/* business identifier for trust */}
          <div className="hidden md:block absolute left-6 top-3 text-white/80 text-xs tracking-wider">
            P.IVA e C.F. 02077140461
          </div>
          {/* Navigation - simplified (Projects removed) */}
          <nav className="hidden md:flex items-center justify-center gap-6 text-sm">
            <button onClick={() => scrollToSection('services')} className="text-white/90 hover:text-white transition-colors tracking-wider uppercase flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>{t.nav.services}</span>
            </button>
            <span className="text-white/30">|</span>
            <button onClick={() => scrollToSection('gallery')} className="text-white/90 hover:text-white transition-colors tracking-wider uppercase flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span>{t.nav.gallery ?? 'Gallery'}</span>
            </button>
            <span className="text-white/30">|</span>
            <button onClick={() => scrollToSection('experience')} className="text-white/90 hover:text-white transition-colors tracking-wider uppercase flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{t.nav.experience}</span>
            </button>
            <span className="text-white/30">|</span>
            <button onClick={() => scrollToSection('contact')} className="text-white/90 hover:text-white transition-colors tracking-wider uppercase flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{t.nav.contact}</span>
            </button>
            <span className="text-white/30">|</span>
            <div className="relative group">
              <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase">
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full right-0 mt-2 bg-[#2CA6D8] border border-white/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[120px]">
                <button onClick={() => setLanguage('en')} className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-colors text-sm">English</button>
                <button onClick={() => setLanguage('it')} className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-colors text-sm">Italiano</button>
                <button onClick={() => setLanguage('fr')} className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-colors text-sm">Français</button>
                <button onClick={() => setLanguage('ar')} className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-colors text-sm">العربية</button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute top-6 right-4 text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Navigation (opened) */}
          {isMenuOpen && (
            <nav className="md:hidden mt-3 pb-4 space-y-4 pt-4 bg-[#147e9a] -mx-4 px-4 rounded-b-lg">
              <button onClick={() => scrollToSection('services')} className="block text-white hover:text-white transition-colors uppercase text-sm flex items-center gap-2 py-2"><Settings className="w-4 h-4" />{t.nav.services}</button>
              <button onClick={() => scrollToSection('gallery')} className="block text-white hover:text-white transition-colors uppercase text-sm flex items-center gap-2 py-2"><Image className="w-4 h-4" />{t.nav.gallery ?? 'Gallery'}</button>
              <button onClick={() => scrollToSection('experience')} className="block text-white hover:text-white transition-colors uppercase text-sm flex items-center gap-2 py-2"><Award className="w-4 h-4" />{t.nav.experience}</button>
              <button onClick={() => scrollToSection('contact')} className="block text-white hover:text-white transition-colors uppercase text-sm flex items-center gap-2 py-2"><Mail className="w-4 h-4" />{t.nav.contact}</button>
              <div className="flex gap-2 pt-4">
                {(['en', 'it', 'fr', 'ar'] as Language[]).map((lang) => (
                  <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1 ${language === lang ? 'bg-white text-[#1a4d5e]' : 'bg-white/20 text-white'} text-xs uppercase`}>{lang.toUpperCase()}</button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-[100dvh] flex items-center justify-center hero-overlay pt-0 md:pt-32 overflow-hidden"
        data-parallax
        data-parallax-speed="0.22"
        ref={(el) => (heroContainerRef.current = el)}
      >
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover"
          preload={heroSrc ? 'auto' : 'metadata'}
          autoPlay
          muted
          loop
          playsInline
          poster={`${assetFiles['./assets/profile/profile.jpeg']}?v=${ASSET_VERSION}`}
          onLoadedData={(e) => e.currentTarget.classList.add('loaded')}
          onError={(e) => { (e.currentTarget as HTMLVideoElement).classList.add('video-error'); }}
          ref={heroRef}
          style={
            isSmallScreen
              ? { objectPosition: '50% center', transform: 'translateX(14%)' }
              : undefined
          }
        >
          {heroSrc && <source src={heroSrc} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8 reveal scale-in" data-animate>
            {/* Logo removed per request */}

            {/* Main Heading with decorative lines */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-wider uppercase">
              <span className="decorative-line">{t.hero.title}</span>
            </h2>

            {/* business identifier under the hero title for trust */}
            <div className="text-sm text-white/80 mt-2">P.IVA e C.F. 02077140461</div>

            <p className="text-lg md:text-xl italic opacity-90 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex justify-center gap-4 hero-buttons">
              <button onClick={() => scrollToSection('services')} className="btn-primary">
                {t.hero.cta}
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-primary">
                {t.hero.ctaContact}
              </button>
            </div>
          </div>
        </div>
        {/* Autoplay-only hero on mobile: no play button */}
      </section>

      <div aria-hidden className="h-4 bg-white w-full" />


      {/* Profile / Competencies Section (background like Services/Experience) */}
      <section id="profile" className="relative py-24" style={{ minHeight: '72vh' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${assetFiles['./assets/profile/profile.jpeg']}?v=${ASSET_VERSION}')` }} />

        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <div className="reveal scale-in text-center w-full max-w-4xl" data-animate>
            <div className="bg-black/60 p-8 md:p-12 rounded-md w-full">
              <h3 className="text-sm tracking-[0.3em] uppercase text-[#d4a574] mb-2 font-semibold">{t.profile.title}</h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide uppercase text-white">{t.profile.title}</h2>
              <p className="text-white/90 leading-relaxed font-medium text-base md:text-lg">{t.profile.text}</p>

              <h4 className="mt-8 font-bold uppercase tracking-wider text-white text-sm">{t.competencies.title}</h4>
              <ul className="mt-3 text-white/80 text-sm list-disc list-inside space-y-1">
                {t.competencies.items.map((item, idx) => (
                  <li key={idx} className="font-medium">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden className="h-4 bg-white w-full" />

      {/* Services Section: background image with overlay and service cards */}
      <section id="services" className="relative py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${assetFiles['./assets/services/img1.png']}?v=${ASSET_VERSION}')` }} />
        <div className="absolute inset-0 bg-[#1a4d5e]/70" />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h3 className="text-sm tracking-[0.3em] uppercase text-[#d4a574] mb-2">{t.services.subtitle}</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide uppercase">{t.services.title}</h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {t.services.items.map((s, i) => (
              <div key={i} className="service-card h-full flex flex-col justify-center text-center p-6 bg-white/6 backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {i === 0 ? <Ship className="w-12 h-12 text-white" /> : i === 1 ? <Award className="w-12 h-12 text-white" /> : i === 2 ? <Settings className="w-12 h-12 text-white" /> : <AlertTriangle className="w-12 h-12 text-white" />}
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-white">{s.title}</h4>
                <p className="text-xs text-white/90 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Socials removed */}

      {/* Projects removed per request */}

      {/* small white gap between Services and Experience */}
      <div aria-hidden className="h-1 bg-white w-full" />

        <div aria-hidden className="h-4 bg-white w-full" />

      {/* Experience Section: background image with stats overlay */}
      <section id="experience" className="relative py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${assetFiles['./assets/services/img2.png']}?v=${ASSET_VERSION}')` }} />
        <div className="absolute inset-0 bg-[#1a4d5e]/70" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase">{t.experience.title}</h2>
            <p className="italic text-lg opacity-90">{t.experience.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/6 backdrop-blur-md rounded-lg p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-white">
                {t.experience.stats.map((s, i) => {
                  const num = parseInt(s.number.replace(/\D/g, ''), 10) || 0;
                  const suffix = s.number.includes('%') ? '%' : s.number.includes('+') ? '+' : '';
                  return (
                    <div key={i}>
                      <div className="text-sm uppercase tracking-wider text-white/80 mb-1">{s.label}</div>
                      <div className="text-3xl md:text-4xl font-bold text-white"><CountUp end={num} suffix={suffix} /></div>
                    </div>
                  );
                })}

                {t.experience.founded && (
                  <div>
                    <div className="text-sm uppercase tracking-wider text-white/80 mb-1">{t.experience.foundedLabel ?? 'Founded'}</div>
                    {
                      (() => {
                        const m = String(t.experience.founded).match(/(\d+(?:[\.,]\d+)?)/);
                        if (m) {
                          const raw = m[0].replace(',', '.');
                          const n = parseFloat(raw);
                          const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
                          return <div className="text-3xl md:text-4xl font-bold text-white"><CountUp end={n} suffix="y" decimals={decimals} /></div>;
                        }
                        return <div className="text-3xl md:text-4xl font-bold text-white">{t.experience.founded}</div>;
                      })()
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section (moved here to appear after Experience) */}
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-sm tracking-[0.3em] uppercase text-[#d4a574] mb-2">{t.nav.gallery}</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wide uppercase text-black">{t.gallery.title}</h2>
        </div>

        <div className="gallery w-full mt-6">
          {(() => {
            const file = (name: string) => (galleryFiles[`./gallery/${name}`] as string | undefined) || '';
            const galleryItems: { type: 'img' | 'video'; src: string }[] = [
              { type: 'img', src: file('picc5.jpeg') },
              { type: 'img', src: file('picc6.jpeg') },
              { type: 'img', src: file('picc7.jpeg') },
              { type: 'img', src: file('picc8.jpeg') },
              { type: 'img', src: file('picc9.jpeg') },
              { type: 'img', src: file('picc10.jpeg') },
              { type: 'img', src: file('picc11.jpeg') },
              { type: 'img', src: file('picc12.jpeg') },
              { type: 'img', src: file('picc13.jpeg') },
              { type: 'img', src: file('picc14.jpeg') },
              { type: 'img', src: file('picc15.jpeg') },
              { type: 'img', src: file('picc16.jpeg') },
              { type: 'img', src: file('picc17.jpeg') },
              { type: 'video', src: file('picc18.mp4') },
              { type: 'video', src: file('picc19.mp4') },
              { type: 'video', src: file('picc20.mp4') },
              { type: 'video', src: file('picc21.mp4') },
              { type: 'video', src: file('picc22.mp4') },
              { type: 'video', src: file('picc23.mp4') },
              { type: 'video', src: file('picc24.mp4') },
              { type: 'video', src: file('picc25.mp4') },
              { type: 'video', src: file('picc26.mp4') },
            ];

            // show all items (no category filtering)
            const filteredItems = galleryItems;

            return (
              <GalleryComponent items={filteredItems} allActive={true} />
            );
          })()}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-12 overflow-hidden"
        style={{
          backgroundImage: `url('https://www.navigareworldwide.com/wp-content/uploads/2025/12/Why-Leasing-Is-the-Smartest-Way-to-Become-a-Yacht-Owner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0f2937]/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase mb-3">
              {t.contact.title}
            </h2>
            <div className="text-sm text-white/80 mb-3">P.IVA e C.F. 02077140461</div>
            <p className="italic text-lg opacity-90">{t.contact.subtitle}</p>
            {t.contact.sponsor && (
              <p className="text-xs text-white/80 mt-3 max-w-3xl mx-auto">{t.contact.sponsor}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Send Email Button */}
              <div className="flex items-center justify-center">
                <Button asChild className="rounded-full px-6 py-3 bg-black/30 border border-white/10 text-white hover:bg-black/40 transform transition-colors">
                  <a href="mailto:Mahdiayachts25@gmail.com?subject=Inquiry%20from%20website" rel="noopener noreferrer">
                          <div className="flex items-center gap-3 email-btn">
                            <Mail className="w-5 h-5" />
                            <span className="font-semibold uppercase tracking-wider label">Send an Email</span>
                          </div>
                  </a>
                </Button>
              </div>

            {/* Contact Info */}
            <div className="space-y-8 text-white">
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-95">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Location</h3>
                  <p className="text-white/80">{t.contact.info.location}</p>
                </div>
              </a>

              <a href={`mailto:${primaryEmail}`} className="flex items-start gap-4 hover:opacity-95">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Email</h3>
                  <p className="text-white/80">{t.contact.info.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 hover:opacity-95">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Phone</h3>
                  <div className="flex flex-col gap-2">
                    {phoneParts.map((p, i) => (
                      <a
                        key={i}
                        href={`tel:${p.replace(/\D+/g, '')}`}
                        className="text-white/80 hover:underline"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-95">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.6" fill="none" />
                    <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.6" fill="none" />
                    <circle cx="17.5" cy="6.5" r="0.9" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Instagram</h3>
                  <p className="text-white/80">@mahdia_yacht</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2937] py-12 text-white/60 text-center text-sm">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <h4 className="text-white text-xl font-bold tracking-[0.2em]">MAHDIA YACHT</h4>
            <p className="text-xs tracking-wider mt-1">{t.footer.tagline}</p>
          </div>
            <div className="mt-4 text-white/80 text-xs">P.IVA e C.F. 02077140461</div>
          <p>© {new Date().getFullYear()} Mahdia Yacht. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
