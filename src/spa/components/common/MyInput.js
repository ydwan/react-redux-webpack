

import React, { PropTypes } from 'react';

//class className for htmlFor
export const MyInput = ({value, title}) => {
    return (
        <div>
            <h2>{title}</h2>
            <input defaultValue={value}></input>
        </div>
    );
}

export class MyInputSmart extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <input defaultValue={this.props.value}></input>
            </div>
        );
    }
}

