"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UserPlus, X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [teamImage, setTeamImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "John Doe", role: "regular" },
    { id: "2", name: "Jane Smith", role: "regular" },
    { id: "3", name: "Mike Johnson", role: "substitute" },
  ]);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `team-images/${teamId}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setTeamImage(downloadURL);
      toast({
        title: "Image uploaded",
        description: "Team image has been updated successfully.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [teamId, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
  });

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
          <div {...getRootProps()} className="cursor-pointer group relative">
            <input {...getInputProps()} />
            <Avatar className="h-20 w-20 bg-white/10 ring-2 ring-offset-2 ring-offset-black ring-white/10 group-hover:ring-blue-500 transition-all">
              {teamImage ? (
                <AvatarImage src={teamImage} alt={teamName} />
              ) : (
                <AvatarFallback className="bg-white/10 text-2xl">
                  {isUploading ? (
                    <Upload className="h-8 w-8 animate-pulse" />
                  ) : (
                    teamName[0]
                  )}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </div>
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