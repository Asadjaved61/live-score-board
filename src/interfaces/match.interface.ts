export interface MatchI {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: number;
  updateScore(homeScore: number, awayScore: number): void;
  totalScore: number;
}
