"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BracketControls() {
  return (
    <div className="flex items-center gap-4">
      <Select defaultValue="1">
        <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
          <SelectValue placeholder="Select tournament" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-white/10">
          <SelectItem value="1" className="text-white hover:bg-white/5">
            Summer Championship 2024
          </SelectItem>
          <SelectItem value="2" className="text-white hover:bg-white/5">
            Spring Tournament
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        className="border-white/10 bg-white text-black hover:bg-white/90"
      >
        Reset Bracket
      </Button>
    </div>
  );
}