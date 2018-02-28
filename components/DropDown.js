import React, { Component } from "react";
import { Platform, Picker, View, PickerIOS, Text } from "react-native";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { itemValue: "", itemIndex: "" };
  }

  onValueChange(value, index) {
    // required to change value in Picker Display
    this.setState({
      itemValue: value,
      itemIndex: index
    });
    this.props.onChange(value, index);

  }
  render() {
    var listToPopulate = this.props.dataList;
    return (
      <View
        style={{
          borderColor: "gray",
          borderBottomWidth: 1,
          margin: 10,
          alignSelf: "stretch"
        }}>
        <Text
          style={{ fontSize: 14 }}>
          {this.props.headerText}
        </Text>
        {Platform.OS === "ios" ? (
          <PickerIOS
            style={{ height: 40 }}
            {...this.props}
            mode="dropdown"
            selectedValue={this.state.itemValue}
            onValueChange={this.onValueChange.bind(this)}
          >
            {Object.keys(listToPopulate).map((key, index) => {
              return <Picker.Item label={key} value={listToPopulate[key]} key={key.value} />;
            })}
          </PickerIOS>
        ) : (
            <Picker
              style={{ height: 40 }}
              {...this.props}
              mode="dropdown"
              selectedValue={this.state.itemValue}
              onValueChange={this.onValueChange.bind(this)}
            >
              {Object.keys(listToPopulate).map((key, index) => {
                return <Picker.Item label={key} value={listToPopulate[key]}
                  key={key} />;
              })}
            </Picker>
          )}
      </View>
    );
  }
}
