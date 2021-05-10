const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getOneVillain = async (request, response) => {
  const slug = request.params.slug
  const villains = await models.villains.findOne({ where: { slug } })

  return response.send(villains)
}

const saveNewVillain = async (request, response) => {
  const { movie, name, slug } = request.body

  if (!movie || !name || !slug) {
    return response.status(400).send('The following fields are required: movie, name, slug')
  }

  const newVillain = { movie, name, slug }

  const villains = await models.villains.create(newVillain)

  return response.status(201).send(villains)
}

module.exports = { getAllVillains, getOneVillain, saveNewVillain }
