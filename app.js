

const express = require('express');

const bodyParser = require('body-parser');

const ejs = require('ejs') ;

const methodOverride = require('method-override');
const Mongoose = require('mongoose') ;

Mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser : true, useUnifiedTopology : true}, (err)=>{err ? console.log(err.red): console.log('succefully connected' .underline.green);});

var colors = require('colors');

require('dotenv/config');

const app = express();


// schema 
const Article = require('./Schema');
/* saving data 
const article = new Article({
    title : "hii",
    content : "hwloo"
})

article.save((err)=>{err ? console.log(err) : console.log("saved data ");});
*/
app.set('view engine','ejs') ;

app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.get('/article', (req ,res) =>{
    Article.find((err , findArticle)=>{
        if(err){
            console.log(err);
        }else{
            res.render('home', {Articles : findArticle})      
        }
    })
});
app.post('/article', (req,res)=>{
    const article = new Article ({
        title : req.body.title,
        content : req.body.content
    });
    article.save((err)=> err ? console.log(err) : console.log('saved data'.cyan)) ;
    res.redirect('/article')  
});

app.get('/article/:id', (req ,res)=>{
   Article.findOne({_id : req.params.id},(err , findArticle)=>{
       if(err) { console.log(err) }
       else {
          res.render('article', {article : findArticle})
       } 
   }) 
});

app.delete('/article/:id', (req ,res)=>{
    console.log(res.status());
    Article.deleteOne({_id : req.params.id},(err)=>{err ? console.log(err) : console.log("succefully delete");});
    res.redirect('/article')
})
app.listen(process.env.Port, ()=>{console.log(`Server Started on port ${process.env.Port}`.yellow)});
