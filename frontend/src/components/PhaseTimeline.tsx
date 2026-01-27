import { CheckCircle2, Circle, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  title: string;
  description: string;
  days: string;
  status: "completed" | "current" | "locked";
  tasksCompleted: number;
  totalTasks: number;
}

interface PhaseTimelineProps {
  phases: Phase[];
}

const PhaseTimeline = ({ phases }: PhaseTimelineProps) => {
  return (
    <div className="card-gaming rounded-2xl p-6 border border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="font-display text-xl font-semibold">Journey Phases</h2>
      </div>

      <div className="space-y-1">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            {/* Connector Line */}
            {index < phases.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-12 w-0.5 h-[calc(100%-1rem)]",
                  phase.status === "completed" ? "bg-success" : "bg-border"
                )}
              />
            )}

            <div
              className={cn(
                "relative flex gap-4 p-4 rounded-xl transition-all",
                phase.status === "current" && "bg-primary/10 border border-primary/30",
                phase.status === "locked" && "opacity-60"
              )}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0 z-10">
                {phase.status === "completed" ? (
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center glow-success">
                    <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                  </div>
                ) : phase.status === "current" ? (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center glow-level animate-pulse-soft">
                    <Circle className="w-5 h-5 text-primary-foreground" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Phase Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className={cn(
                      "font-display font-medium",
                      phase.status === "completed" && "text-success",
                      phase.status === "current" && "text-primary",
                      phase.status === "locked" && "text-muted-foreground"
                    )}
                  >
                    {phase.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {phase.days}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {phase.description}
                </p>
                {phase.status !== "locked" && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          phase.status === "completed"
                            ? "bg-success"
                            : "bg-primary"
                        )}
                        style={{
                          width: `${(phase.tasksCompleted / phase.totalTasks) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {phase.tasksCompleted}/{phase.totalTasks}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseTimeline;
