// routes/home.js
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

//Sort
router.get('/1', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})

router.get('/2', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})

router.get('/3', (req, res) => {
  Restaurant.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})

router.get('/4', (req, res) => {
  Restaurant.find({})
    .sort({ location: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})

module.exports = router