import { Component } from 'react';

class ErrorProneComponent extends Component {
  state = {
    shouldThrowError: false,
  };

  throwError = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Error thrown from ErrorProneComponent');
    }
    return (
      <div>
        <button style={{ backgroundColor: 'red' }} onClick={this.throwError}>
          Trigger Error
        </button>
      </div>
    );
  }
}

export default ErrorProneComponent;
