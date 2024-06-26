


import {Outlet, useLoaderData} from 'remix'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {createPaymentIntent} from '~/payments'

const stripePromise = loadStripe('sk_test_51PVnVGKaowdxnwwNQSYbmvYow7Ix7CExsHxfWafZb5PuF4RVkMCKajMygezkvEZo3VT5EzI7NWSjvOe09zmetYnI00cWpTnPXZ')

export const loader = async () => {
  return await createPaymentIntent();
}

export default function Payments() {
  const paymentIntent = useLoaderData()
  const options = {
    // passing the client secret obtained from the server
    clientSecret: paymentIntent.client_secret,
  };

  return (
    <div style={{padding: '20px'}}>
      <Elements stripe={stripePromise} options={options}>
        <Outlet />
      </Elements>
    </div>
  );
}