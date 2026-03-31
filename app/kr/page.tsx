'use client';

import React, { useState, useEffect, useRef } from 'react';

// CSS Variables injection
const cssVariables = `
  :root {
    --color-primary: #F5F0E8;
    --color-secondary: #C0BAB0;
    --color-gold: #D4AF6E;
    --color-gold-muted: #B8975A;
    --color-gold-hover: #E8D098;
    --color-bg-base: #0D0D0D;
    --color-bg-surface: #1E1E1E;
    --color-bg-elevated: #242424;
    --color-border-default: #2E2A24;
    --color-border-subtle: #242420;
    --color-text-inverse: #1A1A1A;
    --color-text-tertiary: #8A8580;
    --color-text-disabled: #4A4540;
    
    --font-heading: 'Noto Serif KR', 'Times New Roman', serif;
    --font-body: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    --font-en: 'Cormorant Garamond', 'Garamond', serif;
    --font-mono: 'DM Mono', 'Courier New', monospace;
    
    --text-h1: 6rem;
    --text-h2: 3rem;
    --text-h3: 2.25rem;
    --text-base: 1rem;
    
    --spacing-section-padding: 96px;
    --spacing-element-gap: 48px;
    --spacing-section-x: 80px;
    
    --border-radius: 2px;
    
    --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.4);
    --shadow-button: 0 0 20px rgba(212, 175, 110, 0.3);
    --shadow-hover: 0 8px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 110, 0.1);
    
    --transition-default: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-slow: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Noto+Serif+KR:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg-base);
    color: var(--color-primary);
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes goldShimmer {
    from { background-position: -200% center; }
    to { background-position: 200% center; }
  }

  @keyframes scrollIndicator {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(12px); opacity: 0; }
  }

  .animate-fade-in-up {
    animation: fadeInUp 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-fade-in {
    animation: fadeIn 600ms ease-out forwards;
  }

  .gold-shimmer-text {
    background: linear-gradient(90deg, #B8975A 0%, #D4AF6E 30%, #E8D098 50%, #D4AF6E 70%, #B8975A 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3000ms linear infinite;
  }

  .nav-item-hover:hover {
    color: var(--color-gold) !important;
  }

  .btn-primary:hover {
    background: var(--color-gold-hover) !important;
    box-shadow: var(--shadow-button) !important;
  }

  .btn-secondary:hover {
    background: rgba(212, 175, 110, 0.08) !important;
    border-color: var(--color-gold) !important;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover) !important;
    border-color: rgba(184, 151, 90, 0.4) !important;
  }

  .news-card:hover {
    border-color: rgba(184, 151, 90, 0.4) !important;
  }

  .news-card:hover .news-arrow {
    transform: translateX(4px);
    color: var(--color-gold) !important;
  }

  .footer-link:hover {
    color: var(--color-gold) !important;
  }

  @media (max-width: 1024px) {
    :root {
      --spacing-section-x: 48px;
      --spacing-section-padding: 72px;
    }
  }

  @media (max-width: 768px) {
    :root {
      --spacing-section-x: 24px;
      --spacing-section-padding: 60px;
      --text-h1: 3.5rem;
      --text-h2: 2.25rem;
      --text-h3: 1.75rem;
    }
  }

  @media (max-width: 640px) {
    :root {
      --spacing-section-x: 20px;
      --text-h1: 2.5rem;
    }
  }
`;

// Types
interface NavItem {
  label: string;
  href: string;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface StatItem {
  value: string;
  label: string;
  suffix: string;
}

interface TimelineItem {
  year: string;
  description: string;
}

interface NewsItem {
  title: string;
  date: string;
}

// Navigation Component
const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: '사업 영역', href: '#features' },
    { label: '글로벌 현황', href: '#global' },
    { label: '혁신 성과', href: '#innovation' },
    { label: '뉴스룸', href: '#news' },
    { label: '상담 문의', href: '#contact' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="주요 네비게이션"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-section-x)',
        background: scrolled ? 'rgba(13, 13, 13, 0.98)' : 'rgba(13, 13, 13, 0.85)',
        borderBottom: scrolled ? '1px solid #2E2A24' : '1px solid rgba(46, 42, 36, 0.4)',
        backdropFilter: 'blur(12px)',
        transition: 'var(--transition-slow)',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
        aria-label="삼성건설 럭셔리 홈으로"
      >
        <div
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: '1.375rem',
            fontWeight: 300,
            color: 'var(--color-gold)',
            letterSpacing: '0.1em',
            lineHeight: 1,
          }}
        >
          HYOSUNG
        </div>
        <div
          style={{
            width: '1px',
            height: '20px',
            background: 'rgba(184, 151, 90, 0.4)',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 300,
            color: 'var(--color-secondary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          그룹
        </div>
      </a>

      {/* Desktop Nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
        className="desktop-nav"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-item-hover"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              transition: 'var(--transition-default)',
            }}
          >
            {item.label}
          </a>
        ))}
        <button
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--color-text-inverse)',
            background: 'var(--color-gold)',
            border: '1px solid var(--color-gold)',
            padding: '10px 24px',
            borderRadius: 'var(--border-radius)',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'var(--transition-slow)',
          }}
          className="btn-primary"
          aria-label="상담 신청하기"
        >
          상담 신청
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          color: 'var(--color-primary)',
          cursor: 'pointer',
          padding: '8px',
        }}
        aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={menuOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          )}
        </svg>
      </button>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          nav button[aria-label] { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const slogans = [
    'Always By Your Side',
    'Enable Today, Empower Tomorrow',
    'Leading the Future With Core Tech Excellence',
    'Empowering Our Partners to Push Beyond Limits',
  ];

  return (
    <section
      id="hero"
      aria-label="히어로 섹션"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg-base)',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
          alt="현대적인 건축물 야경"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.35,
            filter: 'brightness(0.7) contrast(1.1)',
          }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.95) 100%)',
          }}
        />
        {/* Gold gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(212, 175, 110, 0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '120px var(--spacing-section-x) var(--spacing-section-padding)',
        }}
      >
        {/* Badge */}
        <div
          className={mounted ? 'animate-fade-in-up' : ''}
          style={{
            opacity: mounted ? undefined : 0,
            animationDelay: '0ms',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-gold)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--color-gold)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            효성 그룹
          </span>
        </div>

        {/* Main Headline */}
        <div
          className={mounted ? 'animate-fade-in-up' : ''}
          style={{
            opacity: mounted ? undefined : 0,
            animationDelay: '200ms',
            marginBottom: '24px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-en)',
              fontSize: 'clamp(2.5rem, 7vw, var(--text-h1))',
              fontWeight: 300,
              color: 'var(--color-primary)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              marginBottom: '8px',
            }}
          >
            Always By
          </h1>
          <h1
            className="gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-en)',
              fontSize: 'clamp(2.5rem, 7vw, var(--text-h1))',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            Your Side
          </h1>
        </div>

        {/* English Sub */}
        <div
          className={mounted ? 'animate-fade-in-up' : ''}
          style={{
            opacity: mounted ? undefined : 0,
            animationDelay: '400ms',
            marginBottom: '48px',
            maxWidth: '640px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-en)',
              fontSize: '1.375rem',
              fontWeight: 300,
              color: 'rgba(212, 175, 110, 0.8)',
              letterSpacing: '0.05em',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}
          >
            Enable Today, Empower Tomorrow
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--color-secondary)',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
            }}
          >
            Leading the Future With Core Tech Excellence,<br />
            Empowering Our Partners to Push Beyond Limits,<br />
            Driving Today&apos;s Industries and Creating Tomorrow&apos;s Possibilities.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={mounted ? 'animate-fade-in-up' : ''}
          style={{
            opacity: mounted ? undefined : 0,
            animationDelay: '600ms',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn-primary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-text-inverse)',
              background: 'var(--color-gold)',
              border: '1px solid var(--color-gold)',
              padding: '16px 48px',
              borderRadius: 'var(--border-radius)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'var(--transition-slow)',
            }}
            aria-label="자세히 알아보기"
          >
            자세히 알아보기
          </button>
          <button
            className="btn-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-gold)',
              background: 'transparent',
              border: '1px solid rgba(184, 151, 90, 0.6)',
              padding: '15px 48px',
              borderRadius: 'var(--border-radius)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'var(--transition-slow)',
            }}
            aria-label="사업 영역 보기"
          >
            사업 영역 →
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className={mounted ? 'animate-fade-in' : ''}
          style={{
            opacity: mounted ? undefined : 0,
            animationDelay: '1000ms',
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 400,
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(180deg, rgba(184, 151, 90, 0.8), transparent)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: 'var(--color-gold)',
                animation: 'scrollIndicator 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Decorative gold lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '1px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent, rgba(184, 151, 90, 0.2), transparent)',
          zIndex: 5,
        }}
      />
    </section>
  );
};

// Feature Grid Section
const FeatureGridSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: 'Textile & Trade',
      description: '혁신적인 섬유 기술과 광범위한 글로벌 무역 네트워크로 가치를 극대화합니다.',
      icon: '◈',
    },
    {
      title: 'Heavy Industry & Construction',
      description: '차세대 전력망 솔루션, 고성능 산업 기계 및 지속 가능한 건설로 성장을 이끕니다.',
      icon: '⬡',
    },
    {
      title: 'Chemical',
      description: '효성의 화학 소재 기술이 일상의 편의를 제공합니다. Always by your side.',
      icon: '◉',
    },
    {
      title: 'ICT',
      description: '산업 및 금융 분야의 첨단 IT 인프라를 통해 더 스마트한 라이프스타일을 지원합니다.',
      icon: '◆',
    },
    {
      title: 'Other Business Areas',
      description: '모빌리티, 스포츠 마케팅, 벤처 투자 등 새로운 분야의 가능성을 탐구합니다.',
      icon: '◇',
    },
  ];

  return (
    <section
      id="features"
      aria-label="핵심 사업 영역"
      style={{
        padding: 'var(--spacing-section-padding) var(--spacing-section-x)',
        background: 'var(--color-bg-base)',
        position: 'relative',
      }}
    >
      {/* Gold divider top */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #B8975A, transparent)',
          marginBottom: '80px',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'var(--color-gold)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--color-gold)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              Business Areas
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, var(--text-h2))',
              fontWeight: 400,
              color: 'var(--color-primary)',
              lineHeight: 1.3,
              marginBottom: '20px',
            }}
          >
            5대 핵심 사업 영역
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              fontWeight: 300,
              color: 'var(--color-secondary)',
              lineHeight: 1.8,
              maxWidth: '640px',
            }}
          >
            혁신적 기술과 글로벌 네트워크를 기반으로 5대 핵심 사업 영역에서
            지속 가능한 성장을 추구합니다.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((feature, index) => (
            <article
              key={index}
              className="feature-card"
              style={{
                background: 'linear-gradient(135deg, #1E1E1E 0%, #242420 100%)',
                border: '1px solid #2E2A24',
                borderTop: '2px solid #B8975A',
                padding: '40px',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                transition: 'all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative background */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: 'radial-gradient(circle, rgba(212, 175, 110, 0.05) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-en)',
                  fontSize: '1.5rem',
                  color: 'var(--color-gold)',
                  marginBottom: '20px',
                  opacity: 0.7,
                }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-en)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.05em',
                  marginBottom: '16px',
                  lineHeight: 1.3,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  color: 'var(--color-secondary)',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                }}
              >
                {feature.description}
              </p>
              <div
                style={{
                  marginTop: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-gold-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                <span>자세히 보기</span>
                <span style={{ transition: 'transform 300ms ease' }}>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Global Stats Section
const GlobalStatsSection: React.FC = () => {
  const stats: StatItem[] = [
    { value: '30', label: 'Countries', suffix: '+' },
    { value: '126', label: 'Business Locations', suffix: '' },
    { value: '5', label: 'R&D Centers', suffix: '' },
  ];

  return (
    <section
      id="global"
      aria-label="글로벌 현황"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-surface)',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop"
          alt="글로벌 네트워크"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.12,
            filter: 'grayscale(30%) brightness(0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(30,30,30,0.97) 0%, rgba(36,36,32,0.9) 100%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: 'var(--spacing-section-padding) var(--spacing-section-x)',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '72px', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-gold)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                Global Presence
              </span>
              <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, var(--text-h2))',
                fontWeight: 400,
                color: 'var(--color-primary)',
                lineHeight: 1.3,
                marginBottom: '20px',
              }}
            >
              세계를 무대로
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                fontWeight: 300,
                color: 'var(--color-secondary)',
                lineHeight: 1.8,
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              2024년 기준 30개국, 126개 사업 거점, 5개 R&D 센터를 운영하고 있습니다.
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'rgba(46, 42, 36, 0.5)',
              border: '1px solid #2E2A24',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  padding: '56px 40px',
                  background: 'rgba(30, 30, 30, 0.9)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 400,
                    color: 'var(--color-gold)',
                    lineHeight: 1,
                    marginBottom: '12px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.value}
                  <span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>{stat.suffix}</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-en)',
                    fontSize: '1.0625rem',
                    fontWeight: 300,
                    color: 'var(--color-secondary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
                {index < stats.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1px',
                      height: '60%',
                      background: 'linear-gradient(180deg, transparent, #B8975A, transparent)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Innovation Timeline Section
const InnovationSection: React.FC = () => {
  const items: TimelineItem[] = [
    { year: '2024', description: '국내 최초 200MW 전압형 HVDC 기술 국산화' },
    { year: '2024', description: '세계 최초 100% 수소 엔진 발전기 상용화' },
    { year: '2022', description: '세계 최초 바이오 기반 스판덱스 상용화' },
    { year: '2022', description: '국내 최초 디지털 GIS용 LPIT 및 MU 상용화' },
    { year: '2020', description: '세계 최초 Digital Desk™ 솔루션 개발' },
  ];

  return (
    <section
      id="innovation"
      aria-label="혁신 성과"
      style={{
        padding: 'var(--spacing-section-padding) var(--spacing-section-x)',
        background: 'var(--color-bg-base)',
        position: 'relative',
      }}
    >
      {/* Gold divider */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #B8975A, transparent)',
          marginBottom: '80px',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left - Header */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-gold)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                Innovation
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, var(--text-h2))',
                fontWeight: 400,
                color: 'var(--color-primary)',
                lineHeight: 1.3,
                marginBottom: '24px',
              }}
            >
              세계를 앞서가는<br />기술 혁신
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                fontWeight: 300,
                color: 'var(--color-secondary)',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}
            >
              세계 최초·국내 최초 기술 개발 및 상용화 성과를
              지속적으로 달성하고 있습니다.
            </p>
            {/* Decorative image */}
            <div
              style={{
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                border: '1px solid rgba(184, 151, 90, 0.2)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop"
                alt="기술 혁신 이미지"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  opacity: 0.8,
                  filter: 'brightness(0.8) contrast(1.1)',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Right - Timeline */}
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'linear-gradient(180deg, var(--color-gold-muted), rgba(184, 151, 90, 0.2))',
              }}
            />

            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  paddingBottom: index < items.length - 1 ? '48px' : 0,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-36px',
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: index === 0 ? 'var(--color-gold)' : 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-gold-muted)',
                    boxShadow: index === 0 ? '0 0 12px rgba(212, 175, 110, 0.4)' : 'none',
                  }}
                />

                {/* Year badge */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'var(--color-gold)',
                    letterSpacing: '0.15em',
                    marginBottom: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(212, 175, 110, 0.1)',
                      border: '1px solid rgba(184, 151, 90, 0.3)',
                      padding: '3px 10px',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '0.75rem',
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: 'var(--color-primary)',
                    lineHeight: 1.6,
                    letterSpacing: '0.01em',
                  }}
                >
                  {item.description}
                </p>

                {/* Horizontal rule */}
                {index < items.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'rgba(46, 42, 36, 0.6)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #innovation > div > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          #innovation > div > div > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
};

// News Section
const NewsSection: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      title: '효성중공업, 美 수출용 가스절연차단기 국내 최초 개발',
      date: '2026.03.20',
    },
    {
      title: '조현준, K-전력기기 수출 선봉에 \'우뚝\'',
      date: '2026.03.12',
    },
    {
      title: '효성, 대·중소기업 및 농어촌 상생협력기금 160억 원 출연',
      date: '2026.03.05',
    },
    {
      title: '효성벤처스, \'파이온텍\'·\'리얼월드\'에 올해 첫 투자 단행',
      date: '2026.02.27',
    },
    {
      title: '효성중공업, 산업·학계 등과 HVDC 국산화 합동 점검… \'전력망 주권 앞장\'',
      date: '2026.02.26',
    },
  ];

  return (
    <section
      id="news"
      aria-label="뉴스룸"
      style={{
        padding: 'var(--spacing-section-padding) var(--spacing-section-x)',
        background: 'var(--color-bg-surface)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '56px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-gold)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                Newsroom
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, var(--text-h2))',
                fontWeight: 400,
                color: 'var(--color-primary)',
                lineHeight: 1.3,
                marginBottom: '12px',
              }}
            >
              최신 소식
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--color-secondary)',
                lineHeight: 1.7,
              }}
            >
              효성 그룹의 최신 소식을 확인하세요.
            </p>
          </div>
          <a
            href="/news"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-gold)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              border: '1px solid rgba(184, 151, 90, 0.4)',
              padding: '12px 28px',
              borderRadius: 'var(--border-radius)',
              transition: 'var(--transition-slow)',
              whiteSpace: 'nowrap',
            }}
            className="btn-secondary"
          >
            전체 뉴스 보기 →
          </a>
        </div>

        {/* News List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="news-card"
              style={{
                padding: '28px 0',
                borderBottom: '1px solid rgba(46, 42, 36, 0.8)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '24px',
                cursor: 'pointer',
                transition: 'var(--transition-slow)',
                borderLeft: '2px solid transparent',
                paddingLeft: '0',
              }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'var(--color-text-tertiary)',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    paddingTop: '2px',
                    minWidth: '90px',
                  }}
                >
                  {item.date}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: 'var(--color-primary)',
                    lineHeight: 1.6,
                    letterSpacing: '0.01em',
                  }}
                >
                  {item.title}
                </h3>
              </div>
              <div
                className="news-arrow"
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontSize: '1.125rem',
                  transition: 'all 300ms ease',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                →
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact CTA Section
const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      aria-label="상담 신청"
      style={{
        position: 'relative',
        padding: 'var(--spacing-section-padding) var(--spacing-section-x)',
        background: 'var(--color-bg-base)',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 110, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gold divider top */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #B8975A, transparent)',
          marginBottom: '80px',
        }}
      />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--color-gold)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            Contact Us
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            color: 'var(--color-primary)',
            lineHeight: 1.2,
            marginBottom: '16px',
            letterSpacing: '0.03em',
          }}
        >
          Partner With Us
        </h2>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            fontWeight: 400,
            color: 'var(--color-gold)',
            lineHeight: 1.4,
            marginBottom: '24px',
          }}
        >
          미래를 함께 만들어갑니다
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            fontWeight: 300,
            color: 'var(--color-secondary)',
            lineHeight: 1.8,
            marginBottom: '48px',
          }}
        >
          효성 그룹과의 비즈니스 협력, 투자 문의, 채용 정보 등
          다양한 문의를 환영합니다.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn-primary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-text-inverse)',
              background: 'var(--color-gold)',
              border: '1px solid var(--color-gold)',
              padding: '16px 52px',
              borderRadius: 'var(--border-radius)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'var(--transition-slow)',
            }}
            aria-label="상담 신청하기"
          >
            상담 신청하기
          </button>
          <button
            className="btn-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-gold)',
              background: 'transparent',
              border: '1px solid rgba(184, 151, 90, 0.6)',
              padding: '15px 52px',
              borderRadius: 'var(--border-radius)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'var(--transition-slow)',
            }}
            aria-label="분양 정보 보기"
          >
            분양 정보 보기
          </button>
        </div>

        {/* Contact info */}
        <div
          style={{
            marginTop: '56px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(46, 42, 36, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: '대표 전화', value: '1588-0000' },
            { label: '이메일', value: 'contact@hyosung.com' },
            { label: '운영 시간', value: '평일 09:00 - 18:00' },
          ].map((info, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                {info.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9375rem',
                  fontWeight: 400,
                  color: 'var(--color-secondary)',
                  letterSpacing: '0.05em',
                }}
              >
                {info.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const links = ['Privacy Policy', 'Terms Of Use', 'Whistleblowing Center', 'Inquiry'];

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#111111',
        borderTop: '1px solid #2E2A24',
        padding: '48px var(--spacing-section-x)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          {/* Logo & Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-en)',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: 'var(--color-gold)',
                letterSpacing: '0.15em',
                marginBottom: '8px',
              }}
            >
              HYOSUNG
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'var(--color-text-tertiary)',
                letterSpacing: '0.05em',
              }}
            >
              효성 그룹
            </div>
          </div>

          {/* Nav Links */}
          <nav aria-label="푸터 네비게이션">
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap',
              }}
            >
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                    className="footer-link"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      fontWeight: 400,
                      color: 'var(--color-secondary)',
                      textDecoration: 'none',
                      letterSpacing: '0.05em',
                      transition: 'var(--transition-default)',
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(184, 151, 90, 0.3), transparent)',
            marginBottom: '32px',
          }}
        />

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 300,
              color: 'var(--color-text-disabled)',
              letterSpacing: '0.03em',
            }}
          >
            Copyright© 2025 Hyosung. All Rights Reserved.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '1px',
                background: 'rgba(184, 151, 90, 0.4)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-en)',
                fontSize: '0.75rem',
                fontWeight: 300,
                color: 'var(--color-text-disabled)',
                letterSpacing: '0.1em',
                fontStyle: 'italic',
              }}
            >
              Always By Your Side
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg-base)',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main id="main-content">
          {/* Section 1: Hero */}
          <HeroSection />

          {/* Section 2: Feature Grid */}
          <FeatureGridSection />

          {/* Section 3: Global Stats */}
          <GlobalStatsSection />

          {/* Section 4: Innovation Timeline */}
          <InnovationSection />

          {/* Section 5: News */}
          <NewsSection />

          {/* Section 6: Contact CTA */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}