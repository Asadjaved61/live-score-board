import { MatchI } from "./interfaces/match.interface";
import { ScoreboardI } from "./interfaces/scoreboard.interface";

export class Match implements MatchI {
  constructor(
    homeTeam: string,
    awayTeam: string,
    dateTime: string,
    homeScore = 0,
    awayScore = 0
  ) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
    this.startTime = new Date(dateTime).getTime();
  }
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: number;

  updateScore(homeScore: number, awayScore: number) {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }

  get totalScore() {
    return this.homeScore + this.awayScore;
  }
}

/**
 * Represents a scoreboard that keeps track of matches and their scores.
 */
export class Scoreboard implements ScoreboardI {
  matches: Match[] = [];

  /**
   * Initializes a new instance of the Scoreboard class.
   */
  constructor() {}

  /**
   * Starts a new match and adds it to the scoreboard.
   * @param homeTeam - The name of the home team.
   * @param awayTeam - The name of the away team.
   * @param dateTime - The date and time of the match.
   * @returns The newly created match.
   */
  startMatch(homeTeam: string, awayTeam: string, dateTime: string) {
    const newMatch = new Match(homeTeam, awayTeam, dateTime);
    this.matches.push(newMatch);

    return newMatch;
  }

  /**
   * Updates the score of a match.
   * @param matchIndex - The index of the match in the scoreboard.
   * @param homeScore - The new home team score.
   * @param awayScore - The new away team score.
   */
  updateScore(matchIndex: number, homeScore: number, awayScore: number) {
    const match = this.matches[matchIndex];
    if (match) {
      match.updateScore(homeScore, awayScore);
    } else {
      console.log("Match not found!");
    }
  }

  /**
   * Finishes a match and removes it from the scoreboard.
   * @param matchIndex - The index of the match in the scoreboard.
   */
  finishMatch(matchIndex: number) {
    this.matches.splice(matchIndex, 1);
  }

  /**
   * Gets a summary of the matches in the scoreboard.
   * The matches are sorted by total score in descending order.
   * If two matches have the same total score, they are sorted by start time in descending order.
   * @returns An array of matches sorted by total score and start time.
   */
  getSummary() {
    const sortedMatches = this.matches.sort((a, b) => {
      if (a.totalScore === b.totalScore) {
        return b.startTime - a.startTime;
      }
      return b.totalScore - a.totalScore;
    });

    return sortedMatches;
  }
}

const scoreboard = new Scoreboard();

scoreboard.startMatch("Canada", "Mexico", "Mar 20, 2024, 11:00:00");
scoreboard.startMatch("Brazil", "Spain", "Mar 20, 2024, 12:00:00");
scoreboard.startMatch("France", "Germany", "Mar 20, 2024, 13:00:00");
scoreboard.startMatch("Italy", "Uruguay", "Mar 20, 2024, 14:00:00");
scoreboard.startMatch("Australia", "Argentina", "Mar 20, 2024, 15:00:00");

scoreboard.updateScore(0, 0, 5);
scoreboard.updateScore(1, 10, 2);
scoreboard.updateScore(2, 2, 2);
scoreboard.updateScore(3, 6, 6);
scoreboard.updateScore(4, 3, 1);

scoreboard.getSummary().forEach((m, i) => {
  console.log(
    `${i}. ${m.awayTeam} ${m.awayScore} - ${m.homeTeam} ${m.homeScore}`
  );
});
