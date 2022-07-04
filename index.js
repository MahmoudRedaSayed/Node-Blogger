const express   =require("express");
const body      =require("body-parser");
const  ejs      =require("ejs");
const app       =express();
const _         = require("lodash")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(body.urlencoded({extended: true}));
app.listen(3000,function(){
    console.log("the server is ready now");
})

// home page
app.get("/",function(req,res){
    res.render("home",{posts:posts,homeStartingContent:homeStartingContent});
})


// about page
app.get('/about', function(req, res){
    res.render('about', { aboutContent: aboutContent});
})


// contact page
app.get('/contact', function(req, res){
    res.render('contact', { contactContent: contactContent});
})


// compose page
app.get('/compose', function(req, res){
    res.render('compose');
})

// compose page
app.post('/compose', function(req, res){
    let postTitle   =req.body.postTitle;
    let postBody    =req.body.postBody;
    if(!(postTitle==="" || postTitle===undefined)  && !(postBody==="" || postBody===undefined))
    {
        let obj={
            postTitle:postTitle,
            postBody:postBody
        }
        posts.push(obj);
        res.redirect("/");
    }
    res.redirect("/compose");

})


// post :postTitle
app.get('/posts/:postTitle', function(req, res){

    let requestTitle = _.lowerCase(req.params.postTitle)

    console.log('requestTitle', requestTitle);

    posts.forEach(function(post){
        if(_.lowerCase(post.postTitle) === requestTitle){

            res.render('post', {post: post});
        }
    })

});