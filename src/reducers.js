import { SELECT_TOOL } from './actions'

let initialState = {

  currentWord: 'hello',

}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_TOOL:
      return {...state, currentTool: action.tool}
    default:
      return state
  }
}

export default reducer