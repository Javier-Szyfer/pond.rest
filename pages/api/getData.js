import { getAllData } from "../../lib/db-admin";

export default async (_, res) => {
  const tracks = await getAllData();

  res.status(200).json({ tracks });
};
