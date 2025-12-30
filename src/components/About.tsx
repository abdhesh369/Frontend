import { motion } from "framer-motion";
import { User, GraduationCap, MapPin, Mail, Briefcase, Code } from "lucide-react";
import profileImg from "../../Resources/images/Myphoto.jpg";
export default function About() {
  return (
    <section id="about" className="section-container scroll-mt-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "5rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1.5 bg-primary mx-auto rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Hi, I'm a Student Engineer
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm passionate about building innovative solutions and continuously learning new technologies.
                With a strong foundation in electronics and communication engineering, I'm expanding my expertise
                in software development and system design.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in honest representation of my skills and a growth mindset that drives me to improve
                every day. Through disciplined practice and real-world projects, I'm building a solid portfolio
                that showcases my capabilities and potential.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
              >
                <GraduationCap className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Education</p>
                <p className="font-semibold">Student</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
              >
                <Code className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Focus</p>
                <p className="font-semibold">Full Stack</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:scale-105"
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}