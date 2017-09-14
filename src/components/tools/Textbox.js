import { v4 } from 'uuid'

export const TOOL_TEXTBOX = 'textbox'

export default (context) => {

  let textbox = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill) => {
    textbox = {
      id: v4(),
      tool: TOOL_TEXTBOX,
      start: { x, y },
      end: null,
      text: ''
    };
    return [textbox];
  }

  const write = (item, mouseX, mouseY) => {
    const maxWidth = 100
    const lineHeight = 24
    const words = item.text.split(' ')

    let x = item.start.x
    let y = item.start.y

    let line = ''
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      console.log(testLine)
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.strokeText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }


    // context.font="100 16px Arial"
    // context.strokeText(item.text,item.start.x,item.start.y)
  }


  const draw = item => write(item, item.start.x, item.start.y);

  return {
    onMouseDown,
    draw,
  };
};