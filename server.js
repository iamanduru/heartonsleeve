const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
//Subscribe 

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER = 'us17';

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'An email is required' });
    }

    try {
        const response = await axios.post(
            `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, 
            {
                email_address: email,
                status: 'subscribed'
            },
            {
                headers: {
                    Authorization: `apikey ${MAILCHIMP_API_KEY}`
                }
            }
        );

        res.status(200).json({ message: 'Subscription Successful!!'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to subscribe' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
