import { useContext } from "react"
import { GlobalState } from "../index"

export const useGlobalState = () => {
  const { state, dispatch } = useContext(GlobalState)

  return { state, dispatch }
}
