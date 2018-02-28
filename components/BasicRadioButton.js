// How to use 
//     < RadioGroup
// size = { 24}
// thickness = { 2}
// color = '#9575b2'
// highlightColor = '#ccc8b9'
// selectedIndex = { 1}
// onSelect = {(index, value) => this.onSelect(index, value)}
// >
//     <RadioButton
//         style={{ alignItems: 'center' }}
//         value='Yo!! I am a cat.'
//     >
//         <Image
//             style={{ width: 100, height: 100 }}
//             source={{ uri: 'https://cloud.githubusercontent.com/assets/21040043/18446298/fa576974-794b-11e6-8430-b31b30846084.jpg' }}
//         />
//     </RadioButton>

//     <RadioButton
//         value='index1'
//     >
//         <Text>Start from item index #1</Text>
//     </RadioButton>

//     <RadioButton
//         value='blue color'
//         color='blue'
//     >
//         <Text>Blue Dot</Text>
//     </RadioButton>
// </RadioGroup >




import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

export default class BasicRadioButton extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedIndex: nextProps.selectedIndex
        })
    }

    getRadioStyle() {
        return {
            height: this.context.size,
            width: this.context.size,
            borderRadius: this.context.size / 2,
            borderWidth: this.context.thickness,
            borderColor: this.props.isSelected && this.props.activeColor ? this.props.activeColor : this.context.color,
        }
    }

    getRadioDotStyle() {
        return {
            height: this.context.size / 2,
            width: this.context.size / 2,
            borderRadius: this.context.size / 4,
            backgroundColor: this.props.color || this.props.activeColor,
        }
    }

    isSelected() {
        if (this.props.isSelected)
            return <View style={this.getRadioDotStyle()} />
    }
    render() {
        var { children } = this.props
        return (
            <View style={{ opacity: this.props.disabled ? 0.4 : 1 }}>
                <TouchableWithoutFeedback
                    disabled={this.props.disabled}
                    onPress={() => this.context.onSelect(this.props.index, this.props.value)}
                >
                    <View style={[styles.container, this.props.style, this.props.isSelected ? { backgroundColor: this.context.highlightColor } : null]}>
                        <View style={[styles.radio, this.getRadioStyle()]}>
                            {this.isSelected()}
                        </View>
                        <View style={styles.item}>
                            {children}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

BasicRadioButton.contextTypes = {
    onSelect: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    highlightColor: PropTypes.string
}

let styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        padding: 10,
    },
    radio: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})