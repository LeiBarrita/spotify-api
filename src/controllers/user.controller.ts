import querystring from "querystring";
import { Request, Response } from "express";

export const favorites = async (req: Request, res: Response) => {
  const accessToken = req.query.access_token;

  // add scope later
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?" +
      querystring.stringify({
        time_range: "long_term",
        limit: 5,
      }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    }
  );

  const songs = await response.json();
  res.json(songs);
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};
