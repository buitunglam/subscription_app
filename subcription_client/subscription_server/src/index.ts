import express from 'express';
import authRouters from './routes/auth';

const app = express();

// json
app.use(express.json())
// router
app.use("/auth", authRouters)


app.listen(8080, () => {
    console.log(`Now you listen to the port 8080`);
})