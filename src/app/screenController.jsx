import React from "react"
import DisplayValues from "./displayValues"
import DisplaySetpoint from "./displaySetpoint"

const ScreenController = ({ state, dispatch }) => {
  switch (state.screen) {
    case "user-input":
      return <DisplayValues values={state.values} dispatch={dispatch} />

    case "calculated":
      return <DisplaySetpoint state={state} dispatch={dispatch} />

    default:
      return <DisplayValues values={state.values} dispatch={dispatch} />
  }
}

export default ScreenController
