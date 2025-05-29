const Stripe = require('stripe');
const stripe = Stripe("sk_test_51RPVt0HK6cdy1T9jbucwiksMgCKxXObMtxZzMTCPBtYhrf5oMpKkUzXskvhrnvygAHRCpCZiNHjqhd5w7xf6IrNe00tKwz3Gdj");
const Payment = require('../../models/Subscriptions & Payment/Payment');
const UserSubscription = require('../../models/Subscriptions & Payment/userSubscription');
const Subscription = require('../../models/Subscriptions & Payment/subscription');

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = "whsec_vjDMgoFVOk3UQgn8v2rrJSjo2M3hfgV6";
 

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

 if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  const { userId, subscriptionId, paymentId } = session.metadata || {};

  if (!paymentId || typeof paymentId !== 'string' || paymentId.trim() === '') {
    console.error(" Webhook Error: paymentId is missing or invalid:", paymentId);
    return res.status(400).json({ message: "Invalid or missing paymentId in metadata" });
  }

  try {
    await Payment.findByIdAndUpdate(paymentId, {
      'status.en': 'completed',
      'status.ar': 'مكتمل',
    });

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      console.error(" Subscription not found:", subscriptionId);
      return res.status(404).json({ message: "Subscription not found" });
    }

    const durationInDays =
      subscription.duration.unit === 'month'
        ? subscription.duration.value * 30
        : subscription.duration.value;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + durationInDays + 50);

    await UserSubscription.create({
      userId,
      subscriptionId,
      startDate,
      endDate,
       paymentId,
      status: { en: 'active', ar: 'نشط' },
    });

    console.log('Webhook: Payment and subscription processed successfully');
  } catch (error) {
    console.error(' Webhook Error during processing:', error.message);
    return res.status(500).json({ message: 'Internal webhook processing error' });
  }
}}