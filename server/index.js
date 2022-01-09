import express from 'express';

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
}

app.post("/api/notes", (request, response) => {
  let status = 201;
  const body = request.body

  if (!body.content) {
    status = 400;
    return response.status(status).json({
      error: 'content missing'
    })
  }

  const note = {
    id: generateID,
    content: body.content,
    important: body.important || false,
    date: new Date()
  }

  notes = notes.concat(note);

  response.status(status).json(note);
});

app.get("/api/notes/:id", (request, response) => {
  let status = 200;

  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.status(status).json(note);
  } else {
    status = 404;
    response.status(status).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  let status = 200;

  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  status = 204;
  response.statusMessage = `Note with id:${id} deleted`;
  response.status(status).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running in port http://localhost:${PORT}`);
});

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];
