import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  res.send({ allUsers });
});

app.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name: name,
    },
  });
  res.send({ newUser });
});
app.post("/update", async (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newUser = await prisma.user.update({
    where: { id: id },
    data: { name },
  });
  res.send({ newUser });
});

app.post("/pay", async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPay = await prisma.payment.create({
    data: {
      name: name,
    },
  });
  res.send({ newPay });
});

app.get("/get-pay", async (req: Request, res: Response) => {
  const payment = await prisma.payment.findMany();
  res.send({ payment });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
