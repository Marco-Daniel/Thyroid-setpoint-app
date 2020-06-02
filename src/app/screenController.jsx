import React from "react"
import DisplayValues from "./DisplayValues"

const ScreenController = ({ state, dispatch }) => {
  switch (state.screen) {
    case "user-input":
      return <DisplayValues values={state.values} dispatch={dispatch} />

    default:
      return <DisplayValues values={state.values} dispatch={dispatch} />
  }
}

export default ScreenController
