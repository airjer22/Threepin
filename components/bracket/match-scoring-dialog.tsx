"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MatchScoringDialogProps {
  match: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScoreSubmit: (matchId: string, scores: any) => void;
}

export function MatchScoringDialog({
  match,
  open,
  onOpenChange,
  onScoreSubmit,
}: MatchScoringDialogProps) {
  const [scores, setScores] = useState({
    homeScore: "",
    awayScore: "",
  });

  if (!match) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScoreSubmit(match.id, {
      homeScore: parseInt(scores.homeScore),
      awayScore: parseInt(scores.awayScore),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-white/10 text-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-blue-500" />
            <span>Update Match Score</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Home Team */}
            <div>
              <Label className="text-gray-400">
                {match.homeTeam?.name || "TBD"}
              </Label>
              <Input
                type="number"
                min="0"
                value={scores.homeScore}
                onChange={(e) =>
                  setScores((prev) => ({
                    ...prev,
                    homeScore: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            {/* Away Team */}
            <div>
              <Label className="text-gray-400">
                {match.awayTeam?.name || "TBD"}
              </Label>
              <Input
                type="number"
                min="0"
                value={scores.awayScore}
                onChange={(e) =>
                  setScores((prev) => ({
                    ...prev,
                    awayScore: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10 bg-white text-black hover:bg-white/90"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Score
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}