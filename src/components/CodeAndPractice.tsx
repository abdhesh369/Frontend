import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, ExternalLink, Activity, GitBranch, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

type GitHubEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits: { message: string }[];
  };
};

type ActivityItem = {
  task: string;
  time: string;
};

export default function CodeAndPractice() {
  const [events, setEvents] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/abdhesh369/events/public")
      .then(res => res.json())
      .then((data: GitHubEvent[]) => {
        if (!Array.isArray(data)) {
          console.error("GitHub API returned non-array data:", data);
          return;
        }
        const filtered = data
          .filter(e => e && e.type === "PushEvent")
          .flatMap(e => {
            const commits = e.payload?.commits;
            if (!Array.isArray(commits)) return [];
            return commits.map(c => ({
              task: c.message,
              time: new Date(e.created_at).toLocaleString(),
            }));
          })
          .slice(0, 3);
        setEvents(filtered);
      })
      .catch(err => console.error("GitHub fetch failed:", err));
  }, []);

  return (
    <section id="code-practice" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Code & Practice</h2>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary" />
              Continuous Learning
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond my featured projects, I maintain a consistent habit of experimentation and practice. My GitHub profile serves as a digital laboratory where I explore new patterns, test frameworks, and refine my engineering skills.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-primary/10 rounded-full text-primary">
                  <GitBranch className="w-4 h-4" />
                </div>
                <p className="text-muted-foreground">Daily commits to open-source and personal repositories.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-primary/10 rounded-full text-primary">
                  <Activity className="w-4 h-4" />
                </div>
                <p className="text-muted-foreground">Experiments with microservices, CLI tools, and system optimization.</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://github.com/abdhesh369/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2 rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20">
                  <Github className="w-5 h-5" />
                  Visit GitHub Profile
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-2" />
            <div className="relative bg-card p-8 rounded-3xl border border-border shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">Recent Activity</div>
                    <div className="text-xs text-muted-foreground">Updated daily</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">
                  Live Feed
                </div>
              </div>

              <div className="space-y-6">
                {
                  events.length > 0 ? events.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.task}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.time}</div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-sm text-muted-foreground">No recent activity found.</div>
                  )
                }
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex gap-2">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="flex-1 h-8 rounded-sm bg-primary/20 animate-pulse" style={{ opacity: Math.random() * 0.5 + 0.2 }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
                  <span>LESS</span>
                  <span>CONTRIBUTION GRAPH</span>
                  <span>MORE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}