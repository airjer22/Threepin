"use client";

import { useState } from "react";
import { TeamList } from "@/components/teams/team-list";
import { TeamEditor } from "@/components/teams/team-editor";

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  return (
    <div className="flex gap-8">
      {/* Left side - Team List */}
      <div className="w-80">
        <TeamList 
          onTeamSelect={setSelectedTeam} 
          selectedTeam={selectedTeam}
        />
      </div>

      {/* Right side - Team Editor */}
      <div className="flex-1">
        {selectedTeam ? (
          <TeamEditor teamId={selectedTeam} />
        ) : (
          <div className="h-[calc(100vh-12rem)] flex items-center justify-center text-gray-400">
            Select a team to edit
          </div>
        )}
      </div>
    </div>
  );
}