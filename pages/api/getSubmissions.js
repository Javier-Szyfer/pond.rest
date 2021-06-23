import { getAllSubmissions } from "../../lib/db-admin";

export default async (_, res) => {
  const submissions = await getAllSubmissions();

  res.status(200).json({ submissions });
};
