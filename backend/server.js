const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())


// quan li tai khoan
const accRouter = require('./routers/acc')
app.use('/api/acc/',accRouter)

//quan li phong tro
const roomRouter = require('./routers/room')
app.use('/api/room/',roomRouter)

//quan li khach thue
const tenantRouter = require('./routers/tenant')
app.use('/api/tenant/',tenantRouter)

//quan li dien nuoc
const DnRouter = require('./routers/diennuoc')
app.use('/api/diennuoc/',DnRouter)

app.listen(8080, () => {
    console.log(`Server started on port`);
});