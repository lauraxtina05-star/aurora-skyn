'use client';

import { useEffect, useRef } from 'react';

export type BookingLinks = {
  virtual: string;
  inSpa: string;
  redEye: string;
  teethWhitening: string;
  discoveryCall: string;
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  links: BookingLinks;
};

export default function BookingModal({ open, onClose, links }: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync React state -> native <dialog>. showModal() gives us the focus trap,
  // Escape handling, the top-layer + backdrop, and focus return for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock background scroll only while open; always restore on close/unmount.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Native close (Escape / dialog.close()) and outside-the-panel clicks.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClose() {
      onClose();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    }
    function handleClick(event: MouseEvent) {
      if (!dialog || event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) onClose();
    }

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('keydown', handleKeyDown);
    dialog.addEventListener('click', handleClick);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('keydown', handleKeyDown);
      dialog.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  const options = [
    {
      label: 'Virtual',
      title: 'Virtual Skyn Experience',
      meta: '60 min · $125',
      href: links.virtual,
      cta: 'Book Virtual',
      variant: '',
    },
    {
      label: 'In person',
      title: 'In-Spa Experiences',
      meta: 'Explore available facials and appointments.',
      href: links.inSpa,
      cta: 'Explore In-Spa',
      variant: '',
    },
    {
      label: 'Specialty',
      title: 'Red-Eye Recovery Facial',
      meta: 'A smaller featured treatment for flight attendants, frequent flyers, and travel-stressed skyn.',
      href: links.redEye,
      cta: 'Book Red-Eye Recovery',
      variant: 'booking-row--specialty',
    },
    {
      label: 'Add-on',
      title: 'Take-Home Teeth Whitening',
      meta: 'A simple at-home extra alongside your skyn care.',
      href: links.teethWhitening,
      cta: 'Explore Teeth Whitening',
      variant: 'booking-row--secondary',
    },
  ];

  return (
    <dialog ref={dialogRef} className="booking-modal" aria-labelledby="booking-modal-title" aria-describedby="booking-modal-desc">
      <button type="button" className="booking-close" onClick={onClose} aria-label="Close booking options">
        <span aria-hidden="true">×</span>
      </button>

      <div className="booking-head">
        <p className="eyebrow gold">Book with Aurora Skyn</p>
        <h2 id="booking-modal-title">How would you like to work with me?</h2>
        <p id="booking-modal-desc">
          Choose the experience that feels closest to what you need right now. If you’re still unsure, we can figure it out
          together.
        </p>
      </div>

      <ul className="booking-list">
        {options.map((option) => (
          <li key={option.title} className={`booking-row ${option.variant}`.trim()}>
            <div className="booking-row-text">
              <span className="booking-row-label">{option.label}</span>
              <h3>{option.title}</h3>
              <p>{option.meta}</p>
            </div>
            <a className="booking-row-cta" href={option.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
              {option.cta} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="booking-discovery">
        <p className="eyebrow navy">Not sure where to start?</p>
        <p className="booking-discovery-lede">Book a complimentary 15-minute Discovery Call.</p>
        <p className="booking-discovery-note">
          Tell me a little about what you’re looking for and I’ll help you decide which Aurora Skyn experience makes the
          most sense. Depending on what you need, we can also talk about combining virtual and in-person support.
        </p>
        <a
          className="booking-row-cta"
          href={links.discoveryCall}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Book a Discovery Call <span aria-hidden="true">↗</span>
        </a>
      </div>

      <p className="booking-secure">Booking is completed securely through Fresha. Aurora Skyn will remain open while you book.</p>
    </dialog>
  );
}
