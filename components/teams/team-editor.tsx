"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  role: "regular" | "substitute";
}

interface TeamEditorProps {
  teamId: string;
}

export function TeamEditor({ teamId }: TeamEditorProps) {
  const [teamName, setTeamName] = useState("Ironside");
  const [newMemberName, setNewMemberName] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "John Doe", role: "regular" },
    { id: "2", name: "Jane Smith", role: "regular" },
    { id: "3", name: "Mike Johnson", role: "substitute" },
  ]);
  const { toast } = useToast();

  const handleAddMember = (role: "regular" | "substitute") => {
    if (!newMemberName.trim()) return;

    setMembers((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name: newMemberName,
        role,
      },
    ]);
    setNewMemberName("");
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const handleSave = () => {
    // Implement save logic here
    toast({
      title: "Changes Saved",
      description: "Team information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Team Info Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 bg-white/10 text-2xl">
            {teamName[0]}
          </Avatar>
          <div className="flex-1 space-y-2">
            <Label className="text-sm text-gray-400">Team Name</Label>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Team Members
          </h3>
          <div className="space-y-4">
            {members
              .filter((member) => member.role === "regular")
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-white/10">
                      <span>{member.name[0]}</span>
                    </Avatar>
                    <span className="text-white">{member.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-white/5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Substitute Players
          </h3>
          <div className="space-y-4">
            {members
              .filter((member) => member.role === "substitute")
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-white/10">
                      <span>{member.name[0]}</span>
                    </Avatar>
                    <span className="text-white">{member.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-white/5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* Add Member Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Add Member</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter member name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <Button
              onClick={() => handleAddMember("regular")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add as Regular
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAddMember("substitute")}
              className="border-white/10 bg-white text-black hover:bg-white/90"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add as Substitute
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}