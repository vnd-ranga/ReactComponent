import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Loader extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color="#4abfa7" style={styles.main} style={{
          width: 80, height: 80,
          backgroundColor: 'blue', borderColor: 'red', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10
        }} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
});


