const mysql = require('mysql');

const call = (err, rows) => {
	if(err)throw err;
	console.log(rows);
};

const con = mysql.createConnection({
	host: 'localhost',
	port: 33306,
	user: 'root',
	password: 'pass'
});

con.connect(err => {
	if(err) console.log(err);
	console.log('connected');
	
	con.query('create database data', err => {
		if(err.number == mysql.ERROR_DB_CREATE_EXISTS){
			con.end();
			return;
		}
		else throw err;

		con.query('create table data.users ('+
			'id int AUTO_INCREMENT, '+
			'username varchar(128) NOT NULL, '+
			'password char(30) NOT NULL, '+
			'twitterid varchar(128) NOT NULL, '+
			'primary key (id) )');

		con.query('insert into data.users (username, password, twitterid) values (\'nameko\', \'nameko\', \'yukinameko0116\')');
		con.query('insert into data.users (username, password, twitterid) values (\'sutenameko\', \'nameko\', \'sutenameko\')');

		con.end();
	});
});
