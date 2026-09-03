'use client';

import { useState } from 'react';

const links = {
  booking:
    'https://www.fresha.com/book-now/aurora-skyn-hmifnwoh/services?lid=1297352&eid=2998182&pId=1231654',
  virtual:
    'https://www.fresha.com/book-now/aurora-skyn-hmifnwoh/services?lid=1297352&eid=2998182&oiid=sv%3A18293942&pId=1231654',
  shop: 'https://www.fresha.com/en-GB/a/aurora-skyn-pompano-beach-s-cypress-rd-yx7qe4e9',
  instagram: 'https://www.instagram.com/auroraskyn',
  email: 'mailto:wellness@auroraskyn.com',
};

const pathways = [
  ['01', 'Virtual Skyn Guidance', 'A thoughtful virtual assessment and a clear, personalized place to begin.', '#clarity'],
  ['02', 'In-Spa Skyn Guidance', 'An in-person consultation rooted in observation, education, and your goals.', '#in-spa'],
  ['03', 'Facial Experiences', 'Selective hands-on esthetic care designed around what your skin needs now.', '#in-spa'],
  ['04', 'Shop Aurora Skyn', 'Purposeful products selected to support—not complicate—your routine.', links.shop],
];

const process = ['Investigate', 'Understand', 'Educate', 'Simplify', 'Personalize', 'Observe', 'Reassess'];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function submitEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Aurora Skyn home">
          <span className="monogram">AS</span><span>Aurora Skyn</span>
        </a>
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
          <p className="hero-lede">Understand your changing skin through personalized esthetic education, purposeful care, and a holistic lens grounded in real life.</p>
          <div className="button-row">
            <a className="button button-gold" href={links.virtual}>Book a Skyn Clarity Experience</a>
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
            <p>Changing skin can make even a full shelf feel like no answer at all. Aurora Skyn looks beyond recommending another product.</p>
            <p>We help you understand what shifted, simplify the noise, and build a routine that works in your actual life—so education becomes confidence.</p>
          </div>
        </div>
      </section>

      <section className="experiences" id="experiences">
        <div className="section-heading split-heading">
          <p className="eyebrow navy">Choose your experience</p>
          <h2>Care, wherever<br />you are.</h2>
          <p>Begin virtually, visit the studio, or explore purposeful care at your own pace.</p>
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
          <a className="button button-navy" href={links.virtual}>Book Your Experience</a>
        </div>
        <div className="clarity-list">
          <div><b>01</b><span>Pre-session intake + clear bare-skin photos</span></div>
          <div><b>02</b><span>Current product + routine review</span></div>
          <div><b>03</b><span>Personalized esthetic education</span></div>
          <div><b>04</b><span>Personalized Skyn Wellness Roadmap</span></div>
          <div><b>05</b><span>Aurora Skyn Journal for observing patterns</span></div>
        </div>
      </section>

      <section className="process-section">
        <p className="eyebrow navy">How Jasmine works</p>
        <div className="process-statement"><span>“</span><h2>Before we change your routine, we understand what changed.</h2></div>
        <ol className="process">
          {process.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
        </ol>
      </section>

      <section className="real-skyn">
        <div className="real-copy"><p className="eyebrow">Real clients</p><h2>Real skyn.<br />Real patterns.<br /><em>Real care.</em></h2><p>Skin texture is information—not something to hide.</p></div>
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
          <h2>Some things are meant to be <em>experienced in person.</em></h2>
          <p>Professional esthetic care meets intentional touch, thoughtful facial techniques, botanicals, sensory ritual, and room to exhale.</p>
          <ul><li>In-person skin consultation</li><li>Personalized facial experiences</li><li>Restorative sensory care</li></ul>
          <a className="button button-ivory" href={links.booking}>Explore In-Spa Experiences</a>
        </div>
      </section>

      <aside className="teeth-strip"><p><span>Also available</span><strong>Professional Teeth Whitening</strong>Professional brightening care in a calm, private setting.</p><a href={links.booking}>View on Fresha <Arrow /></a></aside>

      <section id="about" className="about">
        <div className="about-image"><img src="/images/jasmine.jpg" alt="Jasmine outdoors, founder and licensed esthetician at Aurora Skyn" /></div>
        <div className="about-copy">
          <p className="eyebrow navy">Meet Jasmine</p><h2>Licensed Esthetician<br /><em>+ Skin Educator</em></h2>
          <p>Jasmine brings an investigative mind to skin and a warm, hands-on approach to care. She connects product knowledge and esthetic education with the everyday patterns that shape how skin behaves.</p>
          <p>Her frequent work travel has made her especially attentive to real routines: changing environments, inconsistent schedules, stress, sleep, and the products we carry with us.</p>
          <p className="signature">Jasmine</p>
        </div>
      </section>

      <section className="ritual">
        <div className="ritual-copy"><p className="eyebrow gold">A supporting ritual</p><h2>Care for the person,<br />not only the surface.</h2><p>Relaxation, sensory ritual, and whole-person awareness can create space to notice more. Sound experiences may be woven into select Aurora Skyn care as a restorative layer.</p></div>
        <img src="/images/sound-bath.jpg" alt="Jasmine seated among sound bowls in a warm, peaceful room" />
      </section>

      <section className="products">
        <div className="product-image"><img src="/images/products.jpg" alt="A collection of Aurora Skyn oils, scrubs, and skincare products" /></div>
        <div className="product-copy"><p className="eyebrow navy">Purposeful products</p><h2>What goes on your skyn should have a reason for being there.</h2><p>Jasmine may recommend Aurora Skyn products or other professional products when they genuinely support your priorities. Product sales are never the reason for the consultation.</p><a className="text-link dark" href={links.shop}>Shop Aurora Skyn <Arrow /></a></div>
        <img className="product-detail" src="/images/oil-detail.jpg" alt="Aurora Skyn face oil and glass dropper on a mirror" />
      </section>

      <section className="education">
        <div><p className="eyebrow">Skyn notes</p><h2>Learn your skyn before you buy another product.</h2></div>
        {subscribed ? <p className="form-success" role="status">You’re on the list. Skyn Notes are coming soon.</p> : <form onSubmit={submitEmail}><label htmlFor="email">Occasional education, thoughtful observations, and simpler routines.</label><div><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required /><button type="submit" aria-label="Join Skyn Notes">Join <Arrow /></button></div><small>MailerLite connection coming soon. No clutter, no constant promotions.</small></form>}
      </section>

      <section className="final-cta"><p className="eyebrow gold">Start with clarity</p><h2>Still confused about<br />what your skyn needs?</h2><a className="button button-gold" href={links.virtual}>Book The Skyn Clarity Experience</a></section>

      <footer>
        <div className="footer-brand"><span className="monogram large">AS</span><h2>Aurora Skyn</h2><p>Going deeper than skin deep.</p></div>
        <div className="footer-links"><div><b>Explore</b><a href="#clarity">Virtual</a><a href="#in-spa">In Spa</a><a href="#about">About Jasmine</a><a href={links.shop}>Shop</a></div><div><b>Connect</b><a href={links.instagram}>Instagram</a><a href={links.email}>wellness@auroraskyn.com</a><a href={links.booking}>Book on Fresha</a></div></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Aurora Skyn</p><div><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="#">Disclaimer</a></div><p>Digital Experience by ONYX Creatrix</p></div>
      </footer>
    </main>
  );
}
