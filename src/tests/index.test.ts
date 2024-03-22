import { Match, Scoreboard } from "../index"; // Import the Match & Scoreboard class

describe("Match", () => {
  let match: Match;

  beforeEach(() => {
    match = new Match("Home Team", "Away Team", "2022-01-01T00:00:00", 0, 0);
  });

  it("should initialize with correct values", () => {
    expect(match.homeTeam).toBe("Home Team");
    expect(match.awayTeam).toBe("Away Team");
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
    expect(match.startTime).toBe(new Date("2022-01-01T00:00:00").getTime());
  });

  it("should update the score correctly", () => {
    match.updateScore(2, 1);
    expect(match.homeScore).toBe(2);
    expect(match.awayScore).toBe(1);
  });

  it("should calculate the total score correctly", () => {
    match.updateScore(3, 2);
    expect(match.totalScore).toBe(5);
  });
});

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  it("should start a match and add it to the matches array", () => {
    scoreboard.startMatch("Home Team", "Away Team", "2022-01-01T00:00:00");
    expect(scoreboard.matches.length).toBe(1);
  });

  it("should update the score of a match correctly", () => {
    scoreboard.startMatch("Home Team", "Away Team", "2022-01-01T00:00:00");
    scoreboard.updateScore(0, 2, 1);
    expect(scoreboard.matches[0].homeScore).toBe(2);
    expect(scoreboard.matches[0].awayScore).toBe(1);
  });

  it("should finish a match and remove it from the matches array", () => {
    scoreboard.startMatch("Home Team", "Away Team", "2022-01-01T00:00:00");
    scoreboard.finishMatch(0);
    expect(scoreboard.matches.length).toBe(0);
  });

  it("should return matches sorted by total score and start time", () => {
    scoreboard.startMatch("Home Team 1", "Away Team 1", "2022-01-01T00:00:00");
    scoreboard.startMatch("Home Team 2", "Away Team 2", "2022-01-02T00:00:00");
    scoreboard.startMatch("Home Team 3", "Away Team 3", "2022-01-03T00:00:00");

    scoreboard.updateScore(0, 2, 1);
    scoreboard.updateScore(1, 1, 1);
    scoreboard.updateScore(2, 3, 2);

    const sortedMatches = scoreboard.getSummary();
    expect(sortedMatches[0].homeTeam).toBe("Home Team 3");
    expect(sortedMatches[1].homeTeam).toBe("Home Team 1");
    expect(sortedMatches[2].homeTeam).toBe("Home Team 2");
  });
});
