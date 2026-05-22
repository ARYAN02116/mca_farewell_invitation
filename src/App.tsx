import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";

const eventDetails = [
  { icon: "📅", label: "Date", value: "25/05/2026" },
  { icon: "⏰", label: "Time", value: "1:00 PM" },
  { icon: "📍", label: "Venue", value: "Auditorium, Block B, NIET, Plot 19" },
];

const invitationHighlights = ["Memories", "Friendship", "Celebration", "New Beginnings"];
const teacherHighlights = ["Respect", "Gratitude", "Celebration", "Blessings"];
const envelopeHighlights = ["Celebrate Memories", "Cherish Friendships", "Create New Beginnings"];

const categoryCards = [
  {
    icon: "🎓",
    title: "Seniors",
    href: "#senior-invitation",
    image: "D:\mca invitation_1\senoirs.jpeg",
    imageLabel: "",
    accent: "from-[#FFE8F0] via-[#EDE7FF] to-[#E6F4FF]",
  },
  {
    icon: "🌸",
    title: "Faculty",
    href: "#Faculty-invitation",
    image: "D:\mca invitation_1\faculty .jpeg",
    imageLabel: "",
    accent: "from-[#FFF0E5] via-[#FFE8F0] to-[#DCCBFF]",
  },
];

const floatingCaps = [
  { left: "8%", top: "18%", delay: "0s", size: "text-4xl md:text-5xl" },
  { left: "78%", top: "16%", delay: "1.4s", size: "text-3xl md:text-5xl" },
  { left: "18%", top: "68%", delay: "2.2s", size: "text-3xl md:text-4xl" },
  { left: "86%", top: "64%", delay: ".6s", size: "text-4xl md:text-6xl" },
];

const sparkles = [
  { left: "13%", top: "30%", delay: ".2s" },
  { left: "31%", top: "16%", delay: "1.1s" },
  { left: "61%", top: "21%", delay: ".6s" },
  { left: "72%", top: "48%", delay: "1.8s" },
  { left: "22%", top: "81%", delay: "1.4s" },
  { left: "52%", top: "78%", delay: ".9s" },
  { left: "91%", top: "36%", delay: "2.2s" },
  { left: "41%", top: "58%", delay: "2.7s" },
];

const confetti = [
  { left: "6%", delay: "0s", color: "#DCCBFF" },
  { left: "18%", delay: ".8s", color: "#F3D9A5" },
  { left: "32%", delay: "1.7s", color: "#FFE8F0" },
  { left: "48%", delay: ".35s", color: "#E6F4FF" },
  { left: "67%", delay: "1.2s", color: "#DCCBFF" },
  { left: "82%", delay: ".55s", color: "#F3D9A5" },
  { left: "94%", delay: "2s", color: "#FFE8F0" },
];

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 64, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedSection({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      className={`relative mx-auto w-full max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-36 ${className}`}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.section>
  );
}

function CanvaImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="canva-fallback flex min-h-[260px] w-full items-center justify-center rounded-[2rem] border border-white/75 bg-gradient-to-br from-[#FAFAFA] via-[#FFE8F0] to-[#E6F4FF] p-8 text-center shadow-[0_24px_70px_rgba(159,132,222,0.16)]">
        <div>
          <p className="font-serif text-3xl text-[#5d4d7a]">{label}</p>
          <p className="mt-3 text-sm leading-6 text-[#7c7194]">
            Place the uploaded Canva file at <span className="font-semibold text-[#6d5a92]">{src}</span> to display it here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full min-h-[260px] w-full rounded-[2rem] object-cover shadow-[0_24px_70px_rgba(159,132,222,0.18)] transition duration-700 group-hover:scale-[1.035]"
      onError={() => setFailed(true)}
    />
  );
}

function DetailPill({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/65 bg-white/45 px-5 py-4 shadow-[0_14px_36px_rgba(168,144,210,0.12)] backdrop-blur-xl">
      <p className="text-sm font-medium text-[#8b7aa7]">
        <span aria-hidden="true">{icon}</span> {label}
      </p>
      <p className="mt-1 text-base font-semibold text-[#514268]">{value}</p>
    </div>
  );
}

function JoinButton({ label = "Join Celebration" }: { label?: string }) {
  return (
    <motion.a
      href="#invitation-card"
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#DCCBFF] via-[#FFE8F0] to-[#F3D9A5] px-8 py-4 text-sm font-bold tracking-[0.18em] text-[#4d3c68] shadow-[0_18px_50px_rgba(220,203,255,0.7)]"
      whileHover={{ y: -4, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="button-shine" />
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

function EventDetailCard() {
  return (
    <AnimatedSection id="event-details" className="max-w-5xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#9b83c8]">Event Details</p>
      <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">
        A graceful afternoon planned with warmth, celebration, and beautiful memories.
      </h2>
      <motion.div
        className="premium-glass floating-panel mx-auto mt-14 max-w-3xl rounded-[2.5rem] p-6 text-left sm:p-9"
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {eventDetails.map((detail) => (
            <DetailPill key={detail.label} {...detail} />
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

function CategorySection() {
  return (
    <AnimatedSection id="categories">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#9b83c8]">Invitation Categories</p>
        <h2 className="mt-5 font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">
          Choose your farewell invitation.
        </h2>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {categoryCards.map((card) => (
          <motion.a
            key={card.title}
            href={card.href}
            className="group shine-card relative overflow-hidden rounded-[2.4rem] border border-white/75 bg-white/42 p-4 shadow-[0_26px_80px_rgba(172,149,222,0.20)] backdrop-blur-2xl"
            whileHover={{ y: -12, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 170, damping: 18 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-65`} />
            <div className="relative grid min-h-[360px] gap-5 overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 p-5 sm:grid-cols-[1fr_1.08fr] sm:p-6">
              <div className="flex flex-col justify-between py-2">
                <span className="text-5xl" aria-hidden="true">
                  {card.icon}
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.38em] text-[#8f79bd]">Open Card</p>
                  <h3 className="mt-3 font-serif text-4xl text-[#46375f] sm:text-5xl">{card.title}</h3>
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem]">
                <CanvaImage src={card.image} alt={`${card.title} Canva invitation`} label={card.imageLabel} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </AnimatedSection>
  );
}

function PersonalInvitation({
  id,
  image,
  label,
  icon,
  title,
  body,
  highlights,
  reverse = false,
}: {
  id: string;
  image: string;
  label: string;
  icon: string;
  title: string;
  body: ReactNode;
  highlights: string[];
  reverse?: boolean;
}) {
  return (
    <AnimatedSection id={id}>
      <div className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <motion.div
          className="group relative"
          whileHover={{ y: -10, rotate: reverse ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 130, damping: 16 }}
        >
          <div className="absolute -inset-5 rounded-[2.8rem] bg-gradient-to-br from-[#FFE8F0]/65 via-[#EDE7FF]/75 to-[#E6F4FF]/65 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/80 bg-white/55 p-4 shadow-[0_34px_100px_rgba(170,148,219,0.24)] backdrop-blur-2xl">
            <CanvaImage src={image} alt={label} label={label} />
          </div>
        </motion.div>

        <div className="premium-glass rounded-[2.7rem] p-7 sm:p-10 lg:p-12">
          <p className="text-5xl" aria-hidden="true">
            {icon}
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">{title}</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-[#66577f]">{body}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/70 bg-white/52 px-5 py-3 text-sm font-semibold text-[#6b5a87] shadow-[0_10px_30px_rgba(220,203,255,0.28)] backdrop-blur-xl"
              >
                ✨ {item}
              </span>
            ))}
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {eventDetails.map((detail) => (
              <DetailPill key={`${id}-${detail.label}`} {...detail} />
            ))}
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#9b83c8]">Invited By: MCA Department</p>
          <div className="mt-7">
            <JoinButton />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function InvitationEnvelope() {
  return (
    <AnimatedSection id="invitation-card" className="max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#9b83c8]">Premium Invitation</p>
        <h2 className="mt-5 font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">
          Open the farewell keepsake.
        </h2>
      </div>

      <div className="mt-16 flex justify-center">
        <motion.div
          className="envelope-scene w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="envelope group">
            <div className="envelope-back" />
            <div className="envelope-letter premium-glass">
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#9b83c8]">🎓 MCA Department Presents</p>
              <h3 className="mt-5 font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">
                Farewell Celebration - Batch 2024-2026
              </h3>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#66577f]">
                "Every ending marks a beautiful new beginning."
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {envelopeHighlights.map((item) => (
                  <span key={item} className="rounded-full bg-white/55 px-5 py-3 text-sm font-semibold text-[#6b5a87]">
                    ✨ {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
                {eventDetails.map((detail) => (
                  <DetailPill key={`envelope-${detail.label}`} {...detail} />
                ))}
              </div>
            </div>
            <div className="envelope-front" />
            <div className="envelope-flap" />
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function Guidelines() {
  const items = [
    "🪪 Please carry your College ID Card for entry.",
    "👔 Please wear decent and presentable attire.",
    "🎉 Let's make the celebration enjoyable, respectful, and memorable.",
  ];

  return (
    <AnimatedSection id="guidelines" className="max-w-5xl">
      <motion.div
        className="premium-glass floating-panel rounded-[2.8rem] p-7 text-center sm:p-12"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#9b83c8]">Important Guidelines</p>
        <h2 className="mt-5 font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">📌 Farewell Bash 2026</h2>
        <div className="mt-10 grid gap-5 text-left">
          {items.map((item) => (
            <motion.div
              key={item}
              className="rounded-[1.6rem] border border-white/70 bg-white/50 px-6 py-5 text-base font-medium leading-7 text-[#66577f] shadow-[0_16px_45px_rgba(168,144,210,0.13)] backdrop-blur-xl"
              whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.72)" }}
            >
              {item}
            </motion.div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-[#66577f]">
          "Thank you for your cooperation and enthusiasm. See you at the farewell!"
        </p>
      </motion.div>
    </AnimatedSection>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.35], [0, 140]);
  const slowFade = useTransform(scrollYProgress, [0, 0.25], [1, 0.2]);

  return (
    <section className="hero-stage relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-8">
      <motion.div className="absolute inset-0" style={{ y: parallaxY, opacity: slowFade }}>
        {floatingCaps.map((cap) => (
          <span
            key={`${cap.left}-${cap.top}`}
            className={`floating-cap pointer-events-none absolute ${cap.size}`}
            style={{ left: cap.left, top: cap.top, animationDelay: cap.delay }}
            aria-hidden="true"
          >
            🎓
          </span>
        ))}
        {sparkles.map((sparkle) => (
          <span
            key={`${sparkle.left}-${sparkle.top}`}
            className="sparkle pointer-events-none absolute"
            style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay }}
            aria-hidden="true"
          />
        ))}
      </motion.div>

      {confetti.map((piece) => (
        <span
          key={`${piece.left}-${piece.delay}`}
          className="confetti-piece pointer-events-none absolute"
          style={{ left: piece.left, animationDelay: piece.delay, background: piece.color }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        className="relative z-10 mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.05, ease: "easeOut" }}
      >
        <motion.p
          className="mx-auto inline-flex rounded-full border border-white/80 bg-white/48 px-6 py-3 text-sm font-bold uppercase tracking-[0.42em] text-[#8f79bd] shadow-[0_18px_60px_rgba(220,203,255,0.35)] backdrop-blur-2xl"
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.75, ease: "easeOut" }}
        >
          You're Invited
        </motion.p>
        <motion.h1
          className="mt-9 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#352946] sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.9, ease: "easeOut" }}
        >
          MCA Department Farewell 2024-2026
        </motion.h1>
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#66577f] sm:text-2xl sm:leading-10"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.85, ease: "easeOut" }}
        >
          Join us in celebrating memories, friendships, and new beginnings.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.86, duration: 0.75, ease: "easeOut" }}
        >
          <JoinButton label="View Invitation" />
          <motion.a
            href="#event-details"
            className="rounded-full border border-white/80 bg-white/45 px-8 py-4 text-sm font-bold tracking-[0.18em] text-[#6b5a87] shadow-[0_16px_45px_rgba(168,144,210,0.16)] backdrop-blur-xl"
            whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.7)" }}
            whileTap={{ scale: 0.98 }}
          >
            Event Details
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 py-24 text-center sm:px-8">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#DCCBFF] to-transparent" />
      <div className="mx-auto max-w-4xl">
        <p className="font-serif text-4xl leading-tight text-[#3f3354] sm:text-5xl">
          "Some journeys end, but memories last forever."
        </p>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-[#9b83c8]">Invited By: MCA Department</p>
        <p className="mt-5 text-base font-semibold text-[#6b5a87]">Website Created by Aryan Raj ❤️</p>
        <p className="typing-line mx-auto mt-7 max-w-max overflow-hidden whitespace-nowrap border-r-2 border-[#F3D9A5] text-sm font-medium tracking-[0.18em] text-[#8b7aa7]">
          Made with memories, gratitude and endless smiles.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 95, damping: 28, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 95, damping: 28, mass: 0.35 });
  const glowBackground = useMotionTemplate`radial-gradient(620px circle at ${smoothX}px ${smoothY}px, rgba(220, 203, 255, 0.42), rgba(255, 232, 240, 0.16) 32%, transparent 62%)`;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.16,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: true,
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAFA] text-[#443658]">
      <motion.div className="pointer-events-none fixed inset-0 z-30 hidden mix-blend-multiply md:block" style={{ background: glowBackground }} />
      <div className="soft-orb orb-one" />
      <div className="soft-orb orb-two" />
      <div className="soft-orb orb-three" />
      <div className="particle-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <Hero />
      <EventDetailCard />
      <CategorySection />
      <PersonalInvitation
        id="senior-invitation"
        
        icon="🎓"
        title="Dear Seniors"
        highlights={invitationHighlights}
        body={
          <>
            <p>"Memories, friendships, laughter, and unforgettable moments make every farewell special."</p>
            <p>
              You are warmly invited to join the MCA Farewell Celebration - Batch 2024-2026 and become a part of this
              memorable celebration.
            </p>
          </>
        }
      />
      <PersonalInvitation
        id="faculty"
      
        icon="🌸"
        title="Respected Faculty"
        highlights={teacherHighlights}
        reverse
        body={
          <p>
            With gratitude and respect, the MCA Department warmly invites you to grace this special farewell celebration
            with your valuable presence and blessings.
          </p>
        }
      />
      <InvitationEnvelope />
      <Guidelines />
      <Footer />
    </main>
  );
}
