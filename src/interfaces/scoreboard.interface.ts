import { MatchI } from "./match.interface";

export interface ScoreboardI {
  matches: MatchI[];
  startMatch(homeTeam: string, awayTeam: string, dateTime: string): MatchI;
  updateScore(matchIndex: number, homeScore: number, awayScore: number): void;
  finishMatch(matchIndex: number): void;
  getSummary(): MatchI[];
}
