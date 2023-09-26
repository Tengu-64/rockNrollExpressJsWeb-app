const { Topic } = require("../model/models")

const topicBy = (req, res) => {
    let users = []
    Topic.findAll({ where: { id: req.params.id } }).then(data => {

        for (let i = 0; i < data.length; i++) {
            let usrId = data[i].userId
            User.findAll({ where: { id: usrId } }).then(rs => {
                users[users.length] = rs.name
                Comment.findAll({ where: { topicId: req.params.id } }).then(comments => {

                    for (let a = 0; a < comments.length; a++) {

                        User.findAll({ where: { id: comments[a].userId } }).then(commentUsername => {



                            // создать массив юзеров
                            let viewData = { 'topic': data, 'user': rs, 'comments': comments, 'commentUsername': users }
                            res.render('TopicById', viewData)


                            //res.render('TopicById', viewData)


                        })
                    }

                })

            })
        }
    })
}


const topicB = (req, res) => {
    Topic.findOne({ where: { id: req.params.id } }).then(topic => {
        if (topic) {
            viewData = { 'topic': topic }
            res.render('TopicById', topic)
        }
        else {
            res.render('topicNotFound')
        }
    })
}

hbs.registerHelper("getComments", () => {
    let userCommentHbsHelper = '<h3>хэлпер работает</h3>'
    for (let usr = 0; i < users.length; usr++) {
        for (let com = 0; comments.length < com; com++) {
            if (usr == com)
                userCommentHbsHelper += `<p>${users[i].name}</p></div>${comments[com].comment}</div>`
            continue;
        }
    }
    return userCommentHbsHelper
});


hbs.registerHelper("getComments", () => {
    let userCommentHbsHelper = ''
    for (let usr = 0; usr < usrs.length; usr++) {
        for (let com = 0; comment.length < com; com++) {
            if (usr == com)
                userCommentHbsHelper += `<p>${users[usr].name}</p></div>${comments[com].comment}</div>`
            continue;
        }
    }
    return new hbs.SafeString(userCommentHbsHelper);
});

hbs.registerHelper('getComments', () => {
    for (let i = 0; i < users.length; i++) {
        usrs[i] = users[i].name
    }// массив всех пользователей по статье

    console.log(usrs)
    //console.log(comment)


    let userCommentHbsHelper = ''
    // for (let i = 0; i < usrs.length; i++) {
    //     for (let u = 0; u < comment.length; u++) {

    //         userCommentHbsHelper += `<tr style="font-weight:bold"><td>${usrs[i]}</td></td> <tr><td>${comment[i]}</td></td>`

    //     }
    // }
    return new hbs.SafeString(userCommentHbsHelper);
})


hbs.registerHelper('getComments', () => {
    let userCommentHbsHelper = ''
    usrs.forEach(user => {
        User.findOne({ where: { name: user } }).then(userData => {
            Comment.findAll({ where: { id: userData.userId } }).then(commentData => {
                userCommentHbsHelper += `<tr style="font-weight:bold"><td>${userData.name}</td></td> <tr><td>${commentData.comment}</td></td>`
            })
        })
    })
    return userCommentHbsHelper
})



const topicById = (req, res) => {
    let usrId = [] // список UserId из таблицы comment, которых нужно вывести
    let usrs = []
    let comment = []
    Topic.findOne({ where: { id: req.params.id } }).then(topic => {

        if (topic) {
            Comment.findAll({ where: { topicId: req.params.id } }).then(comments => {
                for (let i = 0; i < comments.length; i++) {
                    usrId[i] = comments[i].userId
                    comment[i] = comments[i].comment

                    hbs.registerHelper('test', () => {
                        return new hbs.localsAsTemplateData(comments)
                    })
                }


                User.findAll({ where: { [Op.and]: [{ id: usrId }] } }).then(users => { // select всех пользователей по массиву                        

                    // hbs.registerHelper('getComments', () => {
                    //     for (let i = 0; i < users.length; i++) {
                    //         usrs[i] = users[i].name
                    //     }// массив всех пользователей по статье

                    //     console.log(usrs)
                    //     console.log(comment)


                    //     let userCommentHbsHelper = ''
                    //     for (let i = 0; i < usrs.length; i++) {
                    //         for (let u = 0; u < comment.length; u++) {

                    //             userCommentHbsHelper += `<tr style="font-weight:bold"><td>${usrs[i]}</td></td> <tr><td>${comment[i]}</td></td>`

                    //         }
                    //     }
                    //     return new hbs.SafeString(userCommentHbsHelper);
                    // })


                    User.findOne({ where: { id: topic.userId } }).then(author => {


                        viewData = { 'topic': topic, 'author': author, 'user': users, 'comment': comments }
                        res.render('TopicById', viewData)
                    })

                })
            })


        }
        else {
            res.render('topicNotFound')
        }
    })
}




// подключение express
const express = require("express");
// создаем объект приложения
const app = express();

const PORT = process.env.PORT

// определяем обработчик для маршрута "/"
app.get("/", (req, res) => {

    // отправляем ответ
    res.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => console.log(`port ${PORT} is running!`));


const auth = (req, res) => {

    User.findAll({ where: { email: req.body.email, password: req.body.password } }).then(authUser => {
        for (let i = 0; i < authUser.length; i++) {

            res.cookie('role', authUser[i].role)
            res.cookie('id', authUser[i].id)
            res.cookie('name', authUser[i].name)
            res.cookie('email', authUser[i].email)
            res.cookie('password', authUser[i].password)
            res.cookie('role', authUser[i].role)
            res.redirect('/my-page')
            // if (authUser[i].role == 'ADMIN') {
            //     res.redirect('/admin')
            // } else {
            //     res.redirect('/my-page')
            // }

        }


    })
}


const au = (req, res) => {
    User.findOne({ where: { email: req.body.email, password: req.body.password } }).then(authUser=>{
        if(authUser){
            res.cookie('role', authUser.role)
                res.cookie('id', authUser.id)
                res.cookie('name', authUser.name)
                res.cookie('email', authUser.email)
                res.cookie('password', authUser.password)
                res.cookie('role', authUser.role)
                res.redirect('/my-page')
        } else{
            res.redirect('/auth', {err: 'Пользователь не найден. Проверьте введенный email и пароль'})
        }
    })
}