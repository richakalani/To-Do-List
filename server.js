const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/todo');
const url = "mongodb+srv://username:password@cluster0.1ofp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const todoTask = require("./models/todo");
//initializing the express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//PORT Number
PORT = 3000;

//connecting with mongo atlas database


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("connected to db")
    app.listen(PORT, console.log(`Server is started on PORT ${PORT}`));
});

//Use public folder
app.use(express.static(__dirname + '/public'));

//set view engine to ejs
app.set('view engine', 'ejs');

app.get("/", async (req, res)=>{
   todoTask.find({} , (err, tasks)=>{
        res.render('todo.ejs', {TodoTasks : tasks});
    });

});




//Routes
app.use('/', router); 


