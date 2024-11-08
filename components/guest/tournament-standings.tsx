"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const standings = [
  {
    id: "1",
    name: "Ironside",
    stats: { wins: 2, ties: 0, losses: 0, gamesFor: 8, gamesAgainst: 5, pins: 9 },
  },
  {
    id: "2",
    name: "Indro",
    stats: { wins: 1, ties: 0, losses: 1, gamesFor: 10, gamesAgainst: 8, pins: 4 },
  },
  {
    id: "3",
    name: "Corinda",
    stats: { wins: 0, ties: 0, losses: 1, gamesFor: 2, gamesAgainst: 3, pins: 3 },
  },
  {
    id: "4",
    name: "Graceville",
    stats: { wins: 0, ties: 0, losses: 1, gamesFor: 3, gamesAgainst: 7, pins: 3 },
  },
];

export function TournamentStandings() {
  return (
    <Card className="bg-white/10 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">League Standings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
              {standings.map((team) => (
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
      </CardContent>
    </Card>
  );
}