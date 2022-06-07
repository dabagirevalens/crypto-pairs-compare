# Crypto Currency Pairs -- Comparison
#### App to compare any cryptocurrency pair 


### Table of content
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)


## General info
This is a project that help any one to find the excange rate between any two cryptocurrency pair <br/>
example: ETH <-> BTC (currently 1ETH = O.059BTC) <br/>


## Technologies
Project was created with:
* axios: 0.27.2
* express: 4.18.1
* nodemon: 2.0.16
* dotenv: 16.0.1
* swagger-ui-express: 4.4.0
* swagger-jsdoc: 6.2.1
* [Nomic APIs](https://nomics.com/docs/#operation/getCurrencies)


## Setup
To run this project, install it locally using pnpm: 
```
$ git clone https://github.com/dabagirevalens/crypto-pairs-compare.git
$ cd crypto-pairs-compare
$ pnpm install
$ pnpm start
```
you need also to provide your nomic api key in .env file <br/>
to be able to get access to crypto currencies prices
