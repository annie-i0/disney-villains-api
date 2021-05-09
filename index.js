const express = require('express')
const bodyParser = require('body-parser');
const teams = require('./villains')
const { getAllVillains, getOneVillain, saveNewVillain } = require('./controller/villains')

const app = express()

app.get('/', getAllVillains)

app.get('/villains/:slug', getOneVillain) 

app.post('/', bodyParser.json(), saveNewVillain);
  
app.all('*', (request, response) => {
    return response.sendStatus(404)
})

app.listen(1343, () => {
    console.log('Listening on port 1343...'); //eslint-disable-line no-console
})