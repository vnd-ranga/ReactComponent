import React, { Component } from 'react';
import { View, TextInput, ListView, Text, StyleSheet, TouchableOpacity } from 'react-native';


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class AutoCompleteText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: ds.cloneWithRows([]),
            value: '',
        };
        this.renderRow = this.renderRow.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);
        this.onInputCleared = this.onInputCleared.bind(this);
        // this.searchLocation = this.searchLocation.bind(this);
        this.searchedData = this.searchedData.bind(this);
    };


    // async searchLocation(query) {
    //     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
    //         GOOGLE_API_KEY
    //         }&input=${query}`;
    //     this.setState({ isLoading: true, value: query });
    //     const response = await fetch(url);
    //     const jsonResponse = await response.json();
    //     this.setState({
    //         isLoading: false,
    //         dataSource: ds.cloneWithRows(jsonResponse.predictions),
    //     });
    // }


    onInputCleared() {
        this.setState({
            value: '',
            isLoading: false,
            dataSource: ds.cloneWithRows([]),
        });
    }

    async searchedData(searchedText) {
        this.setState({ isLoading: true, value: searchedText });
        var searchedaData = [];
        if (this.props.callService) {
            const response = await fetch(url);
            const jsonResponse = await response.json();
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(jsonResponse.predictions),
            });
        } else {
            searchedaData = this.props.listData.filter(function (adress) {
                return adress.city.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
            });
        }
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(searchedData),
        });
    };


    renderRow(adress) {
        return (
            <TouchableOpacity
                onPress={() => this.onListItemClicked(adress)}
                style={styles.listItem} >
                <Text > {adress.city}</Text>
            </TouchableOpacity>
        );
    };

    renderSeparator() {
        return <View style={styles.listItemSeparator} />;
    }


    async onListItemClicked(prediction) {
        this.setState({
            value: prediction.city,
            dataSource: ds.cloneWithRows([]),
            isLoading: true,
        });
        // const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
        //     prediction.place_id
        //     }&key=${GOOGLE_API_KEY}`;
        // const response = await fetch(url);
        // const jsonResponse = await response.json();
        // const { lat, lng } = jsonResponse.result.geometry.location;
        // this.mapView.animateToRegion({
        //     longitude: lng,
        //     latitude: lat,
        //     latitudeDelta,
        //     longitudeDelta,
        // });
        this.setState({
            isLoading: false,
        });
        // console.warn(prediction.city);

    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    {...this.props}
                    style={styles.textinput}
                    value={this.state.value}
                    isLoading={this.state.isLoading}
                    onInputCleared={this.onInputCleared}
                    onChangeText={this.searchedData}
                    underlineColorAndroid='rgba(0,0,0,0)' />

                <View style={styles.listViewContainer}>
                    <ListView
                        enableEmptySections
                        style={styles.listView}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                    />
                </View>

            </View>
        );
    };
}

var styles = StyleSheet.create({
    textinput: {
        height: 40,
        borderColor: "gray",
        padding: 10,
        borderWidth: 1,
        margin: 10,
        fontSize: 16,
        borderRadius: 4,
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        alignSelf: "stretch",
    },
    listViewContainer: {
        flex: 0,
    },
    listView: {
        backgroundColor: 'white',
        margin: 10,
        overflow: "hidden",
    },
    listItem: {
        padding: 10,
    },
    listItemSeparator: {
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    },
});

export default AutoCompleteText;