
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clear the body

  //make a div for tweets
  const $tweetsDiv = $('<div id=tweets>');
  $body.append($tweetsDiv);
  //function to clear tweets and add new tweets
  //add an optional user param
  //specifying you only want tweets from that user
  let displayTweets = (user) => {
    //clear the <tweetsDiv>
    $('#tweets').html('');

    const $tweets = streams.home.slice(0).reverse().map((tweet) => {
      const $tweet = $('<div></div>');
      //make a function to find out how long ago the tweet was created
      let timeAgo = (timeMade) => {
        //take in `Wed Feb 28 2024 13:33:09 GMT-0600 (Central Standard Time)` string
        //return either
        //`a few seconds ago`
        //or `x minutes ago`
        //where x is the amount of minutes it has been since that time
        timeMade = timeMade.getTime();//time tweet created in milliseconds
        //the difference between now and timeMade. all in milliseconds
        let timeSince = +new Date - timeMade //time since created. in milliseconds
        //convert timeSince into seconds
        timeSince = Math.floor(timeSince / 1000);
        //check if the timeSince is bigger than 59
        if(timeSince > 59) {
          //true than convert seconds into minutes
          //and return `x minutes ago`
          timeSince = Math.floor(timeSince / 60);
          //change `minute` to `minutes` accordingly
          if(timeSince === 1) {
            return timeSince + ' minute ago';
          } else {
            return timeSince + ' minutes ago';
          }
        } else {
        //false than return
          //`x seconds ago`
          return timeSince + ' seconds ago';
        }
      }
      //add the ability to display how long ago the tweets were made
      /////////////////
      //Plan for how to make the username clickable. When username clicked show only the tweets of that user
      //for the text variable below make a separate <div> to store the username
      //for the username div make it have a click listener
      //when that name is clicked clear #tweets
      //and populate the tweet <div> with only tweets from this user
      //reference this users tweets with streams.users['username']
      //where the username is the current user
      /////////////////
      const text = `${tweet.message}. Tweet created ${timeAgo(tweet.created_at)}.`;
      //make a <div> for the username
      const $userDiv = $('<div></div>')
      .append(`@${tweet.user}`)
      .on('click', () => {
        //call diplayTweets()
        //pass in current user
        displayTweets(tweet.user);
      });
      $tweet.text(text);
      //move $userDiv to the beginning of $tweet
      $userDiv.prependTo($tweet);

      //add if statement asking: if a user is present then only retrieve tweets from that user
        //if user does not match current user then return nothing
      //else there was no user present
        //add the tweet
      if(user) {
        if(user === tweet.user) {
          return $tweet;
        }
      } else {
        return $tweet;
      }
    });
    $tweetsDiv.append($tweets);
  }
  displayTweets();
  //make a new button before tweets div
  //this button should clear the current Tweets div and show new tweets with the old
  //do this by calling the displayTweets() function
  ////////////////////
  //make a button
  const $buttondiv = $('<div id=button-container>')
  //add text to button
  //and put padding and a border around the text
  $buttondiv.append('<p style="padding: 10px; border: 2px solid black;">Refresh Tweets<p>')
  //set the button width
  .width('75px')
  //add event listener
  //when the <p> is clicked refresh tweets
  .on('click', () => {
    return displayTweets();
  });
  //put button at top of body
  $buttondiv.prependTo($body);
  /////////////////////
  //Plan: allow the website user to tweet
  //1. add a text box for the website user to type stuff
  //2. add a button that says `tweet`
  //3. when the button is pressed send the users message back to here
  //4. receive the text data here
  //5. make the tweet into the right format
  //{
    //user: 'You',
    //message: [user generated data],
    //created_at: new Date
  //}
  //6. pass the object above into the addTweet() function
  //7. refresh tweets by clicking the Refresh tweets button
  /////////////////////
  //create a function to submit the form data
  const submitMessage = () => {
    //if not username was given assign it to 'You'
    if($('#username_input').val()) {
      //assign `window.visitor` to the username input
      window.visitor = $('#username_input').val();
    } else {
      window.visitor = 'You';
      streams.users['You'] = [];
    }
    //if the current user is not defined
    //define it
    if(!Array.isArray(streams.users[$('#username_input').val()])) {
      streams.users[$('#username_input').val()] = [];
    }
    //call the writeTweet function
      //passing in the users message for parameter
    writeTweet($('#tweetContent').val());
    //clear the tweetContent text box

    //call displayTweets to reload the tweets with the new one
    displayTweets();
  }
  //create a form tag with id 'myForm'
  const $myForm = $('<form>');
  //make a div tag
  const $tweetMessageDiv = $('<div>');
  //add a <label> with a for attribute of tweetContent
  //text is Write tweet
  const $TweetMessageLabel = $('<label for="tweetContent">Write tweet</label>')
  $TweetMessageLabel.appendTo($myForm);
  //in div above add a <input> with attributes type = 'text', name = 'user_name', id = 'username_input' placeholder = 'username?'
  const $usernameInput = $('<input type="text" id="username_input" placeholder="username?">');
  $usernameInput.appendTo($myForm);
  //in div above add a <textarea> with id tweetContent
  const $TweetMessageContent = $('<textarea id="tweetContent" placeholder="Message?">');
  $TweetMessageContent.appendTo($myForm);
  //append above #myForm to div
  $myForm.appendTo($tweetMessageDiv);
  //prepend #myForm to <body>
  $tweetMessageDiv.prependTo($body);
  //make a button tag
  //attribute is type equal to 'submit'
  //innerText is 'Tweet'
  //append button tag to #myForm
  const $button = $('<button type="submit">Submit</button>')
  .appendTo($myForm);
  $myForm.on('submit', (e) => {
    e.preventDefault();
    submitMessage();
  });
});