'use strict';

var _ = require('lodash');
var Parse = require('parse').Parse;


Parse.initialize('DJnfc0KsF8WRF0K2lr25mVm95Uzg0xnUAG72axAX', 'NTxalrgpCfGdeMwIVQ8r2budaoApAWpITreGfH10');

//Initialize a REST client in a single line:
var client = require('twilio')('ACddb7cf71a16f6614f602cf37ce7be47b', '7558ae02a335d1dc5b2764d0641de24e');

// Send the link to the app
exports.sendAppLink = function(req, res) {

  client.sendSms({
    to:req.body.phone,
    from:'+16505607298',
    body:'Tap the link to download F.U. I\'m right: bit.ly/1rBoRu7'
  }, function(error, message) {
    if (!error) {
      return res.json(201, {msgID: message.sid, creationDate: message.dateCreated});
    } else {
      console.log('Oops! There was an error: ' +error);
    }
  });
};

// Send the question of the day
exports.sendQuestionOfTheDay = function(req, res) {

  var phones = ['4158890233','9148305570','3124043424'];
  //9175194215 -- ben
  //9145890035 -- Justin
  //7185308914 -- Faisal

  phones.forEach(function(phone) {

    client.sendSms({
      to:phone,
      from:'+16505607298',
      body:'You have to take one: 1- Punch from Mike Tyson in his prime 2- Kick from Bruce Lee in his prime. Answer by texting 1 or 2.'
    }, function(error, message) {
      if (!error) {
        console.log('Question was sent to ' +phone);
      } else {
        console.log('Oops! There was an error: ' +error);
      }
    });

  });

  return res.json(201, {msg:'Question was sent to '+phones.join(', ')});
};

exports.questionVote = function(req, res) {

  var body = req.param('Body').trim();
  var vote = parseInt(body);

  res.header('Content-Type', 'text/xml');

  if(!isNaN(vote) && vote >= 1 && vote <= 2) {

    var Question = Parse.Object.extend('Question'),
        query = new Parse.Query(Question),
        answerIndex = vote - 1;

    query.get('YtaGL4Orui', {
      success: function(question) {
        var countAnswer1 = question.get('countAnswer1'),
            countAnswer2 = question.get('countAnswer2');

        // Calculate if in majority
        var inMajority = true;
        if(answerIndex === 0) {
          countAnswer1++;
          if(countAnswer1 < countAnswer2) {
            inMajority = false;
          }
        }
        else if(answerIndex === 1) {
          countAnswer2++;
          if(countAnswer2 < countAnswer1) {
            inMajority = false;
          }
        }

        var Answer = Parse.Object.extend('Answer'),
            answer = new Answer();

        // Save Answer in parse
        answer.save({
          choiceIndex: answerIndex,
          question: question,
          user: null,
          inMajority: inMajority
        }, {
          success: function(newAnswer) {
            var totalAnswerCount = question.get('totalAnswerCount') + 1,
                percentAnsw1 = Math.ceil((countAnswer1 / totalAnswerCount) * 100),
                percentAnsw2 = Math.floor((countAnswer2 / totalAnswerCount) * 100);

            if(inMajority) {
              res.send('<Response><Sms>Your right! Answer 1: '+percentAnsw1+'% Answer 2: '+percentAnsw2+'%</Sms></Response>');
            }
            else{
              res.send('<Response><Sms>Your wrong! Answer 1: '+percentAnsw1+'% Answer 2: '+percentAnsw2+'%</Sms></Response>');
            }

          },
          error: function(newAnswer, error) {
            res.send('<Response><Sms>Something went wrong and your vote was not registered. Please vote again.</Sms></Response>');
          }
        });

      },
      error: function(object, error) {
        console.log(error);
      }
    });


  }

}
