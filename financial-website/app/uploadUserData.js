const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Example: User data
const userData = {
    user_id: "12345",
    username: "john_doe",
    email: "john@example.com"
};

// Convert the user data to a JSON file
const jsonFilePath = './user_info.json'; // Path where the JSON file will be saved
fs.writeFileSync(jsonFilePath, JSON.stringify(userData, null, 2), 'utf-8');

// Upload to Pinata
const form = new FormData();
form.append('file', fs.createReadStream(jsonFilePath));

axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
    headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer <your_api_key>`  // Replace with your actual Pinata API key
    }
})
.then(response => {
    console.log('Pinning Successful:', response.data);
    // You will receive a response with the CID for the file
    const cid = response.data.IpfsHash;  // The CID can be used to retrieve the file from IPFS
    console.log('IPFS CID:', cid);
})
.catch(error => {
    console.log('Error pinning file:', error);
});
