import prisma from "../client";
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");

const request = supertest(app);

describe("/POST Login", () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.create({
      data: {
        firstName: "first_test",
        lastName: "last_test",
        email: "test@test.com",
        password: await bcrypt.hash("password", 12),
      },
    });
  });
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: "test@test.com",
      },
    });
    await prisma.$disconnect();
  });

  test("should respond with a status code of 200", async () => {
    const res = await request.post("/api/v1/login").send({
      email: "test@test.com",
      password: "password",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should respond with json Logged in!", async () => {
    const res = await request
      .post("/api/v1/login")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect("Content-Type", /json/);

    await expect(res.body).toEqual(
      expect.objectContaining({
        msg: "Logged in!",
      })
    );
  });

  test("Should respond with status code 500", async () => {
    const res = await request.post("/api/v1/login").send({
      email: "test@test.com",
      password: "rabbit",
    });

    expect(res.statusCode).toBe(500);
  });

  test("should respond with json INCORRECRT PASSWORD. Please try again ", async () => {
    const res = await request
      .post("/api/v1/login")
      .send({
        email: "test@test.com",
        password: "rabbit",
      })
      .expect("Content-Type", /json/);

    await expect(res.body).toEqual(
      expect.objectContaining({
        error: "INCORRECRT PASSWORD. Please try again",
      })
    );
  });
});
