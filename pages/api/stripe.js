import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MMYhhL8ERxt7aXMPyVnQ1bo" },
          { shipping_rate: "shr_1MMYhFL8ERxt7aXMwINeNXIJ" },
        ],
        line_items: req.body.map((cartItem) => {
          const img = cartItem.image[0].asset._ref;
          const newImg = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/crm663ch/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: cartItem.name,
                images: [newImg],
              },
              unit_amount: cartItem.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: cartItem.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
