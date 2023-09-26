const { User, Group, Audio, Topic } = require("../model/models")
const multer = require('multer')
const express = require('express')
const app = express()

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'data')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage: storageConfig }).single('Audiopath'))

const indexPageAdmin = (req, res) => {

    User.findAll({ raw: true }).then(users => {

        Group.findAll({ raw: true }).then(groups => {

            Audio.findAll({ raw: true }).then(audios => {
                Topic.findAll({ raw: true }).then(topics => {
                    User.findOne({ where: { id: req.cookies['id'], name: req.cookies['name'] } }).then(checkAdminRole => {

                        if (checkAdminRole.role == 'ADMIN') {
                            let data = { 'users': users, 'len': users.length, 'groups': groups, 'audios': audios, 'topics': topics }
                            res.render('./admin/admin.hbs', data)
                        } else {
                            res.render('err')
                        }

                    })
                })
            })

        })
    })
}

const createUser = (req, res) => {
    const today = new Date()
    User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        createdAt: today.toLocaleString(),
        updatedAt: today.toLocaleString()
    })
    res.redirect('/admin')
}

const createUserView = (req, res) => {
    res.render('./admin/create-user')
}

const editUserView = (req, res) => {
    User.findAll({ where: { id: req.params.id } }).then(user => {
        res.render('./admin/edit-user', { 'user': user[0] })
    })

}

const editUser = (req, res) => {
    User.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin')
    })

}

const deleteUser = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(() => {
        //res.send(`удаление пользователя с id = ${req.params.id} `)
        res.redirect('/admin')
    }).catch(err => console.error(err))
}

const createGroup = (req, res) => {
    Group.create({
        name: req.body.name
    })
    res.redirect('/admin')
}

const createGroupView = (req, res) => {
    res.render('./admin/create-group')
}

const createAudioView = (req, res) => {
    Group.findAll().then(groups => {
        res.render('./admin/create-audio', { group: groups })
    })

}

const createAudio = (req, res) => {
    Audio.create({
        title: req.body.title,
        path: req.file.filename,
        groupId: req.body.group
    }).catch(err => console.log(err))
    res.redirect('/admin')
    //res.send(`${req.file.filename}; ${req.body.title}; ${req.body.group}`)
}

const deleteAudio = (req, res) => {
    Audio.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect('/admin')
    }).catch(err => console.log(err))
}

const createTopicView = (req, res) => {
    User.findAll().then(users => {
        res.render('./admin/create-topic', { 'users': users })
    })
}

const createTopic = (req, res) => {
    Topic.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    }).catch(err => console.log(err))
    res.redirect('/admin')
}

const deleteTopic = (req, res) => {
    Topic.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect('/admin')
    })
}

module.exports = { indexPageAdmin, createUser, createUserView, editUser, editUserView, deleteUser, createGroup, createGroupView, createAudio, createAudioView, deleteAudio, createTopic, deleteTopic, createTopicView }