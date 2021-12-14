const request = require("supertest");
const { app } = require("../app");

describe("POST /register", () => {
  describe("given firstName, lastName, email, password, and password2", () => {
    // save user to database
    // test("Should save user to database", async () => {
    //   const user = {
    //     firstName: "first",
    //     lastName: "last",
    //     email: "email@email.com",
    //     password: "password",
    //     password2: "password",
    //   };

    //   expect(createUser(user)).toEqual({ user });
    // });

    // hashpassword into database
    test("should respond with a status code of 200", async () => {
      const res = await request(app).post("/api/v1/register").send({
        firstName: "first",
        lastName: "last",
        email: "email@email.com",
        password: "password",
        password2: "password",
      });

      expect(res.statusCode).toBe(200);
    });

    test("should specify json in content-type header", async () => {
      const res = await request(app).post("/api/v1/register").send({
        firstName: "first",
        lastName: "last",
        email: "email@email.com",
        password: "password",
        password2: "password",
      });
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Should send back users id", async () => {
      const res = await request(app).post("/api/v1/register").send({
        firstName: "first",
        lastName: "last",
        email: "email@email.com",
        password: "password",
        password2: "password",
      });
      expect(res.body.id).toBeDefined();
    });
  });

  describe("If any of the registration info is missing", () => {
    test("should respond with status code 400", async () => {
      const bodyData = [
        {
          lastName: "lastName",
          email: "email@email.com",
          password: "password",
          password2: "password",
        },
        {
          firstName: "first",
          email: "email@email.com",
          password: "password",
          password2: "password",
        },
        {
          firstName: "first",
          lastName: "lastName",
          password: "password",
          password2: "password",
        },
        {
          firstName: "first",
          lastName: "lastName",
          email: "email@email.com",
          password2: "password",
        },
        {
          firstName: "first",
          lastName: "lastName",
          email: "email@email.com",
          password: "password",
        },
        {},
      ];

      for (const body of bodyData) {
        const res = await request(app).post("/api/v1/register").send(body);
        expect(res.statusCode).toBe(400);
      }
    });

    //
  });
});
