/* eslint arrow-body-style:0 */
import sql from 'mssql';

const config = {
  user: '...',
  password: '...',
  server: '...', // You can use 'localhost\\instance' to connect to named instance
  database: '...'
  // options: {
  //     encrypt: true // Use this if you're on Windows Azure
  // }
};

function getUser(username = '') {
  return new Promise(
    (resolve, reject) => {
      if (username.length === 0) {
        return reject({ error: 'username is empty' });
      }

      sql
        .connect(config)
        .then(
          () => {
            return new sql
                  .Request()
                  .input('username', sql.VarChar(255), username)
                  .query('select * from users where username = @username')
                  .then(function(recordset) {
                    return resolve(recordset);
                  }).catch(function(err) {
                    return reject({ error: err });
                  });
          }
        )
        .catch(
          err => reject({ error: err })
        );
      }
    );
}
