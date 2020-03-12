let mysql = require("mysql");
let pool = mysql.createPool({
  host: "47.104.255.24",
  user: "blog",
  password: "140124",
  database: "person_blog"
});
class Mysql {
  constructor() {}
  query(sql) {
    return new Promise((resolve, reject) => {
      pool.query(sql, function(error, results, fields) {
        if (error) {
          throw error;
        }
        resolve(results);
      });
    });
  }
}
module.exports = new Mysql();
