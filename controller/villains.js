const villains = require('../villains')
const models = require('../models')

const getAllVillains = async (request, response) => {
  const teams = await models.villains.findAll()
  return response.send(villains)
}

const getOneVillain = async (request, response) => {
  const teams = await models.teams.findOne({ where: { slug }})
  return response.send(teams)

}

const saveNewVillain = async (request, response) => {
  const { movie, name, slug } = request.body;

  if (!movie || !name|| !slug) {
      return response.status(400).send('The following fields are required: movie, name, slug');
  }

 const newVillain = { movie, name, slug }

 const teams = await models.villains.create(newVillain)

 return response.status(201).send(villains)
}

// villains.forEach(villain => {
 // console.log(`('${villain.name}', '${villain.movie}', '${villain.slug}'),`)
// })

module.exports= { getAllVillains, getOneVillain, saveNewVillain }