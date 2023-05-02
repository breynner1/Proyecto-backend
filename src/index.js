const app = require ('./server.js')
require('./database.js')

app.listen (app.get('port'), () => {
    console.log ('Listening on port ', app.get('port'))
})


