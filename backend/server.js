import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());  // Allow JSON requests

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Route to Handle Contact Form Submissions
app.post("/api/send-message", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,  // Your email (to avoid being blocked)
            replyTo: email,  // Now, replies go to the sender’s email
            to: process.env.EMAIL_USER,  
            subject: subject ? `${subject}` : `ztk-web message from ${name}`,
            text: `${message}`
        });

        await transporter.sendMail({
            from: `"Zach Kramer" <${process.env.EMAIL_USER}>`, // Use your email as sender
            to: email, // Send to the person who filled out the form
            subject: "~ I've received your message ~",
            html: `
                <p>Hi there, <strong>${name}</strong>!</p>
                <p>Thank you for reaching out. Here’s a copy of your message:</p>
                <blockquote style="border-left: 4px solid #6a66a3; padding: 10px; margin-left: 0;background-color: #eeeeee;">
                    ${message}
                </blockquote>
                <p>I’ll get back to you as soon as I can. Have a great day!</p>
                <p>–Z</p>
                <p>--------------------------------------------</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td style="padding-right: 10px;">
                            <img src="https://ztk-web.s3.us-west-1.amazonaws.com/icons/ztk-monogram.png" alt="Your Logo" width="62" style="vertical-align: middle; background-color: #fff; padding: 3px; border-radius: 5px; border: 3px solid #222222;">
                        </td>

                        <td style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
                            <strong>Zach Kramer</strong>&nbsp;<i style="color:#00000080">(he / him)</i><br>
                            Web Developer & Designer<br>
                            <a href="tel:2677603054" style="color: #6a66a3; text-decoration: none;">267.760.3054</a>
                        </td>
                    </tr>
                </table>

                    vertical-align: middle;
    background-color: #fff;
    padding: 3px;
    border-radius: 5px;
    border: 3px solid #222222;
            `,
        });

        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, error: "Failed to send message." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
