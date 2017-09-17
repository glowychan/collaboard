import { v4 } from 'uuid'

export const TOOL_TEXTBOX = 'textbox'

export default (context) => {

  let textbox = null
  let imageData = null

  const onMouseDown = (x, y, color) => {
    textbox = {
      id: v4(),
      tool: TOOL_TEXTBOX,
      start: { x, y },
      color: color,
      end: null,
    }
    return [textbox]
  }

  const write = (item, mouseX, mouseY) => {
    const maxWidth = 220
    const lineHeight = 24

    context.font = '20px Comic Sans MS'
    context.strokeStyle = item.color

    if (item.text) {
      const lines = item.text.trim().split('\n')
      lines.forEach((line) => {
        const words = line.split(' ')
        let spaceLeft = maxWidth
        let tempLine = ''
        let n = 0
        while (n < words.length) {
          while (context.measureText(words[n]).width < spaceLeft && n < words.length) {
            tempLine  += words[n] + ' '
            spaceLeft -= context.measureText(words[n]).width
            n += 1
          }
          context.strokeText(tempLine, mouseX, mouseY)
          tempLine = ''
          spaceLeft = maxWidth
          mouseY += lineHeight
        }

      })
    }
  }


  const draw = item => write(item, item.start.x, item.start.y)

  return {
    onMouseDown,
    draw,
  }
}