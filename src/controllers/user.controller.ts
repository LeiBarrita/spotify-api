import querystring from "querystring";
import { Request, Response } from "express";

export const favorites = async (req: Request, res: Response): Promise<any> => {
  try {
    const accessToken = req.query.access_token;

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
    return res.json(songs);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const playlists = async (req: Request, res: Response): Promise<any> => {
  try {
    const accessToken = req.query.access_token;

    const response = await fetch(
      "https://api.spotify.com/v1/me/playlists?" +
        querystring.stringify({
          limit: 10,
        }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );

    console.log(response);
    const plays = await response.json();
    return res.json(plays);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPlaylistTracks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;
    const accessToken = req.query.access_token;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks?` +
        querystring.stringify({
          fields: "items(added_by(id),track(id,name)),next",
        }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );

    console.log(response);
    const tracks = await response.json();

    return res.json(tracks);
  } catch (error) {
    res.status(500).json({ error });
  }
};
