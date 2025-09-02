import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import formidable, { Fields, Files, File } from "formidable";
import fs from "fs";
import path from "path";
import { withAuth, AuthenticatedRequest } from "@/lib/auth";

export const config = {
  api: {
    bodyParser: false, // we handle parsing manually
  },
};

const prisma = new PrismaClient();

export default withAuth(
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(405).end();

    const form = formidable({
      multiples: false,
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err: any, fields: Fields, files: Files) => {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(500).json({ error: "File upload error" });
      }

      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
      const description = Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description;

      const uploadedFile = files.file as File | File[] | undefined;

      if (!uploadedFile) {
        return res.status(400).json({ error: "No file provided" });
      }

      // Handle case where file may be an array
      const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

      // Ensure final file path is inside /public/uploads
      const newFilePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        file.newFilename
      );

      // Move from tmp to permanent location
      fs.renameSync(file.filepath, newFilePath);

      const book = await prisma.book.create({
        data: {
          title: String(title),
          author: String(author),
          description: description ? String(description) : null,
          fileUrl: `/uploads/${file.newFilename}`,
          uploaderId: req.user?.id,
        },
      });

      return res.status(201).json({ message: "Book uploaded", book });
    });
  },
  ["USER", "ADMIN"] // both roles can upload
);
