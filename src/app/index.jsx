import React, { useReducer } from "react"
import Header from "./header"
import Footer from "./footer"
import DisplayValues from "./DisplayValues"

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, values: [...state.values, action.payload] }

    case "REMOVE":
      const newValues = [...state.values]
      // find the index of the payload
      const index = newValues.indexOf(action.payload)
      // remove the item or throw error if index not found
      if (index > -1) {
        newValues.splice(index, 1)
      } else {
        console.log(action.payload)
        throw new Error("Index of object not found")
      }

      return { ...state, values: [...newValues] }

    default:
      throw new Error("Please provide and action")
  }
}

const SetpointApp = () => {
  const [state, dispatch] = useReducer(reducer, { values: [] })

  return (
    <>
      <Header />
      <DisplayValues values={state.values} dispatch={dispatch} />
      <Footer dispatch={dispatch} />
    </>
  )
}

export default SetpointApp
