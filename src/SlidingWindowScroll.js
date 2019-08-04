import React from "react";
const THRESHOLD = 15;

class SlidingWindowScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: THRESHOLD
    };
    this.$bottomElement = React.createRef();
    this.$rootElement = React.createRef();
  }

  componentDidMount() {
    this.intiateScrollObserver();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.end !== this.state.end) {
      this.intiateScrollObserver();
    }
  }

  getReference = (index, isLastIndex) => {
    if (index === 0)
      return this.$rootElement;
    if (isLastIndex) 
      return this.$bottomElement;
    return null;
  }

  intiateScrollObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    this.observer = new IntersectionObserver(this.callback, options);
    if (this.$rootElement.current) {
      this.observer.observe(this.$rootElement.current);
    }
    if (this.$bottomElement.current) {
      this.observer.observe(this.$bottomElement.current);
    }
  }

  callback = (entries, observer) => {
    entries.forEach((entry, index) => {
      const listLength = this.props.list.length;
      const {start, end} = this.state;
      // if (index === 0) {
      //   this.isScrollUp = this.prevTop ? this.prevTop > entry.boundingClientRect.y : false;
      //   this.prevTop =  entry.boundingClientRect.y;
      // }
      // Scroll Down
      if (entry.isIntersecting && entry.target.dataset.top === "0") {
        const maxStartIndex = listLength - 1 - THRESHOLD;
        const maxEndIndex = listLength - 1;
        const newEnd = (end + 10) <= maxEndIndex ? end + 10 : maxEndIndex;
        const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex;
        this.updateState(newStart, newEnd);
      }
      // Scroll up
      if (entry.isIntersecting && entry.target.dataset.top === "1") {
        const newEnd = end === THRESHOLD ? THRESHOLD : (end - 10 > THRESHOLD ? end - 10 : THRESHOLD);
        let newStart = start === 0 ? 0 : (start - 10 > 0 ? start - 10 : 0);
        this.updateState(newStart, newEnd);
      }
    });
  }

  updateState = (newStart, newEnd) => {
    const {start, end} = this.state;
    if (start !== newStart || end !== newEnd) {
      this.resetObservation();
      this.setState({
        start: newStart,
        end: newEnd
      });
    }
  }

  resetObservation = () => {
    this.observer.unobserve(this.$bottomElement.current);
    this.observer.unobserve(this.$rootElement.current);
    this.$bottomElement = React.createRef();
    this.$rootElement = React.createRef();
  }

  render() {
    const {list} = this.props;
    const {start, end} = this.state;
    const updatedList = list.slice(start, end);
    const lastIndex = updatedList.length - 1;
    const intialHeight = 155;
    return (
      <ul style={{position: 'relative'}}>
        {updatedList.map((item, index) => {
          const top = (intialHeight * (index + start)) + 'px';
          const refVal = this.getReference(index, index === lastIndex);

          return (<li className="li-card" key={item.key} style={{top}} ref={refVal} data-top={index === 0 ? '1' : '0'}>{item.value}</li>);
        })}
      </ul>
    );
  }
}

export default SlidingWindowScroll;
