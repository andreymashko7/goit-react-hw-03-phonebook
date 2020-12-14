import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    this.setState({ name: '', number: '' });
    if (this.matchContact()) {
      return;
    }

    this.props.onSubmit(name, number);
  };

  matchContact = () => {
    const { name, number } = this.state;
    const { contacts } = this.props;

    const namesInPhonebook = contacts.map(({ name }) => name);
    const numbersInPhonebook = contacts.map(({ number }) => number);

    if (
      namesInPhonebook.includes(name) ||
      numbersInPhonebook.includes(number)
    ) {
      alert(`${name}${number} is already in contacts!!!`);
      return true;
    }

    if (name === '' || number === '') {
      alert('Please enter all fields');
      return true;
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label htmlFor="name" className={s.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Rosie Simpson"
            className={s.input}
          ></input>
        </label>

        <label htmlFor="number" className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            placeholder="459-12-56"
            className={s.input}
          ></input>
        </label>

        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactForm;
