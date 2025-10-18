"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { addToWaitlist } from "./actions/waitlist"

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} />
  </svg>
)

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const sections = document.querySelectorAll(".fade-in-section")
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    const result = await addToWaitlist(email)

    if (result.success) {
      setSubmitMessage({ type: "success", text: "🎉 Success! We'll be in touch soon to book your demo." })
      setEmail("")
    } else {
      setSubmitMessage({ type: "error", text: result.error || "Something went wrong. Please try again." })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-50/30">
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-blue-400/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[800px] h-[800px] bg-blue-500/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 w-[900px] h-[900px] bg-blue-300/8 rounded-full blur-[150px]" />
      </div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <nav className="flex items-center justify-between px-8 py-4 rounded-full bg-white/90 backdrop-blur-xl border border-blue-100/80 shadow-sm shadow-blue-100/50">
          <div className="flex items-center gap-2">
            <img src="/blynn-logo.png?v=3" alt="Blynn" className="size-8" />
            <span className="font-semibold text-lg">Blynn</span>
          </div>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book Demo
          </Button>
        </nav>
      </header>

      <section
        ref={heroRef}
        className="container mx-auto px-6 min-h-[110vh] flex items-center justify-center relative pt-24"
      >
        <div className="w-full max-w-[1400px] mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 text-accent text-lg border border-accent/20">
            <ArrowRight className="size-5" />
            <span>Autonomous AI Sales Engine</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-balance leading-[1.05]">
            Your Sales Team, <br />
            On Autopilot
          </h1>

          <p className="text-3xl md:text-4xl text-muted-foreground max-w-5xl mx-auto text-balance leading-relaxed">
            so prospects find you, trust you, and book meetings before your competitors even get a reply.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <Button
              size="lg"
              className="text-lg px-10 py-4 h-auto group rounded-full"
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Demo
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32 fade-in-section opacity-0 transition-all duration-1000">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="space-y-8 text-2xl text-muted-foreground leading-relaxed">
            <p>
              Imagine being a founder. You wake up, check your inbox… and it's empty. No meetings, no responses, no
              momentum. The whole day feels like chasing ghosts.
            </p>

            <p>
              Now imagine the opposite. You log in and see your calendar filling with meetings automatically. Prospects
              are talking to you without you chasing them. Your pipeline is alive, flowing, growing — and for the first
              time, you feel in control.
            </p>

            <p>
              That's what we built. A system that creates attention, sparks conversations, and turns every lead into an
              opportunity. You don't have to chase. You don't have to beg. You just show up and sell.
            </p>

            <p>
              For sales reps, it's the same magic: no more endless follow-ups, no more cold outreach that goes nowhere.
              They can focus on the conversations that matter, close deals faster, and actually enjoy selling again.
            </p>

            <p>
              It feels effortless, powerful, and exhilarating — like having an entire sales team working flawlessly in
              the background, freeing you to focus on what matters: building your company, hitting your goals, and
              winning.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32 fade-in-section opacity-0 transition-all duration-1000">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="text-center space-y-8">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight">How do we do this?</h2>
            <p className="text-3xl text-muted-foreground">
              Three autonomous stages that work together to fill your pipeline 24/7
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-[1200px] mx-auto">
            {[
              { icon: Target, title: "Attract", subtitle: "LinkedIn Content" },
              { icon: MessageSquare, title: "Qualify", subtitle: "AI Conversations" },
              { icon: Users, title: "Outbound", subtitle: "Find & Engage" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 px-10 py-7 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 w-full md:w-auto"
              >
                <div className="size-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="size-7 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xl">{item.title}</div>
                  <div className="text-base text-muted-foreground">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container mx-auto px-6 py-32 fade-in-section opacity-0 transition-all duration-1000"
      >
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 text-accent text-lg border border-accent/20">
              <span>Stage 1</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
              Get the Right People Talking to You
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              AI creates posts and content on LinkedIn that draws your ideal prospects to your website. Focus on
              effortless awareness: no more guessing who to reach, no wasted time.
            </p>
            <div className="space-y-5 pt-6">
              {[
                "AI-generated content tailored to your audience",
                "Automatic posting schedule optimization",
                "Track engagement and prospect interest",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <ArrowRight className="size-6 text-accent" />
                  </div>
                  <span className="text-xl text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-12 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-8">
              <div className="flex items-center gap-5 pb-8 border-b border-border/50">
                <img
                  src="/blynn-logo.png?v=3"
                  alt="Blynn"
                  className="size-16 rounded-full p-3 bg-white border border-border/30"
                />
                <div>
                  <div className="font-medium text-xl">Blynn</div>
                  <div className="text-base text-muted-foreground">Posted 2 hours ago</div>
                </div>
              </div>
              <p className="text-lg leading-relaxed">
                The future of sales isn't about working harder—it's about working smarter. Our AI-powered approach has
                helped companies 3x their pipeline in 90 days.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32 fade-in-section opacity-0 transition-all duration-1000">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Card className="p-12 bg-card/50 backdrop-blur-sm border-border/50 order-2 md:order-1">
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-8 border-b border-border/50">
                <div className="size-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 shrink-0" />
                <div>
                  <div className="font-medium text-xl">AI Sales Assistant</div>
                  <div className="text-base text-muted-foreground">Posted 2 hours ago</div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="size-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 shrink-0" />
                  <div className="bg-muted/80 rounded-lg p-5 text-lg">
                    Hi! I noticed you're interested in scaling your sales. What's your biggest challenge right now?
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <div className="bg-accent text-accent-foreground rounded-lg p-5 text-lg">
                    We're struggling to keep up with lead qualification
                  </div>
                  <div className="size-12 rounded-full bg-gradient-to-br from-primary to-primary/50 shrink-0" />
                </div>
                <div className="flex gap-5">
                  <div className="size-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 shrink-0" />
                  <div className="bg-muted/80 rounded-lg p-5 text-lg">
                    Perfect! Let me book time with our team to show you how we can help.
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="space-y-10 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 text-accent text-lg border border-accent/20">
              <span>Stage 2</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
              Conversations That Turn Into Meetings
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              After seeing your content, prospects visit your website already interested. AI greets them, has natural
              conversations, and books meetings with qualified leads instantly—all while you sleep.
            </p>
            <div className="space-y-5 pt-6">
              {[
                "Prospects arrive pre-warmed from your content",
                "AI conversations build trust and qualify instantly",
                "Automatic meeting scheduling with hot leads",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <ArrowRight className="size-6 text-accent" />
                  </div>
                  <span className="text-xl text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32 fade-in-section opacity-0 transition-all duration-1000">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 text-accent text-lg border border-accent/20">
              <span>Stage 3</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
              Find Anyone, Talk Until They're Ready
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              AI discovers prospects anywhere—LinkedIn, company databases, public sources. Engages them automatically,
              building interest and scheduling meetings without a human touch.
            </p>
            <div className="space-y-5 pt-6">
              {[
                "Intelligent prospect discovery across multiple sources",
                "Personalized outreach at scale",
                "Continuous engagement until they're ready to buy",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <ArrowRight className="size-6 text-accent" />
                  </div>
                  <span className="text-xl text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-12 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="space-y-10">
              <div className="flex items-center justify-between pb-8 border-b border-border/50">
                <span className="font-medium text-xl">Prospect Network</span>
                <span className="text-base text-accent flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent animate-pulse" />
                  Live Activity
                </span>
              </div>
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="size-24 rounded-full bg-accent/20 animate-pulse"
                    style={{ animationDuration: "2s" }}
                  />
                  <div
                    className="absolute size-28 rounded-full border-2 border-accent/20 animate-ping"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute size-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 hover:scale-125 transition-transform duration-300 cursor-pointer"
                    style={{
                      top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
                      left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      transform: "translate(-50%, -50%)",
                      animation: `pulse 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <div className="space-y-4 pt-8">
                {[
                  { label: "Active Conversations", value: "47", highlight: false },
                  { label: "Meetings Scheduled", value: "12 today", highlight: true },
                  { label: "New Prospects Found", value: "234", highlight: false },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-lg group hover:bg-accent/5 p-4 rounded transition-colors"
                  >
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className={`font-medium ${stat.highlight ? "text-accent" : ""}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="waitlist"
        className="container mx-auto px-6 py-40 fade-in-section opacity-0 transition-all duration-1000"
      >
        <div className="max-w-[1000px] mx-auto text-center space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 text-accent text-lg border border-accent/20 font-medium">
              <TrendingUp className="size-5" />
              <span>Only 100 Spots Available</span>
            </div>
            <h2 className="text-7xl md:text-8xl font-bold tracking-tight text-balance">Book Demo</h2>
            <p className="text-4xl text-muted-foreground text-balance">
              Be the first to experience autonomous sales. Get early access and exclusive benefits.
            </p>
          </div>

          <Card className="p-12 bg-card/50 backdrop-blur-sm border-border/50">
            <form onSubmit={handleWaitlistSubmit} className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 rounded-full h-16 text-xl px-8"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-full px-10 h-16 text-xl whitespace-nowrap"
                >
                  {isSubmitting ? "Booking..." : "Book Demo"}
                </Button>
              </div>
              {submitMessage && (
                <div
                  className={`text-xl p-6 rounded-lg ${
                    submitMessage.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </form>
          </Card>

          <div className="grid grid-cols-3 gap-16 pt-16">
            {[
              { value: "3x", label: "Pipeline Growth" },
              { value: "2x", label: "Meeting Volume" },
              { value: "90%", label: "Time Saved" },
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <div className="text-7xl font-bold text-accent">{stat.value}</div>
                <div className="text-2xl text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative mt-32 bg-white/90 backdrop-blur-sm border-t border-blue-100/80">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 max-w-[1400px] mx-auto">
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <img src="/blynn-logo.png?v=3" alt="Blynn" className="size-8" />
                <span className="font-semibold text-lg">Blynn</span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                AI that finds the right prospects, engages them, and books meetings — 24/7, without lifting a finger.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Product</h3>
              <ul className="space-y-3">
                {["How It Works", "Features", "Pricing"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Company</h3>
              <ul className="space-y-3">
                {["About", "Contact", "Careers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Legal</h3>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Social</h3>
              <ul className="space-y-3">
                {["LinkedIn", "Twitter", "Instagram", "Facebook"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
