import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Map,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Clock,
  FileText,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui";

export default function Landing() {
  return (
    <div className="min-h-screen bg-appbg">
      <header className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-primary text-lg">
            <span className="text-2xl">🌾</span> Fasal Raksha
          </div>
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <ShieldCheck className="h-4 w-4" />
          Crop damage reporting + compensation tracker
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Report crop damage.
          <br />
          Get compensated faster.
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
          Fasal Raksha connects farmers and agriculture officers in real
          time. Report damage from flood, rain, animal attacks, or pests in
          under 2 minutes — and track your compensation from filing to
          payment.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/register">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Report Damage
            </Button>
          </Link>
          <Link to="/library">
            <Button size="lg" variant="outline">
              Browse Deterrents
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need, in one place
        </h2>
        <p className="text-center text-muted mb-12 max-w-xl mx-auto">
          No more running between offices. One platform for reporting,
          response, tracking, and compensation.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: AlertTriangle,
              title: "Instant Reporting",
              desc: "Report flood, rain, animal, or pest damage with photos and GPS in under 2 minutes.",
            },
            {
              icon: Map,
              title: "Incident Map",
              desc: "See crop damage incidents reported by farmers across your district.",
            },
            {
              icon: DollarSign,
              title: "Compensation Tracker",
              desc: "Track your claim from submission to bank payment — every step transparent.",
            },
            {
              icon: Clock,
              title: "SLA Timer",
              desc: "Every incident has a response deadline. Officers must respond, or it auto-escalates.",
            },
            {
              icon: FileText,
              title: "Document Upload",
              desc: "Upload land records, Aadhaar, and bank details once. Reuse for every claim.",
            },
            {
              icon: Languages,
              title: "Multi-Language + Voice",
              desc: "Available in English, Hindi, and Kannada — with voice input for low-literacy users.",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-surface rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for everyone in the ecosystem
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              role: "Farmers",
              emoji: "👨‍🌾",
              points: [
                "Report damage in 2 minutes",
                "Track compensation",
                "Get SMS + app updates",
              ],
            },
            {
              role: "Agriculture Officers",
              emoji: "👨‍💼",
              points: [
                "See all incidents",
                "Verify damage with field visit",
                "Approve / reject claims",
              ],
            },
            {
              role: "Forest Officers",
              emoji: "🌳",
              points: [
                "Get notified for animal damage",
                "View wildlife incident details",
                "Coordinate with Agri team",
              ],
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-surface rounded-lg border border-border p-6 text-center"
            >
              <div className="text-5xl mb-4">{r.emoji}</div>
              <h3 className="font-semibold text-xl mb-4">{r.role}</h3>
              <ul className="space-y-2 text-sm text-muted">
                {r.points.map((p, j) => (
                  <li key={j}>✓ {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-primary text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">Ready to protect your farm?</h2>
          <p className="text-white/90 mb-8">
            Join farmers and officers already using Fasal Raksha.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted">
          © 2026 Fasal Raksha. A farmer-first platform.
        </div>
      </footer>
    </div>
  );
}