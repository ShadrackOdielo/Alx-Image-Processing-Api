import supertest from "supertest";
import app from "../server";

const request = supertest(app);
describe("GET the root route", () => {
  it("gets the api endpoint", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("Test endpoint responses", () => {
  it("gets the api/images endpoint", async (): Promise<void> => {
    const response = await request.get("/api/images/");
    expect(response.status).toBe(200);
  });
});
