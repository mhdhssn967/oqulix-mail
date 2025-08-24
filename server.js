const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "huzeinprince@gmail.com", // your company email
    pass: "anjy bslc ukql pcvd",    // Gmail app password
  },
});

// ✅ Existing endpoint for simple email capture
app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "huzeinprince@gmail.com",
    to: "huzeinprince@gmail.com",
    subject: "New Email Submission",
    text: `A new user submitted their email: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Thanks! We'll contact you soon." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// ✅ New endpoint for distributor form
app.post("/send-distributor", async (req, res) => {
  const { name, org, contact, place, message } = req.body;

  const mailOptions = {
    from: "huzeinprince@gmail.com",
    to: "huzeinprince@gmail.com",
    subject: "New Distributor Enquiry - Happy Moves",
    text: `
      A new distributor enquiry has been submitted:

      Name: ${name}
      Organization: ${org}
      Contact : ${contact}
      Place: ${place}
      Message: ${message || "N/A"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Thank you! Your distributor enquiry has been sent successfully." });
  } catch (error) {
    console.error("Error sending distributor email:", error);
    res.status(500).json({ message: "Failed to send distributor enquiry." });
  }
});

// 🚀 Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
