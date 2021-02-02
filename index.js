const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "/views")); //setting views directory for views.
app.set("view engine", "hbs"); //setting view engine as handlebars

// serving static files
app.use(express.static(path.join(__dirname, "public")));

const getList = async () => {
    try {
        let list = [];

        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const { btcinr, xrpinr, ethinr, trxinr, eosinr, zilinr, batinr, usdtinr, wrxinr, maticinr } = response.data;    //destructuring top 10 results
        list = [btcinr, xrpinr, ethinr, trxinr, eosinr, zilinr, batinr, usdtinr, wrxinr, maticinr];

        return list;
    } catch (e) {
        console.log(e);
    }
}

app.get('/', async (req, res) => {
    let list = await getList();
    res.render('index', { list });
});

const port = 5000;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});



