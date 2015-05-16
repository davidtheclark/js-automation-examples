import { Component, PropTypes } from 'react';

export default class SpecialButton extends Component {
  render() {
    return (
      <button className='.SpecialButton'
       onClick={this.props.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

SpecialButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
