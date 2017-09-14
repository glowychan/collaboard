import { SELECT_TOOL } from './actions'
import Pencil from './components/tools/Pencil'

let initialState = {

  currentTool: Pencil,


}

const reducer = (state = initialState, action) => {
  debugger
  switch(action.type) {
    case SELECT_TOOL:
      return {...state, currentTool: action.tool}
    default:
      return state
  }
}

export default reducer