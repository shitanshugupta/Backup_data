import axios from "axios"
export const uploadFileToIPFS = async (file: string | Blob) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    return axios
        .post(url, data, {
            // maxBodyLength: 'Infinity',
            headers: {
                // 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: "76094cc5f7f6d8edfc32",
                pinata_secret_api_key: "d8dd094117cb8be298edc6994468a56976933893f3077f4899abc678f3e687c0",
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
                success: true,
                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

        });
};

