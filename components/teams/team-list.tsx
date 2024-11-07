"use client";

import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";

interface Team {
  id: string;
  name: string;
  avatar?: string;
}

interface TeamListProps {
  onTeamSelect: (teamId: string) => void;
  selectedTeam: string | null;
}

export function TeamList({ onTeamSelect, selectedTeam }: TeamListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    teamId: string | null;
  }>({
    isOpen: false,
    teamId: null,
  });

  // Mock data - replace with real data from your backend
  const [teams] = useState<Team[]>([
    { id: "1", name: "Ironside" },
    { id: "2", name: "Corinda" },
    { id: "3", name: "Graceville" },
    { id: "4", name: "Indro" },
  ]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    // Implement delete logic here
    setDeleteDialog({ isOpen: false, teamId: null });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            onClick={() => onTeamSelect(team.id)}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer",
              selectedTeam === team.id
                ? "bg-blue-600"
                : "bg-white/5 hover:bg-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-white/10">
                <span>{team.name[0]}</span>
              </Avatar>
              <span className="font-medium text-white">{team.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-500 hover:bg-white/5"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteDialog({
                  isOpen: true,
                  teamId: team.id,
                });
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteDialog({ isOpen, teamId: null })
        }
      >
        <AlertDialogContent className="bg-gray-900 border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Team
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this team? This action cannot
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