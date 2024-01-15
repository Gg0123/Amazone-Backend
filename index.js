/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51OVbBdBVexaCHzUxlJFerMPEz8QCjLeVlEoMmLdep6smPTq8HnRFsyXX5o86U0nvuiwkGQ9zkZee8VovbUpu9Net0065A97O7w')
const app = express();
const port=5000;
// const corsOption = {
//   origin: ["http://localhost:3000"],
// };
// app.use(cors(corsOption));

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('Hello World'));


app.post('/payments/create', async(request, response) => {
  const total = request.query.total;
  console.log('payment request recieved for this amount >>>', total);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency:'usd',
  })

  response.status(201).send({
  clientSecret:paymentIntent.client_secret,
})

})
// Listen Command
// exports.api = functions.https.onRequest(app);
app.listen(port,()=>{
  console.log('listening to port:',port)
})

// base URL

// (http://127.0.0.1:5001/clone-25c4c/us-central1/api