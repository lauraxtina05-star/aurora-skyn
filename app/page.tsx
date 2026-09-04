'use client';
/* oxlint-disable next/no-img-element -- Supplied editorial assets use CSS-controlled responsive crops. */

import { useCallback, useEffect, useRef, useState } from 'react';
import BookingModal, { type BookingLinks } from '@/components/booking-modal';
import CalendlyModal from '@/components/calendly-modal';
import MailerLite from '@/components/mailerlite';
import { ArrowIcon, ChevronIcon } from '@/components/icons';
import { useReveal } from '@/hooks/use-reveal';

const links = {
  // The paid Virtual Skyn Experience books directly through Calendly, not Fresha.
  virtual: 'https://calendly.com/auroraskyn/vse?back=1&month=2026-09',
  // In-person services still book through Fresha (kept as the secondary booking
  // system — see the booking modal). General services list, no single service
  // pre-selected — also used for the broad "in-spa / explore all / shop" entries.
  inSpa: 'https://www.fresha.com/book-now/aurora-skyn-hmifnwoh/services?lid=1297352&eid=2998182&share=true&pId=1231654',
  redEye: 'https://www.fresha.com/book-now/aurora-skyn-hmifnwoh/services?lid=1297352&eid=2998182&oiid=sv%3A28811121&share=true&pId=1231654',
  teethWhitening: 'https://www.fresha.com/book-now/aurora-skyn-hmifnwoh/services?lid=1297352&eid=2998182&oiid=sv%3A18176254&share=true&pId=1231654',
  reviews: 'https://www.fresha.com/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9?pId=1231654&reviews=true',
  discoveryCall: 'https://calendly.com/auroraskyn/discoverycall?back=1&month=2026-09',
  instagram: 'https://www.instagram.com/auroraskyn',
  email: 'mailto:wellness@auroraskyn.com',
};

const bookingLinks: BookingLinks = {
  inSpa: links.inSpa,
  redEye: links.redEye,
  teethWhitening: links.teethWhitening,
  // No confirmed Fresha service URL for Teeth Gems yet — checked the project and
  // found none. Leave unset; the modal shows a clearly-marked "coming soon" state
  // instead of guessing at a destination. Add the real URL here once it exists.
  teethGems: undefined,
};

// Calendly's own (non-hacky) color customization — see their embed docs.
const CALENDLY_ACCENT_COLOR = 'c21875'; // Berry Magenta, no leading #

function withCalendlyAccent(url: string) {
  return `${url}&primary_color=${CALENDLY_ACCENT_COLOR}`;
}

const pathways = [
  ['01', 'The Virtual Skyn Experience', '60 minutes of private virtual guidance, with a personalized roadmap and journal to keep.', '#virtual'],
  ['02', 'In-Spa Skyn Care', 'Hands-on facial experiences in person, personalized to what your skin shows that day.', '#in-spa'],
  ['03', 'Still deciding?', 'Book a quiet 15-minute Discovery Call and I can help you choose where to begin.', '#discovery'],
  ['04', 'View the Full In-Spa Menu', 'Browse every Aurora Skyn in-spa appointment and choose a time.', links.inSpa],
];

const processSteps = ['Investigate', 'Understand', 'Educate', 'Simplify', 'Personalize', 'Observe', 'Reassess'];

const testimonials = [
  {
    quote:
      'I’ve struggled with cystic acne for years and often felt embarrassed and judged. Jasmine has been the most patient, understanding, and helpful esthetician I’ve worked with. Her skin analysis helped me finally understand my skin, and my skin already felt smoother after the session.',
    name: 'Aurora Skyn client',
    detail: 'Skin analysis + facial',
  },
  {
    quote:
      'Jasmine is highly skilled, professional, caring, and has such a calming energy. She made me feel comfortable right away, explained everything in detail, and helped me understand what was happening with my skin and the products I was using. I left glowing, smooth, and hydrated.',
    name: 'Carole F.',
    detail: 'Facial experience',
  },
  {
    quote:
      'Jasmine hosted a spa party for our group and took care of every detail. She was professional and flexible with our schedule, and it’s clear how much she knows. The space was calm and spotless, the products felt lovely, and the whole experience was easy and relaxing.',
    name: 'Jamila T.',
    detail: 'Spa party',
  },
  {
    quote:
      'Absolutely loved my facial experience. Jasmine is so knowledgeable, patient, and loving with her work. I woke up with my skin feeling smooth, radiant, and nourished.',
    name: 'Laura G.',
    detail: 'Facial experience',
  },
  {
    quote:
      'Jasmine’s energy is so bubbly, warm, and contagious, you can’t help but feel good when you are around her. The service itself was worth every penny. You can tell she is knowledgeable, loves what she does, and takes pride in her work.',
    name: 'Emily F.',
    detail: 'Facial experience',
  },
  {
    quote: 'Beautiful workspace, and Jasmine offers top-tier service and hospitality.',
    name: 'Bre’anne A.',
    detail: 'In-spa visit',
  },
  {
    quote: 'Such a wonderful experience and beautiful person. I need these on a monthly basis.',
    name: 'Seddy A.',
    detail: 'In-spa visit',
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [virtualOpen, setVirtualOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const bookingTriggerRef = useRef<HTMLButtonElement | null>(null);
  const virtualTriggerRef = useRef<HTMLButtonElement | null>(null);
  const discoveryTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reviewCount = testimonials.length;
  const anyModalOpen = bookingOpen || virtualOpen || discoveryOpen;

  // Single source of truth for the background scroll lock. Each modal
  // (BookingModal, and both CalendlyModal instances) only ever manages its
  // own open state — this is the only place that touches document.body, so
  // there's no race between separate lock/unlock effects when one modal
  // hands off to another (e.g. the in-spa modal's Discovery row closing
  // itself and opening the Discovery Calendly modal in the same update:
  // anyModalOpen stays true the whole time, so this effect doesn't even
  // re-run). Uses position:fixed rather than bare overflow:hidden, which is
  // the reliable cross-browser way to stop background scroll on iOS Safari,
  // and restores the exact scroll position when the last modal closes.
  useEffect(() => {
    if (!anyModalOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [anyModalOpen]);

  // Soft, one-shot reveals for a handful of section moments as they scroll into view.
  const { ref: philosophyRef, className: philosophyRevealClass } = useReveal<HTMLElement>();
  const { ref: portraitStoryRef, className: portraitStoryRevealClass } = useReveal<HTMLElement>();
  const { ref: virtualRef, className: virtualRevealClass } = useReveal<HTMLElement>();
  const { ref: aboutImageRef, className: aboutImageRevealClass } = useReveal<HTMLDivElement>();
  const { ref: aboutCopyRef, className: aboutCopyRevealClass } = useReveal<HTMLDivElement>();
  const { ref: ritualRef, className: ritualRevealClass } = useReveal<HTMLElement>();
  const { ref: testimonialHeadRef, className: testimonialHeadRevealClass } = useReveal<HTMLDivElement>();

  function goTo(direction: number) {
    setSlide((current) => (current + direction + reviewCount) % reviewCount);
  }

  function onTouchStart(event: React.TouchEvent) {
    touchX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 45) goTo(delta < 0 ? 1 : -1);
    touchX.current = null;
  }

  const openBooking = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    bookingTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    const trigger = bookingTriggerRef.current;
    if (trigger && document.contains(trigger)) {
      setTimeout(() => trigger.focus(), 0);
    }
  }, []);

  const openVirtual = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    virtualTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setVirtualOpen(true);
  }, []);

  const closeVirtual = useCallback(() => {
    setVirtualOpen(false);
    const trigger = virtualTriggerRef.current;
    if (trigger && document.contains(trigger)) {
      setTimeout(() => trigger.focus(), 0);
    }
  }, []);

  const openDiscovery = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    discoveryTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setDiscoveryOpen(true);
  }, []);

  const closeDiscovery = useCallback(() => {
    setDiscoveryOpen(false);
    const trigger = discoveryTriggerRef.current;
    if (trigger && document.contains(trigger)) {
      setTimeout(() => trigger.focus(), 0);
    }
  }, []);

  // The in-spa modal's Discovery Call row hands off to the same Discovery
  // Calendly modal, but there's no click event to capture a trigger button
  // from — return focus to the in-spa modal's own trigger instead.
  const openDiscoveryFromBookingModal = useCallback(() => {
    discoveryTriggerRef.current = bookingTriggerRef.current;
    setDiscoveryOpen(true);
  }, []);

  const review = testimonials[slide];

  return (
    <main>
      <MailerLite />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Aurora Skyn home"><img src="/images/logo-light.png" alt="Aurora Skyn" /></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="#virtual" onClick={() => setMenuOpen(false)}>Virtual</a>
          <a href="#in-spa" onClick={() => setMenuOpen(false)}>In Spa</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <button className="nav-cta" type="button" onClick={openBooking}>Book <ArrowIcon /></button>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Personalized skincare education + holistic esthetics</p>
          <h1>Going deeper than <em>skin deep.</em></h1>
          <p className="hero-lede">At Aurora Skyn, I help you understand what may be changing with your skin, simplify your routine, and make more confident decisions about what you’re using.</p>
          <div className="button-row">
            <button className="button button-coral" type="button" onClick={openVirtual}>Book the Virtual Skyn Experience</button>
            <a className="text-link" href="#in-spa">Explore In-Spa Care <ArrowIcon /></a>
          </div>
        </div>
        <div className="hero-image-wrap reveal delay-1">
          <img src="/images/gold-sitting.jpg" alt="Jasmine, founder of Aurora Skyn, seated on rocks in a gold outfit at golden hour" />
          <span className="spark" aria-hidden="true">✦</span>
          <p className="vertical-note">AURORA SKYN · POMPANO BEACH, FL</p>
        </div>
      </section>

      <section ref={philosophyRef} className={`philosophy curved-top ${philosophyRevealClass}`}>
        <div className="section-label">My philosophy</div>
        <div className="philosophy-copy">
          <h2>Your skin changes.<br />Your routine can change <em>with it.</em></h2>
          <div className="philosophy-body">
            <p>Before I recommend something new, I look at what you already use, how you use it, and what has been happening in your real life—your habits, environment, stress, travel, and other patterns that may matter.</p>
            <p><strong>Before I change your routine, I want to understand what changed.</strong></p>
          </div>
        </div>
      </section>

      <section
        ref={portraitStoryRef}
        className={`portrait-story ${portraitStoryRevealClass}`}
        aria-label="Aurora Skyn philosophy in photographs"
      >
        <figure className="portrait-story-main">
          <img src="/images/hero.jpg" alt="Jasmine standing beside a large tree at sunset in a gold outfit" />
        </figure>
        <div className="portrait-story-copy">
          <p className="eyebrow">A closer look</p>
          <p className="portrait-quote">“I look past the surface to understand the patterns your skin is showing me.”</p>
          <span>Jasmine · Aurora Skyn</span>
        </div>
        <figure className="portrait-story-detail">
          <img src="/images/gold-detail.jpg" alt="Close portrait of Jasmine in warm golden light" />
        </figure>
      </section>

      <section className="experiences" id="experiences">
        <div className="section-heading split-heading">
          <p className="eyebrow navy">Choose your experience</p>
          <h2>Care, wherever<br />you are.</h2>
          <p>Choose the kind of support that makes sense for you right now.</p>
        </div>
        <div className="pathways">
          {pathways.map(([number, title, description, href]) => {
            const external = href.startsWith('http');
            return (
              <a
                className="pathway"
                href={href}
                key={title}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowIcon />
              </a>
            );
          })}
          <a className="teeth-mini" href={links.teethWhitening} target="_blank" rel="noopener noreferrer">Professional Teeth Whitening <ArrowIcon /></a>
        </div>
      </section>

      <section id="virtual" ref={virtualRef} className={`clarity ${virtualRevealClass}`}>
        <div className="clarity-art" aria-hidden="true"><img src="/images/face-outline.png" alt="" /></div>
        <div className="clarity-main">
          <p className="eyebrow">The main virtual experience</p>
          <h2>The Virtual Skyn<br /><em>Experience</em></h2>
          <p className="subhead">A 60-minute private virtual session, plus everything I review before we meet.</p>
          <div className="price">$125 <span>60 minutes</span></div>
          <p>Before we meet, I go through your pre-session intake, your bare-skin photos, your current routine and products, and the lifestyle and environment patterns that seem relevant. During our private session I educate, simplify, guide, and give you clear next steps you can actually follow.</p>
          <button className="button button-berry" type="button" onClick={openVirtual}>Book Your Virtual Skyn Experience</button>
        </div>
        <div className="clarity-photo">
          <img src="/images/jasmine-virtual-skyn.jpg" alt="Jasmine glancing through green foliage in a colorful floral top" />
        </div>
        <div className="clarity-list">
          <div><b>01</b><span>Pre-session intake + bare-skin photos</span></div>
          <div><b>02</b><span>Product and routine review</span></div>
          <div><b>03</b><span>Private virtual session</span></div>
          <div><b>04</b><span>Personalized Skyn Wellness Roadmap</span></div>
          <div><b>05</b><span>Aurora Skyn Journal</span></div>
        </div>
      </section>

      <section id="discovery" className="discovery">
        <div className="discovery-inner">
          <p className="eyebrow navy">Not sure where to start?</p>
          <p className="discovery-lede">Book a complimentary 15-minute Discovery Call and I’ll help you choose the Aurora Skyn experience that makes the most sense for you.</p>
          <ul className="discovery-list">
            <li>Choosing the right service</li>
            <li>Whether virtual or in-person care makes more sense</li>
            <li>Exploring a custom combination if it fits</li>
          </ul>
          <button className="text-link dark" type="button" onClick={openDiscovery}>Book a Discovery Call <ArrowIcon /></button>
          <p className="discovery-note">Some clients need one experience. Others benefit from a mix of virtual and in-person care. If you’re unsure, I can help you figure out the best place to begin.</p>
        </div>
      </section>

      <section className="process-section">
        <p className="eyebrow navy">How I work</p>
        <div className="process-statement"><span>“</span><h2>Before I change your routine, I want to understand what changed.</h2></div>
        <ol className="process">
          {processSteps.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
        </ol>
      </section>

      <section className="real-skyn">
        <div className="real-copy"><img className="brand-stamp" src="/images/logo-light.png" alt="" /><p className="eyebrow">Real clients</p><h2>Real skyn.<br />Real patterns.<br /><em>Real care.</em></h2><p>I keep real texture visible because it helps me understand what your skin is showing me.</p></div>
        <div className="client-grid">
          <figure><img src="/images/client-1.png" alt="Aurora Skyn client smiling after treatment" /></figure>
          <figure><img src="/images/client-2.png" alt="Aurora Skyn client with glowing skin after treatment" /></figure>
          <figure><img src="/images/client-3.png" alt="Aurora Skyn client resting after treatment" /></figure>
        </div>
      </section>

      <section id="testimonials" className="testimonials" aria-roledescription="carousel" aria-label="Client reviews">
        <div ref={testimonialHeadRef} className={`testimonial-head ${testimonialHeadRevealClass}`}>
          <p className="eyebrow gold">Kind words</p>
          <h2>What clients<br /><em>say.</em></h2>
          <p className="testimonial-rating">
            <span aria-hidden="true">★★★★★</span> 5.0 on Fresha
          </p>
        </div>
        <div className="testimonial-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-live="polite">
          <blockquote key={slide}>
            <p>{review.quote}</p>
            <footer><span>{review.name}</span><span>{review.detail}</span></footer>
          </blockquote>
        </div>
        <div className="testimonial-controls">
          <button type="button" onClick={() => goTo(-1)} aria-label="Previous review"><ChevronIcon direction="left" /></button>
          <div className="testimonial-dots">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.name}
                className={index === slide ? 'on' : ''}
                aria-label={`Show review ${index + 1} of ${reviewCount}`}
                aria-current={index === slide}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(1)} aria-label="Next review"><ChevronIcon direction="right" /></button>
        </div>
        <a className="testimonial-more" href={links.reviews} target="_blank" rel="noopener noreferrer">Read more reviews on Fresha <ArrowIcon /></a>
      </section>

      <section id="in-spa" className="in-spa">
        <div className="spa-image"><img src="/images/treatment.jpg" alt="A client receiving a relaxing facial treatment at Aurora Skyn" /></div>
        <div className="spa-copy">
          <p className="eyebrow gold">In-spa care</p>
          <h2>Focused, personal <em>in-spa care.</em></h2>
          <p>I offer a smaller, considered set of in-person experiences and personalize each one based on your skin and what I’m seeing that day.</p>
          <ul>
            <li>In-spa skin care</li>
            <li>Facial experiences</li>
            <li>Professional teeth whitening — a secondary service</li>
          </ul>
          <div className="button-row">
            <button className="button button-ivory" type="button" onClick={openBooking}>Explore In-Spa Experiences</button>
            <a className="text-link" href={links.inSpa} target="_blank" rel="noopener noreferrer">View the Full In-Spa Menu <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <aside className="teeth-strip"><p><span>Additional service</span><strong>Professional Teeth Whitening</strong>A quick, standalone service I offer alongside skincare.</p><a href={links.teethWhitening} target="_blank" rel="noopener noreferrer">View Availability <ArrowIcon /></a></aside>

      <section id="about" className="about">
        <div ref={aboutImageRef} className={`about-image ${aboutImageRevealClass}`}>
          <img src="/images/jasmine-orange-dress.jpg" alt="Jasmine, founder of Aurora Skyn, outdoors in an orange floral dress" />
        </div>
        <div
          ref={aboutCopyRef}
          className={`about-copy ${aboutCopyRevealClass}`}
          style={{ transitionDelay: '140ms' }}
        >
          <p className="eyebrow navy">Licensed esthetician + skin educator</p>
          <h2>Hi, I’m <em>Jasmine.</em></h2>
          <p>My approach to skincare has always been about looking a little deeper. I love a good facial and beautiful products, but I’ve never believed that skin exists in a bubble.</p>
          <p>I pay attention to the things happening around your skin too. Your routine, stress, environment, travel, what you’ve been using, what’s changed, and the patterns you’ve been noticing.</p>
          <p>That curiosity is what led me toward a more holistic approach to esthetics. I love blending professional skincare with thoughtful rituals like facial cupping, gua sha, sound, and moments that help you slow down and actually enjoy taking care of yourself.</p>
          <p>Aurora Skyn is where all of those pieces come together. I want you to leave feeling cared for, more informed, and more confident about what your skin needs next.</p>
        </div>
        <img className="about-star" src="/images/star.png" alt="" aria-hidden="true" />
      </section>

      <section className={`ritual ${ritualRevealClass}`} id="ritual" ref={ritualRef}>
        <div className="ritual-copy"><p className="eyebrow gold">Sound + ritual</p><h2>Skincare can be a place to slow down, too.</h2><p>Sound, breath, and sensory ritual are part of the way I create space for relaxation during select Aurora Skyn experiences. For me, taking care of your skin can also be a moment to reconnect with yourself.</p></div>
        <img src="/images/sound-bath-action.jpg" alt="Jasmine seated with crystal singing bowls in a warm, calm room" />
      </section>

      <section className="products">
        <div className="product-image"><img src="/images/products.jpg" alt="A collection of Aurora Skyn oils, scrubs, and skincare products" /></div>
        <div className="product-copy"><p className="eyebrow navy">Purposeful products</p><h2>What goes on your skyn should have a reason for being there.</h2><p>I don’t want you buying a product simply because it’s trending. I recommend Aurora Skyn or professional products when they make sense for what your skin actually needs.</p><a className="text-link dark" href={links.inSpa} target="_blank" rel="noopener noreferrer">Shop Aurora Skyn <ArrowIcon /></a></div>
        <img className="product-detail" src="/images/oil-detail.jpg" alt="Aurora Skyn face oil and glass dropper on a mirror" />
      </section>

      <section className="education">
        <div><p className="eyebrow">Skyn notes</p><h2>Learn your skyn before you buy another product.</h2></div>
        <div className="skyn-notes">
          <p className="skyn-notes-intro">Occasional education, thoughtful observations, and simpler routines. No clutter, no constant promotions.</p>
          <div className="ml-embedded" data-form="ylJLrW" />
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Start with clarity.</p>
        <h2>Still confused about<br />what your skyn needs?</h2>
        <button className="button button-gold" type="button" onClick={openDiscovery}>Book a Discovery Call</button>
      </section>

      <footer>
        <div className="footer-brand"><img src="/images/logo-light.png" alt="Aurora Skyn" /><p>Going deeper than skin deep.</p></div>
        <div className="footer-links"><div><b>Explore</b><a href="#virtual">Virtual</a><a href="#in-spa">In Spa</a><a href="#about">About Jasmine</a><a href="#testimonials">Reviews</a></div><div><b>Connect</b><a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={links.email}>wellness@auroraskyn.com</a><a href={links.inSpa} target="_blank" rel="noopener noreferrer">Book an Appointment</a></div><div><b>Visit</b><a href="tel:+15615652165">561-565-2165</a><span className="footer-hours-label">Hours</span><a href={links.inSpa} target="_blank" rel="noopener noreferrer">By Appointment Only</a></div></div>
        <div className="footer-bottom"><p>© 2026 Aurora Skyn</p><div><span>Privacy</span><span>Disclaimer</span><span>Terms</span></div><p>Digital Experience by ONYX Creatrix</p></div>
      </footer>

      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
        onOpenDiscovery={openDiscoveryFromBookingModal}
        links={bookingLinks}
      />
      <CalendlyModal
        open={virtualOpen}
        onClose={closeVirtual}
        title="Book Your Virtual Skyn Experience"
        subtitle="Choose a time that works for you and we’ll take it from there."
        calendlyUrl={withCalendlyAccent(links.virtual)}
      />
      <CalendlyModal
        open={discoveryOpen}
        onClose={closeDiscovery}
        title="Book Your Discovery Call"
        subtitle="Choose a time for a complimentary 15-minute conversation with Jasmine."
        calendlyUrl={withCalendlyAccent(links.discoveryCall)}
      />
    </main>
  );
}
