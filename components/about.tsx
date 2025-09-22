import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function About() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center"> 👨‍💻 About Me</h2>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 bg-opacity-50  bg-white rounded-xl border-2 border-gray-300 shadow-lg p-8 md:p-12">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-6 text-lg text-foreground leading-relaxed">
                    <p>
                      I'm a Computer Science student at Simon Fraser University 🎓 with a passion for building scalable, high-performance software systems 🚀. My experience spans from optimizing database queries 🗃️ to deploying microservices at scale ⚡.
                    </p>

                    <p>
                      During my internships at Electronic Arts 🎮 and Dialpad ☎️, I've worked on systems handling millions of records and hundreds of thousands of requests per second 📊, always focusing on performance, reliability, and user experience 💯.
                    </p>

                    <p>
                      When I'm not coding 💻, you can find me exploring new technologies 🔍, contributing to open source projects 🌟, or working on personal projects that solve real-world problems 🛠️.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar content */}
            <div className="space-y-6">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Simon Fraser University</h4>
                    <p className="text-muted-foreground">Bachelor of Science in Computer Science</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="secondary" className="bg-accent/20 text-accent">
                        GPA: 3.81
                      </Badge>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="text-muted-foreground">Expected May 2027</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
