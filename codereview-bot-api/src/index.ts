import express from "express";
import oauth from "./routes/oauth"

const app = express();

app.use(express.json())
app.use('/api/auth/github', oauth);

app.get('/api', (_req, res) => {
    res.send("codereview-bot-api");
})

export default app;