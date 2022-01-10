const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const NoteModel = require('./models/NoteModel');
const PersonModel = require('./models/PersonModel');
const mongodb = require('./src/mongodb');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('params', (req) => JSON.stringify(req.params));
app.use(
  morgan(
    ':method :url :status :res[body] :response-time ms \nbody=:body\nparams=:params\n'
  )
);

app.get('/api/notes', async (request, response) => {
  const notes = await NoteModel.find({});
  response.json(notes);
});

app.post('/api/notes', async (request, response, next) => {
  const body = request.body;

  try {
    const note = new NoteModel({
      content: body.content,
      important: body.important || false,
    });

    const noteSaved = await note.save();

    response.status = 201;
    response.json(noteSaved);
  } catch (error) {
    next(error);
  }
});

app.get('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;
  let status = 200;

  try {
    const note = await NoteModel.findById(id);

    if (note) {
      return response.json(note);
    }

    status = 404;
    response.statusMessage = 'Note not found';
    response.status(status).end();
  } catch (error) {
    next(error);
  }
});

app.delete('/api/notes/:id', async (request, response, next) => {
  let status = 200;
  const id = request.params.id;

  try {
    const result = await NoteModel.findByIdAndRemove(id);
    console.log(result);

    status = 204;
    response.statusMessage = `Note with id:${id} deleted`;
    response.status(status).end();
  } catch (error) {
    next(error);
  }
});

app.put('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(id, note, {
      new: true,
    });

    if (updatedNote) return response.json(updatedNote);

    response.status = 404;
    response.json({ error: 'note not founded' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/phonebook/persons', async (request, response) => {
  let status = 200;
  const persons = await PersonModel.find({});

  response.status(status).json(persons);
});

app.post('/api/phonebook/persons', async (request, response, next) => {
  let status = 200;
  const body = request.body;

  if (!body.number || !body.name) {
    let errorMessage = [];
    !body.number && errorMessage.push('number is missing');
    !body.name && errorMessage.push('name is missing');
    status = 400;
    return response.status(status).json({ error: errorMessage.join(', ') });
  }

  try {
    const personWithName = await PersonModel.findOne({ name: body.name });

    if (personWithName) {
      const personFormatted = await personWithName.toJSON();
      return response.json({ ...personFormatted, existName: true });
    }

    const person = new PersonModel({
      name: body.name.toLowerCase(),
      number: body.number.trim(),
    });

    const personSaved = await person.save();

    response.json(personSaved);
  } catch (error) {
    next(error);
  }
});


app.put('/api/phonebook/persons/:id', async (request, response, next) => {
  const id = request.params.id;

  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  try {
    const updatedPerson = await PersonModel.findByIdAndUpdate(id, person, {
      new: true,
    });

    if (updatedPerson) {
      return response.json(updatedPerson);
    }

    response.status = 404;
    response.json({ error: 'person not found' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/phonebook/persons/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    const person = await PersonModel.findById(id);

    if (person) return response.json(person);

    response.status = 404;
    response.end();
  } catch (error) {
    next(error);
  }
});

app.delete('/api/phonebook/persons/:id', async (request, response, next) => {
  let status = 204;
  const id = request.params.id;
  try {
    const result = await PersonModel.findByIdAndRemove(id);
    if (result) {
      response.statusMessage = `Person with id:${id} deleted`;
      return response.status(status).end();
    }

    response.status = 404;
    return response.json({ error: 'person not founded' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/phonebook/info', async (request, response, next) => {
  try {
    const count = await PersonModel.find({}).count();

    const info = {
      message: `Phonebook has info for ${count} people`,
      date: new Date().toString(),
    };
    response.json(info);
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error({ error });

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'wrong id format' });
  }

  if (error.name === 'ValidationError') {
    response.status = 400;
    return response.json({ error: 'validation', message: error.message });
  }

  if (error.name === 'MongoServerError') {
    response.status = 400;
    return response.json({ error: 'duplicate key', message: error.message });
  }

  next(error);
};

app.use(errorHandler);

mongodb.once('open', () => {
  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT;
  app.listen(PORT, async () => {
    console.log(`Server running in port http://localhost:${PORT}`);
  });
});
