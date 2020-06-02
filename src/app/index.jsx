import React, { useReducer } from "react"
import Header from "./header"
import Footer from "./footer"
import ScreenController from "./screenController"
import { sort2DArray } from "../math/array"
import { calcTshSetpoint, calcFt4Setpoint } from "../math/thyroid"
import ExponentialRegression from "ml-regression-exponential"

const example = [
  {
    ft4: 13,
    tsh: 2.56,
  },
  {
    ft4: 12,
    tsh: 40.82,
  },
  {
    ft4: 11.8,
    tsh: 46.43,
  },
  {
    ft4: 15.5,
    tsh: 10.52,
  },
  {
    ft4: 15.6,
    tsh: 5.59,
  },
  {
    ft4: 16,
    tsh: 6.27,
  },
  {
    ft4: 18,
    tsh: 2.33,
  },
  {
    ft4: 16.8,
    tsh: 1.29,
  },
  {
    ft4: 17.4,
    tsh: 2.55,
  },
  {
    ft4: 18.5,
    tsh: 1.49,
  },
  {
    ft4: 16.6,
    tsh: 2.42,
  },
  {
    ft4: 17,
    tsh: 1.96,
  },
  {
    ft4: 17.4,
    tsh: 1.79,
  },
  {
    ft4: 22.6,
    tsh: 0.14,
  },
  {
    ft4: 17.8,
    tsh: 0.36,
  },
  {
    ft4: 14.4,
    tsh: 2.3,
  },
  {
    ft4: 15.5,
    tsh: 2.93,
  },
  {
    ft4: 14.5,
    tsh: 3.39,
  },
  {
    ft4: 17.7,
    tsh: 1.63,
  },
  {
    ft4: 17.9,
    tsh: 3.33,
  },
]

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, values: [...state.values, action.payload] }

    case "SWITCH_SCREEN":
      return { ...state, screen: action.payload }

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

    case "CREATE_EXAMPLE_DATA":
      return { ...state, values: [...example] }

    case "CLEAR_USER_INPUT":
      return { ...state, values: [], setpoint: {} }

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
          r2,
        },
        screen: "calculated",
      }

    default:
      throw new Error("Please provide and action")
  }
}

const SetpointApp = () => {
  const [state, dispatch] = useReducer(reducer, { values: [], setpoint: {}, screen: "user-input" })

  return (
    <>
      <Header displayBack={state.screen === "calculated"} dispatch={dispatch} />
      <ScreenController state={state} dispatch={dispatch} />
      <Footer dispatch={dispatch} disableSetpointButton={state.values.length < 2} />
    </>
  )
}

export default SetpointApp
