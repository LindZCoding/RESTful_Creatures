
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require("method-override")

// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware
// makes req.body work
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

// controllers middleware
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use("/prehistoric", require('./controllers/prehistoric.js'))
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

// Prehistorci Lesson
// Index Route-Lab
app.get('/prehistoric', (req, res)=> {
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)
    // for checking
    // console.log(prehistoricData)
    res.render('prehistoric/index.ejs', {prehistoricData})
})


// New Route- Lab
app.get('/prehistoric/new', (req, res)=> {
    res.render('prehistoric/new.ejs')
})



// Show Route-Lab
app.get('/prehistoric/:idx', (req, res)=> {
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)
    let prehistoricIndex = req.params.idx
    // console.log(dinoData[dinoIndex])
    res.render('prehistoric/show.ejs', {myprehistoric: prehistoricData[prehistoricIndex]})
})



app.listen(8000, ()=> {
    console.log("It's Dino Time ")
})
