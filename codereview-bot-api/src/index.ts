import express from "express";
import oauthRoute from "./routes/oauth"
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use('/api/auth/github', oauthRoute);
app.use('/api/user', userRoute);

app.get('/api', (_req, res) => {
    res.send("codereview-bot-api");
})

export default app;