const mysql = require('mysql');

const con = Symbol();
const database = Symbol();
const table = Symbol();
const query = Symbol();

module.exports = class SQL {
	constructor(tab) {
		this.set('localhost', 33306, 'root', 'pass', 'data', tab);
	}

	set(host, port, user, pass, DB, tab) {
		this[con] = mysql.createConnection({
			host: host,
			port: port,
			user: user,
			password: pass,
			database: DB
		});
		this[database] = DB;
		this[table] = tab;
	}

	connect() {
		this[con].connect(err => err);
	}

	select(columns = null) {
		if(columns == null){
			this[query] = `select * from ${this[database]}.${this[table]}`;
			return this;
		}
		let q = 'select';
		for(let column of columns){
			q += ` ${column},`;
		}
		q = q.slice(0,-1);
		q += ` from ${this[database]}.${this[table]}`;
		this[query] = q;
		return this;
	}

	where(columns = null) {
		if(columns == null){
			return this;
		}
		let q = '';
		for(let [name, value] of Object.entries(columns)){
			if(q != '')q += ' and';
			q += ` ${name} = ${value}`;
		}
		this[query] += ' where' + q;
		return this;
	}

	run(callback) {
		this[con].query(this[query], callback);
	}

	_query(){
		return this[query];
	}

	close() {
		this[con].end();
	}
}
