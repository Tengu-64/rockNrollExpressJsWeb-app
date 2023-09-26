const router = require('express').Router()
const { urlencoded } = require('express')
const { indexPageAdmin, createUser, createUserView, editUser, editUserView, deleteUser, createGroup, createGroupView, createAudio, createAudioView, deleteAudio, createTopic, deleteTopic, createTopicView } = require('../controllers/adminController')
const { User } = require('../model/models')

router.get('/', indexPageAdmin)

router.get('/create-user', createUserView)

router.post('/create-user', createUser)


router.get('/edit-user/:id', editUserView)
router.post('/edit-user/:id', editUser)

router.post('/delete-user/:id', deleteUser)

router.get('/create-group', createGroupView)
router.post('/create-group', createGroup)

router.get('/create-audio', createAudioView)
router.post('/create-audio', createAudio)
router.post('/delete-audio/:id', deleteAudio)


router.get('/create-topic', createTopicView)
router.post('/create-topic', createTopic)

router.post('/delete-topic/:id', deleteTopic)

module.exports = router