import { Flame, Star, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserStatsProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  streak: number;
  username: string;
}

const UserStats = ({ level, currentXP, xpToNextLevel, streak, username }: UserStatsProps) => {
  const xpProgress = (currentXP / xpToNextLevel) * 100;

  return (
    <div className="card-gaming rounded-2xl p-6 border border-border/50">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Avatar & Username */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-2xl font-display font-bold glow-level">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full glow-xp">
              Lv.{level}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {username}
            </h2>
            <p className="text-sm text-muted-foreground">Quest Master</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Level</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-display font-bold text-gradient-level">{level}</span>
            </div>
            <Progress value={xpProgress} variant="level" className="h-2" />
          </div>

          {/* XP */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">XP</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-gradient-xp">{currentXP}</span>
              <span className="text-sm text-muted-foreground">/ {xpToNextLevel}</span>
            </div>
            <Progress value={xpProgress} variant="xp" className="h-2" />
          </div>

          {/* Streak */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-warning">{streak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-2 rounded-full ${
                    i < streak % 7 ? "bg-warning" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
