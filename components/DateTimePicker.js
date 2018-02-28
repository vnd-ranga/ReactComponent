import React, { Component } from "react";
import {
  AppRegistry, StyleSheet, Text, View,
  TouchableOpacity, Platform, DatePickerAndroid, TimePickerAndroid
} from "react-native";
import moment from "moment";
import ColorUtils from "../constant/ColorUtils";

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateText: "",
    };
  }

  setDate(newDate) {
    var mode = this.props.mode
    if (mode != null && mode == "date") {
      this.setState({
        DateText: moment(newDate).format("DD-MMM-YYYY")
      });
      this.props.onSelect(moment(newDate).format("DD-MMM-YYYY"));
    } else {
      this.props.onSelect(newDate);
    }
  };

  DatePickerMainFunctionCall() {
    {
      // mode this.props.is Used to handle Date or time Picker
      Platform.OS === 'ios' ?
        this.renderIosPicker() :
        this.renderAndroidPicker()
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)}>
          <View style={styles.datePickerBox}>
            <Text style={styles.datePickerText}>{
              this.state.DateText != "" ?
                this.state.DateText :
                this.props.DateText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderIosPicker() {
    // todo verify in IOS
    var mode = this.props.mode
    if (mode != null && mode == "date") {
      return (
        <View style={styles.container}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
            mode={"time"}
          />
        </View>
      )
    }
  }

  async renderAndroidPicker() {
    var mode = this.props.mode
    if (mode != null && mode == "date") {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          this.setDate(new Date(year, month, day))
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    } else {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          this.setState({
            DateText: hour > 12 ? ((hour - 12) + ":" + minute + " PM")
              : (hour + ":" + (minute < 10 ? ("0" + minute) : minute) + " AM"),
          });
          this.setDate(hour + ":" + (minute < 10 ? ("0" + minute) : minute))
        }
      } catch ({ code, message }) {
        console.warn('Cannot open time picker', message);
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF"
  },
  datePickerBox: {
    marginTop: 5,
    padding: 0,
    paddingLeft: 3,
    height: 50,
    justifyContent: "center",
    borderColor: "gray",
    borderBottomWidth: 1
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 5,
    borderWidth: 0,
    color: [ColorUtils.black]
  }
});
