const express = require('express');
const app = express();
require('ejs')
app.set('view engine', 'ejs');
const port = 5100
const mongoose = require('mongoose');





app.use(express.urlencoded({ extended: true }));
// const nigerianPresidents = [
//     { name: 'Nnamdi Azikiwe', term: '1963-1966' },
//     { name: 'Major General Johnson Aguiyi-Ironsi', term: '1966' },
//     { name: 'General Yakubu Gowon', term: '1966-1975' },
//     { name: 'General Murtala Mohammed', term: '1975-1976' },
//     { name: 'General Olusegun Obasanjo', term: '1976-1979' },
//     { name: 'Shehu Shagari', term: '1979-1983' },
//     { name: 'Major General Muhammadu Buhari', term: '1983-1985' },
//     { name: 'General Ibrahim Babangida', term: '1985-1993' },
//     { name: 'Chief Ernest Shonekan', term: '1993' },
//     { name: 'General Sani Abacha', term: '1993-1998' },
// ]
// const gospleMusic =[
//     {songTitle: 'lalakipo', artist: 'olamide', songUrl: 'https://youtu.be/wX7XNn32lsE?si=AhJFSW9W2LdO9pki'},
//     {songTitle: 'hasibunalaih', artist: 'Olamide',songUrl:'https://youtu.be/fUitu0CaDs8?si=RW9Uda5a3AMzkHwj'},
// ]

// app.get('/music', (req, res) => {
//     res.send(gospleMusic);  
// });



// app.get('/', (request, response)=>{
//     console.log('slash accessed');
//     response.send('Hello World!');

// })

// app.get('/users', (req, res)=>{
//     res.send(nigerianPresidents);
// })

// app.get('/html', (req, res)=>{
//     res.sendFile(`${__dirname}/test.html`);
// })

// app.get('/ejs', (req, res)=>{
//     res.render('index', {names:"Mustapha Adebayo", age: 20});
// })



let URI = "mongodb+srv://abdulsalamabdulsalam1234567:Slazy102@cluster0.98jtxaz.mongodb.net/Trial_db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URI)
    .then(() => {
        console.log("MongoDB connected successfully");

    })
    .catch((err) => {
        console.error("MongoDB connection failed", err);

    })
    //

let customersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, unique: [true, "Email already exists"] },
    password: { type: String, required: true },

})

let customersModel = mongoose.model('customers', customersSchema);

let allCustomers = [];




app.post('/register', (req, res) => {
    console.log(req.body);
    // res.send('User registered successfully!');
    // allCustomers.push(req.body);
    let newCustomer = new customersModel(req.body);
    newCustomer.save()
        .then((data) => {
            console.log(data);
            res.redirect('/dashboard');
        })
        .catch((err) => {
            console.error(err);
            res.send("Error occurred while saving user data: ", err);
        })
})



app.get('/dashboard', (req, res) => {
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
})


app.get('/signup', (req, res) => {
    res.render('signup');
})




app.get('/signin', (req, res) => {
    console.log(req.body);
    res.render('signin',);
})

app.post('/signin', (req, res) => {
    res.send('User signed in successfully!');
})


app.listen(port, () => {
    console.log(`server started at ${port}`);

})
