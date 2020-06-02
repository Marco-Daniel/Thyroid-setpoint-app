import React, { useReducer } from "react"
import Header from "./header"
import Footer from "./footer"
import ScreenController from "./screenController"
import { sort2DArray, medianFromArray } from "../math/array"
import { calcTshSetpoint, calcFt4Setpoint, calculateCurvature } from "../math/thyroid"
import ExponentialRegression from "ml-regression-exponential"
import regression from "regression"

const example = [
  [
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
  ],
  [
    {
      ft4: 22,
      tsh: 0.05,
    },
    {
      ft4: 6,
      tsh: 63,
    },
    {
      ft4: 10,
      tsh: 34,
    },
    {
      ft4: 13,
      tsh: 11,
    },
    {
      ft4: 12,
      tsh: 5,
    },
    {
      ft4: 15,
      tsh: 4,
    },
  ],
  [
    {
      ft4: 6,
      tsh: 63,
    },
    {
      ft4: 10,
      tsh: 34,
    },
    {
      ft4: 13,
      tsh: 11,
    },
    {
      ft4: 12,
      tsh: 5,
    },
    {
      ft4: 15,
      tsh: 4,
    },
  ],
  [
    {
      ft4: 18.2,
      tsh: 0.81,
    },
    {
      ft4: 14.6,
      tsh: 4.1,
    },
    {
      ft4: 16.7,
      tsh: 4.1,
    },
  ],
]

const round = num => Math.round((num + Number.EPSILON) * 10) / 10

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
      return { ...state, values: [...example[action.payload]] }

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

      const mlReg = new ExponentialRegression(
        data.map(p => p[0]),
        data.map(p => p[1])
      )

      const { r2 } = mlReg.score(
        data.map(p => p[0]),
        data.map(p => p[1])
      )

      const reg = regression.exponential(data, { precision: 100 })

      const median = medianFromArray(data.map(p => p[0]))

      const mlCurve = calculateCurvature(mlReg.A, mlReg.B, median)
      const regCurve = calculateCurvature(reg.equation[1], reg.equation[0], median)

      let slope = 0
      let multiplier = 0
      let rSquared = 0

      if (regCurve > mlCurve) {
        multiplier = reg.equation[0]
        slope = reg.equation[1]
        rSquared = reg.r2
      } else {
        multiplier = mlReg.B
        slope = mlReg.A
        rSquared = r2
      }

      const setpointTSH = calcTshSetpoint(slope)
      const setpointFT4 = calcFt4Setpoint(slope, multiplier)

      return {
        ...state,
        setpoint: {
          slope,
          multiplier,
          ft4: setpointFT4,
          tsh: setpointTSH,
          r2: rSquared,
        },
        screen: "calculated",
        graph: {
          minFT4: round(Math.min(...state.values.map(o => o.ft4), 1000) * 0.9),
          maxFT4: round(Math.max(...state.values.map(o => o.ft4), 0) * 1.05),
          minTSH: 0,
          maxTSH: round(Math.max(...state.values.map(o => o.tsh), 0) * 1.1),
        },
      }

    default:
      throw new Error("Please provide and action")
  }
}

const SetpointApp = () => {
  const [state, dispatch] = useReducer(reducer, { values: [], setpoint: {}, screen: "user-input", graph: {} })

  const calculatedScreen = state.screen === "calculated"

  return (
    <>
      <Header displayBack={calculatedScreen} dispatch={dispatch} />
      <ScreenController state={state} dispatch={dispatch} />
      <Footer dispatch={dispatch} disableSetpointButton={state.values.length < 2} hide={calculatedScreen} />
    </>
  )
}

export default SetpointApp
