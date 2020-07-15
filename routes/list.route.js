const router = require('express').Router();
const User = require('../models/user.model')
const List = require('../models/list.model')

router.post('/new', (req, res) => {
    let cuisine = new List(req.body);
    cuisine
    .save()
    .then(() => {
        res.redirect("/")
    })
    .catch(err => {
        console.log(err)
    })
})
router.get('/new', (req, res) => {
    res.render('lists/new')
})

router.get('/show/:id', (req, res) => {})

module.exports = router
