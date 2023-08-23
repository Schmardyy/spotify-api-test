import fetch from "node-fetch";
import { GetAccessToken } from "./GetAccessToken.js";
globalThis.fetch = fetch;

import Express from "express";

const app = new Express();
app.use(Express.json());

// ändern wenn nötig
const PORT = 3000;

// allow CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

let accessToken = "";

// Funktion zum Aktualisieren des Access Tokens
async function updateAccessToken() {
    try {
        accessToken = await new GetAccessToken().getAccessToken();
        console.log("Access Token updated:", accessToken);
    } catch (error) {
        console.error("Error updating Access Token:", error);
    }
}

// Aktualisiere den Access Token bei Serverstart und dann jede Stunde
updateAccessToken();
setInterval(updateAccessToken, 60 * 60 * 999); // Aktualisiere alle 3600000 Millisekunden (1 Stunde)

app.post("/playlist", async (req, res) =>
    res.send(
        await getPlaylist(
            accessToken,
            req.query.query,
            req.query.offset,
            req.query.limit
        )
    )
);

app.post("/song", async (req, res) =>
    res.send(
        await getSong(
            accessToken,
            req.query.query,
            req.query.offset,
            req.query.limit
        )
    )
);

app.post("/album", async (req, res) =>
    res.send(
        await getAlbum(
            accessToken,
            req.query.query,
            req.query.offset,
            req.query.limit
        )
    )
);

app.post("/artist", async (req, res) =>
    res.send(
        await getArtist(
            accessToken,
            req.query.query,
            req.query.offset,
            req.query.limit
        )
    )
);

const getPlaylist = async (accessToken, query, offset, limit) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=playlist&offset=${offset}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const data = await response.json();
    const items = data.playlists.items;
    const results = items.map((item) => {
        return {
            name: item.name,
            artist: item.owner.display_name,
            external: item.external_urls.spotify,
            id: item.id,
            image: item.images[0].url,
        };
    });
    return results;
};

const getSong = async (accessToken, query, offset, limit) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&offset=${offset}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const data = await response.json();
    const items = data.tracks.items;
    const results = items.map((item) => {
        return {
            name: item.name,
            artist: item.artists[0].name,
            external: item.external_urls.spotify,
            id: item.id,
            image: item.album.images[0].url,
        };
    });
    return results;
};

const getAlbum = async (accessToken, query, offset, limit) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=album&offset=${offset}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const data = await response.json();
    const items = data.albums.items;
    const results = items.map((item) => {
        return {
            name: item.name,
            artist: item.artists[0].name,
            external: item.external_urls.spotify,
            id: item.id,
            image: item.images[0].url,
        };
    });
    return results;
};

const getArtist = async (accessToken, query, offset, limit) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=artist&offset=${offset}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const data = await response.json();
    const items = data.artists.items;
    const results = items.map((item) => {
        return {
            name: item.name,
            artist: null,
            external: item.external_urls.spotify,
            id: item.id,
            image: item.images[0]?.url,
        };
    });
    return results;
};

app.listen(3000, () => {
    console.log(
        "\x1b[37m┌───────────────────────────┐\n" +
            "│                           │\n" +
            "│     Server Running On     │\n" +
            "│                           │\n" +
            `├──────── \x1b[35mPORT ${PORT}\x1b[37m ────────┤\n` +
            "│                           │\n" +
            `│  \x1b[36mhttps://localhost:${PORT}\x1b[37m   │\n` +
            "│                           │\n" +
            "└───────────────────────────┘\x1b[0m"
    );
});
