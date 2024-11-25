import dotenv from 'dotenv';
dotenv.config();

//console.log("STRIPE_SECRET_KEY: ", process.env.STRIPE_SECRET_KEY);

import Stripe from 'stripe'; 
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// Payment processing function
export async function processPayment(req, res) {
  const { amount, token } = req.body;

  try {
    // Create a charge using the Stripe API
    const charge = await stripe.charges.create({
      amount, // Amount to charge (in the smallest unit of currency, e.g., paise for INR)
      currency: 'inr', // Currency to charge (INR in this case)
      source: token,  // Token received from the frontend (Stripe Elements or similar)
      description: 'Home Service Payment', // Description of the payment
    });

    // Send a successful response if the charge was created successfully
    res.status(200).json({
      message: 'Payment successful',
      charge, // Optional: Send the charge object back to the client for debugging or display purposes
    });
  } catch (error) {
    // Handle any errors that occurred during the charge process
    res.status(500).json({
      message: 'Error processing payment',
      error: error.message, // Send the error message back to the client for debugging
    });
  }
}

// Example of adding services (if required)
export async function addServices(req, res) {
  const { serviceName, price } = req.body;

  // Logic to add a service (e.g., saving to a database)
  try {
    // Simulating service addition
    res.status(201).json({
      message: 'Service added successfully',
      serviceName,
      price,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding service',
      error: error.message,
    });
  }
}

// Example of getting provider services (if required)
export async function getProviderServices(req, res) {
  const { providerId } = req.params;

  try {
    // Placeholder logic to retrieve services for a provider
    // In a real app, fetch services from a database
    res.status(200).json({
      message: 'Services retrieved successfully',
      providerId,
      services: [], // Replace with actual service data from the database
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving services',
      error: error.message,
    });
  }
}
