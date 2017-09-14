import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Pencil, { TOOL_PENCIL } from './tools/Pencil';
import Line, { TOOL_LINE } from './tools/Line';
import Ellipse, { TOOL_ELLIPSE} from './tools/Ellipse';
import Rectangle, { TOOL_RECTANGLE } from './tools/Rectangle';
import Textbox, { TOOL_TEXTBOX } from './tools/Textbox';
import Brush, { TOOL_BRUSH } from './tools/Brush';
import Eraser, { TOOL_ERASER } from './tools/Eraser';
import FileSaver from 'file-saver';
import Draggable from 'react-draggable';



export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_TEXTBOX]: Textbox,
  [TOOL_ELLIPSE]: Ellipse,
  [TOOL_BRUSH]: Brush,
  [TOOL_ERASER]: Eraser
};

export default class SketchPad extends Component {

  tool = null;
  interval = null;

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    items: PropTypes.array.isRequired,
    animate: PropTypes.bool,
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    fillColor: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onItemStart: PropTypes.func,
    onEveryItemChange: PropTypes.func,
    onDebouncedItemChange: PropTypes.func,
    onCompleteItem: PropTypes.func,
    debounceTime: PropTypes.number,
  };

  static defaultProps = {
    // width: 500,
    // height: 500,
    color: '#000',
    size: 1,
    fillColor: '',
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: false,
    tool: TOOL_PENCIL,
    toolsMap
  };

  constructor(props) {
    super(props);

    this.textboxFlag = true

    this.state= {
      text: ''
    }

    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this)
    this.redraw = this.redraw.bind(this)


  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight
    this.initialHeight = this.canvas.height
    this.initialWidth = this.canvas.width
    this.initTool(this.props.tool);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    window.addEventListener('resize', this.updateDimensions)
  }

  updateDimensions () {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight
    this.redraw()
  }

  redraw() {
    this.props.items
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(this.props.tool);
   }



  _onTouchStart(e) {
    const data = this.tool.onMouseDown(...this.getCursorPosition(e.touches[0]), this.props.color, this.props.size, this.props.fillColor);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    }
  }

  _onTouchMove(e) {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e.touches[0]));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
  }

  _onTouchEnd(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e.changedTouches[0]));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }



handleSave = () => {
  const userinput = prompt("Please enter a filename");
  const filename = userinput.concat('');

   this.canvas.toBlob(function(blob) {
    FileSaver.saveAs(blob, `${filename}.jpg`);
    });

  }

  handleClear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  componentWillReceiveProps({ tool, items }) {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item)
      })
    this.initTool(this.props.tool);
  }


  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  onMouseDown(e) {
    const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    }

    if (data && data[0] && this.textboxFlag && data[0].tool === 'textbox') {


      const style = {
        top: data[0].start.y,
        left: data[0].start.x,
        width: '100px',
        height: '100px',
        display: '',
        position: 'absolute',
        border: '1px dashed black',
        background: 'none',
        zIndex: 500
      }
      this.textboxFlag = false
      this.props.changeTextBoxStyle(style, data[0].start)
    } else {
      this.textboxFlag = true
    }


  }

  onDebouncedMove() {
    if (typeof this.tool.onDebouncedMouseMove === 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }

  onMouseMove(e) {
    if (this.tool.onMouseMove) {
      const data = this.tool.onMouseMove(...this.getCursorPosition(e));
      data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
    }
  }

  onMouseUp(e) {
    if (this.tool.onMouseUp) {
      const data = this.tool.onMouseUp(...this.getCursorPosition(e));
      data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
      if (this.props.onDebouncedItemChange) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }


  getCursorPosition(e) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  _handleTouchStart =() => {
    console.log('handleTouchStart');
  }

  render() {
    const { width, height, canvasClassName } = this.props;
    return (
      <div>
        <div className="canvas-div">
          <textarea style={this.props.textBoxStyle}
              onChange={(event) => {
                this.props.onTextChange(event)
                this.state.text = event.target.value
              }}
          />
          <canvas
            ref={(canvas) => { this.canvasRef = canvas; }}
            className={canvasClassName}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseOut={this.onMouseUp}
            onMouseUp={this.onMouseUp}
            onTouchStart={this._onTouchStart}
            onTouchMove={this._onTouchMove}
            onTouchEnd={this._onTouchEnd}
            width={width}
            height={height}
          />
          <toolsMap />
        </div>
      </div>
    )
  }
}