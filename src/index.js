const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Post = require('./sequelize/Post');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Routes
app.get('/form', function(req, res){
    res.sendFile(__dirname + '/views/html/form.html');
})
app.get('/done', function(req, res) {
    res.sendFile(__dirname + '/views/html/done.html')
});
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

app.listen(8080, function(){
    console.log('server running...')
});