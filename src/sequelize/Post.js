const db = require('./db.operation');

const Post = db.sequelize.define('post', {
    postContent: {
        type: db.Sequelize.TEXT
    },
    postMadeBy: {
        type: db.Sequelize.INTEGER
    }
})

module.exports = Post;