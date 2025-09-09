const customersModel = require("../models/user.models");

exports.getSignup =  (req, res) => {
    res.render('signup');
}

exports.postRegister =  (req, res) => {
    console.log(req.body);
    // res.send('User registered successfully!');
    // allCustomers.push(req.body);
    let newCustomer = new customersModel(req.body);
    newCustomer.save()
        .then((data) => {
            console.log(data);
            res.redirect('/user/dashboard');
        })
        .catch((err) => {
            console.error(err);
            res.send("Error occurred while saving user data: ", err);
        })
}

exports.getSignIn =  (req, res) => {
    console.log(req.body);
    res.render('signin',);
}
exports.postLogin =  (req, res) => {
    res.send('User signed in successfully!');
}
exports.getDashboard =   (req, res) => {
    customersModel.find()
        .then((data) => {
            console.log(data);
            allCustomers = data;
            res.render('index', { allCustomers });
        })
        .catch((err) => {
            console.error("Error fetching customers: ", err);
            res.status(500).send("Error fetching customers");

        })
}