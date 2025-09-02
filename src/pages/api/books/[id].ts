import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    return res.status(200).json(book);
  }

  if (req.method === "DELETE") {
    await prisma.book.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
