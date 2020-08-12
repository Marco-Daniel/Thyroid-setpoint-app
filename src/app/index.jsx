import React, { useReducer, createContext } from "react"
import Header from "./header"
import Footer from "./footer"
import ScreenController from "./components/screenController"
import reducer from "./reducer"

const initState = {
  values: [],
  setpoint: {},
  screen: "user-input",
  graph: {},
}

export const GlobalState = createContext(initState)

const SetpointApp = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const isCalculatedScreen = state.screen === "calculated"

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <Header displayBack={isCalculatedScreen} />
      <ScreenController />
      <Footer disableSetpointButton={state.values.length < 2} hide={isCalculatedScreen} />
    </GlobalState.Provider>
  )
}

export default SetpointApp
