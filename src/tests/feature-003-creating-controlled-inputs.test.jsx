import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"

export function testControlledInputs(App) {
  const {
    assert,
    suite,
    render,
    fireEvent,
    cleanup,
    customQueries,
    bootstrapTestSuiteContext,
    within,
    //
  } = configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite(`FEATURE 003: Managing controlled inputs`)

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)

    const testInstances = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: ["Feed", "TweetBox", "TweetInput", "TweetSubmitButton", "UserProfile"],
      multiComponentNames: ["Tweet"],
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
    `The \`App.jsx\` component should pass the \`tweetText\` state variable down to the \`Feed\` component as a prop.` +
      `The \`Feed\` component should then pass that \`tweetText\` prop down to the \`TweetBox\` component as a prop, where ` +
      `it is again passed down to the \`TweetInput\` component as the \`value\` prop. `,
    async (ctx) => {
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasValueInProps("tweetText")
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasPropOfType("tweetText", "string")
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasPropOfType("tweetText", "string")
      ctx.testInstances.propAssertions.TweetInput.assertComponentExistsAndHasPropOfType("value", "string")
      // //
    }
  )

  FeatureTestSuite.test(
    `The \`TweetBox\` component should create a \`handleOnTweetTextChange\` function` +
      ` that takes an input change \`event\` as its only argument and uses it to update the \`tweetText\` state variable to the new value.` +
      ` The function should be passed to the \`TweetInput\` component as the \`handleOnChange\` prop. `,
    async (ctx) => {
      const { MockState, MockApp } = ctx.createMockStateAndApp()

      const spiedSetTweetText = ctx.sandbox.spy(MockState, "setTweetText")

      const testInstances = ctx.getTestInstancesForRoot({
        RootComponent: MockApp,
        singleComponentNames: ["Feed", "TweetBox", "TweetInput", "TweetSubmitButton", "UserProfile"],
        multiComponentNames: ["Tweet"],
      })

      testInstances.propAssertions.TweetInput.assertComponentExistsAndHasPropOfType("handleOnChange", "function")
      assert.equal(
        testInstances.TweetInput?.props?.handleOnChange?.name,
        "handleOnTweetTextChange",
        "The TweetInput component should be passed a `handleOnChange` prop that is a function named `handleOnTweetTextChange`. Instead found function with name: " +
          testInstances.TweetInput?.props?.handleOnChange?.name
      )

      const newTweetTextValue = "new tweet"
      testInstances.TweetInput?.props?.handleOnChange?.({ target: { value: newTweetTextValue } })

      assert.ok(
        spiedSetTweetText.calledOnce,
        "The `setTweetText` state updater function should have been called when the `handleOnTweetTextChange` function was called. It was not."
      )
      assert.equal(
        MockState.tweetText,
        newTweetTextValue,
        `The \`tweetText\` state variable should have been updated to the new value. It was not.`
      )
    }
  )

  FeatureTestSuite.test(
    "The `TweetInput` component should pass the `value` prop to the `textarea` element as its `value` prop, " +
      "and the `handleOnChange` prop to the `textarea` element as its `onChange` prop.",
    async (ctx) => {
      const { MockApp } = ctx.createMockStateAndApp()

      const testInstances = ctx.getTestInstancesForRoot({
        RootComponent: MockApp,
        singleComponentNames: ["TweetBox", "TweetInput"],
      })

      testInstances.propAssertions.TweetInput.assertComponentExistsAndHasPropOfType("value", "string")
      testInstances.propAssertions.TweetInput.assertComponentExistsAndHasPropOfType("handleOnChange", "function")

      const tweetTextArea = testInstances.root.find((node) => node.type === "textarea")

      assert.ok(
        tweetTextArea,
        "The TweetInput component should have a `textarea` element with the className of `new-tweet-input`."
      )

      assert.equal(
        tweetTextArea?.props?.value,
        testInstances.TweetInput.props?.value,
        "The `TweetInput` component should pass its `value` prop down to the `textarea` element as its `value` prop."
      )

      assert.equal(
        tweetTextArea?.props?.onChange,
        testInstances.TweetInput.props.handleOnChange,
        "The `TweetInput` component should pass its `handleOnChange` prop down to the `textarea` element as its `onChange` prop."
      )
    }
  )

  FeatureTestSuite.test("Typing into the `textarea` element updates the `tweetText` state variable", async (ctx) => {
    const { MockState, MockApp } = ctx.createMockStateAndApp()
    const spiedSetTweetText = ctx.sandbox.spy(MockState, "setTweetText")
    const { container } = render(<MockApp />)

    const tweetTextArea = customQueries.getTweetTextArea(container)

    let newValue = "hello"

    fireEvent.change(tweetTextArea, { target: { value: newValue } })

    assert.ok(
      spiedSetTweetText.calledOnce,
      "The `setTweetText` prop should have been called when the `textarea` element's `onChange` event was fired."
    )
    assert.equal(
      MockState.tweetText,
      newValue,
      "The `tweetText` state variable should have been updated after typing into the `textarea`."
    )
    assert.equal(
      tweetTextArea.value,
      newValue,
      "The `textarea` element inside the `TweetInput` component should update its value when the user types into it."
    )
  })

  FeatureTestSuite.test(
    "New tweets should have the `text` attribute set to whatever value is in the `textarea` element at the time." +
      " That value should then be reset." +
      " The `numTweets` attribute on the `userProfile` state variable should be increased by 1.",
    async (ctx) => {
      // TODO: This test
      const { MockState, MockApp } = ctx.createMockStateAndApp()
      const spiedSetTweetText = ctx.sandbox.spy(MockState, "setTweetText")
      const spiedSetTweets = ctx.sandbox.spy(MockState, "setTweets")
      const { container, queryByText } = render(<MockApp />)

      const tweetTextArea = customQueries.getTweetTextArea(container)
      const tweetSubmitButton = customQueries.getTweetSubmitButton(container, within)

      let newTweetText = "sample tweet text #tweeting"
      fireEvent.change(tweetTextArea, { target: { value: newTweetText } })

      assert.ok(
        spiedSetTweetText.calledOnce,
        "The `setTweetText` prop should have been called when the `textarea` element's `onChange` event was fired."
      )
      assert.equal(
        MockState.tweetText,
        newTweetText,
        "The `tweetText` state variable should have been updated after typing into the `textarea`."
      )
      assert.equal(
        tweetTextArea.value,
        newTweetText,
        "The `textarea` element inside the `TweetInput` component should update its value when the user types into it."
      )

      assert.not.ok(
        spiedSetTweets.calledOnce,
        "The `setTweets` function should not have been called before the `TweetSubmitButton` was clicked."
      )

      fireEvent.click(tweetSubmitButton)

      assert.ok(
        spiedSetTweets.calledOnce,
        "The `setTweets` function should have been called when the `TweetSubmitButton` was clicked."
      )
      assert.equal(MockState.tweets.length, 2, "The `tweets` state variable should have been updated with a new tweet.")
      assert.equal(
        MockState.tweets[1].text,
        newTweetText,
        "The new tweet should have the `text` attribute set to the value of the `textarea` element."
      )

      const newTweet = queryByText(newTweetText, { selector: "p.tweet-text" })

      assert.ok(newTweet, "The new tweet should be rendered in the DOM.")

      assert.equal(MockState.tweetText, "", "The `textarea` element should have its value reset to an empty string.")
      assert.equal(tweetTextArea.value, "", "The `textarea` element should have its value reset to an empty string.")
    }
  )

  return FeatureTestSuite.run()
}
