import React, { Component } from 'react';
import styles from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import storage from './service/storage';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const storedContacts = storage.load('contacts') || [];
      this.setState({
        contacts: storedContacts,
      });
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (this.state.contacts !== prevState.contacts) {
        storage.save('contacts', this.state.contacts);
      }
    } catch (error) {
      console.error('Error saving new contacts to localStorage:', error);
    }
  }

  handleAdd = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleFilter = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1>PhoneBook</h1>
        <ContactForm onAdd={this.handleAdd} contacts={this.state.contacts} />
        <h2>Contacts:</h2>
        <Filter filter={filter} onFilterChange={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDelete}
          className={styles.list}
        />
      </div>
    );
  }
}

export default App;
