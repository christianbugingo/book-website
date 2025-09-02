import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: number;
    role: string;
  };
}

// Middleware wrapper
export function withAuth(handler: NextApiHandler, roles: string[] = []) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };

      req.user = decoded;

      // role-based check
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      return handler(req, res);
    } catch (error: any) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
