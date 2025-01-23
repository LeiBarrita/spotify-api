import { Request, Response } from "express";
import querystring from "node:querystring";
import { URLSearchParams } from "url";

export const login = async (req: Request, res: Response) => {
  try {
    const port = process.env.PORT;
    const clientId = process.env.CLIENT_ID;
    const redirect_uri = `http://localhost:${port}/token`;
    let state = generateRandomString(16);
    let scope = "user-read-private user-read-email";

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: clientId,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const helloWorld = async (req: Request, res: Response): Promise<any> => {
  try {
    const code = req.query.code;
    const state = req.query.state;
    const port = process.env.PORT;

    // if (!code || !state) res.redirect(`http://localhost:${port}/login`);

    res.json({
      code: req.query.code,
      state: req.query.state,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const token = async (req: Request, res: Response): Promise<any> => {
  try {
    const code = req.query.code;
    const state = req.query.state;
    const port = process.env.PORT;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    if (!state)
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );

    const token = await fetch("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic" + btoa(clientId + ":" + clientSecret),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: `${code}`,
        redirect_uri: `http://localhost:${port}/home`,
      }),
      method: "POST",
    });

    const tokenjson = await token.json();
    console.log(tokenjson);
    return res.json(tokenjson);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const favorites = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = process.env.AUTH_TOKEN;

    const songs = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );

    // console.log(songs);
    const songsJson = await songs.json();
    return res.json(songsJson);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

function generateRandomString(length: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
