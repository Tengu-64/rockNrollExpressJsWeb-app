const router = require('express').Router()
const {createTopicView, topicsList, topicById, createTopic, comments} = require('../controllers/topicController')

router.get('/', topicsList)


router.get('/create', createTopicView)
router.post('/create', createTopic)

router.get('/:id', topicById)
router.post('/:id', comments)



module.exports = router