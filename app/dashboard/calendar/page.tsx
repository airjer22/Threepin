"use client";

import { useState } from "react";
import { Calendar } from "@/components/calendar/calendar";
import { MatchesSidebar } from "@/components/calendar/matches-sidebar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "@/hooks/use-toast";

export default function CalendarPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [scheduledMatches, setScheduledMatches] = useState<any[]>([]);
  const [unscheduledMatches, setUnscheduledMatches] = useState([
    {
      id: 1,
      round: 1,
      homeTeam: "Corinda",
      awayTeam: "Graceville",
    },
    {
      id: 2,
      round: 1,
      homeTeam: "Ironside",
      awayTeam: "Graceville",
    },
    // Add more matches as needed
  ]);
  const { toast } = useToast();

  const handleMatchScheduled = (match: any, date: Date) => {
    setScheduledMatches((prev) => [
      ...prev,
      {
        ...match,
        start: date,
        end: new Date(date.getTime() + 60 * 60 * 1000), // 1 hour duration
        title: `${match.homeTeam} vs ${match.awayTeam}`,
        isScored: false,
      },
    ]);
    setUnscheduledMatches((prev) => prev.filter((m) => m.id !== match.id));
  };

  const handleMatchScored = (matchId: string, scores: any) => {
    // Update the match in scheduledMatches
    setScheduledMatches((prev) =>
      prev.map((match) =>
        match.id === matchId
          ? {
              ...match,
              isScored: true,
              scores,
            }
          : match
      )
    );

    // Show success toast
    toast({
      title: "Match Scored",
      description: "The match scores have been saved successfully.",
    });

    // Here you would typically update your backend/database
    console.log("Match scored:", { matchId, scores });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex">
        <div className="w-80 border-r border-white/10">
          <MatchesSidebar matches={unscheduledMatches} isEditing={isEditing} />
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Calendar</h1>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className={
                isEditing
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-white/10 text-black hover:bg-white/5"
              }
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {isEditing ? "Done Editing" : "Edit Calendar"}
            </Button>
          </div>
          <Calendar
            events={scheduledMatches}
            isEditing={isEditing}
            onMatchScheduled={handleMatchScheduled}
            onMatchScored={handleMatchScored}
          />
        </div>
      </div>
    </DndProvider>
  );
}