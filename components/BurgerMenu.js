import { StackNavigator, DrawerNavigator } from "react-navigation";
import { TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";

export default class BurgerMenu extends Component {

  static navigationOptions = {
    // hide toolbaar in particular screen
    title: "Home",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#0087B7'
    }
  };
  constructor(props) {
    super(props);
  }

  _handleDrawer = () => {
    if (this.props.nav.state.index == "1") {
      this.props.nav.navigate("DrawerClose");
    } else {
      this.props.nav.navigate("DrawerOpen");
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this._handleDrawer}>
        <Image style={{ width: 30, height: 30, margin: 10 }} source={require("../img/ic_menu.png")} />
      </TouchableOpacity>
    );
  }
}
