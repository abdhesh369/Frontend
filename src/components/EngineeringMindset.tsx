import { motion } from "framer-motion";
import { Brain, Layers, Zap, Users, Code2 } from "lucide-react";

const principles = [
  {
    title: "Fundamentals over Frameworks",
    description: "Prioritizing strong core understanding of languages and systems before adopting high-level abstractions.",
    icon: Code2,
  },
  {
    title: "Simplicity over Complexity",
    description: "Designing straightforward solutions that solve the problem efficiently without over-engineering.",
    icon: Layers,
  },
  {
    title: "Logic before Optimization",
    description: "Focusing on correctness and clear business logic before premature performance tuning.",
    icon: Zap,
  },
  {
    title: "Readable Code",
    description: "Writing maintainable, well-documented code that is intuitive for other engineers to understand and extend.",
    icon: Users,
  },
];

export default function EngineeringMindset() {
  return (
    <section id="mindset" className="section-container bg-muted/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineering Mindset</h2>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-primary/10 rounded-xl text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <principle.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-background rounded-2xl border border-border text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <Brain className="w-10 h-10 text-primary opacity-20" />
          </div>
          <p className="text-lg italic text-muted-foreground">
            "Engineering is not just about solving problems, it's about solving them in a way that is robust, scalable, and maintainable for years to come."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
