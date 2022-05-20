import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"

export function testReactiveStateUpdates(App) {
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

  const FeatureTestSuite = suite(`FEATURE 004: Reactive state updates`)

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
    `If the user has typed anything into the \`textarea\`, the \`TweetBox\` component` +
      ` should display a counter of how many characters the user has left (140 max).`,
    async (ctx) => {
      const { container } = render(<App />)

      const tweetTextArea = customQueries.getTweetTextArea(container)
      const tweetSubmitButton = customQueries.getTweetSubmitButton(container, within)
      const tweetFooter = customQueries.getTweetBoxFooter(container)

      assert.ok(
        tweetFooter,
        "The `TweetCharacterCount` component be rendered inside of the div with a className of `tweet-box-footer`."
      )

      const queryCharactersLeft = (charsLeft) =>
        within(tweetFooter).queryAllByText(charsLeft, { exact: false, selector: "span" })?.[0]

      let newValue = ""

      assert.ok(
        tweetTextArea,
        "The `TweetInput` component should have a textarea element inside the div with a className of `tweet-textarea`."
      )
      assert.equal(
        tweetTextArea.value,
        newValue,
        "The `TweetInput` component should have a textarea element with its value set to an empty string by default."
      )

      assert.not.ok(
        queryCharactersLeft("140"),
        "The `TweetCharacterCount` component should not display the number of characters left when the user has not typed anything into the textarea."
      )

      newValue = "a"
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        "The `TweetSubmitButton` component should not be disabled when the user has typed text into the textarea."
      )

      let charsLeftElement = queryCharactersLeft(140 - newValue.length)
      assert.ok(
        charsLeftElement,
        `The \`TweetCharacterCount\` component should display the number of characters left when the user has typed text into the textarea. ` +
          `[EXPECTED: ${140 - newValue.length}] - [ACTUAL: ${charsLeftElement?.textContent}]`
      )

      newValue = "a".repeat(10)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed text of length ${newValue.length} into the textarea.`
      )

      charsLeftElement = queryCharactersLeft(140 - newValue.length)
      assert.ok(
        charsLeftElement,
        `The \`TweetCharacterCount\` component should display the number of characters left when the user has typed text into the textarea. ` +
          `[EXPECTED: ${140 - newValue.length}] - [ACTUAL: ${charsLeftElement?.textContent}]`
      )

      newValue = "a".repeat(40)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed text of length ${newValue.length} into the textarea.`
      )

      charsLeftElement = queryCharactersLeft(140 - newValue.length)
      assert.ok(
        charsLeftElement,
        `The \`TweetCharacterCount\` component should display the number of characters left when the user has typed text into the textarea. ` +
          `[EXPECTED: ${140 - newValue.length}] - [ACTUAL: ${charsLeftElement?.textContent}]`
      )

      newValue = "a".repeat(100)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed ${newValue.length} characters into the textarea.`
      )

      charsLeftElement = queryCharactersLeft(140 - newValue.length)
      assert.ok(
        charsLeftElement,
        `The \`TweetCharacterCount\` component should display the number of characters left when the user has typed text into the textarea. ` +
          `[EXPECTED: ${140 - newValue.length}] - [ACTUAL: ${charsLeftElement?.textContent}]`
      )

      newValue = "a".repeat(140)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed ${newValue.length} characters into the textarea.`
      )

      charsLeftElement = queryCharactersLeft(140 - newValue.length)
      assert.ok(
        charsLeftElement,
        `The \`TweetCharacterCount\` component should display the number of characters left when the user has typed text into the textarea. ` +
          `[EXPECTED: ${140 - newValue.length}] - [ACTUAL: ${charsLeftElement?.textContent}]`
      )

      newValue = "a".repeat(141)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should be disabled when the user has typed ${newValue.length} characters or more into the textarea.`
      )

      charsLeftElement = queryCharactersLeft(140 - newValue.length)
      assert.ok(
        charsLeftElement,
        `The \`TweetCharacterCount\` component should display the number of characters left when the user has typed text into the textarea. ` +
          `[EXPECTED: ${140 - newValue.length}] - [ACTUAL: ${charsLeftElement?.textContent}]`
      )
    }
  )

  FeatureTestSuite.test(
    `If the user has not typed any text into the \`textarea\`, or they have typed more than 140 characters, then the submit button should be disabled.`,
    async (ctx) => {
      const { container } = render(<App />)

      const tweetTextArea = customQueries.getTweetTextArea(container)
      const tweetSubmitButton = customQueries.getTweetSubmitButton(container, within)

      assert.ok(
        tweetTextArea,
        "The `TweetInput` component should have a textarea element inside the div with a className of `tweet-textarea`."
      )
      assert.equal(
        tweetTextArea.value,
        "",
        "The `TweetInput` component should have a textarea element with its value set to an empty string by default."
      )

      assert.ok(
        tweetSubmitButton,
        "The `TweetBox` component should have a submit button inside the div with a className of `tweet-box-footer`."
      )
      assert.ok(
        tweetSubmitButton.disabled,
        "The `TweetSubmitButton` component should be disabled when the user has not entered any text into the textarea."
      )

      let newValue

      newValue = "a"
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        "The `TweetSubmitButton` component should not be disabled when the user has typed text into the textarea."
      )

      newValue = "a".repeat(10)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed text of length ${newValue.length} into the textarea.`
      )

      newValue = "a".repeat(40)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed text of length ${newValue.length} into the textarea.`
      )

      newValue = "a".repeat(100)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed ${newValue.length} characters into the textarea.`
      )

      newValue = "a".repeat(140)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should not be disabled when the user has typed ${newValue.length} characters into the textarea.`
      )

      newValue = "a".repeat(141)
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.ok(
        tweetSubmitButton.disabled,
        `The \`TweetSubmitButton\` component should be disabled when the user has typed ${newValue.length} characters or more into the textarea.`
      )
    }
  )

  FeatureTestSuite.test(
    `If the user has typed between 1-141 characters, they should be able to hit the submit button and see their new tweet rendered to the screen.` +
      ` The \`tweetText\` state variable should be reset to any empty string afterward.`,
    async (ctx) => {
      const { container, queryByText } = render(<App />)

      const renderedTweets = customQueries.getRenderedTweets(container)
      const tweetTextArea = customQueries.getTweetTextArea(container)
      const tweetSubmitButton = customQueries.getTweetSubmitButton(container, within)

      const currentTweetsLength = renderedTweets?.length

      assert.ok(
        tweetTextArea,
        "The `TweetInput` component should have a textarea element inside the div with a className of `tweet-textarea`."
      )
      assert.equal(
        tweetTextArea.value,
        "",
        "The `TweetInput` component should have a textarea element with its value set to an empty string by default."
      )

      assert.ok(
        tweetSubmitButton,
        "The `TweetBox` component should have a submit button inside the div with a className of `tweet-box-footer`."
      )
      assert.ok(
        tweetSubmitButton.disabled,
        "The `TweetSubmitButton` component should be disabled when the user has not entered any text into the textarea."
      )

      let newValue

      newValue = "Brand new tweet for testing purposes - just checking in #codepath"
      fireEvent.change(tweetTextArea, { target: { value: newValue } })

      assert.equal(
        tweetTextArea.value,
        newValue,
        "The textarea element inside the `TweetInput` component should update its value when the user types into it."
      )
      assert.not.ok(
        tweetSubmitButton.disabled,
        "The `TweetSubmitButton` component should not be disabled when the user has typed text into the textarea."
      )

      fireEvent.click(tweetSubmitButton)

      const newRenderedTweets = customQueries.getRenderedTweets(container)

      const mostRecentTweet = newRenderedTweets[newRenderedTweets.length - 1]
      assert.ok(mostRecentTweet, "A new tweet should be rendered to the screen when clicking the submit button.")

      assert.equal(
        newRenderedTweets.length,
        currentTweetsLength + 1,
        "A new tweet should be rendered to the screen when clicking the submit button."
      )

      const newTweet = queryByText(newValue, { selector: "p.tweet-text" })

      assert.ok(
        newTweet,
        "When clicking the submit button, A new tweet should be rendered to the screen with the text from the textarea."
      )
      assert.equal(
        tweetTextArea.value,
        "",
        "The textarea element inside the `TweetInput` component should be reset to an empty string after the user hits the submit button."
      )
    }
  )

  return FeatureTestSuite.run()
}
