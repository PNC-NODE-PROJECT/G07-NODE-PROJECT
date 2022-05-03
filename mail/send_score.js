var nodemailer = require('nodemailer');

 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'facebook2pointzero@gmail.com',
      pass: '@studentPNC'
    }
});

function keyWordOfResult(totalScore, score){
    let say = '🎊Congratulations🎊'
    if(totalScore/2 > score){
        say = 'Sorry!'
    }
    return say;
}

function sendScore(title, score, totalScore, toUser){
    mailOptions = {
        from: 'QuiZ App',
        to: toUser,
        subject: 'Result of your ' + title + ' Online Quiz',
        text: keyWordOfResult(totalScore, score) + ' you got: ' + score + '/'+totalScore,
    };
    return mailOptions;
}

function sendScoreToPlayer(title, score, totalScore, toUser){
    transporter.sendMail(sendScore(title, score, totalScore, toUser), function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

// To export above functions:
module.exports = { sendScoreToPlayer }

