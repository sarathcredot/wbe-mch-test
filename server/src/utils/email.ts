




import nodemailer from "nodemailer";

export const sendEmail = async (emailId: string, otp: string): Promise<void> => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // or your SMTP provider
            port: 465,
            secure: true, // true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // your app password
            },
        });

        // Send mail
        const info = await transporter.sendMail({
            from: `"My App" <${process.env.EMAIL_USER}>`,
            to: emailId,
            subject: "Your OTP from Arabian Smell",
            html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
        });

        console.log("Email sent: %s", info.messageId);
        return;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
