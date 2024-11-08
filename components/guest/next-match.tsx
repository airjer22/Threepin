"use client";

import { format } from "date-fns";
import { MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const nextMatch = {
  date: new Date(2024, 3, 15, 14, 0),
  homeTeam: "Ironside",
  awayTeam: "Corinda",
  venue: "Brisbane Indoor Sports Centre",
  status: "Upcoming",
};

export function NextMatch() {
  return (
    <Card className="bg-white/10 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Next Match</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-white/10">
                <span className="text-lg">{nextMatch.homeTeam[0]}</span>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-white">
                  {nextMatch.homeTeam}
                </p>
              </div>
            </div>

            <div className="text-2xl font-bold text-white">VS</div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-semibold text-white">
                  {nextMatch.awayTeam}
                </p>
              </div>
              <Avatar className="h-12 w-12 bg-white/10">
                <span className="text-lg">{nextMatch.awayTeam[0]}</span>
              </Avatar>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{format(nextMatch.date, "MMMM d, yyyy 'at' h:mm a")}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{nextMatch.venue}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-sm font-medium text-blue-500">
              {nextMatch.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}