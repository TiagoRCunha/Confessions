import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "GET") {
    const offset = req.query.offset;
    const { db } = await connect();

    try {
      const response = await db
        .collection("confess")
        .find()
        .skip(Number(offset))
        .limit(4)
        .toArray();
      const count = await db.collection("confess").find().count();

      if (response.length > 0) {
        res.status(200).send({ response, count });
      } else {
        res.status(404).send({ message: "no data returned", response });
      }
    } catch (error) {
      res.status(404).send({ message: "no data returned", error });
    }
  } else if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ message: "Missing message" });
      return;
    }

    const { db } = await connect();

    try {
      const response = await db.collection("confess").insertOne({ message });

      res.status(201).json(response.ops[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).json({ message: "Wrong request method" });
  }
};
