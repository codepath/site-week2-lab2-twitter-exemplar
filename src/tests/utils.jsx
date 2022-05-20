import * as React from "react"
import * as sinon from "sinon"
import { configureSpecSuite } from "instant-noodles"
import { firstTweet, codepathUserProfile } from "../constants"
import Feed from "../components/Feed/Feed"
import UserProfile from "../components/UserProfile/UserProfile"
import { config } from "../main"

export class TestInstancePropAssertions {
  constructor(component, componentName, specSuite) {
    this.component = component
    this.componentName = componentName
    this.specSuite = specSuite
  }

  getComponentProps = () => this.component?.props ?? {}

  getProp = (propName) => this.getComponentProps()?.[propName]

  assertComponentExistsAndHasProps = () => {
    this.specSuite.assert.ok(
      this.component?.props,
      `The \`${this.componentName}\` component should exist and have a valid \`props\` object.`
    )
  }

  assertComponentExistsAndHasValueInProps = (propName) => {
    this.specSuite.assert.ok(
      propName in this.getComponentProps(),
      `The \`${this.componentName}\` component should have a valid \`${propName}\` prop.`
    )
  }

  assertComponentExistsAndHasPropOfType = (propName, propType) => {
    this.specSuite.assert.type(
      this.getProp(propName),
      propType,
      `The \`${this.componentName}\` component should have a \`${propName}\` prop that is a \`${propType}\`.` +
        ` [ACTUAL TYPE: ${typeof prop}]`
    )
  }

  assertComponentExistsAndHasPropWithValue = (propName, propValue) => {
    const prop = this.getProp(propName)
    this.specSuite.assert.equal(
      prop,
      propValue,
      `The \`${this.componentName}\` component should have a \`${propName}\` prop with a value of \`${propValue}\`.` +
        ` [ACTUAL: ${prop}]`
    )
  }

  assertComponentExistsAndHasPropWithAttributeOfType = ({ propName, attributeName, attributeType }) => {
    const prop = this.getProp(propName)
    this.specSuite.assert.ok(
      attributeName in prop,
      `The \`${this.componentName}\` component should have a \`${propName}\` prop with a \`${attributeName}\` attribute.` +
        ` [ACTUAL: ${this.getComponentProps()}]`
    )

    const attr = prop[attributeName]
    this.specSuite.assert.type(
      attr,
      attributeType,
      `The \`${this.componentName}\` component should have a \`${propName}\` prop` +
        ` containing the \`${attributeName}\` attribute of type \`${attributeType}\`.` +
        ` [ACTUAL TYPE: ${typeof attr}]`
    )
  }
}

const createTestInstanceRoot = (RootComponent, reactTestRenderer) => {
  let testRenderer
  try {
    reactTestRenderer.act(() => {
      testRenderer = reactTestRenderer.create(<RootComponent />)
    })
    return testRenderer.root
  } catch (e) {
    console.log({ e })
    return null
  }
}

const getTestInstancesForRoot = (
  { RootComponent, singleComponentNames = [], multiComponentNames = [] } = {},
  specSuite
) => {
  const rootInstance = createTestInstanceRoot(RootComponent, specSuite.reactTestRenderer)
  if (!rootInstance) return {}

  const result = { root: rootInstance }

  const singleComponentFibers = (singleComponentNames ?? []).reduce((acc, componentName) => {
    try {
      const componentTestInstance = rootInstance.find(
        (node) => node?.type?.name === componentName || node?.type?.displayName === componentName
      )
      return { ...acc, [componentName]: componentTestInstance }
    } catch (e) {
      if (config?.debug) console.log({ e, componentName })
      return acc
    }
  }, {})

  const singleComponentAssertions = Object.fromEntries(
    Object.entries(singleComponentFibers).map(([componentName, componentTestInstance]) => {
      return [componentName, new TestInstancePropAssertions(componentTestInstance, componentName, specSuite)]
    })
  )

  const multiComponentFibers = (multiComponentNames ?? []).reduce((acc, multiComponentName) => {
    try {
      const componentTestInstance = rootInstance.findAll(
        (node) => node?.type?.name === multiComponentName || node?.type?.displayName === multiComponentName
      )
      return { ...acc, [multiComponentName]: componentTestInstance }
    } catch (e) {
      if (config?.debug) console.log({ e, multiComponentName })
      return acc
    }
  }, {})

  const multiComponentAssertions = Object.fromEntries(
    Object.entries(multiComponentFibers).map(([componentName, componentTestInstanceArray]) => {
      return [
        componentName,
        componentTestInstanceArray.map(
          (componentTestInstance) => new TestInstancePropAssertions(componentTestInstance, componentName, specSuite)
        ),
      ]
    })
  )

  return {
    ...result,
    ...singleComponentFibers,
    ...multiComponentFibers,
    propAssertions: {
      ...singleComponentAssertions,
      ...multiComponentAssertions,
    },
  }
}

const defaultProps = { userProfile: codepathUserProfile }

export const constructMockStateAndAppBuilder = (ctx) => {
  const createMockStateAndApp = () => {
    const MockState = {
      tweetText: "",
      tweets: [firstTweet],
      setTweets: (fnOrArray) => {
        MockState.__mockSetState(fnOrArray, "tweets")
      },
      setTweetText: (fnOrString) => {
        MockState.__mockSetState(fnOrString, "tweetText")
      },
      __mockSetState: (fnOrValue, attr) => {
        // mock a simple version of setState that either takes in the value or a callback function
        if (!MockState.hasOwnProperty(attr)) {
          console.log(`MockState does not have a property named ${attr}`)
          return
        }
        MockState[attr] = typeof fnOrValue === "function" ? fnOrValue(MockState[attr]) : fnOrValue
        MockState.updater({ fnOrValue, attr })
      },
      __reset: () => {
        MockState.tweets = [firstTweet]
        MockState.tweetText = ""
      },
      updater: () => {
        MockState.forceUpdate()
      },
      forceUpdate: () => {
        // force a re-render due to state updates
      },
      forceUpdateHasBeenSet: false,
    }

    function MockApp() {
      const [, forceUpdate] = React.useState(0)
      const mockState = React.useRef(MockState)

      React.useEffect(() => {
        mockState.current.forceUpdate = () => forceUpdate((r) => r + 1)
        mockState.current.forceUpdateHasBeenSet = true
      }, [])

      return (
        <main>
          <UserProfile {...defaultProps} />
          <Feed {...mockState.current} {...defaultProps} />
        </main>
      )
    }

    return { MockState, MockApp, defaultProps }
  }

  ctx.createMockStateAndApp = createMockStateAndApp
}

export function configureSpecSuiteWithUtils(App) {
  const specSuite = configureSpecSuite()

  const {
    assert,
    suite,
    render,
    cleanup,
    fireEvent,
    // queryHelpers,
    // buildQueries,
    reactTestRenderer,
    within,
    waitFor,
  } = specSuite

  const bootstrapTestSuiteContext = (ctx) => {
    ctx.sandbox = sinon.createSandbox()
    constructMockStateAndAppBuilder(ctx)

    ctx.getTestInstancesForRoot = (props) => getTestInstancesForRoot(props, specSuite)
  }

  const customQueries = {
    getRenderedTweets: (container) => container.querySelectorAll(".tweet"),
    getTweetTextArea: (container) => container.querySelector(".tweet-textarea textarea"),
    getTweetBoxFooter: (container) => container.querySelector(".tweet-box .tweet-box-footer"),
    getTweetSubmitButton: (container, within) => container.querySelector("button.tweet-submit-button"),
  }

  const advancedCustomQueries = {
    ...customQueries,
    getDataTweetIdAttributes: (container) => {
      const renderedTweets = customQueries.getRenderedTweets(container) ?? []
      return Array.from(renderedTweets).map((tweet) => Number(tweet.getAttribute("data-tweet-id")))
    },
  }

  return {
    assert,
    suite,
    render,
    cleanup,
    fireEvent,
    customQueries: advancedCustomQueries,
    bootstrapTestSuiteContext,
    reactTestRenderer,
    within,
    waitFor,
  }
}
