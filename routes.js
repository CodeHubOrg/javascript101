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
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;
var options = require('./config.js')



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
  '/oauth': 'oauth.md',
  '/login': 'login.md'
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

passport.use(new GitHubStrategy({
    clientID: options.GITHUB_CLIENT_ID,
    clientSecret: options.GITHUB_CLIENT_SECRET,
    callbackURL: "https://staging.javascript101.co.uk/login/github/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile)
  }
));

router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

router.use(passport.initialize());
router.use(passport.session());


router.get('/login/github',
  passport.authenticate('github'));

router.get('/login/github/return', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router
