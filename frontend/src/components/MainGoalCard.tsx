import { Target, Calendar, Clock, Zap, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  title: string;
  description: string;
  totalDays: number;
  currentDay: number;
  startDate: Date;
  endDate: Date;
  currentPhase: string;
  totalPhases: number;
  currentPhaseNumber: number;
}

interface MainGoalCardProps {
  goal: Goal;
  totalXP: number;
}

const MainGoalCard = ({ goal, totalXP }: MainGoalCardProps) => {
  const daysRemaining = goal.totalDays - goal.currentDay;
  const progressPercent = (goal.currentDay / goal.totalDays) * 100;
  const phaseProgress = (goal.currentPhaseNumber / goal.totalPhases) * 100;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="card-gaming rounded-2xl border border-border/50 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 p-6 border-b border-border/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Active Quest</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              {goal.title}
            </h1>
            <p className="text-muted-foreground">{goal.description}</p>
          </div>
          
          {/* Days Counter */}
          <div className="flex-shrink-0 text-center">
            <div className="w-24 h-24 rounded-2xl bg-background/50 backdrop-blur border border-border/50 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold text-gradient-level">
                {daysRemaining}
              </span>
              <span className="text-xs text-muted-foreground">days left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-6 space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Day {goal.currentDay} of {goal.totalDays}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {Math.round(progressPercent)}% Complete
            </span>
          </div>
          <Progress value={progressPercent} variant="level" className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatDate(goal.startDate)}</span>
            <span>{formatDate(goal.endDate)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <Clock className="w-5 h-5 text-warning mx-auto mb-2" />
            <div className="text-xl font-display font-bold text-foreground">
              {goal.currentDay}
            </div>
            <div className="text-xs text-muted-foreground">Days Active</div>
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <Zap className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xl font-display font-bold text-gradient-xp">
              {totalXP}
            </div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <Trophy className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-display font-bold text-foreground">
              {goal.currentPhaseNumber}/{goal.totalPhases}
            </div>
            <div className="text-xs text-muted-foreground">Phases</div>
          </div>
        </div>

        {/* Current Phase */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-primary">
              Current Phase: {goal.currentPhase}
            </h3>
            <span className="text-sm text-muted-foreground">
              Phase {goal.currentPhaseNumber} of {goal.totalPhases}
            </span>
          </div>
          <Progress value={phaseProgress} variant="milestone" className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default MainGoalCard;
