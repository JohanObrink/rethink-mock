const r = require('rethinkdb')

function get (id) {
  return r.connect()
    .then(conn => r.table('users').get(id).run(conn))
}

module.exports = {get}
