const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');

// Config
    // Template Engine
    const hbs = handlebars.create({
        defaultLayout: "main"    
    })    
    app.engine("handlebars", () => hbs)    
    app.set("view engine", "handlebars")
    // MySQL connection
    const sequelize = new Sequelize('test', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    })
    // Routes
    app.get('/main', function(req, res){
        res.send('This is the post page')
    })    
app.listen(8080, function(){
    console.log('server running...')
});