// Require the modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require("helmet");
var expressStaticGzip = require("express-static-gzip");
var mongoose = require("mongoose");


// api routes
var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/api/users');

var app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.set("trust proxy", true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/dist/bundle", expressStaticGzip(path.join(__dirname, "dist/bundle"), {
  enableBrotli: true,
  orderPreference: ["br", "gz"],
  setHeaders: function (res, path) {
    res.setHeader("Catch-Control", "public, max-age=31536000");
  }
}))

// fix depreciation warning
// mongoose.set("useFindAndModified", true);
mongoose.set("useNewUrlParser", true);

// Connect to mongodb database
mongoose.connect("mongodb://localhost:27017/mern-boilerplate", function (err) {
  console.log("mongodb connected ?", err ? false : true);
})

// webpack
// frontend setup
if (process.env.NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var complier = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(complier, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(complier));
}

// Route handler
// server route handler
app.use('/api/users', usersRouter);

// React route handler,
// This route handel react file
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Exports the module
module.exports = app;
