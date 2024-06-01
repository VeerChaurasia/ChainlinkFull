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
            text: `Symbol: ${data.symbol}\nPrice: ${data.price}\nTime: ${data.time}`
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
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: symbol,
                // interval: '1min',
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

