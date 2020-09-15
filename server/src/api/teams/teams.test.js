const supertest = require("supertest");

const app = require("../../app");
const project = require("./../../constants/project");

describe("GET /api/v1/teams", () => {
  it("should reapond with an array of teams", async () => {
    const response = await supertest(app)
      .get("/api/v1/teams")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.length)
      .toBeGreaterThan(0);
  });

  it("should reapond with an individual team", async () => {
    const response = await supertest(app)
      .get("/api/v1/teams/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.id)
      .toBe(1);
  });

  it("should reapond with a 404 for a not found team", async () => {
    const response = await supertest(app)
      .get("/api/v1/teams/4200")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

