import { Check, Lock, Target, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  title: string;
  xpReward: number;
  requiredTasks: number;
  completedTasks: number;
  unlocked: boolean;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const MilestoneTracker = ({ milestones }: MilestoneTrackerProps) => {
  return (
    <div className="card-gaming rounded-2xl p-6 border border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-milestone/20">
          <Target className="w-5 h-5 text-milestone" />
        </div>
        <h2 className="font-display text-xl font-semibold">Milestones</h2>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const progress = (milestone.completedTasks / milestone.requiredTasks) * 100;
            const isComplete = milestone.completedTasks >= milestone.requiredTasks;

            return (
              <div
                key={milestone.id}
                className={cn(
                  "relative pl-10 py-3 transition-all duration-300",
                  index < milestones.length - 1 && "pb-6"
                )}
              >
                {/* Checkpoint Node */}
                <div
                  className={cn(
                    "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                    isComplete
                      ? "bg-success glow-success"
                      : milestone.unlocked
                      ? "bg-muted border-2 border-primary"
                      : "bg-muted border-2 border-muted-foreground/30"
                  )}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4 text-success-foreground" />
                  ) : milestone.unlocked ? (
                    <span className="text-xs font-bold text-primary">
                      {milestone.completedTasks}
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>

                {/* Milestone Content */}
                <div
                  className={cn(
                    "rounded-xl p-4 border transition-all duration-300",
                    isComplete
                      ? "bg-success/5 border-success/30"
                      : milestone.unlocked
                      ? "bg-card border-border/50 hover:border-primary/50"
                      : "bg-muted/50 border-border/30 opacity-60"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-display font-medium mb-1",
                          isComplete
                            ? "text-success"
                            : milestone.unlocked
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.completedTasks}/{milestone.requiredTasks} tasks completed
                      </p>

                      {/* Progress Bar */}
                      {milestone.unlocked && !isComplete && (
                        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Reward Badge */}
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                        isComplete
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Gift className="w-4 h-4" />
                      <span>+{milestone.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
