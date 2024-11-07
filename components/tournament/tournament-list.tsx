"use client";

import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function TournamentList() {
  const [tournaments] = useState([
    {
      id: 1,
      name: "Summer Championship 2024",
      teams: 8,
      rounds: 2,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Spring Tournament",
      teams: 6,
      rounds: 1,
      status: "Completed",
    },
  ]);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    tournamentId: number | null;
  }>({
    isOpen: false,
    tournamentId: null,
  });

  const handleDelete = () => {
    // Implement delete logic here
    setDeleteDialog({ isOpen: false, tournamentId: null });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((tournament) => (
        <Card key={tournament.id} className="bg-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{tournament.name}</CardTitle>
            <CardDescription className="text-gray-400">
              {tournament.teams} Teams • {tournament.rounds} Rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-400">{tournament.status}</span>
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500 hover:bg-white/5"
                  onClick={() =>
                    setDeleteDialog({
                      isOpen: true,
                      tournamentId: tournament.id,
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteDialog({ isOpen, tournamentId: null })
        }
      >
        <AlertDialogContent className="bg-gray-900 border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Tournament
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this tournament? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-white border-white/10 hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}