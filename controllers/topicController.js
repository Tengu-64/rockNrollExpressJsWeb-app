const { Topic, User, Comment } = require('../model/models')
const { Op, where } = require('sequelize')
const hbs = require('hbs')

const createTopicView = (req, res) => {
    res.render('create-topic')
}

const topicsList = (req, res) => {
    Topic.findAll().then(topics => {
        if (req.cookies['id']) {
            data = { 'topics': topics, 'cookieId': true }
        } else {
            data = { 'topics': topics }
        }
        res.render('topic', data)

    })

}

const topicById = (req, res) => {
    let usersId = []
    let users = []
    Topic.findOne({ where: { id: req.params.id } }).then(topic => {

        if (topic) {
            Comment.findAll({ where: { topicId: req.params.id } }).then(comments => {

                for (let i = 0; i < comments.length; i++) {
                    usersId[usersId.length] = comments[i].userId
                }

                usersId.forEach((el) => {
                    User.findAll({ where: { id: el } }).then(userName => {
                        for (let n = 0; n < userName.length; n++) {
                            users[users.length] = userName[n].name

                        }

                    })
                })


                User.findOne({ where: { id: topic.userId } }).then(author => {
                    viewData = { 'topic': topic, 'author': author, 'comment': comments, 'commentsLength': comments.length, 'userName': users }
                    res.render('TopicById', viewData)
                })
                // })
            })
        }
        else {
            res.render('topicNotFound')
        }
    })
}

const comments = (req, res) => {
    Comment.create({
        comment: req.body.comment,
        topicId: req.params.id,
        userId: req.cookies['id']
    })
    res.redirect(`/topic/${req.params.id}`)
}

const createTopic = (req, res) => {

    Topic.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.cookies['id']
    }).then(topc => {
        console.log(topc.id)
        Comment.create({
            comment: 'Уважаемые участники, просьба не грубить и  не оскорблять друг друга, с уважением ваш админ!',
            topicId: topc.id,
            userId: 1
        })
    })

    res.redirect('/topic')
    //})
}


module.exports = { topicsList, createTopicView, topicById, createTopic, comments }