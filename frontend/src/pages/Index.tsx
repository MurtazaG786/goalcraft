import { useState } from "react";
import { Swords, Flame, Star, Zap, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainGoalCard from "@/components/MainGoalCard";
import PhaseTimeline from "@/components/PhaseTimeline";
import DailySubTasks from "@/components/DailySubTasks";
import UserStats from "@/components/UserStats";
import { toast } from "@/hooks/use-toast";

const initialGoal = {
  id: "1",
  title: "Master MERN Stack Development",
  description: "Learn MongoDB, Express.js, React, and Node.js to build full-stack applications",
  totalDays: 30,
  currentDay: 8,
  startDate: new Date("2025-12-26"),
  endDate: new Date("2026-01-25"),
  currentPhase: "React Fundamentals",
  totalPhases: 5,
  currentPhaseNumber: 2,
};

const initialPhases = [
  {
    id: "1",
    title: "JavaScript & Node.js Basics",
    description: "Core JavaScript concepts and Node.js fundamentals",
    days: "Days 1-5",
    status: "completed" as const,
    tasksCompleted: 15,
    totalTasks: 15,
  },
  {
    id: "2",
    title: "React Fundamentals",
    description: "Components, state, props, hooks, and React ecosystem",
    days: "Days 6-12",
    status: "current" as const,
    tasksCompleted: 8,
    totalTasks: 21,
  },
  {
    id: "3",
    title: "MongoDB & Database Design",
    description: "NoSQL concepts, schemas, queries, and data modeling",
    days: "Days 13-18",
    status: "locked" as const,
    tasksCompleted: 0,
    totalTasks: 18,
  },
  {
    id: "4",
    title: "Express.js & REST APIs",
    description: "Server-side routing, middleware, and API development",
    days: "Days 19-24",
    status: "locked" as const,
    tasksCompleted: 0,
    totalTasks: 18,
  },
  {
    id: "5",
    title: "Full Stack Project",
    description: "Build a complete MERN application from scratch",
    days: "Days 25-30",
    status: "locked" as const,
    tasksCompleted: 0,
    totalTasks: 18,
  },
];

const initialSubTasks = [
  {
    id: "1",
    title: "Learn useState and useEffect hooks",
    description: "Understand React's core hooks for managing state and side effects. Practice by building a counter and a data-fetching component.",
    xpReward: 50,
    estimatedTime: "45 min",
    completed: true,
    aiGenerated: true,
  },
  {
    id: "2",
    title: "Build a todo list component",
    description: "Apply your knowledge by creating a functional todo list with add, delete, and toggle functionality using React state.",
    xpReward: 75,
    estimatedTime: "1 hour",
    completed: true,
    aiGenerated: true,
  },
  {
    id: "3",
    title: "Understand component lifecycle",
    description: "Learn how React components mount, update, and unmount. Study useEffect cleanup functions and dependency arrays.",
    xpReward: 50,
    estimatedTime: "30 min",
    completed: false,
    aiGenerated: true,
  },
  {
    id: "4",
    title: "Practice prop drilling and lifting state",
    description: "Build a parent-child component structure and practice passing data down and callbacks up the component tree.",
    xpReward: 60,
    estimatedTime: "45 min",
    completed: false,
    aiGenerated: true,
  },
  {
    id: "5",
    title: "Introduction to React Context",
    description: "Learn how to use React Context API to share state across components without prop drilling.",
    xpReward: 75,
    estimatedTime: "1 hour",
    completed: false,
    aiGenerated: true,
  },
];

const Index = () => {
  const [goal] = useState(initialGoal);
  const [phases, setPhases] = useState(initialPhases);
  const [subTasks, setSubTasks] = useState(initialSubTasks);
  const [userStats, setUserStats] = useState({
    level: 7,
    currentXP: 425,
    xpToNextLevel: 600,
    streak: 8,
    username: "Developer",
  });

  const totalXP = 1825; // Total XP earned across the journey
  const completedToday = subTasks.filter((t) => t.completed).length;

  const handleCompleteTask = (id: string) => {
    setSubTasks((prev) =>
      prev.map((task) => {
        if (task.id === id && !task.completed) {
          const newXP = userStats.currentXP + task.xpReward;
          let newLevel = userStats.level;
          let remainingXP = newXP;
          let xpForNext = userStats.xpToNextLevel;

          if (newXP >= userStats.xpToNextLevel) {
            newLevel += 1;
            remainingXP = newXP - userStats.xpToNextLevel;
            xpForNext = Math.floor(userStats.xpToNextLevel * 1.2);
            toast({
              title: "🎉 Level Up!",
              description: `You've reached Level ${newLevel}!`,
            });
          }

          setUserStats((prev) => ({
            ...prev,
            currentXP: remainingXP,
            level: newLevel,
            xpToNextLevel: xpForNext,
          }));

          // Update phase progress
          setPhases((prev) =>
            prev.map((phase) =>
              phase.status === "current"
                ? { ...phase, tasksCompleted: phase.tasksCompleted + 1 }
                : phase
            )
          );

          toast({
            title: "Task Complete!",
            description: `+${task.xpReward} XP earned!`,
          });

          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-purple-500 glow-level">
                <Swords className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-gradient-level">
                  Goal Craft
                </h1>
                <p className="text-sm text-muted-foreground">Forge your future</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="font-display font-bold">Lv.{userStats.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-display font-bold text-gradient-xp">{userStats.currentXP} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-warning" />
                <span className="font-display font-bold text-warning">{userStats.streak} days</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Mobile Stats */}
        <div className="md:hidden">
          <UserStats {...userStats} />
        </div>

        {/* Main Goal Card */}
        <MainGoalCard goal={goal} totalXP={totalXP} />

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column - Daily Tasks */}
          <div className="lg:col-span-2">
            <DailySubTasks
              tasks={subTasks}
              currentDay={goal.currentDay}
              phaseName={goal.currentPhase}
              onCompleteTask={handleCompleteTask}
            />
          </div>

          {/* Sidebar - Phase Timeline */}
          <div className="lg:col-span-1">
            <PhaseTimeline phases={phases} />
          </div>
        </div>

        {/* AI Notice */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Swords className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-foreground mb-1">
              AI-Powered Task Generation
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect a backend to enable AI task generation based on your goal and learning pace.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
            Enable AI
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
