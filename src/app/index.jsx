import React, { useReducer } from "react"
import Header from "./header"
import Footer from "./footer"
import ScreenController from "./screenController"
import { sort2DArray } from "../math/array"
import { calcTshSetpoint, calcFt4Setpoint } from "../math/thyroid"
import ExponentialRegression from "ml-regression-exponential"

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

    case "CALC_SETPOINT":
      // if there is not enough data return without doing anything
      if (state.values < 2) {
        console.log("There is not enough data to calculate the setpoint.")
        return { ...state }
      }

      // format the data from state for ease of use
      const data = state.values
        .reduce((acc, item) => {
          acc.push([Number(item.ft4), Number(item.tsh)])
          return acc
        }, [])
        .sort(sort2DArray)

      const regression = new ExponentialRegression(
        data.map(p => p[0]),
        data.map(p => p[1])
      )

      const { r2 } = regression.score(
        data.map(p => p[0]),
        data.map(p => p[1])
      )

      const setpointTSH = calcTshSetpoint(regression.A)
      const setpointFT4 = calcFt4Setpoint(regression.A, regression.B)

      return {
        ...state,
        setpoint: {
          slope: regression.A,
          multiplier: regression.B,
          ft4: setpointFT4,
          tsh: setpointTSH,
          probability: r2,
        },
      }

    default:
      throw new Error("Please provide and action")
  }
}

const SetpointApp = () => {
  const [state, dispatch] = useReducer(reducer, { values: [], setpoint: {}, screen: "user-input" })

  return (
    <>
      <Header />
      <ScreenController state={state} dispatch={dispatch} />
      <Footer dispatch={dispatch} disableSetpointButton={state.values.length < 2} />
    </>
  )
}

export default SetpointApp
