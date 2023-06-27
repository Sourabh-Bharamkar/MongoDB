const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const User = require('./models/user');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('649ae696c71b4c7d350ca1ec')
    .then(user => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err)
    });

});


app.use('/admin', adminRoutes);
app.use(shopRoutes)

app.use(errorController.get404);


mongoose.connect('mongodb+srv://bharamkarsourabh8989:Sourabh8989@cluster0.08skrw2.mongodb.net/shop?retryWrites=true&w=majority')
  .then((result) => {
    User.findOne()
    .then((user)=>{
      if(!user){
        const user=new User({
          name:'Sourabh',
          email:'bharamkarsourabh8989@gmail.com',
          cart:{items:[]}
        })
        user.save()
      }

    })
    app.listen(3000)
    console.log('Connected')

  }).catch((err) => {
    console.log(err)
  })

