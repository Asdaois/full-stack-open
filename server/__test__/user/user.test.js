const UserModel = require('../../models/UserModel')
const bcrypt = require('bcrypt')
const app = require('../../src/app')
const { usersInDB } = require('./test_helper')
const mongoose = require('mongoose')

const api = require('supertest')(app)

describe('When there is initially one user in db', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({})

    const passwordHash = await bcrypt.hash('hateislove', 10)
    const user = new UserModel({ username: 'root', passwordHash })

    await user.save()
  }, 100000)

  test('creation succeds wit a fresh username', async () => {
    const userAtStart = await usersInDB()

    const newUser = {
      username: 'jose_interrogated',
      name: 'Jose Guevara',
      password: 'not_password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await usersInDB()
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = userAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'root',
      name: 'Super ',
      password: 'failed'
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log({ body: result.body })
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  afterAll(() => {
    mongoose.connection.close()
  })
})
