var db = require("../models");
var passport = require("../config/passport");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {

    res.json("/members");
  });
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {

      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
      });
    }
  });

  app.get('/api/tasks/:id', function(req, res) {
    db.Tasks.findAll({ where: { user_id: req.params.id } }).then(tasks => res.json(tasks));
  });

  app.post('/api/task', function(req, res) {
    db.Tasks.create({ task: req.body.task, complete: req.body.complete, user_id: req.body.user_id }).then(function(task) {
      res.json(task);
    });
  });

  app.put('/api/task/:id', function(req, res) {
    db.Tasks.findByPk(req.params.id).then(function(task) {
      task.update({
        task: req.body.task,
        complete: req.body.complete
      }).then((task) => {
        res.json(task);
      });
    });
  });

  app.delete('/api/task/:id', function(req, res) {
    db.Tasks.findByPk(req.params.id).then(function(task) {
      task.destroy();
    }).then((task) => {
      res.sendStatus(200);
    });
  });

  app.get('/api/images/:id', function(req, res) {
    db.Images.findAll({ where: { user_id: req.params.id } }).then(images => res.json(images));
  });

  // app.post('/api/image', function(req, res) {
  //   db.Images.create({ filename: req.body.filname, user_id: req.body.user_id }).then(function(image) {
  //     res.json(image);
  //   });
  // });

      // configure storage
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          /*
            Files will be saved in the 'uploads' directory. Make
            sure this directory already exists!
          */
          cb(null, './client/src/uploads');
        },
        filename: (req, file, cb) => {
          var userId = req.body['userId']
          console.log(req.body['userId'])
          /*
            uuidv4() will generate a random ID that we'll use for the
            new filename. We use path.extname() to get
            the extension from the original file name and add that to the new
            generated ID. These combined will create the file name used
            to save the file on the server and will be available as
            req.file.pathname in the router handler.
          */
          const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, newFilename);
          db.Images.create({ filename: newFilename, user_id: userId }).then(function(image) {
            // res.json(image);
          });
          // }
          // addImgToDb(newFilename,userId)
        },
      });
      // create the multer instance that will be used to upload/save the file
      const upload = multer({ storage });
  
      // const app = express();
  
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
  
      app.post('/api/upload', upload.single('selectedFile'), (req, res) => {
        // userId = req.body['userId']
        // console.log(userId)
        
        /*
          We now have a new req.file object here. At this point the file has been saved
          and the req.file.filename value will be the name returned by the
          filename() function defined in the diskStorage configuration. Other form fields
          are available here in req.body.
        */
        // console.log(res.status)
        res.send();
      });

    //   function addImgToDb(filename,userId) {
    //     db.Images.create({ filename: filename, user_id: userId }).then(function(image) {
    //       res.json(image);
    //     });
    // }
};
