import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { ContactListItem } from './ContactListItem';
import { Filter } from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();

    const { contacts } = this.state;
    const form = evt.currentTarget;
    const { name, number } = form.elements;
    const newContact = { id: nanoid(), name: name.value, number: number.value };
    const isContactExist = contacts.find(
      contact => contact.name === newContact.name
    );

    isContactExist
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState({
          contacts: [...contacts, newContact],
        });

    form.reset();
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDisplayContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDeleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} />
        <ContactList>
          <ContactListItem
            contacts={this.handleDisplayContacts()}
            onButtonClick={this.handleDeleteContact}
          />
        </ContactList>
      </>
    );
  }
}

export default App;
