import React, { useRef, useEffect } from "react"
import Chart from "chart.js"
import { decreasingNumbersArray } from "../math/array"
import { ft4ToTSH } from "../math/thyroid"

const createSmoothLine = (slope, multiplier) => {
  const values = decreasingNumbersArray(30, 0.5)
  return values.reduce((acc, val) => {
    acc.push({ y: ft4ToTSH(slope, multiplier, val), x: val })
    return acc
  }, [])
}

const DisplayGraph = ({ state }) => {
  const canvasRef = useRef()

  useEffect(() => {
    const chart = new Chart(
      canvasRef.current.getContext("2d"),
      {
        type: "scatter",
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 5,
                  max: 22,
                },
                scaleLabel: {
                  display: true,
                  labelString: "FT4",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 70,
                },
                scaleLabel: {
                  display: true,
                  labelString: "TSH",
                },
              },
            ],
          },
        },
        data: {
          datasets: [
            {
              label: "Setpoint",
              data: [{ x: state.setpoint.ft4, y: state.setpoint.tsh }],
              pointBackgroundColor: "green",
              pointBorderColor: "green",
              borderColor: "green",
              fill: false,
              pointRadius: 10,
              borderWidth: 5,
              pointStyle: "crossRot",
            },
            {
              label: "Invoer",
              data: state.values.map(set => ({ x: set.ft4, y: set.tsh })),
              pointBackgroundColor: "rgba(1,1,1,1)",
              borderColor: "rgba(1,1,1,1)",
              fill: false,
            },
            {
              label: "Berekening",
              data: createSmoothLine(state.setpoint.slope, state.setpoint.multiplier),
              pointBackgroundColor: "rgba(1,1,250,1)",
              borderColor: "rgba(0,0,250, 0.6)",
              showLine: true,
              fill: false,
              lineTension: 0.5,
              pointRadius: 0,
            },
          ],
        },
      },
      [state]
    )

    // clean-up before next render
    return () => chart.destroy()
  }, [state])

  return <canvas ref={canvasRef} />
}

export default DisplayGraph
