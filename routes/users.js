const express = require('express');
const router = express.Router();
const con = require('../mysql-script/connect.js');
const SQL = require('../mysql-script/SQL.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id([0-9]+)', (req, res, next) => {
	const params = req.params;
	console.log(params);

	const Users = new SQL('users');
	Users.connect();
	Users.select().where({id:params.id}).run((err, result) => {
		Users.close();
		console.log(result);
		res.render('users', result[0]);
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

router.post('/new', (req, res) => {
	const params = req.params;
	console.log(req.body);
	if(req.body != null){
		const Users = new SQL('users');
		Users.connect();
		Users.insert(req.body);
		Users.close();
		res.send('ok');
	}
})

router.post('/update/:id([0-9]+)', (req, res) => {
	const params = req.params;
	console.log(req.body);
	if(req.body != null){
		const Users = new SQL('users');
		Users.connect();
		Users.update(req.body).where({id:params.id}).run((err, result) => {
			Users.close();
			res.send('update');
		});
	}
})

router.post('/delete/:id([0-9]+)', (req, res) => {
	const params = req.params;
	const Users = new SQL('users');
	Users.connect();
	Users.delete().where({id:params.id}).run((err, result) => {
		Users.close();
		res.send('deleted');
	});
})



module.exports = router;
