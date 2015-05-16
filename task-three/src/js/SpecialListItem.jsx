import { Component, PropTypes } from 'react';

export default class SpecialListItem extends Component {
  render() {
    return (
      <div className='.SpecialList-item'>
        Just another list item
      </div>
    );
  }
}

SpecialListItem.propTypes = {
  text: PropTypes.string.isRequired
};
