import { useState } from "react";
import { Check, Clock, Zap, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  timeLimit: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  onComplete: (id: string) => void;
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
  },
  medium: {
    label: "Medium",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  hard: {
    label: "Hard",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
  },
};

const TaskCard = ({
  id,
  title,
  description,
  xpReward,
  timeLimit,
  difficulty,
  completed,
  onComplete,
}: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = difficultyConfig[difficulty];

  return (
    <div
      className={cn(
        "card-gaming rounded-xl p-4 border transition-all duration-300 cursor-pointer group",
        completed
          ? "border-success/50 opacity-75"
          : "border-border/50 hover:border-primary/50 hover:scale-[1.02]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !completed && onComplete(id)}
    >
      <div className="flex items-start gap-4">
        {/* Completion Circle */}
        <button
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1",
            completed
              ? "bg-success border-success glow-success"
              : "border-muted-foreground/50 hover:border-primary hover:bg-primary/10"
          )}
        >
          {completed && <Check className="w-4 h-4 text-success-foreground" />}
          {!completed && isHovered && (
            <Check className="w-4 h-4 text-primary animate-scale-in" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={cn(
                "font-display font-semibold text-lg truncate",
                completed ? "line-through text-muted-foreground" : "text-foreground"
              )}
            >
              {title}
            </h3>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                config.bg,
                config.color,
                config.border,
                "border"
              )}
            >
              {config.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">+{xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{timeLimit}</span>
            </div>
          </div>
        </div>

        {/* Completion Badge */}
        {completed && (
          <div className="flex-shrink-0">
            <Trophy className="w-6 h-6 text-accent animate-bounce-soft" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
