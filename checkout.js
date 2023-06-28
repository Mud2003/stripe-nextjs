import { loadStripe } from "@stripe/stripe-js";
require('dotenv').config()

export async function checkout({ lineItems }) {
  let stripePromise = null;

  console.log(process.env.STRIPE_PUBLIC_API_KEY)

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.STRIPE_PUBLIC_API_KEY);
    }
    return stripePromise;
  };

  try {
    const stripe = await getStripe();

    await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin
    });
  } catch (error) {
    console.error('An error occurred during checkout:', error);
    // Handle the error accordingly
  }
}
