const request = require("supertest");
const { app } = require("../app");

describe("POST / register", () => {
  it("SHOULD return 200Ok", (done) => {
    request(app)
      .post("/api/v1/register")
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("SHOULD return a user object w/ id and createdAt", async () => {
    const res = await request(app).post("/api/v1/register").send({
      firstName: "Bobby",
      lastName: "Booch",
      email: "BOBBBBBB@gmail.com",
      password: "Bobby",
      password2: "Bobby",
    });
  });
});
