import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from "react-to-webcomponent";
import Map from './map'
import PropTypes from 'prop-types';

class App extends React.Component {
    render() {
        return (<div>
            <Map mapkey={this.props.mapkey} />
        </div>)
    }
}

App.propTypes = {
    mapkey: PropTypes.string
};

customElements.define("wc-map", reactToWebComponent(App, React, ReactDOM))