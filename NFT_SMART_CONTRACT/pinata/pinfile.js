const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
// const path = require('../metadata/images/download.jpeg')
// const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "metadata/images/download.jpeg";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const metadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                //   Authorization: JWT
                pinata_api_key: "272f89da2c019ee1c206",
                pinata_secret_api_key: "da7a0b3dc4fe14ce2d0d82186004b2a813c184a767bf46c6657b266e84ae77e0"

            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

pinFileToIPFS();