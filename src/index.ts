import express from "express";

const app = express();
app.use(express.json());
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(
        `Service listening at http://localhost:${port}`);
});