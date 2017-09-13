import { v4 } from 'uuid';

export const TOOL_TEXTBOX = 'textbox';

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
  };



  const drawText = (item, mouseX, mouseY) => {
    console.log('in this draw')
    // const startX = mouseX < item.start.x ? mouseX : item.start.x;
    // const startY = mouseY < item.start.y ? mouseY : item.start.y;
    // const widthX = Math.abs(item.start.x - mouseX);
    // const widthY = Math.abs(item.start.y - mouseY);

    // context.beginPath();
    // context.lineWidth = item.size;
    // context.strokeStyle = item.color;
    // context.fillStyle = item.fill;
    // context.rect(startX, startY, widthX, widthY);
    // context.stroke();
    // if (item.fill) context.fill();
  };

  // const onMouseMove = (x, y) => {
  //   if (!rectangle) return;
  //   context.putImageData(imageData, 0, 0);
  //   context.save();
  //   drawText(rectangle, x, y);
  //   context.restore();
  // };

  // const onMouseUp = (x, y) => {
  //   if (!rectangle) return;
  //   onMouseMove(x, y);
  //   const item = rectangle;
  //   imageData = null;
  //   rectangle = null;
  //   item.end = { x, y };
  //   return [item];
  // };

  const draw = item => drawText(item, item.end.x, item.end.y);

  return {
    onMouseDown,
    // onMouseMove,
    // onMouseUp,
    draw,
  };
};