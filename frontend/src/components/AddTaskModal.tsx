import { useState } from "react";
import { X, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description: string;
    timeLimit: string;
    difficulty: "easy" | "medium" | "hard";
  }) => void;
}

const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("30 min");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({ title, description, timeLimit, difficulty });
    setTitle("");
    setDescription("");
    setTimeLimit("30 min");
    setDifficulty("medium");
    onClose();
  };

  const difficultyXP = {
    easy: 25,
    medium: 50,
    hard: 100,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md card-gaming rounded-2xl border border-border/50 p-6 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <h2 className="font-display text-2xl font-semibold mb-6">New Quest</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Quest Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete project milestone"
              className="bg-muted border-border/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done?"
              className="bg-muted border-border/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Time Limit
            </label>
            <div className="flex gap-2">
              {["15 min", "30 min", "1 hour", "2 hours"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setTimeLimit(time)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    timeLimit === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Difficulty
            </label>
            <div className="flex gap-2">
              {(["easy", "medium", "hard"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "flex-1 px-3 py-3 rounded-lg text-sm font-medium transition-all border",
                    difficulty === d
                      ? d === "easy"
                        ? "bg-success/20 border-success text-success"
                        : d === "medium"
                        ? "bg-accent/20 border-accent text-accent"
                        : "bg-destructive/20 border-destructive text-destructive"
                      : "bg-muted border-border/50 text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <div className="capitalize">{d}</div>
                  <div className="flex items-center justify-center gap-1 mt-1 text-xs">
                    <Zap className="w-3 h-3" />
                    <span>+{difficultyXP[d]} XP</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 font-display font-semibold text-lg py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Quest
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
