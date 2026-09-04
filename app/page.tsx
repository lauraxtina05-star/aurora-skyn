'use client';
/* oxlint-disable next/no-img-element -- Supplied editorial assets use CSS-controlled responsive crops. */

import { useRef, useState, type SyntheticEvent } from 'react';

const links = {
  // Real Aurora Skyn Fresha destinations.
  booking: 'https://www.fresha.com/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9/booking?allOffer=true&pId=1231654',
  reviews: 'https://www.fresha.com/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9?pId=1231654&reviews=true',
  instagram: 'https://www.instagram.com/auroraskyn',
  email: 'mailto:wellness@auroraskyn.com',
  // Discovery Call: no Calendly link yet. Replace '#' below with the Calendly
  // 15-minute Discovery Call URL when it is ready. Search for links.discoveryCall.
  discoveryCall: '#',
};

const pathways = [
  ['01', 'The Virtual Skyn Experience', '60 minutes of private virtual guidance, with a personalized roadmap and journal to keep.', '#virtual'],
  ['02', 'In-Spa Skyn Care', 'Hands-on facial experiences in person, personalized to what your skin shows that day.', '#in-spa'],
  ['03', 'Still deciding?', 'Book a quiet 15-minute Discovery Call and I can help you choose where to begin.', '#discovery'],
  ['04', 'Book on Fresha', 'See the full Aurora Skyn menu and reserve your appointment.', links.booking],
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
      'Jasmine hosted a spa party for our group and took care of every detail. She was professional and flexible with our schedule, and it’s clear how much she knows. The space was calm and spotless, the products felt lovely, and the whole experience was easy and relaxing.',
    name: 'Jamila T.',
    detail: 'Spa party',
  },
  {
    quote:
      'Jasmine’s energy is so bubbly, warm, and contagious, you can’t help but feel good when you are around her. The service itself was worth every penny. You can tell she is knowledgeable, loves what she does, and takes pride in her work.',
    name: 'Emily F.',
    detail: 'Facial experience',
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [slide, setSlide] = useState(0);
  const touchX = useRef<number | null>(null);
  const reviewCount = testimonials.length;

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

  function submitEmail(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  const review = testimonials[slide];

  return (
    <main>
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
          <a className="nav-cta" href={links.booking}>Book <Arrow /></a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Personalized skincare education + holistic esthetics</p>
          <h1>Going deeper than <em>skin deep.</em></h1>
          <p className="hero-lede">At Aurora Skyn, I help you understand what may be changing with your skin, simplify your routine, and make more confident decisions about what you’re using.</p>
          <div className="button-row">
            <a className="button button-coral" href={links.booking}>Book the Virtual Skyn Experience</a>
            <a className="text-link" href="#in-spa">Explore In-Spa Care <Arrow /></a>
          </div>
        </div>
        <div className="hero-image-wrap reveal delay-1">
          <img src="/images/gold-sitting.jpg" alt="Jasmine, founder of Aurora Skyn, seated on rocks in a gold outfit at golden hour" />
          <span className="spark" aria-hidden="true">✦</span>
          <p className="vertical-note">AURORA SKYN · POMPANO BEACH, FL</p>
        </div>
      </section>

      <section className="philosophy curved-top">
        <div className="section-label">My philosophy</div>
        <div className="philosophy-copy">
          <h2>Your skin changes.<br />Your routine can change <em>with it.</em></h2>
          <div className="philosophy-body">
            <p>Before I recommend something new, I look at what you already use, how you use it, and what has been happening in your real life—your habits, environment, stress, travel, and other patterns that may matter.</p>
            <p><strong>Before I change your routine, I want to understand what changed.</strong></p>
          </div>
        </div>
      </section>

      <section className="portrait-story" aria-label="Aurora Skyn philosophy in photographs">
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
          {pathways.map(([number, title, description, href]) => (
            <a className="pathway" href={href} key={title}>
              <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><Arrow />
            </a>
          ))}
          <a className="teeth-mini" href={links.booking}>Professional Teeth Whitening <Arrow /></a>
        </div>
      </section>

      <section id="virtual" className="clarity">
        <div className="clarity-art" aria-hidden="true"><img src="/images/face-outline.png" alt="" /></div>
        <div className="clarity-main">
          <p className="eyebrow">The main virtual experience</p>
          <h2>The Virtual Skyn<br /><em>Experience</em></h2>
          <p className="subhead">A 60-minute private virtual session, plus everything I review before we meet.</p>
          <div className="price">$125 <span>60 minutes</span></div>
          <p className="clarity-lede">This is the full paid virtual experience, not a free consultation.</p>
          <p>Before we meet, I go through your pre-session intake, your bare-skin photos, your current routine and products, and the lifestyle and environment patterns that seem relevant. During our private session I educate, simplify, guide, and give you clear next steps you can actually follow.</p>
          <a className="button button-berry" href={links.booking}>Book Your Virtual Skyn Experience</a>
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
          {/* Calendly link pending — links.discoveryCall is a placeholder ('#'). Swap it when the booking link exists. */}
          <a className="text-link dark" href={links.discoveryCall} data-calendly-pending="true">Book a Discovery Call <Arrow /></a>
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
        <div className="testimonial-head">
          <p className="eyebrow gold">Kind words</p>
          <h2>What clients<br /><em>say.</em></h2>
        </div>
        <div className="testimonial-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-live="polite">
          <blockquote key={slide}>
            <p>{review.quote}</p>
            <footer><span>{review.name}</span><span>{review.detail}</span></footer>
          </blockquote>
        </div>
        <div className="testimonial-controls">
          <button type="button" onClick={() => goTo(-1)} aria-label="Previous review">←</button>
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
          <button type="button" onClick={() => goTo(1)} aria-label="Next review">→</button>
        </div>
        <a className="testimonial-more" href={links.reviews} target="_blank" rel="noreferrer">Read more reviews on Fresha <Arrow /></a>
      </section>

      <section id="in-spa" className="in-spa">
        <div className="spa-image"><img src="/images/treatment.jpg" alt="A client receiving a relaxing facial treatment at Aurora Skyn" /></div>
        <div className="spa-copy">
          <p className="eyebrow gold">In-spa care</p>
          <h2>Focused, personal <em>in-spa care.</em></h2>
          <p>I offer a smaller, considered set of in-person experiences and personalize each one based on your skin and what I’m seeing that day. For the full booking menu, I’ll send you to Fresha.</p>
          <ul>
            <li>In-spa skin care</li>
            <li>Facial experiences</li>
            <li>Professional teeth whitening — a secondary service</li>
          </ul>
          <a className="button button-ivory" href={links.booking}>See the full menu on Fresha</a>
        </div>
      </section>

      <aside className="teeth-strip"><p><span>Additional service</span><strong>Professional Teeth Whitening</strong>A quick, standalone service I offer alongside skincare.</p><a href={links.booking}>Book on Fresha <Arrow /></a></aside>

      <section id="about" className="about">
        <div className="about-image"><img src="/images/jasmine-orange-dress.jpg" alt="Jasmine, founder of Aurora Skyn, outdoors in an orange floral dress" /></div>
        <div className="about-copy">
          <p className="eyebrow navy">Licensed esthetician + skin educator</p>
          <h2>Hi, I’m <em>Jasmine.</em></h2>
          <p>My approach to skincare has always been about looking a little deeper. I love a good facial and beautiful products, but I’ve never believed that skin exists in a bubble.</p>
          <p>I pay attention to the things happening around your skin too. Your routine, stress, environment, travel, what you’ve been using, what’s changed, and the patterns you’ve been noticing.</p>
          <p>That curiosity is what led me toward a more holistic approach to esthetics. I love blending professional skincare with thoughtful rituals like facial cupping, gua sha, sound, and moments that help you slow down and actually enjoy taking care of yourself.</p>
          <p>Aurora Skyn is where all of those pieces come together. I want you to leave feeling cared for, more informed, and more confident about what your skin needs next.</p>
          <p className="signature">Jasmine</p>
        </div>
        <img className="about-star" src="/images/star.png" alt="" aria-hidden="true" />
      </section>

      <section className="ritual" id="ritual">
        <div className="ritual-copy"><p className="eyebrow gold">Sound + ritual</p><h2>Skincare can be a place to slow down, too.</h2><p>Sound, breath, and sensory ritual are part of the way I create space for relaxation during select Aurora Skyn experiences. For me, taking care of your skin can also be a moment to reconnect with yourself.</p></div>
        <img src="/images/sound-bath-action.jpg" alt="Jasmine seated with crystal singing bowls in a warm, calm room" />
      </section>

      <section className="products">
        <div className="product-image"><img src="/images/products.jpg" alt="A collection of Aurora Skyn oils, scrubs, and skincare products" /></div>
        <div className="product-copy"><p className="eyebrow navy">Purposeful products</p><h2>What goes on your skyn should have a reason for being there.</h2><p>I don’t want you buying a product simply because it’s trending. I recommend Aurora Skyn or professional products when they make sense for what your skin actually needs.</p><a className="text-link dark" href={links.booking}>Shop Aurora Skyn <Arrow /></a></div>
        <img className="product-detail" src="/images/oil-detail.jpg" alt="Aurora Skyn face oil and glass dropper on a mirror" />
      </section>

      <section className="education">
        <div><p className="eyebrow">Skyn notes</p><h2>Learn your skyn before you buy another product.</h2></div>
        {subscribed ? <output className="form-success">You’re on the list. Skyn Notes are coming soon.</output> : <form onSubmit={submitEmail}><label htmlFor="email">Occasional education, thoughtful observations, and simpler routines.</label><div><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required /><button type="submit" aria-label="Join Skyn Notes">Join <Arrow /></button></div><small>MailerLite connection coming soon. No clutter, no constant promotions.</small></form>}
      </section>

      <section className="final-cta"><p className="eyebrow">Start with clarity.</p><h2>Still confused about<br />what your skyn needs?</h2><a className="button button-gold" href={links.booking}>Book the Virtual Skyn Experience</a></section>

      <footer>
        <div className="footer-brand"><img src="/images/logo-light.png" alt="Aurora Skyn" /><p>Going deeper than skin deep.</p></div>
        <div className="footer-links"><div><b>Explore</b><a href="#virtual">Virtual</a><a href="#in-spa">In Spa</a><a href="#about">About Jasmine</a><a href="#testimonials">Reviews</a></div><div><b>Connect</b><a href={links.instagram}>Instagram</a><a href={links.email}>wellness@auroraskyn.com</a><a href={links.booking}>Book on Fresha</a></div></div>
        <div className="footer-bottom"><p>© 2026 Aurora Skyn</p><div><span>Privacy</span><span>Disclaimer</span><span>Terms</span></div><p>Digital Experience by ONYX Creatrix</p></div>
      </footer>
    </main>
  );
}
