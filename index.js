const express = require('express')
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json({ extendedUrl: true }))


const getRate = async (coin) => {
    const { data } = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=6f8bc43bb5a8f29096a7f868b6baaf2d9248d2ea&ids=${coin}`
    )

    return data[0].price;
}


const calculateExchange = async (base, compare, amount) => {
    const rate = await base / compare;
    const result = rate * amount;

    return result;
}


const convert = async (req, res) => {
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


app.listen(PORT, () => console.log("App Has Started.... !"));