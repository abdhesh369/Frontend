import { motion } from "framer-motion";
import { useExperiences } from "@/hooks/use-portfolio";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";

export default function Experience() {
  const { data: experiences, isLoading } = useExperiences();

  // Split into education and work
  const education = (experiences as any[])?.filter(e => e.type === "Education") || [];
  const work = (experiences as any[])?.filter(e => e.type === "Experience") || [];

  return (
    <section id="experience" className="section-container bg-muted/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Journey</h2>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Education Column */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          <div className="space-y-8 relative pl-8 border-l-2 border-border/60">
            {/* Fallback Static Data if API empty or loading */}
            {isLoading || education.length === 0 ? (
              <TimelineItem 
                role="B.E. in Electronics & Communication"
                org="Tribhuvan University"
                period="Expected Graduation: 2028"
                desc="Focusing on Embedded Systems, Signal Processing, and Software Engineering principles."
                delay={0}
              />
            ) : (
              education.map((edu, idx) => (
                <TimelineItem 
                  key={edu.id}
                  role={edu.role}
                  org={edu.organization}
                  period={edu.period}
                  desc={edu.description}
                  delay={idx * 0.1}
                />
              ))
            )}
          </div>
        </div>

        {/* Experience Column */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Experience</h3>
          </div>

          <div className="space-y-8 relative pl-8 border-l-2 border-border/60">
            {isLoading ? (
               <div className="animate-pulse space-y-8">
                 {[1, 2].map(i => <div key={i} className="h-32 bg-card rounded-xl" />)}
               </div>
            ) : work.length === 0 ? (
              <p className="text-muted-foreground italic">Open to opportunities and internships.</p>
            ) : (
              work.map((exp, idx) => (
                <TimelineItem 
                  key={exp.id}
                  role={exp.role}
                  org={exp.organization}
                  period={exp.period}
                  desc={exp.description}
                  delay={idx * 0.1}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ role, org, period, desc, delay }: { role: string, org: string, period: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative"
    >
      <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
      
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
        <h4 className="text-lg font-bold text-foreground">{role}</h4>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3">
          <span className="text-primary font-medium">{org}</span>
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Calendar className="w-3 h-3" />
            {period}
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
