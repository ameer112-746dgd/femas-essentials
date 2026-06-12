// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// // Reuse the existing .env credentials
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // @route   POST /api/contact
// // @desc    Send contact form message to Admin
// router.post('/', async (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'atobateleameer@gmail.com', // Your email
//     subject: `📩 New Message from FEMAS Website: ${name}`,
//     text: `
//       You received a new message from the "Contact Us" form.
      
//       ---------------------------------------
//       Name: ${name}
//       Email: ${email}
//       ---------------------------------------
      
//       Message:
//       ${message}
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Contact email sent from ${email}`);
//     res.status(200).json({ success: true, message: 'Message sent successfully' });
//   } catch (error) {
//     console.error('Contact Email Error:', error);
//     res.status(500).json({ success: false, message: 'Failed to send message' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'FEMAS Website <info@femasessentials.com>',
      
      // ✅ UPDATED: Sending to your Business Email
      to: 'Femasessentials35@gmail.com',
      
      // Allow replying directly to the customer
      replyTo: email,
      
      subject: `📩 Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Message from Website</h2>
          <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37; margin-top: 20px;">
            <p style="font-size: 16px; line-height: 1.5;">${message}</p>
          </div>
        </div>
      `
    });

    console.log('✅ Contact Email Sent to Admin:', data);
    res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('❌ Resend Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

module.exports = router;