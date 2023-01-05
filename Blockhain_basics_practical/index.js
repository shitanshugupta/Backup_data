const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const Blockchain = require('./blockchain');
const PubSub = require('./publishersubscriber');

const app = express();
const blockchain = new Blockchain();

const pubsub = new PubSub({ blockchain })
setTimeout(() => {
    pubsub.broadcastchain()
}, 1000)

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
})
app.post('/api/mines', (req, res) => {
    const { data } = req.body
    console.log(data);
    blockchain.addBlock({ data })
    pubsub.broadcastchain();
    res.redirect('/api/blocks')
})
const synChains = () => {
    request(
        { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
        (error, reposnse, body) => {
            console.log(body,"line 34");
            if (!error && reposnse.statusCode === 200) {
                const rootChain = JSON.parse(body);
                console.log("Replace chain on sync with", rootChain);
                blockchain.replaceChain(rootChain);
            }
        }
    );
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {// when we run cross-env dependency then it will execute this code
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000); // for generating random ports for randon node in a blockchain network
}
const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
    synChains()
})