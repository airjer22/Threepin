"use client";

import { NextMatch } from "@/components/guest/next-match";
import { TournamentStandings } from "@/components/guest/tournament-standings";
import { TournamentCalendar } from "@/components/guest/tournament-calendar";

export default function GuestDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Tournament Dashboard</h1>
      </div>
      
      {/* League Standings */}
      <TournamentStandings />
      
      {/* Upcoming Match */}
      <div className="max-w-3xl">
        <NextMatch />
      </div>
      
      {/* Calendar */}
      <TournamentCalendar />
    </div>
  );
}