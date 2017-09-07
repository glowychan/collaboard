import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Pencil, { TOOL_PENCIL } from './tools/Pencil';
import Line, { TOOL_LINE } from './tools/Line';
import Ellipse, { TOOL_ELLIPSE} from './tools/Ellipse';
import Rectangle, { TOOL_RECTANGLE } from './tools/Rectangle';
import FileSaver from 'file-saver';


export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse,
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
    width: 500,
    height: 500,
    color: '#000',
    size: 5,
    fillColor: '',
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap
  };

  constructor(props) {
    super(props);

    // this.state = {
    //   image: ''
    // };

    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.initTool(this.props.tool);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

handleSave = () => {
     this.canvas.toBlob(function(blob) {
    FileSaver.saveAs(blob, "mytwoodle.jpg");
    });

  }

  componentWillReceiveProps({ tool, items }) {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  componentDidUpdate() {
    var image = this.canvas.toDataURL("image/png");
    console.log(image);
    var img = React.createElement('img', {src: image}, "Save");
    // var img2 = new Element('img', {src: image});
    var img2 = new Image();
    img2.src = image;
    console.log(img2);

    var fries = new Image();
    fries.src = "http://img.taste.com.au/MudZOM3z/taste/2016/11/french-fries-87711-1.jpeg";
    this.ctx.drawImage(fries, 0, 0, this.canvas.width, this.canvas.height);
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
  }

  onDebouncedMove() {
    if (typeof this.tool.onDebouncedMouseMove === 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }

  onMouseMove(e) {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
  }

  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCursorPosition(e) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  render() {
    const { width, height, canvasClassName } = this.props;
    return (
      <div>

        <div className="canvas-div">
          <canvas
            ref={(canvas) => { this.canvasRef = canvas; }}
            className={canvasClassName}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseOut={this.onMouseUp}
            onMouseUp={this.onMouseUp}
            width={width}
            height={height}
          />
          <div className='textinput'> HELLO
          </div>
          <toolsMap />
        </div>
      </div>
    )
  }
}