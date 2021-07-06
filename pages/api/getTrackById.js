import { getTrackByID } from "../../lib/db-admin";

export default async (req, res) => {
  const trackById = await getTrackByID(req.headers.token);

  res.status(200).json({ trackById });
};
