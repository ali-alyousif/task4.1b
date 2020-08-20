var express = require('express');
var router = express.Router();
var cors = require('cors')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

const User = require('../models/users')
router.use(cors())

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
*/

router.post('/', (req, res) => {
	const today = new Date()
	const UserData = {
		first_name : req.body.firstname,
		last_name : req.body.lastname,
		email : req.body.email,
		password : req.body.password,
		created : today
	}
	
	console.log(UserData);
	
	User.findOne({
		email: req.body.email
	})
	.then ( user => {
	    if(!user){
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				UserData.password = hash
				
				User.create(UserData)
				   .then(user => {
					   //res.json({status:user.email + 'Registered'})
					   console.log('Success')
				   })
				   .catch(err => {
					   //res.send('error: '+ err)
					   console.log('Error')
				   })
			})
		}
		else {
			//res.json({error: 'User already exists'})
			console.log('User already exists');
		}
	})
	
	res.render('signup', { title: 'Express' });
})

module.exports = router;
