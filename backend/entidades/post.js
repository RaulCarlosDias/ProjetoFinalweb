const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config');

class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
});

module.exports = Post;