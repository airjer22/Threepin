export function generateRoundRobin(teams: string[], rounds: number) {
  const matches: { home: string; away: string }[] = [];
  const n = teams.length;

  // Generate matches for each round
  for (let round = 0; round < rounds; round++) {
    // For odd number of teams, add a "bye" team
    const teamsInRound = n % 2 === 0 ? teams : [...teams, "BYE"];
    const numTeams = teamsInRound.length;

    // Generate matches for one complete round
    for (let day = 0; day < numTeams - 1; day++) {
      for (let i = 0; i < numTeams / 2; i++) {
        const home = teamsInRound[i];
        const away = teamsInRound[numTeams - 1 - i];

        // Don't add matches involving "BYE"
        if (home !== "BYE" && away !== "BYE") {
          matches.push({
            home: round % 2 === 0 ? home : away,
            away: round % 2 === 0 ? away : home,
          });
        }
      }

      // Rotate teams (keep first team fixed)
      teamsInRound.splice(1, 0, teamsInRound.pop()!);
    }
  }

  return matches;
}