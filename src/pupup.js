import React, { Component } from "react";
import ProgressBar from "./progressBar";

export default class PopUp extends Component {
  handleCloseClick = () => {
    this.props.toggle(false);
  };
  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleCloseClick}>&times;    </span>
          <div style={{ display: 'inline', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', textAlign: 'left', width: '20%', borderRight: '2px solid #888888', padding: '1rem 1rem', verticalAlign: 'middle' }}>
              <span style={{ fontSize: 'large', paddingBottom: 0 }}><b>PO-COR9749</b></span><br />
              <span style={{ fontSize: 'small', paddingBottom: 2 }}>End user:Emma G</span><br />
              <span style={{ fontSize: 'small', color: '#8CBDAE' }}>Tracking Number #1001</span>
            </div>
            <div style={{ display: 'inline-block', textAlign: 'left', width: '50%', padding: '1rem 1rem', verticalAlign: 'middle' }}>
              <div style={{ width: '40px' }}><ProgressBar /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}