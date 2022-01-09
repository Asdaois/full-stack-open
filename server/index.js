import cors from 'cors';
import express from 'express';
import pkg from 'express/lib/application.js';
import morgan from 'morgan';

const {path} = pkg;
const app = express();

app.use(express.static('../client/build'));

app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('params', (req) => JSON.stringify(req.params));
app.use(
  morgan(
    ':method :url :status :res[body] :response-time ms \nbody=:body\nparams=:params\n'
  )
);

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

const generateID = (dataDB) => {
  const maxID = dataDB.length > 0 ? Math.max(...dataDB.map((n) => n.id)) : 0;
  return maxID + 1;
};

app.post('/api/notes', (request, response) => {
  let status = 201;
  const body = request.body;

  if (!body.content) {
    status = 400;
    return response.status(status).json({
      error: 'content missing',
    });
  }

  const note = {
    id: generateID(notes),
    content: body.content,
    important: body.important || false,
    date: new Date(),
  };

  notes = notes.concat(note);

  response.status(status).json(note);
});

app.get('/api/notes/:id', (request, response) => {
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

app.delete('/api/notes/:id', (request, response) => {
  let status = 200;

  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  status = 204;
  response.statusMessage = `Note with id:${id} deleted`;
  response.status(status).end();
});

app.get('/api/phonebook/persons', (request, response) => {
  let status = 200;

  response.status(status).json(persons);
});

app.post('/api/phonebook/persons', (request, response) => {
  let status = 200;
  const body = request.body;

  if (!body.number || !body.name) {
    let errorMessage = [];
    !body.number && errorMessage.push('number is missing');
    !body.name && errorMessage.push('name is missing');
    status = 400;
    return response.status(status).json({ error: errorMessage.join(', ') });
  }

  if (
    persons.findIndex(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    ) !== -1
  ) {
    status = 400;
    return response.status(status).json({ error: 'name must be unique' });
  }

  const newPerson = {
    id: generateID(persons),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.get('/api/phonebook/persons/:id', (request, response) => {
  let status = 200;
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) return response.status(status).json(person);

  status = 404;
  response.status(status).end();
});

app.delete('/api/phonebook/persons/:id', (request, response) => {
  let status = 204;
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);

  response.statusMessage = `Person with id:${id} deleted`;
  response.status(status).end();
});

app.get('/api/phonebook/info', (request, response) => {
  const info = {
    message: `Phonebook has info for ${persons.length} people`,
    date: new Date().toString(),
  };
  response.json(info);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in port http://localhost:${PORT}`);
});

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
