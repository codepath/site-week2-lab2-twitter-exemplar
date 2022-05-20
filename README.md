# Twitter A/B Test Lab

Week 2 - React Lab #2

## Intro

Twitter has kindly asked Site interns to help them run an A/B test for their new UI. An A/B test is where an experimenter shows different UI screens to users and determines which interface they prefer.

Previously Twitter's feed page looked like this:

![old_twitter](./src/assets/old-twitter.png)

Go to `https://www.twitter.com` now to see their modern UI.

The task here will be to write code that specs out the old user interface with modern React code.

## Goals

By the end of this lab, site interns should be able to...

- Perform prop-drilling in a React component architecture where props from a parent component are passed all the way down to a deeply-nested child element
- Create event handlers functions that can be passed as props to components that render them into HTML elements for their `onClick` and `onChange` events
- Manage input and form state with the `useState` hook, as well as updating complex state objects in React
- Update UI elements based on the state of controlled form inputs
- Handle form submission properly in React and use submitted values to modify UI rendering behavior

## Setting up the lab

Make sure to install the proper dependencies.

```bash
npm install
```

Once that's done, run the application like so:

```bash
npm run dev
```

## Directions

The goal here is to recreate Twitter's old UI so that it can be used by their team for A/B testing.

Much of the styling has already been provided by Twitter's team, but they'd like Site interns to implement the desired frontend functionality using React - a technology they've recently adopted.

It would help to first explore the component architecture and understand the potential flow of data as it is currently setup.

## Application Features

Here are the core features that Twitter would like Site interns to implement:

- Core Features

  - **Feature 1**: Prop drilling by passing static data, state variables, and state setter functions located in `App.jsx` component down to the `UserProfile`, `Navbar`, `NavLinks`, `Feed`, and `TweetBox` components
    - Drill down static props for `Navbar`
      - Open up the `App.jsx` component:
        - Take the static `navLinks` variable imported in the `App.jsx` component and pass it to the `Navbar` component as props.
      - Inside the `Navbar.jsx` component:
        - Pass the `navLinks` prop it just received down to the `NavLinks` component.
        - Next, iterate over the `navLinks` array and render a `NavLink` component for each one. Remember to give each one a unique key!
        - Pass each item in the `navLinks` array to the `NavLink` component as its `navLink` prop.
        - Now in the `NavLink` component, make sure to render the `label` attribute that exists on the `navLink` prop.
    - Drill down props for `UserProfile`
      - In the `App.jsx` component:
        - Leverage the `useState` hook to create a new state variable called `userProfile` and state updater function called `setUserProfile`.
        - Initialize `userProfile` state variable with the `codepathUserProfile` objects imported from the `constants.js` file.
      - Look inside the `UserProfile.jsx` component and see what props it needs:
        - Pass the correct props to the `UserProfile` component.
        - Then, examine the `CardContent` and `CardFooter` components and use the `userProfile` prop to provide both of those components the props that they need.
        - Don't worry about the `setUserProfile` function for now. We'll get to that in a moment.
    - Drill down props for `Feed` and `TweetBox` components
      - Next up, inside the `App.jsx` component:
        - Create another state variable and state updater function called `tweets` and `setTweets`, respectively.
        - Initialize the `tweets` variable as an array containing a single item - the `firstTweet` object imported from the `constants.js` file.
        - Now go ahead and pass the `tweets` array to the `Feed` component as the `tweets` prop.
        - Do the same thing with the `setTweets` function.
        - While we're at it, go ahead and pass the `userProfile` prop to the `Feed` component as well.
      - Inside the `Feed.jsx` component, let's handle a few things:
        - Find the location where the `TweetBox` is being rendered.
        - Look inside the `TweetBox.jsx` component and see what props it's expecting
        - Pass the correct props from the `Feed` component down into the `TweetBox` component.
  - **Feature 2**: Managing complex state objects
    - The `Feed.jsx` component is now receiving an array of tweet objects. Let's use them.
      - Inside the return statement of the `Feed` component, iterate over the list of tweets and render a `Tweet` component for each one. Do this inside the div with a className of `twitter-feed`. Remember to give each one a unique `key` attribute!
      - Each `Tweet` component should receive the `tweet` as its prop.
      - The component renders a `div` element with the className of `tweet`. That div also contains a custom `data-tweet-id` attribute. Set the `data-tweet-id` attribute equal to the `id` of the `tweet` prop.
      - Look inside the `Tweet.jsx` file and see what props the `TweetUserInfo` and `TweetFooter` components are expecting.
      - Make sure to supply those components with the correct props as well.
    - Let's switch gears and examine the `TweetBox` component:
      - It should now have `userProfile` and `setTweets` props that its receiving from the `Feed` component
      - Before the return statement in the `TweetBox` component, create a `handleOnSubmit` function.
        - When that function is called, it should create a new object and store it in a variable named `newTweet`.
          - That object should have `name` and `handle` attributes equal to the `name` and `handle` attributes of the `userProfile` prop.
          - It should also have a `text` attribute that can be set to an empty string for now.
          - Go ahead and also set the `comments`, `retweets`, and `likes` properties each equal to `0`.
          - The `id` of the `newTweet` should be equal to the current length of the `tweets` array.
          - > NOTE: This may require accessing additional props! Don't be afraid to explore multiple ways to pass data.
        - The `handleOnSubmit` function should then call the `setTweets` function and update the `tweets` state array to include the new tweet.
        - Don't be afraid to look at the React [docs](https://beta.reactjs.org/learn/updating-arrays-in-state) on updating arrays in state at any point
        - Finally, pass the `handleOnSubmit` function to the `TweetSubmitButton` as its `handleOnSubmit` prop.
      - In the `TweetSubmitButton` component, attach that `handleOnSubmit` function to the `button` element with the className of `tweet-submit-button` as its `onClick` event handler.
      - Now, when the submit `button` is clicked, the `handleOnSubmit` function should be called and it should create add a new tweet object to the `tweets` state variable.
      - Try it out! A new tweet should be rendered to the screen.
  - **Feature 3**: Creating controlled inputs
    - We can now create new tweets, but we're just setting their `text` attribute equal to an empty string. We'll want to allow users to enter their own tweet text to have a working application.
    - We'll begin in the `App.jsx` component:
      - Create another state variable and state updater function called `tweetText` and `setTweetText`, respectively.
      - Initialize the `tweetText` variable with an empty string.
      - Pass both `tweetText` and `setTweetText` to the `Feed` component as props.
      - Then pass both the `tweetText` and `setTweetText` props from the `Feed` component down into the `TweetBox` component.
    - Now in the `TweetBox` component:
      - Go ahead and pass the `tweetText` prop from the `TweetBox` component down into the `TweetInput` component as its `value` prop.
      - Then, right above the `handleOnSubmit` function, create a function called `handleOnTweetTextChange`.
        - It should take a change event as its only argument, and it should call the `setTweetText` function with the new value of the `textarea` element.
        - For a refresher on how to extract the `textarea` value from the change event, look at the React [docs](https://beta.reactjs.org/learn/reacting-to-input-with-state#step-5-connect-the-event-handlers-to-set-state) on managing form state.
        - Next, pass the `handleOnTweetTextChange` function to the `TweetInput` component as its `handleOnChange` prop.
    - Then in the `TweetInput` component:
      - Set the `value` prop of the `textarea` equal to the `TweetInput` component's `value` prop, so that whatever state value the `tweetText` is set to will be reflected in the `textarea`.
      - Accordingly, set the `onChange` handler of the `textarea` equal to the function passed to the `TweetInput` as its `handleOnChange` prop.
      - We should now have a controlled input where typing into the `textarea` triggers a state update, and adjusts the value of the `textarea`. Since we can track the `textarea`'s value, lets use that when creating new tweets.
    - Back in the `TweetBox` component:
      - Update the `handleOnSubmit` function so that the `text` attribute of the `newTweet` is equal to whatever the `tweetText` state variable is at the time.
      - At the end of the `handleOnSubmit` function, reset the `tweetText` state variable to an empty string.
      - We should now be able to create tweets with our own custom text!
  - **Feature 4**: React state updates
    - Let's add a few finishing touches, this time using only the tests as guidance:
      - In the `TweetBox` component:
        - The `TweetSubmitButton` component:
          - The button should be disabled when the user hasn't entered any text yet, or they have more than 140 characters in their tweet.
          - Once the user has submitted, the text area should be reset to an empty string - `""`.
        - The `TweetCharacterCount` component:
          - Pass the correct props to the `TweetCharacterCount` component.
          - Use them to update the span with the `tweet-length` className to display the **number of characters left** that are allowed in a user's tweet.
          - Remember that the max is 140 characters.
          - If the number of characters left is a negative number, make sure the text is red so the user knows they've gone over the limit. To do so, conditionally give that element the `red` class
  - And there we go! There's a lot more we can do here, but for now, this should keep Twitter happy.

- Stretch Features:
  - `TweetBox` and `TweetInput` components:
    - Once the user clicks into the text area in the `TweetInput` component, it should be given the `expanded` class and increase its height. Make sure to use the `onFocus` event handler.
    - If the the user hasn't written any text and they click out of the textarea, it should collapse. Make sure to use the `onBlur` event handler. If they _have_ written text, it should stay expanded.
    - When the text area is expanded, the `fa-image` icon should be changed to a `fa-smile` icon.
  - `UserProfile` component
    - Add an image to the user profile that is displayed where the avatar icon goes.
  - `Tweet` component
    - Modify the `Tweet` component so that it stores its own internal state. Whenever a user clicks on the heart, it should increment the number of likes for that tweet.
    - Make each `Tweet` component collapsible by clicking on the downward facing chevron icon in the top right of the component.
    - Highlight any hashtags light blue.
    - **Extra Stretch** - create a modal that pops up whenever the user clicks on the retweet icon. It should give the user the ability to retweet that particular tweet and increment the number of retweets.
  - `TweetInput` component
    - Modify the tweet input text so that any hashtags are highlighted blue.
    - When the user clicks on the smiley face, show them a menu of emojis to add to their tweet. Clicking on an emoji should append it to the tweet text.
