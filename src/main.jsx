import React from "react"
import ReactDOM from "react-dom"
import { InstantNoodles } from "instant-noodles"
import App from "./App"
import "./globals.css"

import { testPropDrilling } from "./tests/feature-001-prop-drilling.test"
import { testComplexStateHandling } from "./tests/feature-002-complex-state-updates.test"
import { testControlledInputs } from "./tests/feature-003-creating-controlled-inputs.test"
import { testReactiveStateUpdates } from "./tests/feature-004-reactive-state-updates.test"

const tests = {
  propDrilling: testPropDrilling,
  complexState: testComplexStateHandling,
  controlledInputs: testControlledInputs,
  reactiveStateUpdates: testReactiveStateUpdates,
}

export const config = {}

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* Leave this here for live test environment */}
    <InstantNoodles RootComponent={App} tests={tests} config={config} />
  </React.StrictMode>,
  document.getElementById("root")
)
