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
    const words = item.text.trim().split(' ')

    let line = ''
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.font = '16px Calibri';
        context.strokeText(line, mouseX, mouseY)
        line = words[n] + ' ';
        mouseY += lineHeight;
      }
      else {
        line = testLine;
      }
    }
  }


  const draw = item => write(item, item.start.x, item.start.y);

  return {
    onMouseDown,
    draw,
  };
};