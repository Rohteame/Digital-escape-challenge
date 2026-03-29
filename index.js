import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.get("/background", (req, res) => {
	res.render("background.ejs");
});

app.get("/room1", (req, res) => {
	res.render("room1.ejs");
});

app.get("/room2", (req, res) => {
	res.render("room2.ejs");
});

app.get("/room3", (req, res) => {
	res.render("room3.ejs");
});

app.get("/success", (req, res) => {
	res.render("success.ejs");
});

app.get("/badge", (req, res) => {
	res.render("badge.ejs");
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });
