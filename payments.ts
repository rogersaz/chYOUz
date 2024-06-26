import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PVnVGKaowdxnwwNQSYbmvYow7Ix7CExsHxfWafZb5PuF4RVkMCKajMygezkvEZo3VT5EzI7NWSjvOe09zmetYnI00cWpTnPXZ');

export async function createPaymentIntent() {
  return await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    }
  })
}

export async function retrievePaymentIntent(id) {
  return await stripe.paymentIntents.retrieve(id);
}