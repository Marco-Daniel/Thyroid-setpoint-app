import React from "react"
import InputScreen from "./inputScreen"
import CalculationsDashboard from "./calculationsDashboard"

const ScreenController = ({ state, dispatch }) => {
  switch (state.screen) {
    case "user-input":
      return <InputScreen values={state.values} dispatch={dispatch} />

    case "calculated":
      return <CalculationsDashboard state={state} dispatch={dispatch} />

    default:
      return <InputScreen values={state.values} dispatch={dispatch} />
  }
}

export default ScreenController
