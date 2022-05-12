import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MakePayment from '../makePayment/MakePayment';

const Payment = () => {
   const stripePromise = loadStripe('pk_test_51Ie33uCljQ1lWJFNhmzcstvqqVDr07o9lhLNTrHtGtIqZ2XVyaT1PdijIb0nX2Wyj6RNJ56ipbI7AKhGG6DPRYsv003m5nQO7F');
  return (
    <div>
        <Elements stripe={stripePromise}> 
               {/* <PaymentForm serviceInfo={serviceInfo} /> */}
               <MakePayment/> 
        </Elements>
    </div>
  );
};

export default Payment;