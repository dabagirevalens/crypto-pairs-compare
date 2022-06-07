const express = require('express')
const axios = require('axios')

require('dotenv').config()

console.log(process.env.API_KEY)

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json({ extendedUrl: true }))


const getRate = async (coin) => {
    const { data } = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${coin}`
    )

    return data[0].price;
}


const calculateExchange = async (base, compare, amount) => {
    const rate = await base / compare;
    const result = rate * amount;

    return result;
}


const convert = async (req, res) => {
    console.log(req.body)
    const amount = req.body.amount;
    const baseCoin = req.body.baseCoin;
    const compareCoin = req.body.compareCoin;

    // fetch all rates in USD
    const baseCoinRate = await getRate(baseCoin);
    const compareCoinRate = await getRate(compareCoin);

    // get rate in crypto currency
    const exchange = await calculateExchange(baseCoinRate, compareCoinRate, amount);

    res.status(200).json({
        "from": baseCoin,
        "to": compareCoin,
        "exchangeRate": exchange
    })
}


app.post("/", convert);

//swagger api docs

const { swaggerJsdoc, swaggerUi } = require('./swagger')
const swaggerJson = require("./swagger-docs.json");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson, { explorer: true }));


app.listen(PORT, () => console.log("App Has Started.... !"));