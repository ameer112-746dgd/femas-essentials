// const express = require('express');
// const router = express.Router();
// const axios = require('axios'); // Required for Flutterwave Verification
// const { Resend } = require('resend');

// const resend = new Resend(process.env.RESEND_API_KEY);
// router.post('/', async (req, res) => {
//   const { 
//     name, email, phone, address, city, state, 
//     cartItems, subtotal, shipping, total, transaction_id 
//   } = req.body;

//   try {
//     // 1. Verify with Flutterwave (Ensure total matches what FLW received)
//     const verification = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
//       { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } }
//     );

//     if (verification.data.data.status !== "successful" || verification.data.data.amount < total) {
//         return res.status(400).json({ message: 'Payment verification failed' });
//     }

//     // 2. Email Body with Shipping Line Item
//     const productList = cartItems.map(item => `<li>${item.name} (x${item.qty}) - ₦${item.price.toLocaleString()}</li>`).join('');

//     const emailHtml = `
//       <div style="font-family: sans-serif; padding: 20px;">
//         <h2 style="color: #d4af37;">FEMAS Essentials Order</h2>
//         <p><strong>Customer:</strong> ${name} (${phone})</p>
//         <p><strong>Address:</strong> ${address}, ${city}, ${state}</p>
//         <hr/>
//         <ul>${productList}</ul>
//         <div style="text-align: right;">
//           <p>Subtotal: ₦${subtotal.toLocaleString()}</p>
//           <p>Shipping: ₦${shipping.toLocaleString()}</p>
//           <h3 style="font-size: 20px;">Grand Total: ₦${total.toLocaleString()}</h3>
//         </div>
//       </div>
//     `;

//     // Send Admin Email
//     await resend.emails.send({
//       from: 'Orders <orders@femasessentials.com>',
//       to: 'Femasessentials35@gmail.com',
//       subject: `New Order: ₦${total.toLocaleString()} from ${name}`,
//       html: emailHtml
//     });

//     // Send Customer Email
//     await resend.emails.send({
//         from: 'FEMAS Essentials <orders@femasessentials.com>',
//         to: email,
//         subject: `Order Confirmed! 🌿`,
//         html: emailHtml
//     });

//     res.status(200).json({ message: 'Order Processed' });

//   } catch (error) {
//     res.status(500).json({ message: 'Error' });
//   }
// });
// module.exports = router;

const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Order = require('../models/Order'); // Import the model

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { 
    name, email, phone, address, state, 
    cartItems, subtotal, shipping, total 
  } = req.body;

  try {
    // 1. Save order to MongoDB
    const order = new Order({
      name, email, phone, address, state,
      cartItems, subtotal, shipping, total
    });
    const createdOrder = await order.save();

    // 2. Prepare Email Content
    const productList = cartItems.map(item => 
        `<li>${item.name} (x${item.qty}) - ₦${(item.price * item.qty).toLocaleString()}</li>`
    ).join('');

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #6F4E37;">New Order Received</h2>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Shipping to:</strong> ${address}, ${state}</p>
        <hr/>
        <ul style="list-style: none; padding: 0;">${productList}</ul>
        <hr/>
        <div style="text-align: right;">
          <p>Subtotal: ₦${subtotal.toLocaleString()}</p>
          <p>Shipping: ₦${shipping.toLocaleString()}</p>
          <h3 style="color: #6F4E37;">Total: ₦${total.toLocaleString()}</h3>
        </div>
        <div style="background: #fdf5f2; padding: 15px; margin-top: 20px; border-radius: 8px;">
          <p><strong>Payment Method:</strong> Bank Transfer (Pending Verification)</p>
        </div>
      </div>
    `;

    // 3. Send Email to Admin
    await resend.emails.send({
      from: 'FEMAS Orders <orders@femasessentials.com>',
      to: 'Femasessentials35@gmail.com',
      subject: `New Order: ₦${total.toLocaleString()} from ${name}`,
      html: emailHtml
    });

    // 4. Send Confirmation Email to Customer
    await resend.emails.send({
        from: 'FEMAS Essentials <orders@femasessentials.com>',
        to: email,
        subject: `Your FEMAS Ritual is being prepared! 🌿`,
        html: `<h3>Hello ${name},</h3><p>We've received your order. Once your bank transfer is verified, we will begin shipping.</p>${emailHtml}`
    });

    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Order Route Error:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Add these routes to your existing orderRoutes.js

// 1. Get all orders for the Admin Dashboard
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// 2. Manual Payment Confirmation (Sends Email)
router.put('/:id/confirm-payment', async (req, res) => {
  try {
    const order = await Order.findById(req.id || req.params.id);

    if (order) {
      order.status = 'Paid';
      const updatedOrder = await order.save();

      // Send "Payment Received" Email to Customer
      await resend.emails.send({
        from: 'FEMAS Essentials <orders@femasessentials.com>',
        to: order.email,
        subject: 'Payment Received - Your Ritual is on the way! 🌿',
        html: `
          <div style="font-family: sans-serif; color: #2D2424; max-width: 600px; margin: auto; border: 1px solid #EAD7D1; padding: 40px; border-radius: 12px;">
            <h2 style="color: #6F4E37;">Payment Confirmed</h2>
            <p>Hello ${order.name},</p>
            <p>We have successfully verified your bank transfer for Order <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong>.</p>
            <p>Our team is now preparing your products for shipment. You will receive another notification once your package has been handed over to the courier.</p>
            <hr style="border: none; border-top: 1px solid #EAD7D1; margin: 20px 0;"/>
            <p style="font-size: 0.9rem; color: #8E8071;">Thank you for your patience and for choosing FEMAS Essentials.</p>
          </div>
        `
      });

      res.json({ message: 'Payment confirmed and email sent', updatedOrder });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming payment' });
  }
});
module.exports = router;