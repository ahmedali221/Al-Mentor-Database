const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51RPVt0HK6cdy1T9jbucwiksMgCKxXObMtxZzMTCPBtYhrf5oMpKkUzXskvhrnvygAHRCpCZiNHjqhd5w7xf6IrNe00tKwz3Gdj"
);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Amount and currency required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Almentor Subscription",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
