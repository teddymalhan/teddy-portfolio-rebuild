export function About() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">👨‍💻 About Me</h2>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  🎓 I'm a Computer Science student at Simon Fraser University with a passion for building scalable,
                  high-performance software systems. 💻 My experience spans from optimizing database queries to
                  deploying microservices at scale.
                </p>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  🏢 During my internships at Electronic Arts and Dialpad, I've worked on systems handling millions of
                  records and hundreds of thousands of requests per second, always focusing on performance, reliability,
                  and user experience. ⚡
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  🌟 When I'm not coding, you can find me exploring new technologies, contributing to open source
                  projects, or working on personal projects that solve real-world problems. 🚀
                </p>
              </div>
            </div>

            {/* Sidebar content */}
            <div className="space-y-6">
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>🎯 Current Focus
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full mt-2 flex-shrink-0"></div>🌐 Full-stack
                    development with modern frameworks
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full mt-2 flex-shrink-0"></div>
                    🏗️ Microservices architecture and scalability
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full mt-2 flex-shrink-0"></div>🤖 AI/ML integration
                    in software systems
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full mt-2 flex-shrink-0"></div>
                    ☁️ Cloud infrastructure and DevOps practices
                  </li>
                </ul>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>🎓 Education
                </h3>
                <div className="text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">🏫 Simon Fraser University</p>
                  <p>📚 Bachelor of Science in Computer Science</p>
                  <p className="text-sm">
                    <span className="text-accent font-medium">📊 GPA: 3.81</span> • 🗓️ Expected May 2027
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
