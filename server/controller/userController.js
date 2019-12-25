/* GET home page. */
exports.welcomeMessage = function (req, res, next) {
    console.log("in userWelcome controller");
    res.send(
        {
            success: true,
            message: 'Welcome to Node APIs'
        }
    );
};

exports.testMessage = function (req, res, next) {
    res.send(
        {
            success: true,
            message: 'Welcome Neeraj MERN Boilerplate'
        }
    )
}

