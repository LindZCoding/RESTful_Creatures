const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res)=>{
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        prehistoricData = prehistoricData.filter((predino)=> {
            return predino.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('prehistoric/index.ejs', {prehistoricData: prehistoricData})
})

// NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('prehistoric/new.ejs')
})


//GET UPDATE FORM
router.get("/edit/:idx", (req, res)=> {
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)

    res.render("prehistoric/edit.ejs", {predinoId: req.params.idx, predino: prehistoricData[req.params.idx]})
})

//UPDATE DINO
router.put("/:idx", (req,res) => {
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)

    prehistoricData[req.params.idx].type = req.body.type
    prehistoricData[req.params.idx].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric.json', JSON.stringify(prehistoricData))
    res.redirect("/prehistoric")
})


// SHOW ROUTE
router.get('/:idx', (req, res)=>{
    // get dinosaurs array
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    res.render('prehistoric/show.ejs', {myDino: prehistoricData[dinoIndex]})
})

// POST A NEW DINO
router.post('/', (req, res)=>{
    // get dinosaurs array
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)

    // add new dino to dinoData
    prehistoricData.push(req.body)

    // save updated dinoData to json
    fs.writeFileSync('./prehistoric.json', JSON.stringify(prehistoricData))

    // redirect to GET /dinosaurs (index)
    res.redirect('/prehistoric')
})

router.delete("/:idx", (req, res) => {
    //get dino array
    let prehistoric = fs.readFileSync('./prehistoric.json')
    let prehistoricData = JSON.parse(prehistoric)

    //remove deleted dinosaur from dino array
    prehistoricData.splice(req.paramsidx, 1)

    //save the new dinos to the json file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(prehistoricData))

    res.redirect("/prehistoric")
})



module.exports = router