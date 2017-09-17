import { v4 } from 'uuid'

export const TOOL_TEXTBOX = 'textbox'

export default (context) => {

  let textbox = null;
  let imageData = null;

  const onMouseDown = (x, y, color) => {
    textbox = {
      id: v4(),
      tool: TOOL_TEXTBOX,
      start: { x, y },
      color: color,
      end: null,
      text: ''
    };
    return [textbox];
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
            console.log(words.length, words, n, words[n])
            spaceLeft -= context.measureText(words[n]).width
            n += 1
          }
          context.strokeText(tempLine, mouseX, mouseY)
          tempLine = ''
          spaceLeft = maxWidth
          mouseY += lineHeight
        }

        // words.forEach((word) => {
        //   const metrics = context.measureText(word)
        //   const wordWidth = metrics.width
        //   console.log(word, wordWidth, spaceLeft)
        //   if (wordWidth < spaceLeft) {
        //     tempLine  += word + ' '
        //     spaceLeft -= wordWidth
        //     console.log(tempLine, 'spaceLeft: ', spaceLeft)
        //   }
        //   context.strokeText(tempLine, mouseX, mouseY)
        //   tempLine = ''
        //   spaceLeft = maxWidth
        //   mouseY += lineHeight
          // if (wordWidth < spaceLeft) {
          //   tempLine += word + ' '
          //   spaceLeft -= wordWidth
          // }
          // else {
          //   printLine =
          //   console.log(word, wordWidth, tempLine, spaceLeft)
          //   // context.strokeText(tempLine, mouseX, mouseY)
          //   tempLine = ''
          //   spaceLeft = maxWidth
          //   mouseY += lineHeight
          // }
        // })
      })


    }
    // if (item.text) {
    //   const words = item.text.trim().split(' ')
    //   console.log('words', words)

    //   let line = ''
    //   for (let n = 0; n < words.length; n++) {
    //     console.log('word is: ',words[n])
    //     const testLine = line + words[n] + ' ';
    //     const metrics = context.measureText(testLine);
    //     const testWidth = metrics.width;
    //     if (testWidth > maxWidth && n > 0) {
    //       context.font = '14px Comic Sans MS'
    //       console.log('line is: ',line)
    //       context.strokeText(line, mouseX, mouseY)
    //       line = words[n] + ' ';
    //       mouseY += lineHeight;
    //     }
    //     else {
    //       line = testLine;
    //     }
    //     console.log(n, words.length, testLine, line)
    //     if (n === (words.length - 1) && testLine !== line) {
    //       context.strokeText(words[n], mouseX, mouseY)
    //     }
    //   }
    // }
  }


  const draw = item => write(item, item.start.x, item.start.y);

  return {
    onMouseDown,
    draw,
  };
};