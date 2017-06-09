const Bot = require('./lib/Bot')
const SOFA = require('sofa-js')
const Fiat = require('./lib/Fiat')
const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout);

let bot = new Bot()

// ROUTING

bot.onEvent = function(session, message) {
  console.log(message.type);
  switch (message.type) {
    case 'Init':
      welcome(session)
      break
    case 'Message':
      onMessage(session, message)
      break
    case 'Command':
      onCommand(session, message)
      break
    case 'Payment':
      onPayment(session, message)
      break
    case 'PaymentRequest':
      welcome(session)
      break
  }
}

function onMessage(session, message) {
  firstTimeMessage(session)
    .then(() => {
      session.bot.client.store.getUnansweredQuestionsForAddress(session.address).then((res) => {
          if (res.length > 0) {
              let controls = [
                {type: 'button', label: 'Yes', value: "" + res[0].id + ":1" },
                {type: 'button', label: 'No', value: "" + res[0].id + ":0"}
              ];
              session.reply(SOFA.Message({
                body: res[0].body,
                controls: controls,
                showKeyboard: false,
              }));
          } else {
              session.reply("There are no new questions");
          }
      });
    });

}

function firstTimeMessage(session) {
  if (session.get("isNew") === undefined) {
    session.set("isNew", false);
    return delayedMessage(session, "Welcome to Pontifex, where you answer questions for Ether. Compete with your friends, keep track of your record and 🔮 your way into tons of Ether!", 100)
      .then(() => {
        return delayedMessage(session,
          "👉  Rules of Play: \n" +
          " - 5 questions per week. (More since this is the first week!) \n" +
          " - No time limit, get them right! \n" +
          " - Collect Participation Prize -- a lil Ether (after every question) \n" +
          " - MAJOR 🔑 :  When events resolve, if correct win beaucoup Ether 💰 \n" +
          " - Compete with your friends and around the 🌏 \n" +
          " - The more you get right, the more you get paid 😎"
          , 5000);
      })
      .then(() => {
        return delayedMessage(session, "Let's jump right into it", 5000);
      });
  } else {
    return Promise.resolve();
  }
}

function delayedMessage(session, text, delayInMS) {
  return setTimeoutPromise(delayInMS).then(() => {
    session.reply(text);
  })
}

function onCommand(session, command) {
    let val = command.content.value;
    if (val.indexOf(":") != -1) {
        let splitted = val.split(":");
        let questionId = parseInt(splitted[0]);

        let answerVal = parseInt(splitted[1]);
        let answer = answerVal == 1;

        // Store response for question
        session.bot.client.store.storeAnswerForUser(
            session.address,
            questionId,
            answer
        ).then(() => {
          session.reply("Alright then, we shall see! Have some 🏆 💸 and on to the 𝓝𝓮𝒙𝓽--");
          return sendMoney(session, 0.5);
        })
        .then(() => {

            // Try to fetch another question to ask them
            session.bot.client.store.getUnansweredQuestionsForAddress(session.address).then((rows) => {

               // Based on availability, write next message
               if (rows.length > 0) {
                   session.reply("Here is another question for you:");
                   let controls = [
                     {type: 'button', label: 'Yes', value: "" + rows[0].id + ":1" },
                     {type: 'button', label: 'No', value: "" + rows[0].id + ":0"}
                   ];
                   session.reply(SOFA.Message({
                     body: rows[0].body,
                     controls: controls,
                     showKeyboard: false,
                   }));
               } else {
                   session.reply("That's all for now folks!");
               }
            })
        });

        if (answer == true) {
            console.log("Question " + questionId + " was replied with TRUE");
        } else {
            console.log("Question " + questionId + " was replied with FALSE");
        }
    } else {
        switch (command.content.value) {
          case 'ping':
            pong(session)
            break
          case 'count':
            count(session)
            break
          case 'donate':
            donate(session)
            break
        }
    }
}

function onPayment(session, message) {
  if (message.fromAddress == session.config.paymentAddress) {
    // handle payments sent by the bot
    if (message.status == 'confirmed') {
      // perform special action once the payment has been confirmed
      // on the network
    } else if (message.status == 'error') {
      // oops, something went wrong with a payment we tried to send!
    }
  } else {
    // handle payments sent to the bot
    if (message.status == 'unconfirmed') {
      // payment has been sent to the ethereum network, but is not yet confirmed
      sendMessage(session, `Thanks for the payment! 🙏`);
    } else if (message.status == 'confirmed') {
      // handle when the payment is actually confirmed!
    } else if (message.status == 'error') {
      sendMessage(session, `There was an error with your payment!🚫`);
    }
  }
}

// STATES

function welcome(session) {
  sendMessage(session, `Woah!  Ready for the future? 😝`)
}

function pong(session) {
  sendMessage(session, `Pong`)
}

// example of how to store state on each user
function count(session) {
  let count = (session.get('count') || 0) + 1
  session.set('count', count)
  sendMessage(session, `${count}`)
}

function donate(session) {
  // request $1 USD at current exchange rates
  Fiat.fetch().then((toEth) => {
    session.requestEth(toEth.USD(1))
  })
}

function sendMoney(session, dollars) {
  return Fiat.fetch().then((toEth) => {
    session.sendEth(toEth.USD(dollars))
  })
}

// HELPERS

function sendMessage(session, message) {
  let controls = [
    {type: 'button', label: 'Ping', value: 'ping'},
    {type: 'button', label: 'Count', value: 'count'},
    {type: 'button', label: 'Donate', value: 'donate'}
  ]
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}
