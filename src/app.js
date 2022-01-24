const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Post = require('./sequelize/Post');

var exphbs = require("express-handlebars");
var hbs = exphbs.create({
  /* settings */
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//SCREENS
//home/index - where the messages will be
app.get('/', function(req, res){
    Post.findAll().then(function(posts){
        res.render('posts', {posts: posts})
    });
});
//admin panel - basically you can delete some messages you find offensive
app.get('/admin', function(req, res) {
    Post.findAll().then(function(posts) {
        res.render('admin', {posts: posts}); 
    });
})
//form screen - the screen where someone can write a message to be listed in the home/index page
app.get('/form', function(req, res){
    res.sendFile(__dirname + '/screens/form.html');
})
//done screen - is the screen that appears when the user finish the message he wrote
app.get('/done', function(req, res) {
    res.sendFile(__dirname + '/screens/done.html');
});
//this page won't be used now...
// app.get('/index', function(req, res) {
//     Post.findAll();
//     res.render('posts');
// });
//this is the function to INSERT INTO mysql table
app.post('/main', function(req, res){
    Post.create({
        postMadeBy: req.body.userEmail,
        postContent: req.body.postContent
    }).then(function(){
        res.redirect('done');
    }).catch(function (erro) {
        res.send('Erro: ' + erro);  
    })
})
app.get('/delete/:id', function(req, res) {
    Post.destroy({where: {'id' : req.params.id}}).then(function() {
        res.redirect('../admin');
    });
})

app.listen(8080, function(){
    console.log('server running...')
});