import prisma from "../client";

describe("example test with prisma", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("expect data to be truthy", async () => {
    const data = await prisma.user.findMany({ take: 1, select: { id: true } });
    expect([data]).toBeTruthy();
  });
});
