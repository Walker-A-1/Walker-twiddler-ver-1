
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

    const $tweets = streams.home.map((tweet) => {
      const $tweet = $('<div></div>');
      const text = `@${tweet.user}: ${tweet.message}`;

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
