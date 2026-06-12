const express = require('express');
const router = express.Router();
const axios = require('axios'); // Required for Flutterwave Verification
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
router.post('/', async (req, res) => {
  const { 
    name, email, phone, address, city, state, 
    cartItems, subtotal, shipping, total, transaction_id 
  } = req.body;

  try {
    // 1. Verify with Flutterwave (Ensure total matches what FLW received)
    const verification = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } }
    );

    if (verification.data.data.status !== "successful" || verification.data.data.amount < total) {
        return res.status(400).json({ message: 'Payment verification failed' });
    }

    // 2. Email Body with Shipping Line Item
    const productList = cartItems.map(item => `<li>${item.name} (x${item.qty}) - ₦${item.price.toLocaleString()}</li>`).join('');

    const emailHtml = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #d4af37;">FEMAS Essentials Order</h2>
        <p><strong>Customer:</strong> ${name} (${phone})</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${state}</p>
        <hr/>
        <ul>${productList}</ul>
        <div style="text-align: right;">
          <p>Subtotal: ₦${subtotal.toLocaleString()}</p>
          <p>Shipping: ₦${shipping.toLocaleString()}</p>
          <h3 style="font-size: 20px;">Grand Total: ₦${total.toLocaleString()}</h3>
        </div>
      </div>
    `;

    // Send Admin Email
    await resend.emails.send({
      from: 'Orders <orders@femasessentials.com>',
      to: 'Femasessentials35@gmail.com',
      subject: `New Order: ₦${total.toLocaleString()} from ${name}`,
      html: emailHtml
    });

    // Send Customer Email
    await resend.emails.send({
        from: 'FEMAS Essentials <orders@femasessentials.com>',
        to: email,
        subject: `Order Confirmed! 🌿`,
        html: emailHtml
    });

    res.status(200).json({ message: 'Order Processed' });

  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
});
module.exports = router;