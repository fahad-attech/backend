import express from "express";
//initiate the app
const app = express();

const PORT = 3006;

app.get("/", (req, res) => {
  const body = {
    name: "Zain",
    email: "ze@gmail.com",
  };
  res.send(body);
});

app.listen(PORT, () => {
  console.assert(`Server Running at ${PORT}`);
});
