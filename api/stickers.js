const router = require('express').Router();
const queries = require('../db/queries')

const isValidID = (req,res,next) =>{
    if(!isNaN(req.params.id)){
       return next()
    }
    next(new Error('Invalid ID'))
}

const validSticker =(sticker)=>{
    const hasTitle = typeof sticker.title == "string" && sticker.title.trim() !=''
    const hasURL = typeof sticker.url == "string" && sticker.url.trim() !=''
    return hasTitle&&hasURL
}

router.get('/',(req,res)=>{
    queries.getAll().then(stickers=>{
        res.json(stickers)
    })
})
router.get('/:id',isValidID,(req,res,next)=>{
    queries.getSticker(req.params.id).then(sticker=>{
        if(sticker)
        res.json(sticker)
        else
        next()
    })
})
router.put('/:id',isValidID,(req,res,next)=>{
    queries.update(req.params.id,req.body).then(sticker=>{
        if(sticker)
        res.json(sticker[0])
        else
        next()
    })
})
router.delete('/:id',isValidID,(req,res,next)=>{
    queries.delete(req.params.id,req.body).then(status=>{
        res.json({
            delete:Boolean(status)
        })
    })
})

router.post('/',(req,res,next)=>{
    if(validSticker(req.body)){
        queries.create(req.body)
            .then(sticker=>res.json(sticker[0]))
    }
    else
    next(new Error('Invalid Sticker'))
})
module.exports = router