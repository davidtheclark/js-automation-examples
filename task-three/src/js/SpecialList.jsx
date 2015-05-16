import { Component, PropTypes } from 'react';
import SpecialButton from './SpecialButton';
import SpecialListItem from './SpecialListItem';

export default class SpecialList extends Component {

  constructor(props) {
    super(props);
    this.state = { numberOfItems: props.startWith };
  }

  addOne() {
    this.setState({
      numberOfItems: this.state.numberOfItems + 1
    });
  }

  removeOne() {
    if (this.state.numberOfItems === 0) { return; }
    this.setState({
      numberOfItems: this.state.numberOfItems - 1
    });
  }

  render() {

    const { numberOfItems } = this.state;

    const items = [];
    for (let i = 0; i < numberOfItems; i++) {
      items.push(
        <li key={i}>
          <SpecialListItem text='Just another list item' />
        </li>
      );
    }

    const list = (!numberOfItems) ? false : (
      <ul>
        {items}
      </ul>
    );

    return (
      <div>

        <SpecialButton text='add one' handleClick={this.addOne.bind(this)} />

        <SpecialButton text='remove one' handleClick={this.removeOne.bind(this)} />

        {list}

      </div>
    );
  }
}

SpecialList.propTypes = {
  startWith: PropTypes.number.isRequired
};
