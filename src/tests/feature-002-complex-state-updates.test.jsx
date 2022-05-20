import * as React from "react"
// import * as sinon from "sinon"
import { configureSpecSuiteWithUtils } from "./utils"
import { firstTweet, codepathUserProfile } from "../constants"
// import TweetBox from "../components/TweetBox/TweetBox"
import { TweetSubmitButton } from "../components/TweetBox/TweetBox"

export function testComplexStateHandling(App) {
  const {
    assert,
    suite,
    render,
    cleanup,
    fireEvent,
    customQueries,
    bootstrapTestSuiteContext,
    // within,
  } = configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite(`FEATURE 002: Handling complex state updates`)

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)

    const testInstances = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: ["Feed", "TweetBox", "TweetInput", "TweetSubmitButton", "UserProfile"],
      multiComponentNames: ["Tweet", "TweetUserInfo", "TweetFooter"],
    })

    ctx.testInstances = testInstances
  })

  FeatureTestSuite.before.each((ctx) => {
    ctx.sandbox.restore()
  })

  FeatureTestSuite.after.each((ctx) => {
    ctx.sandbox.restore()
    cleanup()
  })

  FeatureTestSuite.after((ctx) => {
    ctx.sandbox.restore()
  })

  FeatureTestSuite.test(
    "The `Feed.jsx` component should iterate over its `tweets` prop and render a `Tweet` component for each one. " +
      "The `Tweet` component wrapper `div` should pass the tweet `id` to the `div` as the `data-tweet-id` attribute.",
    async (ctx) => {
      ctx.testInstances.propAssertions.Tweet?.[0].assertComponentExistsAndHasValueInProps("tweet")

      const TweetComponents = ctx.testInstances.Tweet

      assert.ok(
        Array.isArray(TweetComponents) && TweetComponents?.length > 0,
        `The Feed component should iterate over its tweets prop and render a Tweet component for each one.` +
          ` [ACTUAL: Number of Tweet components: ${TweetComponents?.length}]`
      )

      const firstTweetProps = ctx.testInstances.Tweet?.[0]?.props

      assert.equal(
        firstTweetProps?.tweet?.id,
        firstTweet.id,
        "The `Feed.jsx` component should iterate over the array of `tweets` prop " +
          "and render a `Tweet` component for each one, " +
          "passing it the `tweet` prop it needs."
      )

      // Render actual app
      const { container } = render(<App />)
      const dataTweetIdAttributes = customQueries.getDataTweetIdAttributes(container)

      assert.ok(
        dataTweetIdAttributes.includes(firstTweet.id),
        `No tweet found with the \`data-tweet-id\` attribute of ${firstTweet.id}. [ACTUAL: ${dataTweetIdAttributes}]`
      )
    }
  )

  FeatureTestSuite.test(
    "Each `Tweet` component passes the correct props to the `TweetUserInfo` and `TweetFooter` components.",
    async (ctx) => {
      ctx.testInstances.propAssertions.Tweet?.[0].assertComponentExistsAndHasValueInProps("tweet")

      const TweetComponents = ctx.testInstances.Tweet

      assert.ok(
        Array.isArray(TweetComponents) && TweetComponents?.length > 0,
        `The Feed component should iterate over its tweets prop and render a Tweet component for each one.` +
          ` [ACTUAL: Number of Tweet components: ${TweetComponents?.length}]`
      )

      const firstTweetProps = ctx.testInstances.Tweet?.[0]?.props

      assert.equal(
        firstTweetProps?.tweet?.id,
        firstTweet.id,
        "The `Feed.jsx` component should iterate over the array of `tweets` prop " +
          "and render a `Tweet` component for each one, " +
          "passing it the `tweet` prop it needs."
      )

      assert.ok(
        ctx.testInstances?.TweetUserInfo?.length > 0,
        "Each `Tweet` component should render a `TweetUserInfo` component."
      )
      assert.ok(
        ctx.testInstances?.TweetFooter?.length > 0,
        "Each `Tweet` component should render a `TweetFooter` component."
      )

      ctx.testInstances.propAssertions.TweetUserInfo?.[0].assertComponentExistsAndHasValueInProps("name")
      ctx.testInstances.propAssertions.TweetUserInfo?.[0].assertComponentExistsAndHasValueInProps("handle")
      ctx.testInstances.propAssertions.TweetFooter?.[0].assertComponentExistsAndHasValueInProps("numComments")
      ctx.testInstances.propAssertions.TweetFooter?.[0].assertComponentExistsAndHasValueInProps("numRetweets")
      ctx.testInstances.propAssertions.TweetFooter?.[0].assertComponentExistsAndHasValueInProps("numLikes")

      ctx.testInstances.propAssertions.TweetUserInfo?.[0].assertComponentExistsAndHasPropWithValue(
        "name",
        firstTweet.name
      )
      ctx.testInstances.propAssertions.TweetUserInfo?.[0].assertComponentExistsAndHasPropWithValue(
        "handle",
        firstTweet.handle
      )
      ctx.testInstances.propAssertions.TweetFooter?.[0].assertComponentExistsAndHasPropWithValue(
        "numComments",
        firstTweet.comments
      )
      ctx.testInstances.propAssertions.TweetFooter?.[0].assertComponentExistsAndHasPropWithValue(
        "numRetweets",
        firstTweet.retweets
      )
      ctx.testInstances.propAssertions.TweetFooter?.[0].assertComponentExistsAndHasPropWithValue(
        "numLikes",
        firstTweet.likes
      )
    }
  )

  FeatureTestSuite.test(
    "In the `TweetBox` component, create a `handleOnSubmit` function and pass it to the `TweetSubmitButton` as a prop." +
      " Attach that function to the `button` element with the className of `tweet-submit-button` as its `onClick` event handler",
    async (ctx) => {
      ctx.testInstances.propAssertions.TweetSubmitButton.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.TweetSubmitButton.assertComponentExistsAndHasValueInProps("handleOnSubmit")
      ctx.testInstances.propAssertions.TweetSubmitButton.assertComponentExistsAndHasPropOfType(
        "handleOnSubmit",
        "function"
      )

      // Render actual App component
      const { container } = render(<App />)

      const tweetSubmitButton = customQueries.getTweetSubmitButton(container)
      assert.ok(tweetSubmitButton, "A button with the className of `tweet-submit-button` should exist. None found.")

      const onClickIsNull = tweetSubmitButton.onclick === null && !tweetSubmitButton.onclick
      const onClickIsUndefined = typeof tweetSubmitButton.onclick === "undefined" && !tweetSubmitButton.onclick

      assert.type(
        tweetSubmitButton.onclick,
        "function",
        "The `TweetSubmitButton` component should have the `handleOnSubmit` function as its `onClick` event handler." +
          `[ACTUAL: ${onClickIsNull ? "null" : onClickIsUndefined ? "undefined" : typeof tweetSubmitButton.onclick}]`
      )

      cleanup()

      // Test actual passing of `handleOnSubmit` function from `TweetSubmitButton` to button
      const spy = ctx.sandbox.spy()

      const renderQueries = render(
        <main>
          <TweetSubmitButton isDisabled={false} handleOnSubmit={spy} />
        </main>
      )

      const customTweetSubmitButton = customQueries.getTweetSubmitButton(renderQueries.container)

      assert.ok(
        customTweetSubmitButton,
        "A `button` element with the className of `tweet-submit-button` should exist in the `TweetSubmitButton` component. None found."
      )

      fireEvent.click(customTweetSubmitButton)

      assert.ok(
        spy.calledOnce,
        `The \`TweetSubmitButton\` component doesn't pass its \`handleOnSubmit\` prop to the  \`button\` element as its \`onClick\` prop.`
      )
    }
  )

  FeatureTestSuite.test(
    "The `handleOnSubmit` function should create a new tweet object and " +
      "add it to the `tweets` state variable by calling the `setTweets` state updater function passed to it as a prop.",
    async (ctx) => {
      const { MockState, MockApp } = ctx.createMockStateAndApp()

      const spiedSetTweets = ctx.sandbox.spy(MockState, "setTweets")

      const mockAppTestInstances = ctx.getTestInstancesForRoot({
        RootComponent: MockApp,
        singleComponentNames: ["Feed", "TweetBox", "TweetInput", "TweetSubmitButton", "UserProfile"],
        multiComponentNames: ["Tweet"],
      })

      mockAppTestInstances.TweetSubmitButton?.props?.handleOnSubmit?.()

      assert.ok(
        spiedSetTweets.calledOnce,
        "The `setTweets` state updater function should have been called when the `handleOnSubmit` function was called."
      )
      assert.equal(MockState.tweets.length, 2, "The `tweets` state variable should have been updated with a new tweet.")

      const newTweet = MockState.tweets[MockState.tweets.length - 1]
      assert.ok(newTweet.name, "The new tweet should have a `name`.")
      assert.ok(newTweet.handle, "The new tweet should have a `handle`.")
      assert.type(newTweet.text, "string", "The new tweet should have a `text` property that is a 'string'.")

      const callArgs = spiedSetTweets.getCall(0)?.args ?? []
      const firstArg = callArgs?.[0]
      assert.ok(
        Array.isArray(firstArg) || typeof firstArg === "function",
        "The first argument to `setTweets` should be a new array of tweets or a function that takes in the old tweets and returns a new array of tweets."
      )

      if (typeof firstArg === "function") {
        const newTweets = firstArg(MockState.tweets)
        assert.equal(
          newTweets.length,
          3,
          "The `tweets` state variable should have been updated with a new tweet when the `handleOnSubmit` function was called."
        )
      }
    }
  )

  FeatureTestSuite.test(
    "The `handleOnSubmit` function should create the new tweet object using attributes from the `userProfile` prop. " +
      "It should set the new tweet's `id` attribute equal to the current length of the `tweets` array.",
    async (ctx) => {
      const { MockState, MockApp } = ctx.createMockStateAndApp()

      const spiedSetTweets = ctx.sandbox.spy(MockState, "setTweets")

      const mockAppTestInstances = ctx.getTestInstancesForRoot({
        RootComponent: MockApp,
        singleComponentNames: ["Feed", "TweetBox", "TweetInput", "TweetSubmitButton", "UserProfile"],
        multiComponentNames: ["Tweet"],
      })
      mockAppTestInstances.TweetSubmitButton?.props?.handleOnSubmit?.()

      assert.ok(
        spiedSetTweets.calledOnce,
        "The `setTweets` state updater function should have been called when the `handleOnSubmit` function was called. It was not."
      )

      assert.equal(
        MockState.tweets.length,
        2,
        "The `tweets` state variable should have been updated with a new tweet. [ACTUAL: " + MockState.tweets + "]"
      )

      const newTweet = MockState.tweets[1]

      assert.equal(
        newTweet.handle,
        codepathUserProfile.handle,
        "The new tweet should have the `handle` attribute from the `userProfile` prop."
      )
      assert.equal(
        newTweet.name,
        codepathUserProfile.name,
        "The new tweet should have the `name` attribute from the `userProfile` prop."
      )
      assert.equal(
        newTweet.id,
        1,
        "The new tweet should have the `id` attribute equal to the previous length of the `tweets` array." +
          ` [ACTUAL: ${newTweet.id}]`
      )
    }
  )

  return FeatureTestSuite.run()
}
