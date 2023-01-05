const redis = require('redis')
const CHANNEL = {
    BLOCKCHAIN: "BLOCKCHAIN"
}
class pubsub {
    constructor({ blockchain }) {
        this.blockchain = blockchain
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNEL.BLOCKCHAIN);
        this.subscriber.on("message", (channel, message) => {//then fires this event
            this.handlemesage(channel, message)
        })
    }
    handlemesage(channel, message) { // to call this method
        console.log(`message receive.channel ${channel},Message ${message}`);
        const parsemessage = JSON.parse(message)
        if(channel===CHANNEL.BLOCKCHAIN){
            this.blockchain.replaceChain(parsemessage)
        }
    }
    publish({ channel, message }) {// second call this method
        this.publisher.publish(channel, message)
    }
    broadcastchain() {// instance makes an call to this method first 
        this.publish({
            channel: CHANNEL.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        })
    }
}
module.exports = pubsub
