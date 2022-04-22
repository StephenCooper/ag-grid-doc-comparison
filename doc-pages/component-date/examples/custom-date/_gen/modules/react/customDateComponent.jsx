import React, { Component } from 'react';

export default class CustomDateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
    };
  }

  render() {
    //Inlining styles to make simpler the component
    return (
      <div
        className="ag-input-wrapper custom-date-filter"
        role="presentation"
        ref="flatpickr"
      >
        <input type="text" ref="eInput" data-input style={{ width: '100%' }} />
        <a class="input-button" title="clear" data-clear>
          <i class="fa fa-times"></i>
        </a>
      </div>
    );
  }

  componentDidMount() {
    this.picker = flatpickr(this.refs.flatpickr, {
      onChange: this.onDateChanged.bind(this),
      dateFormat: 'd/m/Y',
      wrap: true,
    });

    this.eInput = this.refs.eInput;

    this.picker.calendarContainer.classList.add('ag-custom-component-popup');
  }

  //*********************************************************************************
  //          METHODS REQUIRED BY AG-GRID
  //*********************************************************************************

  getDate() {
    //ag-grid will call us here when in need to check what the current date value is hold by this
    //component.
    return this.state.date;
  }

  setDate(date) {
    //ag-grid will call us here when it needs this component to update the date that it holds.
    this.setState({ date });
    this.picker.setDate(date);
  }

  //*********************************************************************************
  //          AG-GRID OPTIONAL METHODS
  //*********************************************************************************

  setInputPlaceholder(placeholder) {
    this.eInput.setAttribute('placeholder', placeholder);
  }

  setInputAriaLabel(label) {
    this.eInput.setAttribute('aria-label', label);
  }

  //*********************************************************************************
  //          LINKS THE INTERNAL STATE AND AG-GRID
  //*********************************************************************************

  updateAndNotifyAgGrid(date) {
    //Callback after the state is set. This is where we tell ag-grid that the date has changed so
    //it will proceed with the filtering and we can then expect AG Grid to call us back to getDate
    this.setState({ date }, this.props.onDateChanged);
  }

  //*********************************************************************************
  //          LINKING THE UI, THE STATE AND AG-GRID
  //*********************************************************************************

  onDateChanged = (selectedDates) => {
    this.setState({ date: selectedDates[0] });
    this.updateAndNotifyAgGrid(selectedDates[0]);
  };
}
