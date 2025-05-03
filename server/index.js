const app = require("./src/routes/route");
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
