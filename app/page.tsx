import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, Users, BarChart3, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50 dark:to-purple-950/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Nexus
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground hover:bg-muted">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-sm font-medium">
              <Zap className="w-4 h-4" />
              The Modern Research Platform
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
                Scientific
              </span>{" "}
              Publishing
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Manage research teams, track publications, and unlock insights with our elegant platform designed for
              modern scientists and research institutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto">
                  Start Exploring <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-violet-600">500+</span>
                <span className="text-sm text-muted-foreground">Publications</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-violet-600">50+</span>
                <span className="text-sm text-muted-foreground">Researchers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-violet-600">15+</span>
                <span className="text-sm text-muted-foreground">Teams</span>
              </div>
            </div>
          </div>

          {/* Hero Gradient Illustration */}
          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-purple-100 to-transparent dark:from-violet-900/30 dark:via-purple-900/20 dark:to-transparent rounded-3xl" />
            <div className="absolute top-20 right-20 w-32 h-32 bg-violet-300 dark:bg-violet-700 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-300 dark:bg-purple-700 rounded-full blur-3xl opacity-20" />
            <div className="relative h-full flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl opacity-10 dark:opacity-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 border-t border-border">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage modern scientific research
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Publication Hub",
              description: "Organize and explore all your research publications in one elegant space",
            },
            {
              icon: Users,
              title: "Team Management",
              description: "Collaborate seamlessly with researchers and manage team hierarchies",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              description: "Visualize publication trends and researcher productivity metrics",
            },
            {
              icon: Zap,
              title: "Real-time Sync",
              description: "Instant updates across all devices with automatic synchronization",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card hover:bg-muted transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-700"
            >
              <feature.icon className="w-8 h-8 text-violet-600 dark:text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="relative rounded-3xl overflow-hidden border border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50 via-purple-50 to-white dark:from-violet-950/50 dark:via-purple-950/50 dark:to-background p-12 lg:p-20 text-center">
          <div className="relative z-10">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Research?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading institutions using Nexus to advance scientific collaboration and discovery.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-serif text-xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent mb-2">
                Nexus
              </div>
              <p className="text-sm text-muted-foreground">Elevating scientific research globally.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Security", "Pricing"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Resources", links: ["Docs", "Support", "Community"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2025 Nexus. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
