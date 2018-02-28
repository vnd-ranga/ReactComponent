/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import { TextInput } from "react-native";

export default class EditText extends Component {
  constructor(props) {
    super(props);
    this.state = { hint: "" };
  }


  render() {
    return (
      <TextInput
        // Inherit any props passed to it; e.g., multiline, numberOfLines below
        {...this.props}
        returnKeyType="next"
        underlineColorAndroid='gray'
        onChangeText={this.props.onChangeText}
        placeholder={this.props.hint}
        clearTextOnFocus={true}
      />
    );
  }
}
