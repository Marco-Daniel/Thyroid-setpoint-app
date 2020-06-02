import React, { useRef, useEffect, useState } from "react"
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
  const [minFT4, setMinFT4] = useState(Math.min(...state.values.map(o => o.ft4), 1000) * 0.9)
  const [maxFT4, setMaxFT4] = useState(Math.max(...state.values.map(o => o.ft4), 0) * 1.05)
  const [minTSH, setMinTSH] = useState(0)
  const [maxTSH, setMaxTSH] = useState(Math.max(...state.values.map(o => o.tsh), 0) * 1.1)

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
                  min: minFT4,
                  max: maxFT4,
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
                  min: minTSH,
                  max: maxTSH,
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
  }, [state, minFT4, maxFT4, maxTSH])

  return <canvas ref={canvasRef} />
}

export default DisplayGraph
