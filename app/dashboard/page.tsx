"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TournamentList } from "@/components/tournament/tournament-list";
import { CreateTournamentDialog } from "@/components/tournament/create-tournament-dialog";

export default function DashboardPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Your Tournaments</h1>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      <TournamentList />
      
      <CreateTournamentDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}