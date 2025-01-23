import { Request, Response } from "express";
import querystring from "node:querystring";
import { URLSearchParams } from "url";
import generateRandomString from "../utils/generateRandomString";

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
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: `${code}`,
        redirect_uri: `http://localhost:${port}/token`,
      }),
      method: "POST",
    });

    // console.log(tokenjson);
    const tokenjson = await token.json();
    return res.json(tokenjson);
  } catch (error) {
    res.status(500).json({ error });
  }
};
