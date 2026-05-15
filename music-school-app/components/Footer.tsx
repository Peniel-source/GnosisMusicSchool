import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe, MessageCircle, Share2 } from "lucide-react";

const programs = [
  { label: "Kids Programs", href: "/#programs" },
  { label: "Teen Programs", href: "/#programs" },
  { label: "Adult Lessons", href: "/#programs" },
  { label: "Private Lessons", href: "/#programs" },
  { label: "Group Workshops", href: "/#programs" },
  { label: "After-School", href: "/#programs" },
];

const instruments = [
  { label: "Piano", href: "/#instruments" },
  { label: "Guitar", href: "/#instruments" },
  { label: "Vocals", href: "/#instruments" },
  { label: "Drums", href: "/#instruments" },
  { label: "Bass Guitar", href: "/#instruments" },
  { label: "Trumpet / Brass", href: "/#instruments" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Instructors", href: "/about#instructors" },
  { label: "Pricing", href: "/pricing" },
  { label: "Events", href: "/#events" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/favicon.ico"
                  alt="Gnosis Music School"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-bold text-base text-foreground leading-tight">GNOSIS</p>
                <p className="text-[9px] tracking-widest text-primary uppercase">Fundamental Music Academy</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Cultivating musical excellence and joyful expression for every student, at every age and stage of life.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Programs</h4>
            <ul className="space-y-2">
              {programs.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Instruments */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Instruments</h4>
            <ul className="space-y-2">
              {instruments.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href="mailto:hello@gnosismusic.com" className="hover:text-primary transition-colors">hello@gnosismusic.com</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>123 Music Lane, Suite 200<br />Harmony City, CA 90210</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">Studio Hours</p>
              <p className="text-sm text-muted-foreground">Mon–Fri: 9am – 8pm</p>
              <p className="text-sm text-muted-foreground">Sat–Sun: 10am – 6pm</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gnosis Fundamental Music Academy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
