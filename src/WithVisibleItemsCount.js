import React from "react";

class WithVisibleItemsCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10
    };
    this.$bottomElement = React.createRef();
    this.$rootElement = React.createRef();
  }

  componentDidMount() {
    this.intiateScrollObserver();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.intiateScrollObserver();
    }
  }

  intiateScrollObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(this.callback, options);
    this.observer.observe(this.$bottomElement.current);
  }

  callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.observer.unobserve(this.$bottomElement.current);
        this.$bottomElement = React.createRef();
        this.setState({
          count: this.state.count + 10
        });
      }
    });
  }

  render() {
    return this.props.render({
      visibleItemsCount: this.state.count,
      bottomRef: this.$bottomElement,
      rootRef: this.$rootElement,
    });
  }
}

export default WithVisibleItemsCount;
