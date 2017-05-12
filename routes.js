var express = require('express')
var router = express.Router()
var techList = require('./model/tech')
var logoList = require('./model/logo')
var meetupList = require('./model/meetup')
var sponsorList = require('./model/sponsor')
var doc = require('./utils/doc')
var quotesInspiration = require('./model/quotesInspiration')
var quotesCrockford = require('./model/quotesCrockford')
var quotesJokes = require('./model/quotesJokes')

console.log(meetupList, techList)

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Welcome to JavaScript 101',
    message: 'We are a JavaScript meetup group in Bristol, UK.',
    active: '/',
    techList: techList,
    logoList: logoList,
    meetupList: meetupList,
    sponsorList: sponsorList,
    quotesInspiration: quotesInspiration,
    quotesCrockford: quotesCrockford,
    quotesJokes: quotesJokes
  })
})

var navItems = {
  '/getting-started': 'getting-started.md',
  '/getting-started/git': 'git.md',
  '/about': 'about.md',
  '/careers': 'careers.md',
  '/presentations': 'presentations.md',
  '/getting-started/roadmap': 'roadmap.md',
  '/pair-programming': 'pair-programming.md',
  '/code-reviews': 'code-reviews.md',
  '/team-environment': 'team-environment.md',
  '/best-practices': 'best-practices.md',
  '/feedback': 'feedback.md',
  '/tech-stack': 'tech-stack.md'
}

for (var key in navItems){
  var navLink = key;
  (function(link){
    router.get(link, function(req, res){
      doc.render(navItems[link], res, {active: link})
    })
  })(navLink)
}

router.get('/getting-started/roadmap-visual', function(req, res){
  res.render('roadmap-visual', {active: '/getting-started/roadmap-visual'})
})

router.get('/projects', function(req, res){
  res.render('projects', {active: '/projects'})
})

router.get('/resources', function(req, res){
  res.render('resources', {active: '/resources'})
})

module.exports = router
