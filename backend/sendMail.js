import nodemailer from "nodemailer"
import axios  from "axios";
const  SendmailTransport = async(to, subject, text, deadline) => {
    try {
        const response = await axios.post('https://formspree.io/f/xdoqvejg', {
            to,
            subject: `Task Reminder: ${subject}`,
            text: `This is a reminder that your task "${subject}" is due at ${deadline}. Description: ${text}`
        });

        console.log('Email sent:', response.data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export  {SendmailTransport}
