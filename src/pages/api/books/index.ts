import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
  }

  if (req.method === "POST") {
    const { title, author, description, fileUrl } = req.body;
    const newBook = await prisma.book.create({
      data: { title, author, description, fileUrl },
    });
    return res.status(201).json(newBook);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
