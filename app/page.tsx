'use client';
/* oxlint-disable next/no-img-element -- Supplied editorial assets use CSS-controlled responsive crops. */

import { useState, type SyntheticEvent } from 'react';

const links = {
  // Swap these shared destinations for service-specific Fresha URLs when available.
  booking: 'https://www.fresha.com/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9/booking?allOffer=true&pId=1231654',
  virtual: 'https://www.fresha.com/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9/booking?allOffer=true&pId=1231654',
  shop: 'https://www.fresha.com/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9/booking?allOffer=true&pId=1231654',
  instagram: 'https://www.instagram.com/auroraskyn',
  email: 'mailto:wellness@auroraskyn.com',
};

const pathways = [
  ['01', 'Virtual Skyn Guidance', 'The Skyn Clarity Experience', '#clarity'],
  ['02', 'In-Spa Skyn Consultation', 'Meet with me in person to better understand your skin and where to begin.', '#in-spa'],
  ['03', 'Facial Experiences', 'Hands-on professional esthetic care based on your skin and what it needs.', '#in-spa'],
  ['04', 'Shop Aurora Skyn', 'Explore Aurora Skyn products and skincare through Fresha.', links.shop],
];

const process = ['Investigate', 'Understand', 'Educate', 'Simplify', 'Personalize', 'Observe', 'Reassess'];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function submitEmail(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Aurora Skyn home"><img src="/images/logo-light.png" alt="Aurora Skyn" /></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="#clarity">Virtual</a><a href="#in-spa">In Spa</a><a href="#about">About</a><a href={links.shop}>Shop</a>
          <a className="nav-cta" href={links.booking}>Book <Arrow /></a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Personalized skincare education + holistic esthetics</p>
          <h1>Going deeper than <em>skin deep.</em></h1>
          <p className="hero-lede">At Aurora Skyn, I help you understand what your skin may be asking for now, simplify your routine, and make more confident decisions about what you’re using.</p>
          <div className="button-row">
            <a className="button button-coral" href={links.virtual}>Book The Skyn Clarity Experience</a>
            <a className="text-link" href="#in-spa">Explore In-Spa Care <Arrow /></a>
          </div>
        </div>
        <div className="hero-image-wrap reveal delay-1">
          <img src="/images/hero.jpg" alt="Jasmine, founder of Aurora Skyn, wearing gold beside a tree" />
          <span className="spark" aria-hidden="true">✦</span>
          <p className="vertical-note">AURORA SKYN · POMPANO BEACH, FL</p>
        </div>
      </section>

      <section className="philosophy curved-top">
        <div className="section-label">Our philosophy</div>
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
          <img src="/images/gold-sitting.jpg" alt="Jasmine seated outdoors in a flowing gold outfit" />
        </figure>
        <div className="portrait-story-copy">
          <p className="eyebrow">A closer look</p>
          <p className="portrait-quote">“I look beyond the surface to understand the patterns your skin is showing.”</p>
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

      <section id="clarity" className="clarity">
        <div className="clarity-art" aria-hidden="true"><img src="/images/face-outline.png" alt="" /></div>
        <div className="clarity-main">
          <p className="eyebrow">Featured virtual experience</p>
          <h2>The Skyn Clarity<br /><em>Experience</em></h2>
          <p className="subhead">60-Minute Virtual Skin Assessment + Personalized Roadmap</p>
          <div className="price">$125 <span>Pilot pricing</span></div>
          <p className="clarity-lede">Your skin. Your products. Your real life. One clear place to start.</p>
          <p>Before we meet, I review your intake, bare-skin photos, current routine, and products. During our private session, I help you understand what may be happening, simplify what you’re doing, explain how your products fit together, and create clear next steps.</p>
          <a className="button button-berry" href={links.virtual}>Book Your Skyn Clarity Experience</a>
        </div>
        <div className="clarity-list">
          <div><b>01</b><span>Pre-session Skyn intake + photos</span></div>
          <div><b>02</b><span>Product and routine review</span></div>
          <div><b>03</b><span>60-minute private virtual session</span></div>
          <div><b>04</b><span>Personalized Skyn Wellness Roadmap</span></div>
          <div><b>05</b><span>Aurora Skyn Journal for observing patterns</span></div>
        </div>
      </section>

      <section className="process-section">
        <p className="eyebrow navy">How I work</p>
        <div className="process-statement"><span>“</span><h2>Before I change your routine, I want to understand what changed.</h2></div>
        <ol className="process">
          {process.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
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

      <section id="in-spa" className="in-spa">
        <div className="spa-image"><img src="/images/treatment.jpg" alt="A client receiving a relaxing facial treatment at Aurora Skyn" /></div>
        <div className="spa-copy">
          <p className="eyebrow gold">In-spa care</p>
          <h2>Focused, personal <em>in-spa care.</em></h2>
          <p>I offer a more focused selection of in-spa experiences, and I personalize the treatment based on your skin and what I’m seeing that day.</p>
          <ul><li>In-Spa Skyn Consultation</li><li>Selected facial experiences</li><li>Personalized hands-on care</li></ul>
          <a className="button button-ivory" href={links.booking}>Explore In-Spa Experiences</a>
        </div>
      </section>

      <aside className="teeth-strip"><p><span>Additional service</span><strong>Professional Teeth Whitening</strong>I also offer professional teeth whitening through Aurora Skyn.</p><a href={links.booking}>Book on Fresha <Arrow /></a></aside>

      <section id="about" className="about">
        <div className="about-image"><img src="/images/jasmine-bright.jpg" alt="Jasmine outdoors, founder and licensed esthetician at Aurora Skyn" /></div>
        <div className="about-copy">
          <p className="eyebrow navy">Licensed Esthetician + Skin Educator</p><h2>Hi, I’m <em>Jasmine.</em></h2>
          <p>I’m a licensed esthetician who loves skin education, hands-on care, and understanding why products are made the way they are. At Aurora Skyn, I take time to ask questions and explain what I’m seeing in language that makes sense.</p>
          <p>I’m also curious about how real life affects skin—work, travel, stress, routines, environment, and consistency. I bring that holistic wellness lens into my work without making medical claims or overcomplicating your next steps.</p>
          <p className="signature">Jasmine</p>
        </div>
        <img className="about-star" src="/images/star.png" alt="" aria-hidden="true" />
      </section>

      <section className="ritual">
        <div className="ritual-copy"><p className="eyebrow gold">Sound + ritual</p><h2>Sometimes care starts with slowing down.</h2><p>Relaxation and sensory ritual are also part of how I think about care. Sound bowls may be included in select Aurora Skyn experiences simply as a calming moment to pause and settle in.</p></div>
        <img src="/images/sound-bath-action.jpg" alt="Jasmine playing a sound bowl in a warm, peaceful room" />
      </section>

      <section className="products">
        <div className="product-image"><img src="/images/products.jpg" alt="A collection of Aurora Skyn oils, scrubs, and skincare products" /></div>
        <div className="product-copy"><p className="eyebrow navy">Purposeful products</p><h2>What goes on your skyn should have a reason for being there.</h2><p>I don’t want you buying a product simply because it’s trending. I recommend Aurora Skyn or professional products when they make sense for what your skin actually needs.</p><a className="text-link dark" href={links.shop}>Shop Aurora Skyn <Arrow /></a></div>
        <img className="product-detail" src="/images/oil-detail.jpg" alt="Aurora Skyn face oil and glass dropper on a mirror" />
      </section>

      <section className="education">
        <div><p className="eyebrow">Skyn notes</p><h2>Learn your skyn before you buy another product.</h2></div>
        {subscribed ? <output className="form-success">You’re on the list. Skyn Notes are coming soon.</output> : <form onSubmit={submitEmail}><label htmlFor="email">Occasional education, thoughtful observations, and simpler routines.</label><div><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required /><button type="submit" aria-label="Join Skyn Notes">Join <Arrow /></button></div><small>MailerLite connection coming soon. No clutter, no constant promotions.</small></form>}
      </section>

      <section className="final-cta"><p className="eyebrow">Start with clarity.</p><h2>Still confused about<br />what your skyn needs?</h2><a className="button button-gold" href={links.virtual}>Book The Skyn Clarity Experience</a></section>

      <footer>
        <div className="footer-brand"><img src="/images/logo-light.png" alt="Aurora Skyn" /><p>Going deeper than skin deep.</p></div>
        <div className="footer-links"><div><b>Explore</b><a href="#clarity">Virtual</a><a href="#in-spa">In Spa</a><a href="#about">About Jasmine</a><a href={links.shop}>Shop</a></div><div><b>Connect</b><a href={links.instagram}>Instagram</a><a href={links.email}>wellness@auroraskyn.com</a><a href={links.booking}>Book on Fresha</a></div></div>
        <div className="footer-bottom"><p>© 2026 Aurora Skyn</p><div><span>Privacy</span><span>Disclaimer</span><span>Terms</span></div><p>Digital Experience by ONYX Creatrix</p></div>
      </footer>
    </main>
  );
}
