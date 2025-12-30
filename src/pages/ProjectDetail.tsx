import { useRoute, Link } from "wouter";
import { useProjects } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Code2, Lightbulb, Settings, AlertCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const { data: projects, isLoading } = useProjects();
  
  const project = projects?.find(p => p.id === parseInt(params?.id || "0"));

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl space-y-8 animate-pulse">
          <div className="h-12 bg-muted rounded-lg w-1/3" />
          <div className="h-64 bg-muted rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-6">
            <Link href="/">
              <Button variant="ghost" className="mb-4 -ml-4 hover:bg-transparent hover:text-primary p-0">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {project.category}
                </Badge>
              </div>
              
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" /> Source Code
                    </Button>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-video relative rounded-3xl overflow-hidden border border-border shadow-2xl">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="grid gap-12">
            {/* Overview & Tech */}
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Motivation
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.motivation || project.description}
                  </p>
                </section>
              </div>
              
              <aside className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-primary/5 border-primary/20 text-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </aside>
            </div>

            {/* Problem Statement */}
            <section className="bg-muted/30 p-8 rounded-3xl border border-border/50">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
                The Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.problemStatement || "Not specified."}
              </p>
            </section>

            {/* System Design */}
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Settings className="h-6 w-6 text-primary" />
                System Design
              </h2>
              <Card className="border-border/50 shadow-sm overflow-hidden rounded-2xl">
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.systemDesign || "Design details coming soon."}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Challenges & Learning */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border/50 shadow-sm rounded-2xl">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Key Challenges
                  </h3>
                  <p className="text-muted-foreground">
                    {project.challenges || "No challenges documented."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 shadow-sm rounded-2xl bg-primary/5">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Key Learnings
                  </h3>
                  <p className="text-muted-foreground">
                    {project.learnings || "Continuing to learn and iterate."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
