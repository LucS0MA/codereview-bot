import { ModeToggle } from "@/components/mode-toggle";
import { Code2, GitPullRequest, Zap, Shield, Users, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Link } from "react-router-dom";


function Landing() {
  const url = "http://localhost:4040/api/auth/github/callback";
  const githubLogin = `https://github.com/login/oauth/authorize?client_id=Ov23liezCvXqfEyczMly&redirect_uri=${encodeURIComponent(url)}&scope=user:email`;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to={"/"}>
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">CodeReviewX</span>
            </Link>
          </div>
          <ModeToggle />
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">AI-Powered Code Reviews</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Elevate Your Code Quality with{" "}
              <span className="gradient-text">AI-Powered Reviews</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automated pull request reviews that catch bugs, suggest improvements, and enforce best practices. Let AI be your tireless code reviewer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href={githubLogin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glow flex items-center gap-2"
              >
                <GitPullRequest className="w-5 h-5" />
                Connect with GitHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button className="px-8 py-4 glass glass-hover rounded-lg font-semibold text-lg flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                View Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass glass-hover rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get instant feedback on your pull requests. Our AI analyzes code in seconds, not hours.
              </p>
            </div>

            <div className="glass glass-hover rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">Security First</h3>
              <p className="text-muted-foreground">
                Detect vulnerabilities and security issues before they reach production.
              </p>
            </div>

            <div className="glass glass-hover rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Standardize code reviews across your team with consistent AI-driven insights.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Why Teams Love <span className="gradient-text">CodeReviewX</span>
            </h2>
            
            <div className="space-y-6">
              {[
                "Catch bugs and code smells before they reach production",
                "Enforce coding standards and best practices automatically",
                "Reduce review time by up to 60% with AI-powered insights",
                "Learn from AI suggestions to improve your coding skills",
                "Seamless GitHub integration - works with your existing workflow"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 glass glass-hover rounded-lg p-6">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="glass rounded-2xl p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-5" />
            <h2 className="text-4xl font-bold relative z-10">Ready to Transform Your Code Reviews?</h2>
            <p className="text-xl text-muted-foreground relative z-10">
              Join thousands of developers using AI to write better code.
            </p>
            <a
              href={githubLogin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glow relative z-10"
            >
              <GitPullRequest className="w-5 h-5" />
              Get Started Free
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 border-t border-border">
          <div className="text-center text-muted-foreground">
            <p>© 2026 CodeReviewX. Powered by AI, built for developers.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing;