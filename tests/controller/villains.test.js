/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getOneVillain, saveNewVillain } = require('../../controller/villains')
const { response, request } = require('express')
const models = require('../../models')
const { villainsList, singleVillain } = require('../controller/mocks/villains')


chai.use(sinonChai)
const { expect } = chai


describe('Villains Controller', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })

  describe('Gets All Villains', () => {
    it('gets list of villains from DB and calls response.send() with that list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })

  describe('Get Villain by Slug', () => {
    // eslint-disable-next-line max-len
    it('get a single villain associated with the provided slug from the DB and calls  response.send() with that list', async () => {
      // const stubbedFindOne = sinon.stub(models.villains, 'findOne').returns(singleVillain)
      stubbedFindOne.returns(singleVillain)
      const request = { params: { slug: 'red-skull' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getOneVillain(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'red-skull' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('return a 404 when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }
      const stubbedSendStatus = sinon.stub()
      const response = { sendStatus: stubbedSendStatus }

      await getOneVillain(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 error with a message', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'error-slug' } }

      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }

      await getOneVillain(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'error-slug' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('Unable to retrieve villain, please try again')
    })
  })

  describe('Save New Villain', () => {
    // eslint-disable-next-line max-len
    it('accepts new villain details and saves them as a new hero, returning the saved record with a 201 status', async () => {
      const request = { body: singleVillain }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(singleVillain)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })
})
