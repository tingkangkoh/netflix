const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));

app.use(express.json());
let users = [
  {
    id: 1,
    name: "John",
    media: [
      { id: 507086, type: "movie" },
      { id: 725201, type: "movie" },
      { id: 756999, type: "movie" },
    ],
  },
  {
    id: 2,
    name: "Alice",
    media: [{ id: 549, type: "movie" }],
  },
  {
    id: 3,
    name: "Patrick",
    media: [{ id: 2744, type: "movie" }],
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/users", (request, response) => {
  response.json(users);
});

app.get("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const user = users.find((user) => user.id === id);
  user ? response.json(user) : response.status(404).end();
});

// app.delete("/api/users/:id", (request, response) => {
//   const id = Number(request.params.id);
//   users = users.filter((user) => user.id !== id);
//   response.status(204).end();
// });

const generateId = () => {
  const maxId = users.length > 0 ? Math.max(...users.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/users", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const user = {
    id: generateId(),
    name: body.name,
    media: [...body.media],
  };

  users = users.concat(user);
  response.json(user);
});

app.put("/api/users/:id", (request, response) => {
  const newMedia = { id: request.body.id, type: request.body.type };
  const id = Number(request.params.id);
  let user = users.find((user) => user.id === id);
  let mediaFound = user.media.find((media) => {
    return media.id === newMedia.id;
  });

  if (!mediaFound) {
    let newUser = { ...user, media: user.media.concat(newMedia) };
    users = users.map((user) => (user.id !== id ? user : newUser));
    response.json(newUser);
  } else {
    response.json("error");
  }
});
app.delete("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const media = request.body.number;
  const user = users.find((user) => user.id === id);
  user.media = user.media.filter((item) => item.id !== media);
  response.json(user.media);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runnign on port ${PORT}`);
});
