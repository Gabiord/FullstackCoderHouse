import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('El servidor esta listo para enviar mensajes');
    }
});


export const sendEmail = (request, response) => {

    const ticket = request

    const mailOptions = {
        // Cuerpo del mensaje
        from: "Happy Shop " + config.gmailAccount,
        to: ticket.ticket_purchaser,
        subject: "Ticket de compra",
        html: `<div><h1>Gracias por tu compra!</h1></div>
                <div><h2>Estos son los datos de tu compra:</h2></div>
                <div><h3>Codigo: ${ticket.ticket_code}</h3></div>
                <div><h3>Fecha: ${ticket.ticket_purchase_datetime}</h3></div>
                <div><h3>Monto Total: $ ${ticket.ticket_amount}</h3></div>`
                ,
        attachments: []
    }
    

    // Logica
    try {
        let result = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                response.status(400).send({ message: "Error", payload: error })
            }
            console.log('Message sent: ', info.messageId);
            response.send({ message: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }

};

