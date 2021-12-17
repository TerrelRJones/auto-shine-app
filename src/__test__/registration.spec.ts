import prisma from "../client";
const supertest = require("supertest");

const app = require("../app");

const request = supertest(app);

describe("/POST ", () => {
  beforeAll(async () => {
    await prisma.$connect();
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
    const res = await request.post("/api/v1/register").send({
      firstName: "first_test",
      lastName: "last_test",
      email: "test@test.com",
      password: "password",
      password2: "password",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should respond with a status code of 400 if any is missing", async () => {
    const res = await request.post("/api/v1/register").send({
      lastName: "last_test",
      email: "test@test.com",
      password: "password",
      password2: "password",
    });

    expect(res.statusCode).toBe(400);
  });

  // test('Should respond "Passwords dont match", if passwords don\'t match', async () => {
  //   const res = await request.post("/api/v1/register").send({
  //     firstName: "first_test",
  //     lastName: "last_test",
  //     email: "test@test.com",
  //     password: "password",
  //     password2: "passwor",
  //   });

  //   expect(res.body.json).toEqual({ error: "Passwords do not match" });
  // });
});
