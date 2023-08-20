require('dotenv').config()

// module.exports = {
//   "development": {
//     "username": "root",
//     "password": 'root',
//     "database": "db_ayfn",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "port"   : "3306",

//   },
//   "test": {
//     "username": "root",
//     "password": 'root',
//     "database": "db_ayfn",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "port"   : "3000",
//   },
//   "production": {
//     "username": "root",
//     "password": 'root',
//     "database": "db_ayfn",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "port"   : "3000",
//   }
// }


module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port": process.env.DB_PORT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port": process.env.DB_PORT
  }
}




