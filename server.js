// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();
// const { exec } = require('child_process');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


// const nodemailer = require('nodemailer');

// const sendEmail = async (data) => {
//     try {
        
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'cricketindustry1998@gmail.com', 
//                 pass: "jgcsmyruigsrtnmn" 
//             }
//         });

        
//         let mailOptions = {
//             from: 'cricketindustry1998@gmail.com',
//             to: 'decentralized.smartoracle@gmail.com',
//             subject: 'Stock Data',
//             text: `Symbol: ${data.symbol}\nPrice: ${data.price}\nTime: ${data.time}`
//         };

        
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.response);

        
//         exec('python /Users/veerchaurasia/chainlink/script1.py', (error, stdout, stderr) => {
//             if (error) {
//                 console.error('Error executing Python script:', error);
//                 return;
//             }
//             console.log('Python script output:', stdout);
//         });
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// app.get('/stock/:symbol', async (req, res) => {
//     const symbol = req.params.symbol;
//     try {
//         const response = await axios.get(`https://www.alphavantage.co/query`, {
//             params: {
//                 function: 'TIME_SERIES_INTRADAY',
//                 symbol: symbol,
//                 interval: '1min',
//                 apikey: API_KEY
//             }
//         });
//         const data = response.data['Time Series (1min)'];
//         const latestTime = Object.keys(data)[0];
//         const latestData = data[latestTime];
//         const stockData = {
//             symbol: symbol,
//             price: latestData['1. open'],
//             time: latestTime
//         };
        
        
//         sendEmail(stockData);

//         res.json(stockData);
//     } catch (error) {
//         console.error('Error fetching stock data:', error);
//         res.status(500).send('Error fetching stock data');
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();
// const { exec } = require('child_process');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


// const nodemailer = require('nodemailer');

// const sendEmail = async (data) => {
//     try {
//         
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'cricketindustry1998@gmail.com', // Your Gmail address
//                 pass: "jgcsmyruigsrtnmn"  // Your Gmail password
//             }
//         });

//         
//         let mailOptions = {
//             from: 'cricketindustry1998@gmail.com',
//             to: 'decentrralized.smartoracle@gmail.com', 
//             subject: 'Stock Data',
//             text: `Symbol: ${data.symbol}\nPrice: ${data.price}\nTime: ${data.time}`
//         };

//         
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.response);

//         // After sending email, execute Python script to extract email headers
//         exec('python /Users/veerchaurasia/chainlink/script1.py', (error, stdout, stderr) => {
//             if (error) {
//                 console.error('Error executing Python script:', error);
//                 return;
//             }
//             console.log('Python script output:', stdout);
//         });
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// app.get('/stock/:symbol', async (req, res) => {
//     const symbol = req.params.symbol;
//     try {
//         const response = await axios.get(`https://www.alphavantage.co/query`, {
//             params: {
//                 function: 'TIME_SERIES_INTRADAY',
//                 symbol: symbol,
//                 interval: '1min',
//                 apikey: API_KEY
//             }
//         });
//         const data = response.data['Time Series (1min)'];
//         const latestTime = Object.keys(data)[0];
//         const latestData = data[latestTime];
//         const stockData = {
//             symbol: symbol,
//             price: latestData['1. open'],
//             time: latestTime
//         };
        
//         // Send email with stock data
//         sendEmail(stockData);

//         res.json(stockData);
//     } catch (error) {
//         console.error('Error fetching stock data:', error);
//         res.status(500).send('Error fetching stock data');
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const { exec } = require('child_process');
const { ethers } = require('ethers');
const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"


const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cricketindustry1998@gmail.com', 
                pass: "jgcsmyruigsrtnmn" 
            }
        });

        let mailOptions = {
            from: 'cricketindustry1998@gmail.com',
            to: 'decentralized.smartoracle@gmail.com',
            subject: 'Stock Data',
            text: `${data.symbol}:${data.price}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        exec('python /Users/veerchaurasia/chainlink/script1.py', (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                return;
            }
            console.log('Python script output:', stdout);
        });
        setTimeout(() => {
            exec('ts-node /path/to/your/tsfile.ts', (tsError, tsStdout, tsStderr) => {
                if (tsError) {
                    console.error('Error executing TypeScript file:', tsError);
                    return;
                }
                console.log('TypeScript script executed successfully:', stdout);
                generateAndSaveJson();
            });
        }, 3000);
        const generateAndSaveJson = () => { 
            const filePath = './input.json'; // Path to save the JSON file relative to the current directory
            try {
                fs.writeFileSync(filePath, JSON.stringify(data));
                console.log(`JSON file saved at ${filePath}`);
                executeShellScript();
            } catch (error) {
                console.error('Error saving JSON file:', error);
            }
        };
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
// setTimeout(() => {
//     exec('ts-node /path/to/your/tsfile.ts', (error, stdout, stderr) => {
//         if (error) {
//             console.error('Error executing TypeScript file:', error);
//             return;
//         }
//         console.log('TypeScript file output:', stdout);
//     });
// }, 3000);
const executeShellScript = () => {
    exec('./run_commands.sh', (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing shell script:', error);
            return;
        }
        console.log('Shell script executed successfully:', stdout);
        if (stderr) {
            console.error('Shell script stderr:', stderr);
        }
    });
};


app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: symbol,
                interval: '1min',
                apikey: API_KEY
            }
        });

        
        console.log('API response:', response.data);

        
        if (!response.data || !response.data['Time Series (1min)']) {
            throw new Error('Invalid API response');
        }

        const data = response.data['Time Series (1min)'];
        const latestTime = Object.keys(data)[0];
        const latestData = data[latestTime];

        
        if (!latestData || !latestData['1. open']) {
            throw new Error('Invalid stock data');
        }

        const stockData = {
            symbol: symbol,
            price: latestData['1. open'],
            time: latestTime
        };

        
        sendEmail(stockData);

        res.json(stockData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).send('Error fetching stock data');
    }
});
// Purpose: To update the price on Avalanche Fuji C-Chain and send it to Ethereum Mainnet


const contractAddress = "0x5683d5F8A28c86dBfa48464AC51a5C5026bcC8b3"
const contractAddressFuji = "0x9Ed9f443BD1F4d4116579388B46B4e049104efdd"
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ccipSender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_verifier",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "approvedAddress",
				"type": "address"
			}
		],
		"name": "AddressApproved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "allowUpdation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "req",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "chainid",
				"type": "uint256"
			}
		],
		"name": "PriceRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "PriceUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "reqtLatestPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "sendCrossChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256[2]",
				"name": "_pA",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[2][2]",
				"name": "_pB",
				"type": "uint256[2][2]"
			},
			{
				"internalType": "uint256[2]",
				"name": "_pC",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[1]",
				"name": "_pubSignals",
				"type": "uint256[1]"
			},
			{
				"internalType": "address",
				"name": "calledBy",
				"type": "address"
			}
		],
		"name": "updatePriceandZkProof",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addToLatestPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addToLatestVerification",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "approvedAddresses",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getLatestPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getLatestVerificationValue",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
	

const receiverABI = [
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "messageId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "sourceChainSelector",
                        "type": "uint64"
                    },
                    {
                        "internalType": "bytes",
                        "name": "sender",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Client.EVMTokenAmount[]",
                        "name": "destTokenAmounts",
                        "type": "tuple[]"
                    }
                ],
                "internalType": "struct Client.Any2EVMMessage",
                "name": "message",
                "type": "tuple"
            }
        ],
        "name": "ccipReceive",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "router",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "router",
                "type": "address"
            }
        ],
        "name": "InvalidRouter",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "messageId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "uint64",
                "name": "sourceChainSelector",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "text",
                "type": "string"
            }
        ],
        "name": "MessageReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "req",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "chainid",
                "type": "uint256"
            }
        ],
        "name": "priceRequested",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "requestLatestPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLastPriceAndZkVerification",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "messageId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "text",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getRecentPriceAndVerification",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRouter",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasPendingRequest",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userToData",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const privateKey = '6b0afe34277832cec585545f589ea1861a9b7c158aaee13011a32ef1850d6ed1'
let price = 100 * 1e8;


let userAddress = "0x4D645F2762050ddBCB6b100D602cC0011FAC91b5";
let chainId;
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/dd6bf29b25064af9be1bb6a29a1955de');

try {

    async function ShowData() {
        try {

            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(contractAddress, contractABI, wallet)
            try {
                const tx = await contract.updatePriceandZkProof(price, ["0x2f7da74cd5d263787e03f9c3a7005cc8db03b57f445e25f396d7c68a098e28f3", "0x2bdf3680d8404d991339216d83097e71bafea8d10eccbcfc8c647eddea2e9adb"]
                  , [["0x225147210f827b4553d7138b7efc7f5e510030c3e1743051566a8d7e6d90773a", "0x07a118b8abcbfa33e9b6b7b384afc9ccfae76ac931e3363d9ae35fe498032228"],["0x125d6927f5ebd445347bb4e5fe87ed908a2208ac8a106068486d65055e9e3afb", "0x01a2df5544c8a09245bc619ee56f8e07adff78ac585e5dd47b42dcfaa3b87041"]], ["0x1969d0a2c760ebcb25328aa0f2cfdd565ca7a35aeafab896e1a44c757f78a00d", "0x042f8292fe4384a6131c2f0a20ed9bfaff325b66548599aacdefc4cf3a9becdf"], ["0x0ea9c777dc7110e5a9e89b13f0cfc540e3845ba120b2b6dc24024d61488d4788"], userAddress);
                console.log("userAddress", userAddress)
                await tx.wait();
                console.log("Price updated")
            } catch (error) {
                console.error("Error:", error);
            }
            try {
                const chainIdFuji = "14767482510784806043";
                const tx2 = await contract.sendCrossChain(chainIdFuji,contractAddressFuji );
                await tx2.wait();
                console.log("Price sent to Fuji")
            } catch (error) {
                console.error("Error:", error);
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }

    async function DataProceed() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const FujiProvider = new ethers.providers.Web3Provider(window.ethereum);


            chainId = await FujiProvider.getNetwork().chainId;


            const signer = FujiProvider.getSigner();
            userAddress = signer.getAddress();
            const contract = new ethers.Contract(contractAddressFuji, receiverABI, signer);
            try {
                const tx = await contract.requestLatestPrice();
                await tx.wait();
                ShowData();
            } catch (error) {
                console.error("Error:", error);
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }

    DataProceed();
    document.getElementById("myButton").addEventListener("click", DataProceed);

} catch (error) {
    console.error("Error:", error);

}



/*async function ShowPrice() {
    const FujiProvider = new ethers.providers.WebSocketProvider(`wss://avalanche-fuji-c-chain-rpc.publicnode.com`);
    const wallet = new ethers.Wallet(privateKey, FujiProvider);
    const contract = new ethers.Contract(contractAddressFuji, receiverABI, wallet);
    const chainId = await FujiProvider.getNetwork().chainId;

    if (chainId == 43113) {
        const tx = await contract.getLastPriceAndZkProof();
        await tx.wait();
        console.log("Price:", tx)
        /*const event = receipt.events.find(event => event.event === 'PriceUpdated');
         if (event) {
             RequestId = event.args.id;
             console.log("Request ID:", RequestId);
 
         } else {
             console.error("Event not found in receipt");
         } */
/*}
}

DataProceed(); */

/* contract.on('RequestVolume', (requestId, volume, event) => {
//     if (requestId == RequestId) {
        const string2 = volume.toString();
        console.log("Volume:", string2);
        provider.removeAllListeners();
    }
})

addEvent(userAddress, RequestId);


}

async function recents() {
    addEvent("0x47D7aaB25647dfd2C8c7ADe6A74162f07c516182", "0xf7226a12427ed3371e86e00b66c380253c8b5d058aa4afd0e4f98019502a21c2")
    addEvent("0x47D7aaB25647dfd2C8c7ADe6A74162f07c516182", "0x5308d0f30024d7d380f528db509c3d69f86e56fbedcd820acc41c68da37f4a2c")
    console.log("sex")

    const userAddress = await wallet.getAddress();
    const events = getEvents(userAddress);
    for (const event of events) {
        const trans = contract.filters.RequestVolume(event);
        const transactions = await contract.queryFilter(trans);
        transactions.forEach((transaction) => {
            const volumereq = transaction.args.volume.toString();
            console.log(event + ":" + volumereq);
        });
    }






    // console.log("tx", tx)

    // contract.on("ChainlinkRequested", (requestId, event) => {
    //   if (requestId == tx) {
    //   console.log("Event detected for specific request ID:", id);
    // console.log(event);
    //  }
    // });

    // contract.on("RequestVolume", (requestId, volume, event) => {
    //     if (requestId == tx) {
    //         console.log(volume);
    //         console.log(event);
    //     }
    // });}

    // async function recents() {
    //     const userAddress = await signer.getAddress();
    //     const events = getEvents(userAddress);
    //     for(const event of events) {
    //        var filter = {
    //             address: contractAddress,
    //             topics: [ethers.utils.id("ChainlinkRequested(bytes32)"), event]
    //         }
    //         const logs = await provider.getLogs(filter);
    //         for(const log of logs) {
    //             console.log("Log:", log);
    //        }
    //     }
    // }


    // async function favorites() {

    // }



    // ShowData();
    recents();
    console.log("ended") */

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

