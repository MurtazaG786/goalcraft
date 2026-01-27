import { Sparkles } from "lucide-react";

interface DailyProgressProps {
  completedTasks: number;
  totalTasks: number;
  earnedXP: number;
}

const DailyProgress = ({ completedTasks, totalTasks, earnedXP }: DailyProgressProps) => {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isComplete = completedTasks === totalTasks && totalTasks > 0;

  return (
    <div className="card-gaming rounded-2xl p-6 border border-border/50 relative overflow-hidden">
      {/* Background Glow */}
      {isComplete && (
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent animate-pulse-soft" />
      )}

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Today's Quest</h2>
          </div>
          {isComplete && (
            <span className="px-3 py-1 rounded-full bg-success/20 text-success text-sm font-medium animate-bounce-soft">
              Complete! 🎉
            </span>
          )}
        </div>

        {/* Circular Progress */}
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.64} 264`}
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                  <stop offset="100%" stopColor="hsl(280, 87%, 65%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold text-foreground">
                {completedTasks}
              </span>
              <span className="text-sm text-muted-foreground">/ {totalTasks}</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tasks Completed</span>
              <span className="font-display font-semibold text-foreground">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">XP Earned Today</span>
              <span className="font-display font-semibold text-gradient-xp">
                +{earnedXP} XP
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-purple-500 glow-level rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;
