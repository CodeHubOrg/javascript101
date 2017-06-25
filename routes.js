var express = require('express')
var router = express.Router()
var techList = require('./model/tech')
var meetupList = require('./model/meetup')
var sponsorList = require('./model/sponsor')
var projectList = require('./model/project')
var doc = require('./utils/doc')
var subpages = require('./utils/subpages')
var quotesInspiration = require('./model/quotesInspiration')
var quotesCrockford = require('./model/quotesCrockford')
var quotesJokes = require('./model/quotesJokes')

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Welcome to JavaScript 101',
    message: 'We are a JavaScript meetup group in Bristol, UK.',
    active: '/',
    techList: techList,
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
  '/best-practices': 'reference/best-practices.md',
  '/careers': 'careers.md',
  '/presentations': 'what-we-do/presentations.md',
  '/getting-started/roadmap': 'roadmap.md',
  '/pair-programming': 'what-we-do/pair-programming.md',
  '/code-reviews': 'what-we-do/code-reviews.md',
  '/team-environment': 'team-environment.md',
  '/feedback': 'feedback.md',
  '/tech-stack': 'tech-stack.md',
  '/oauth': 'oauth.md'
}

for (var key in navItems){
  var navLink = key;
  (function(link){
    router.get(link, function(req, res){
      doc.render(navItems[link], res, {active: link})
    })
  })(navLink)
}

// router.get('/reference', function(req, res){
//   subpages.render('docs/reference', res, {active: '/reference', header1: 'Reference'})
// })

router.get('/what-we-do', function(req, res){
  subpages.render('docs/what-we-do', res, {active: '/what-we-do', header1: 'What we do'})
})

// router.get('/getting-started/roadmap', function(req, res){
//   res.render('roadmap', {active: '/getting-started/roadmap'})
// })

router.get('/projects', function(req, res){
  res.render('projects', {active: '/projects', projectList: projectList})
})

router.get('/resources', function(req, res){
  res.render('resources', {active: '/resources'})
})

router.get('/contact', function(req, res){
  res.render('contact', {active: '/contact'})
})

module.exports = router
