"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateRoundRobin } from "@/lib/tournament-utils";

interface CreateTournamentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTournamentDialog({
  open,
  onOpenChange,
}: CreateTournamentDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    teamCount: "",
    rounds: "",
    teams: ["", ""],
  });

  const handleAddTeam = () => {
    setFormData((prev) => ({
      ...prev,
      teams: [...prev.teams, ""],
    }));
  };

  const handleRemoveTeam = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      teams: prev.teams.filter((_, i) => i !== index),
    }));
  };

  const handleTeamNameChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teams: prev.teams.map((team, i) => (i === index ? value : team)),
    }));
  };

  const handleSubmit = () => {
    const matches = generateRoundRobin(formData.teams, parseInt(formData.rounds));
    console.log("Generated matches:", matches);
    // Implement tournament creation logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-white/10 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Tournament</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Tournament Name</label>
            <Input
              placeholder="Enter tournament name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Number of Teams</label>
              <Select
                value={formData.teamCount}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, teamCount: value }))
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="text-white hover:bg-white/5"
                    >
                      {num} {num === 1 ? "Team" : "Teams"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Number of Rounds</label>
              <Select
                value={formData.rounds}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, rounds: value }))
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="text-white hover:bg-white/5"
                    >
                      {num} {num === 1 ? "Round" : "Rounds"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-gray-400">Teams</label>
            {formData.teams.map((team, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Team ${index + 1}`}
                  value={team}
                  onChange={(e) => handleTeamNameChange(index, e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                {index >= 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTeam(index)}
                    className="text-gray-400 hover:text-red-500 hover:bg-white/5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddTeam}
              className="border-white/10 bg-white text-black hover:bg-white/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Tournament
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}