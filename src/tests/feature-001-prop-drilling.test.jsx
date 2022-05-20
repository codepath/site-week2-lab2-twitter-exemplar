import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"
import { firstTweet, codepathUserProfile, navLinks } from "../constants"
import * as format from "../utils/format"

export function testPropDrilling(App) {
  const {
    assert,
    suite,
    render,
    cleanup,
    // fireEvent,
    // customQueries,
    bootstrapTestSuiteContext,
  } = configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite(
    `FEATURE 001: Props are correctly passed from the top level component all the way down to the child components`
  )

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)

    const testInstances = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: [
        "Feed",
        "TweetBox",
        "TweetInput",
        "TweetSubmitButton",
        "UserProfile",
        "Navbar",
        "NavLinks",
        "CardContent",
        "CardFooter",
      ],
      multiComponentNames: ["Tweet", "NavLink"],
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

  /******************
        NAVBAR 
  *******************/
  FeatureTestSuite.test(
    "The `Navbar.jsx` component should receive the correct props from the `App.jsx` component, and pass the correct props to the `NavLink` component",
    async (ctx) => {
      ctx.testInstances.propAssertions.Navbar.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.Navbar.assertComponentExistsAndHasValueInProps("navLinks")

      ctx.testInstances.propAssertions.NavLinks?.assertComponentExistsAndHasProps?.()
      ctx.testInstances.propAssertions.NavLinks?.assertComponentExistsAndHasProps?.("navLinks")
    }
  )

  FeatureTestSuite.test(
    "The `NavLinks` component iterates over its `navLinks` prop and renders a `NavLink` component for each item in the array",
    async (ctx) => {
      ctx.testInstances.propAssertions.Navbar.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.Navbar.assertComponentExistsAndHasValueInProps("navLinks")
      ctx.testInstances.propAssertions.NavLinks?.assertComponentExistsAndHasProps?.()
      ctx.testInstances.propAssertions.NavLinks?.assertComponentExistsAndHasProps?.("navLinks")

      const navLinkComponents = ctx.testInstances.NavLink ?? []
      assert.equal(
        navLinkComponents.length,
        navLinks.length,
        `The \`Navbar\` component should render ${navLinks.length} \`NavLink\` components.`
      )

      const { queryByText } = render(<App />)

      for (let i = 0; i < navLinks.length; i++) {
        const navLink = navLinks[i]
        assert.ok(
          ctx.testInstances.NavLink?.[i],
          `The \`Navbar\` component should render a \`NavLink\` component for each item in the \`navLinks\` array.`
        )
        ctx.testInstances.propAssertions.NavLink?.[i]?.assertComponentExistsAndHasProps?.()
        ctx.testInstances.propAssertions.NavLink?.[i]?.assertComponentExistsAndHasProps?.("navLink")
        assert.equal(
          ctx.testInstances.NavLink?.[i]?.props,
          { navLink },
          "The `Navbar` component pass iterate over the `navLinks` and pass each item to a `NavLink` component as its `navLink` prop."
        )

        assert.ok(
          queryByText(navLink.label, { exact: true, selector: "span" }),
          `Each \`NavLink\` component should render a \`span\` element with the text equal to the \`navLink\` label.` +
            ` None found for "${navLink.label}".`
        )
      }
    }
  )

  /******************
      USER PROFILE 
  *******************/
  FeatureTestSuite.test(
    "The `UserProfile.jsx` component should receive the correct props and pass the correct props to the `CardContent` and `CardFooter` components",
    async (ctx) => {
      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasProps()

      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasValueInProps("userProfile")
      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasValueInProps("name")
      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasValueInProps("handle")
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasValueInProps("numTweets")
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasValueInProps("numFollowers")

      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasPropOfType("name", "string")
      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasPropOfType("handle", "string")
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasPropOfType("numTweets", "number")
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasPropOfType("numFollowers", "number")

      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "name",
        attributeType: "string",
      })
      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "handle",
        attributeType: "string",
      })
      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "numTweets",
        attributeType: "number",
      })
      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "numFollowers",
        attributeType: "number",
      })

      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasPropWithValue(
        "userProfile",
        codepathUserProfile
      )
      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasPropWithValue(
        "name",
        codepathUserProfile.name
      )
      ctx.testInstances.propAssertions.CardContent.assertComponentExistsAndHasPropWithValue(
        "handle",
        codepathUserProfile.handle
      )
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasPropWithValue(
        "numTweets",
        codepathUserProfile.numTweets
      )
      ctx.testInstances.propAssertions.CardFooter.assertComponentExistsAndHasPropWithValue(
        "numFollowers",
        codepathUserProfile.numFollowers
      )
    }
  )

  FeatureTestSuite.test(
    "The App.jsx component passes the correct `userProfile` state variable to the `UserProfile` component as a prop",
    async (ctx) => {
      ctx.testInstances.propAssertions.UserProfile.assertComponentExistsAndHasValueInProps("userProfile")
      const userProfile = ctx.testInstances.UserProfile?.props?.userProfile

      assert.is(
        userProfile,
        codepathUserProfile,
        "The `userProfile` state variable should be set to the `codepathUserProfile` variable from the `constants` file."
      )

      assert.equal(
        userProfile.numFollowers,
        codepathUserProfile.numFollowers,
        `The \`UserProfile\` component should be passed a \`userProfile\` prop that ` +
          ` has the correct \`numFollowers\` value. [ACTUAL: ${userProfile?.numFollowers}]`
      )

      const { queryByText } = render(<App />)

      // CardContent
      assert.ok(
        queryByText(`${userProfile?.name}`, { exact: false, selector: "h3" }),
        `The \`CardContent\` component should display the \`name\` attribute of the \`userProfile\` (${codepathUserProfile?.name}) inside` +
          ` an \`h3\` element. It was not found on the page.`
      )
      assert.ok(
        queryByText(`@${userProfile?.handle}`, { exact: true, selector: "p" }),
        `The \`CardContent\` component should display the \`handle\` attribute of the \`userProfile\` (@${codepathUserProfile?.handle}) inside` +
          ` a \`p\` element. It was not found on the page.`
      )

      // CardFooter
      const formattedNumFollowers = format.formatNumFollowers(userProfile?.numFollowers)
      const formattedNumTweets = format.formatNumTweets(userProfile?.numTweets)
      assert.ok(
        queryByText(`${formattedNumFollowers}`, { exact: true, selector: "span.metric" }),
        `The \`CardFooter\` component should display the \`numFollowers\` attribute of the \`userProfile\` (${formattedNumFollowers}) inside` +
          ` a \`span\` element. It was not found on the page.`
      )
      assert.ok(
        queryByText(`${formattedNumTweets}`, { exact: true, selector: "span.metric" }),
        `The \`CardFooter\` component should display the \`numTweets\` attribute of the \`userProfile\` (${formattedNumTweets}) inside` +
          ` a \`span\` element. It was not found on the page.`
      )
    }
  )

  /******************
          FEED 
  *******************/
  FeatureTestSuite.test(
    "The `App.jsx` component passes the `tweets` state variable to the `Feed` component as a prop." +
      " It should have the `firstTweet` object as its first item.",
    async (ctx) => {
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasValueInProps("tweets")

      const feedTweetsProp = ctx.testInstances.Feed?.props?.tweets

      assert.ok(
        Array.isArray(feedTweetsProp),
        "The `Feed` component should have a tweets prop that is an array." + ` [ACTUAL: ${feedTweetsProp}]`
      )
      assert.equal(
        feedTweetsProp?.[0],
        firstTweet,
        `The \`Feed\` component should be pass a \`tweets\` prop that has the \`firstTweet\` object as its first item. [ACTUAL: ${feedTweetsProp?.[0]}]`
      )
    }
  )

  FeatureTestSuite.test(
    "The `setTweets` state setter function is passed down from the `App.jsx` component" +
      " to the `Feed` component as a prop, and then passed down to the `TweetBox` component as a prop.",
    async (ctx) => {
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasValueInProps("setTweets")
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasPropOfType("setTweets", "function")
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasPropOfType("setTweets", "function")

      assert.equal(
        ctx.testInstances.Feed?.props?.setTweets,
        ctx.testInstances.TweetBox?.props?.setTweets,
        "The same `setTweets` state updater function should be passed from the `App.jsx` component to the `Feed` component, and then to the `TweetBox` component."
      )
    }
  )

  FeatureTestSuite.test(
    "The `App.jsx` component also passes the `userProfile` state variable to the `Feed` component as a prop, " +
      "and the `Feed` component passes the `userProfile` prop to the `TweetBox` component as a prop.",
    async (ctx) => {
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasValueInProps("userProfile")

      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "name",
        attributeType: "string",
      })
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "handle",
        attributeType: "string",
      })
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "numTweets",
        attributeType: "number",
      })
      ctx.testInstances.propAssertions.Feed.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "numFollowers",
        attributeType: "number",
      })

      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasProps()
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasValueInProps("userProfile")
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "name",
        attributeType: "string",
      })
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "handle",
        attributeType: "string",
      })
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "numTweets",
        attributeType: "number",
      })
      ctx.testInstances.propAssertions.TweetBox.assertComponentExistsAndHasPropWithAttributeOfType({
        propName: "userProfile",
        attributeName: "numFollowers",
        attributeType: "number",
      })
    }
  )

  return FeatureTestSuite.run()
}
