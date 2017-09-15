import Pencil, { TOOL_PENCIL } from './components/tools/Pencil'
import Line, { TOOL_LINE } from './components/tools/Line'

let initialState = {

  currentTool: TOOL_PENCIL,

}

// const reducer = (state = initialState, action) => {

//   if(action.type==='selectTool' && action.tool==="pencil") {
//     console.log("selecting tool")
//     console.log(Pencil)
//     return {...state, currentTool: Pencil}
//   } else {
//     return state
//   }
// }


const reducer = (state = initialState, action) => {

  if (action.type==='selectTool' ) {
    if (action.tool==='pencil') {
      return {...state, currentTool: Pencil}
    } else if (action.tool==='line') {
      return {...state, currentTool: Line}
    }

  } else {
    return state
  }


  // switch(action.type) {
  //   case 'selectTool':
  //     return {...state, currentTool: action.tool}
  //   default:
  //     return state
  // }
}

export default reducer