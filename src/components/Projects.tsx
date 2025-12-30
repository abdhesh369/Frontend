import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/use-portfolio";
import { Github, ExternalLink, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Link } from "wouter";

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "System", "Academic", "Backend", "Utility"];

  const filteredProjects = (Array.isArray(projects) ? projects : [])?.filter(p => {
    const isExcluded = p.title.toLowerCase().includes("netflix") || p.title.toLowerCase().includes("amazon");
    if (isExcluded) return false;

    if (filter === "All") return true;
    return p.category === filter;
  }) || [];

  return (
    <section id="projects" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-8" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A collection of projects demonstrating my journey through software engineering and system design.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-muted h-[400px] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Folder className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-background/90 text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-background/90 text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                    {project.techStack.slice(0, 4).map((tech: string, idx: number) => (
                      <span 
                        key={idx}
                        className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* GitHub Redirect Button */}
                  <div className="mt-6 flex gap-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted hover:border-primary/50 hover:text-primary transition-all group/btn"
                      >
                        <Github className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                        Code
                      </a>
                    )}
                    <Link href={`/project/${project.id}`} className="flex-1">
                      <Button className="w-full gap-2 rounded-xl text-sm font-semibold h-auto py-2.5">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-destructive mb-2">Failed to load projects.</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
        </div>
      )}

      {filteredProjects.length === 0 && !isLoading && !error && (
        <div className="text-center py-20 text-muted-foreground">
          <p>No projects found in this category.</p>
        </div>
      )}
    </section>
  );
}
