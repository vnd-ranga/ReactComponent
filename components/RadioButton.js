'use strict';
var React = require('react');
var ReactNative = require('react-native');
var PropTypes = require('prop-types');

// Prpops
// options - [] mandatory array of anything, will be passed to renderOption
// onSelection - function (selectedOption, selectedIndex) { } option selection callback
// selectedIndex - index the initially selected index, optional.
//   selectedOption - option the initially selected option, optional
// renderOption - function (option, selected, onSelect, index) should return an option node, default generate < Text > nodes and adds { fontWeight: 'bold' } to the selected option.
//   renderContainer - function (optionsNodes) must render the container, default is RadioButtons.renderVerticalContainer(see below)
// optionStyle - optional styles to be applied to the < Text > elements of the options themselves.
//   optionContainerStyle - optional styles to be applied to the the < View > that contain the options.
//     testOptionEqual - function (selectedOption, currentOption) { } optional compares and returns bool.


const {
  Text,
  TouchableWithoutFeedback,
  View,
} = ReactNative;

const propTypes = {
  options: PropTypes.array.isRequired,
  testOptionEqual: PropTypes.func,
  renderOption: PropTypes.func,
  renderContainer: PropTypes.func,
  onSelection: PropTypes.func,
};

class RadioButton extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
      selectedIndex: null,
    };
  }

  copySelectedOptionFromProps({ selectedOption, selectedIndex }) {
    this.setState({
      selectedOption,
      selectedIndex,
    });
  }

  componentWillMount() {
    this.copySelectedOptionFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.copySelectedOptionFromProps(newProps);
  }

  selectOption(selectedOption, selectedIndex) {
    this.setState({
      selectedOption,
      selectedIndex,
    });
    this.props.onSelection(selectedOption, selectedIndex);
  }

  render() {
    const { selectedOption, selectedIndex } = this.state;

    const children = this.props.options.map(function (option, index) {
      const isSelected = selectedIndex === index || this.props.testOptionEqual(selectedOption, option);
      const onSelection = this.selectOption.bind(this, option, index);

      return this.props.renderOption(option, isSelected, onSelection, index);
    }.bind(this));

    return this.props.renderContainer(children);
  }

  static getTextOptionRenderer(normalStyle, selectedStyle, extractText) {
    return function renderOption(option, selected, onSelect, index) {
      const style = selected ? selectedStyle : normalStyle;
      const label = extractText ? extractText(option) : option;
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View>
            <Text style={style}>{label}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    };
  }
  static getViewContainerRenderer(style) {
    return function renderContainer(options) {
      return <View style={style}>{options}</View>;
    };
  }
}

RadioButton.renderHorizontalContainer = RadioButton.getViewContainerRenderer({
  flexDirection: 'row',
});

RadioButton.renderVerticalContainer = RadioButton.getViewContainerRenderer({
  flexDirection: 'column'
});

RadioButton.defaultProps = {
  testOptionEqual(a, b) {
    return a === b;
  },
  renderOption: RadioButton.getTextOptionRenderer({}, { fontWeight: 'bold' }),
  renderContainer: RadioButton.renderVerticalContainer,
  onSelection(option) { }
};
RadioButton.propTypes = propTypes;

// module.exports = RadioButton;
export default RadioButton;
