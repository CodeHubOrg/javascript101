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
    active: '/',
    logoList: logoList,
    quotesInspiration: quotesInspiration,
    quotesCrockford: quotesCrockford,
    quotesJokes: quotesJokes
  })
})

var navitems = {
  '/getting-started': 'getting-started.md',
  '/getting-started/git': 'git.md',
  '/about': 'about.md',
  '/careers': 'careers.md',
  '/presentations': 'presentations.md',
  '/pair-programming': 'pair-programming.md',
  '/code-reviews': 'code-reviews.md',
  '/roadmap': 'roadmap.md'
}

for (var key in navitems){ 
  var navlink = key;
  (function(link){
    router.get(link, function(req, res){
      doc.render(navitems[link], res, {active: link})
    })
  })(navlink)
}

router.get('/projects', function(req, res){
  res.render('projects', {active: '/projects'})
})

router.get('/resources', function(req, res){
  res.render('resources', {active: '/resources'})
})

module.exports = router
