"use client";

import { useMemo } from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Match {
  id: string;
  round: number;
  position: number;
  homeTeam: {
    id: string;
    name: string;
    seed: number;
    score?: number;
  } | null;
  awayTeam: {
    id: string;
    name: string;
    seed: number;
    score?: number;
  } | null;
  winner?: "home" | "away";
  isPlayable: boolean;
  isCompleted: boolean;
  nextMatchId?: string;
}

interface TournamentBracketProps {
  onMatchClick: (match: Match) => void;
}

export function TournamentBracket({ onMatchClick }: TournamentBracketProps) {
  // Mock data - replace with real data from your backend
  const matches = useMemo<Match[]>(() => [
    // Round of 16
    {
      id: "1",
      round: 1,
      position: 1,
      homeTeam: { id: "1", name: "Ironside", seed: 1, score: 3 },
      awayTeam: { id: "8", name: "Team 8", seed: 8, score: 1 },
      winner: "home",
      isPlayable: true,
      isCompleted: true,
      nextMatchId: "9",
    },
    {
      id: "2",
      round: 1,
      position: 2,
      homeTeam: { id: "4", name: "Indro", seed: 4, score: 2 },
      awayTeam: { id: "5", name: "Team 5", seed: 5, score: 3 },
      winner: "away",
      isPlayable: true,
      isCompleted: true,
      nextMatchId: "9",
    },
    {
      id: "3",
      round: 1,
      position: 3,
      homeTeam: { id: "3", name: "Graceville", seed: 3 },
      awayTeam: { id: "6", name: "Team 6", seed: 6 },
      isPlayable: true,
      isCompleted: false,
      nextMatchId: "10",
    },
    {
      id: "4",
      round: 1,
      position: 4,
      homeTeam: { id: "2", name: "Corinda", seed: 2 },
      awayTeam: { id: "7", name: "Team 7", seed: 7 },
      isPlayable: true,
      isCompleted: false,
      nextMatchId: "10",
    },
    // Quarter-finals
    {
      id: "9",
      round: 2,
      position: 1,
      homeTeam: { id: "1", name: "Ironside", seed: 1 },
      awayTeam: { id: "5", name: "Team 5", seed: 5 },
      isPlayable: true,
      isCompleted: false,
      nextMatchId: "13",
    },
    {
      id: "10",
      round: 2,
      position: 2,
      homeTeam: null,
      awayTeam: null,
      isPlayable: false,
      isCompleted: false,
      nextMatchId: "13",
    },
    // Semi-finals
    {
      id: "13",
      round: 3,
      position: 1,
      homeTeam: null,
      awayTeam: null,
      isPlayable: false,
      isCompleted: false,
      nextMatchId: "15",
    },
    // Finals
    {
      id: "15",
      round: 4,
      position: 1,
      homeTeam: null,
      awayTeam: null,
      isPlayable: false,
      isCompleted: false,
    },
  ], []);

  const rounds = useMemo(() => {
    const roundsMap = matches.reduce((acc, match) => {
      if (!acc[match.round]) {
        acc[match.round] = [];
      }
      acc[match.round].push(match);
      return acc;
    }, {} as Record<number, Match[]>);

    return Object.entries(roundsMap).map(([round, matches]) => ({
      name: getRoundName(parseInt(round)),
      matches: matches.sort((a, b) => a.position - b.position),
    }));
  }, [matches]);

  return (
    <div className="flex gap-8">
      {rounds.map((round, roundIndex) => (
        <div
          key={roundIndex}
          className="flex-1 space-y-4"
        >
          <h3 className="text-lg font-semibold text-blue-400 text-center mb-8">
            {round.name}
          </h3>
          <div className="space-y-8">
            {round.matches.map((match, matchIndex) => (
              <div
                key={match.id}
                className={cn(
                  "relative",
                  matchIndex !== round.matches.length - 1 &&
                    "after:absolute after:top-[calc(100%+1rem)] after:left-1/2 after:w-px after:h-16 after:bg-white/10"
                )}
              >
                <button
                  onClick={() => onMatchClick(match)}
                  disabled={!match.isPlayable}
                  className={cn(
                    "w-full text-left rounded-lg border transition-colors",
                    match.isPlayable
                      ? "cursor-pointer hover:border-blue-500/50 hover:bg-white/5"
                      : "cursor-not-allowed opacity-50",
                    match.isCompleted
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-white/5 border-white/10"
                  )}
                >
                  {/* Home Team */}
                  <div
                    className={cn(
                      "flex items-center gap-3 p-3 border-b",
                      match.winner === "home"
                        ? "border-green-500/20"
                        : "border-white/10"
                    )}
                  >
                    <div className="w-6 text-sm text-gray-400">
                      {match.homeTeam?.seed || "-"}
                    </div>
                    <div className="flex-1 font-medium text-white">
                      {match.homeTeam?.name || "TBD"}
                    </div>
                    <div
                      className={cn(
                        "w-6 text-right",
                        match.winner === "home"
                          ? "text-green-500 font-bold"
                          : "text-white"
                      )}
                    >
                      {match.homeTeam?.score || "-"}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div
                    className={cn(
                      "flex items-center gap-3 p-3",
                      match.winner === "away" && "bg-green-500/5"
                    )}
                  >
                    <div className="w-6 text-sm text-gray-400">
                      {match.awayTeam?.seed || "-"}
                    </div>
                    <div className="flex-1 font-medium text-white">
                      {match.awayTeam?.name || "TBD"}
                    </div>
                    <div
                      className={cn(
                        "w-6 text-right",
                        match.winner === "away"
                          ? "text-green-500 font-bold"
                          : "text-white"
                      )}
                    >
                      {match.awayTeam?.score || "-"}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function getRoundName(round: number): string {
  switch (round) {
    case 1:
      return "Round of 16";
    case 2:
      return "Quarter-Finals";
    case 3:
      return "Semi-Finals";
    case 4:
      return "Final";
    default:
      return `Round ${round}`;
  }
}