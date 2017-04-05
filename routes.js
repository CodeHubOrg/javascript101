var express = require('express')
var router = express.Router()
var logoList = require('./model/logo')
var doc = require('./utils/doc')
var quotesInspiration = require('./model/quotesInspiration')
var quotesCrockford = require('./model/quotesCrockford')
var quotesJokes = require('./model/quotesJokes')

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Welcome to JavaScript 101',
    message: 'We are a JavaScript meetup group in Bristol, UK.',
    logoList: logoList,
    quotesInspiration: quotesInspiration,
    quotesCrockford: quotesCrockford,
    quotesJokes: quotesJokes
  })
})

router.get('/getting-started', function (req, res) {
  doc.render('getting-started.md', res)
})

router.get('/getting-started/git', function (req, res) {
  doc.render('git.md', res)
})

router.get('/about', function (req, res) {
  doc.render('about.md', res)
})

router.get('/careers', function (req, res) {
  doc.render('careers.md', res)
})

router.get('/presentations', function (req, res) {
  doc.render('presentations.md', res)
})

router.get('/pair-programming', function (req, res) {
  doc.render('pair-programming.md', res)
})

module.exports = router
