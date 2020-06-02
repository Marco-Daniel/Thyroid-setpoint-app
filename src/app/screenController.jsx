import React from "react"
import InputScreen from "./inputScreen"
import DisplaySetpoint from "./displaySetpoint"

const ScreenController = ({ state, dispatch }) => {
  switch (state.screen) {
    case "user-input":
      return <InputScreen values={state.values} dispatch={dispatch} />

    case "calculated":
      return <DisplaySetpoint state={state} dispatch={dispatch} />

    default:
      return <InputScreen values={state.values} dispatch={dispatch} />
  }
}

export default ScreenController
