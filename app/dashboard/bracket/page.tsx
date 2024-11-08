"use client";

import { useState } from "react";
import { TournamentBracket } from "@/components/bracket/tournament-bracket";
import { BracketControls } from "@/components/bracket/bracket-controls";
import { MatchScoringDialog } from "@/components/bracket/match-scoring-dialog";
import { useToast } from "@/hooks/use-toast";

export default function BracketPage() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const { toast } = useToast();

  const handleMatchClick = (match: any) => {
    if (!match.isPlayable) {
      toast({
        title: "Match not available",
        description: "Previous round matches must be completed first.",
        variant: "destructive",
      });
      return;
    }
    setSelectedMatch(match);
  };

  const handleScoreSubmit = (matchId: string, scores: any) => {
    // Implement score submission logic here
    toast({
      title: "Scores updated",
      description: "Match scores have been saved successfully.",
    });
    setSelectedMatch(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Tournament Bracket</h1>
        <BracketControls />
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-[1200px]">
          <TournamentBracket onMatchClick={handleMatchClick} />
        </div>
      </div>

      <MatchScoringDialog
        match={selectedMatch}
        open={!!selectedMatch}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
        onScoreSubmit={handleScoreSubmit}
      />
    </div>
  );
}