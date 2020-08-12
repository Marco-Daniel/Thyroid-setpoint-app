import React from "react"
import InputScreen from "./inputScreen"
import CalculationsDashboard from "./calculationsDashboard"
import { useGlobalState } from "../hooks/useGlobalState"

const ScreenController = () => {
  const { state } = useGlobalState()

  switch (state.screen) {
    case "calculated":
      return <CalculationsDashboard />

    case "user-input":
    default:
      return <InputScreen />
  }
}

export default ScreenController
