import React, { Component } from "react";
import { AppRegistry, Button, StyleSheet, View } from "react-native";

export default class BasicButton extends Component {
  constructor(props) {
    super(props);
    this.state = { buttontitle: "" };
  }

  render() {
    const { style, ...rest } = this.props;
    return (
      <View
        {...this.props }
      >
        <Button
          title={this.props.buttontitle}
          {...this.props }
          onPress={this.props.onPress} />
      </View>
    );
  }
}


