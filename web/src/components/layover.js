import React, { Component } from 'react';
import { Tooltip } from 'antd';
// import Popover from 'react-tiny-popover'
// import ReactCursorPosition from 'react-cursor-position';
 

class Layover extends Component {
    constructor() {
		super();
		this.state = {
            high: '',
            position: { x: 0, y: 0 }
            // displayPop: true,
            // position: {
            //     x: 0,
            //     y: 0,
            // }
		};
	}

    handleClick(e) {
        // console.log(this.state.position.x);
        this.setState({high:window.getSelection().toString(), position: 
            {x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, 
            y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop} });
    }
    
    // onMouseMove(e) {
    //     this.setState({ });
        
    //     console.log(this.state);
    // }

    render() {

        return (
            // <ReactCursorPosition>
            <div>
                <div onMouseUp={this.handleClick.bind(this)}>
                example 1 2 3 jadsfjsdnfi
                xample 1 2 3 jadsfjsdnfi
                xample 1 2 3 jadsfjsdnfi
                xample 1 2 3 jadsfjsdnfi
                xample 1 2 3 jadsfjsdnfi
                xample 1 2 3 jadsfjsdnfi
                </div>
                <div style={{ position:'absolute', left: this.state.position.x, top: this.state.position.y}}> 
                    <Tooltip
                        
                        // content={
                        //         <div> something </div>
                        // }
                        placement="rightBottom"
                        // title={this.state.high}
                        visible={this.state.displayPop}
                    >
                        <span>{this.state.high}</span>
                    </Tooltip>
                </div> 
            </div> 
            // </ReactCursorPosition>

        );
    }
}

export default Layover;
