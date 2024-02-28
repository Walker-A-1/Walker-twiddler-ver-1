
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clear the body

  //make a div for tweets
  const $tweetsDiv = $('<div id=tweets>');
  $body.append($tweetsDiv);
  //function to clear tweets and add new tweets
  let displayTweets = () => {
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
      const text = `@${tweet.user}: ${tweet.message}. Tweet created ${timeAgo(tweet.created_at)}.`;
      //
      $tweet.text(text);

      return $tweet;
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

});
