import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("GET /", () => {
  it("should send 200 status response code ", async () => {
    const response = await request.get("/");

    expect(response.statusCode).toBe(200);
  });
});

describe("POST /", () => {
  it("should send 200 statusCode response code ", async () => {
    const response = await request.post("/weather/deventer");

    expect(response.statusCode).toBe(200);
  });

  it("should send 404 statusCode when user give gibberish  ", async () => {
    const response = await request.post("/weather/dfsgdfsd");

    expect(response.statusCode).toBe(404);
  });

  it("should send 404 statusCode when empty string ", async () => {
    const response = await request.post("/weather/  ");

    expect(response.statusCode).toBe(404);
  });
});
