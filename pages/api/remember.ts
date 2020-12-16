import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ message: "Missing message" });
      return;
    }

    const { db } = await connect();

    try {
      const response = await db.collection("remember").insertOne({ message });

      res.status(201).json(response.ops[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).json({ message: "Wrong request method" });
  }
};
