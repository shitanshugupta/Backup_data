const sendgrid = require('@sendgrid/mail');

const SENDGRID_API_KEY = "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"

sendgrid.setApiKey(SENDGRID_API_KEY)

const msg = {
    to: 'shitanshu.iet@gmail.com',
    // Change to your recipient
    from: 'shitanshugupta98@gmail.com',
    // Change to your verified sender
    subject: 'Sending with SendGrid Is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sendgrid
    .send(msg)
    .then((resp) => {
        console.log('Email sent\n', resp)
    })
    .catch((error) => {
        console.error(error)
    })