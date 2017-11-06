var Task = require('./models/task');
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            title: 'Andromeda - Task Manager',
            style: 'index.css',
            logic: 'logic.js'
        }); 
    });

    app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    app.get('/signup', function(req, res) {

        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true // 
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        
         var user = req.user;
        
        Task.find({email: user.local.email}, 'title description', function(err, docs){
            if(err) throw err;
            var tasks = docs;
            res.render('profile.ejs', {
                tasks : tasks,
                user  : req.user,
                title : 'Andromeda - Profile',
                style : 'profile.css',
                logic : 'profile.js',
            });
        });

            
    });
    
    
    app.post('/addtask', function(req, res){
        var title = req.body.title;
        var description = req.body.description;
        var user = req.user;
        
        var newTask = Task ({
            email: user.local.email,
            title: title,
            description: description
        });
        
        Task.createTask(newTask, function(err, task){
            if(err) throw err;
            res.redirect('/profile');
        });
    });

    
    app.get('/task/:task_number?', isLoggedIn, function(req, res){
        var task_number = req.params.task_number;
        var user = req.user;
        Task.find({email: user.local.email}, 'title description', function(err, docs){
            if(err) throw err;
            var tasks = docs;
            res.render('task.ejs', {
                tasks : tasks,
                user  : req.user,
                title : 'Andromeda - Tasks',
                style : 'task.css',
                logic : 'task.js',
                task_number : task_number
            });
        });
    });
    
    app.post('/delete', function(req, res){
        var id = req.body.task_id;
        Task.find({_id: id}).remove().exec();
        res.redirect('/profile');
    });
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}