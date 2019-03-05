const express = require('express');
const router = express.Router();
const con = require('../mysql-script/connect.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id([0-9]+)', (req, res, next) => {
	const params = req.params;
	console.log(params);

	con.connect(err => {
		if(err) console.log(err);
		console.log('connected');

		con.query('select * from data.users where id = ?', [params.id], (err, result) => {
			if(result == undefined) res.render('users', {id:0, username:null, twitterid:null});
			// con.end();
			res.render('users', result[0]);
		});
	});
});

router.post('/:id([0-9]+)', (req, res) => {
	const params = req.params;
	con.connect(err => {
		if(err) console.log(err);
		console.log('connected');

		con.query('select * from data.users where id = ?', [params.id], (err, result) => {
			// con.end();
			res.send(result);
		});
	});
})

module.exports = router;
