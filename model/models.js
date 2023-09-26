const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER', }
    // commentId
})

const Audio = sequelize.define('audio', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING }
    //groupId
})

const Group = sequelize.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Topic = sequelize.define('topic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false }
    // topicId
    //userId
})

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: false }
    // userId
    // topicId
})

Group.hasMany(Audio)
Audio.belongsTo(Group)
Topic.hasMany(Comment)
Comment.belongsTo(Topic)
User.hasMany(Comment)
Comment.belongsTo(User)
User.hasMany(Topic)
Topic.belongsTo(User)

module.exports = { User, Audio, Group, Comment, Topic }