const express = require('express');
const { redirect } = require('express/lib/response');
//const todo = require('../models/todo');
const todoTask = require("../models/todo")
const router = express.Router();


router.post('/', async(req, res) => {
    const newTask = todoTask({
        content: req.body.content
    })

    try{
        await newTask.save();
        res.redirect('/')
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
})

router.get("/remove/:id", (req, res)=>{
    const id = req.params.id;
    todoTask.findByIdAndRemove(id, err =>{
        if(err) return res.send(500, err);
        res.redirect("/")
    })
})

router.route("/edit/:id")
.get((req, res)=>{
    const id = req.params.id;
    todoTask.find({}, (err, tasks)=>{
        res.render("editTodo.ejs", {todoTasks: tasks, idTask:id})
    })
})
.post((req, res)=>{
    const id = req.params.id;
    todoTask.findByIdAndUpdate(id, {content: req.body.content}, err=>{
        if(err) return res.send(500, err);
        res.redirect("/");
    })
})









//home page
// router.get('/', (req, res)=>{
//     res.render('todo')
// });

// router.post('/', async (req, res) => {

//     const task = new todoTask({
//         content: req.body.content
//     });

//     try{
//         await task.save();
//         res.redirect('/')
//     }
//     catch(err){
//         res.redirect("/")
//         console.log(err)
//     }

// });

// router.post('edit', async(req, res)=>{
//     const id = req.params.id;
//     todoTask.findByIdAndUpdate(id, {
//         content: req.body.content
//     })

//     try{
//         await id.save();
//         res.redirect('/')
//     }
//     catch(err){
//         res.redirect("/")
//         console.log(err)
//     }

// })



module.exports = router;