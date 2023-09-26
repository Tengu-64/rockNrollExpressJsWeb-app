require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const sequelize = require('./db')
const multer = require('multer')
const hbs = require('hbs')
const indexRouter = require('./routes/indexRouter')
const topicRouter = require('./routes/topicRouter')
const adminRouter = require('./routes/adminRouter')
const { User } = require('./model/models')

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


sequelize.authenticate()
sequelize.sync()

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static('static'))
app.use(express.static('data'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('caQ6Rlaet7gP6DdAyaQkPwTq8R2fOV'))

app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use('/admin', adminRouter)


app.listen(process.env.PORT, () => console.log(`port ${process.env.PORT} is working`))

app.use((req, res) => {
    res.render('err')
})