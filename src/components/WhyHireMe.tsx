import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";


const points = [
  {
    title: "Strong Fundamentals",
    description: "Solid foundation in electronics, communication engineering, and core computer science principles.",
    icon: Award,
  },
  {
    title: "Honest Representation",
    description: "Clear and truthful showcase of my current technical abilities and project experiences.",
    icon: ShieldCheck,
  },
  {
    title: "Growth Mindset",
    description: "High willingness to learn new technologies and adapt to evolving engineering challenges.",
    icon: Zap,
  },
  {
    title: "Disciplined Practice",
    description: "Consistent daily practice in coding and system design to maintain high-quality output.",
    icon: CheckCircle2,
  },
];

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Hire Me as a Student Engineer</h2>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                  <point.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-primary/5 p-12 rounded-3xl border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to contribute to your team</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            As a student, I bring fresh perspectives, high energy, and a commitment to professional growth. Let's discuss how I can help your organization succeed.
          </p>
          <Button
            size="lg"
            className="h-12 px-8 gap-2 rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
            onClick={() => {
              // Create a temporary link and trigger download
              const link = document.createElement("a");
              link.href = "/xyz.png"; // path from public
              link.download = "xyz.png"; // filename for download
              link.click();
            }}
          >
            <Download className="w-5 h-5" />
            Download My Resume
          </Button>



        </motion.div>
      </div>
    </section>
  );
}
