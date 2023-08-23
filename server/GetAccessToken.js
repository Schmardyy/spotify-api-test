import "dotenv/config";

class GetAccessToken {
    constructor() {
        this.accessToken = null;
    }

    async getAccessToken() {
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;
        const encoded = `Basic ${btoa(clientId + ":" + clientSecret)}`;
        const url = "https://accounts.spotify.com/api/token";
        const body = `grant_type=client_credentials`;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: encoded,
        };

        const result = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        const data = await result.json();
        return data.access_token;
    }
}

export { GetAccessToken };
