"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface Team {
  id: string;
  name: string;
  avatar: string;
  stats: {
    wins: number;
    ties: number;
    losses: number;
    gamesFor: number;
    gamesAgainst: number;
    pins: number;
  };
}

interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
}

// Mock data - replace with real data from your backend
const upcomingMatch: Match = {
  id: "1",
  homeTeam: {
    id: "1",
    name: "Ironside",
    avatar: "",
    stats: { wins: 2, ties: 0, losses: 0, gamesFor: 8, gamesAgainst: 5, pins: 9 },
  },
  awayTeam: {
    id: "4",
    name: "Graceville",
    avatar: "",
    stats: { wins: 0, ties: 0, losses: 1, gamesFor: 3, gamesAgainst: 7, pins: 3 },
  },
  date: new Date("2024-10-11T12:00:00"),
};

const teams: Team[] = [
  {
    id: "1",
    name: "Ironside",
    avatar: "",
    stats: { wins: 2, ties: 0, losses: 0, gamesFor: 8, gamesAgainst: 5, pins: 9 },
  },
  {
    id: "2",
    name: "Indro",
    avatar: "",
    stats: { wins: 1, ties: 0, losses: 1, gamesFor: 10, gamesAgainst: 8, pins: 4 },
  },
  {
    id: "3",
    name: "Corinda",
    avatar: "",
    stats: { wins: 0, ties: 0, losses: 1, gamesFor: 2, gamesAgainst: 3, pins: 3 },
  },
  {
    id: "4",
    name: "Graceville",
    avatar: "",
    stats: { wins: 0, ties: 0, losses: 1, gamesFor: 3, gamesAgainst: 7, pins: 3 },
  },
];

function calculateDifferential(gamesFor: number, gamesAgainst: number) {
  return gamesFor - gamesAgainst;
}

function sortTeams(teams: Team[]) {
  return [...teams].sort((a, b) => {
    // Primary: Win/Loss record
    const aWinPercentage = (a.stats.wins + a.stats.ties * 0.5) / 
      (a.stats.wins + a.stats.ties + a.stats.losses);
    const bWinPercentage = (b.stats.wins + b.stats.ties * 0.5) / 
      (b.stats.wins + b.stats.ties + b.stats.losses);
    
    if (aWinPercentage !== bWinPercentage) {
      return bWinPercentage - aWinPercentage;
    }

    // Secondary: Games For/Against differential
    const aDiff = calculateDifferential(a.stats.gamesFor, a.stats.gamesAgainst);
    const bDiff = calculateDifferential(b.stats.gamesFor, b.stats.gamesAgainst);
    
    if (aDiff !== bDiff) {
      return bDiff - aDiff;
    }

    // Tertiary: Total pins
    return b.stats.pins - a.stats.pins;
  });
}

export default function StandingsPage() {
  const sortedTeams = sortTeams(teams);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Test Tournament</h1>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Upcoming Match</h2>
        <div className="bg-white/5 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-white/10">
                <span className="text-lg">{upcomingMatch.homeTeam.name[0]}</span>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-white">
                  {upcomingMatch.homeTeam.name}
                </p>
              </div>
            </div>

            <div className="text-2xl font-bold text-white">VS</div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-semibold text-white">
                  {upcomingMatch.awayTeam.name}
                </p>
              </div>
              <Avatar className="h-12 w-12 bg-white/10">
                <span className="text-lg">{upcomingMatch.awayTeam.name[0]}</span>
              </Avatar>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-white">
                {format(upcomingMatch.date, "dd/MM/yyyy")}
              </p>
              <p className="text-lg text-gray-400">
                {format(upcomingMatch.date, "HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Standings</h2>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-blue-400">Team</TableHead>
                <TableHead className="text-blue-400 text-center">W</TableHead>
                <TableHead className="text-blue-400 text-center">T</TableHead>
                <TableHead className="text-blue-400 text-center">L</TableHead>
                <TableHead className="text-blue-400 text-center">GF</TableHead>
                <TableHead className="text-blue-400 text-center">GA</TableHead>
                <TableHead className="text-blue-400 text-center">Pins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team) => (
                <TableRow
                  key={team.id}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-white/10">
                        <span>{team.name[0]}</span>
                      </Avatar>
                      {team.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {team.stats.wins}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {team.stats.ties}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {team.stats.losses}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {team.stats.gamesFor}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {team.stats.gamesAgainst}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    {team.stats.pins}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}