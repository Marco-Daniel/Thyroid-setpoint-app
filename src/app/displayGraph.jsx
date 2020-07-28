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

const DisplayGraph = ({ state, dispatch }) => {
  const canvasRef = useRef()

  useEffect(() => {
    const ref = canvasRef.current
    const chart = new Chart(canvasRef.current.getContext("2d"), {
      type: "scatter",
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                min: state.graph.minFT4,
                max: state.graph.maxFT4,
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
                min: state.graph.minTSH,
                max: state.graph.maxTSH,
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
    })

    const handleClick = e => {
      const activePoint = chart.getElementAtEvent(e)
      if (typeof activePoint[0] === "undefined") return

      const itemIndex = activePoint[0]._index

      chart.data.datasets.forEach(dataset => {
        if (dataset.label === "Invoer") {
          const item = dataset.data[itemIndex]
          const set = { ft4: item.x, tsh: item.y }
          dispatch({ type: "REMOVE", payload: set })
        }
      })
    }

    ref.addEventListener("click", handleClick)

    // clean-up before next render
    return () => {
      ref.removeEventListener("click", handleClick)
      chart.destroy()
    }
  }, [state, dispatch])

  return <canvas ref={canvasRef} />
}

export default DisplayGraph
