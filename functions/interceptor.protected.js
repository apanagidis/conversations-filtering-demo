var Filter = require('bad-words'),
    filter = new Filter();

exports.handler = function(context, event, callback) {

  let eventType = event.EventType;
  console.log(
    `Incoming ${eventType}`
  );
  console.log(event);
 
  if (eventType == 'onMessageAdd') {

    if (filter.isProfane(event.Body)){
      let response = {
        'body': 'Profanity detected. Do not be naughty!',
        'author': 'Chief Compliance Bot'
       }
       callback(null,response);

    }
    // Demonstrate Redaction
    // Regex for a Credit card like number.
    var checkCredit = RegExp('([0-9- ]{15,16})');
    if (checkCredit.test(event.Body)) {
      console.log('Detected a Credit Card');
      //Respond to the message.
      let response = {
        'body': 'A credit card was redacted.',
        'author': 'Chief Compliance Bot'
    }
      callback(null,response);
    }
  };
  callback(null);
};
