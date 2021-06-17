import React from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import PropTypes from "prop-types";



class App extends React.Component {

    state = {
        contacts: [],
        filter: ''
    }
    addNewContact = (data) => {
        this.setState(prevState => ({
           contacts: [...prevState.contacts, data]
        }))
    }

    delContact = e => {
        this.setState(prevState => ({
            contacts: [...prevState.contacts.filter(contact => contact.id !== e.target.id)]
        }))
    }

    changeFilter = e => {
        const {value} = e.currentTarget
        this.setState({filter: value})
    }

    getVisibleContacts = () => {
        const {filter, contacts} = this.state
        const lowerFilter = filter.toLowerCase()

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(lowerFilter))
    }

    componentDidMount() {
        const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
        console.log(parsedContacts)
        if (parsedContacts) {
            this.setState({contacts: parsedContacts})
        }
        }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
            console.log(this.state.contacts)
        }
    }


    render() {
        const filteredContacts = this.getVisibleContacts()

    return <>
        <h1>Phonebook</h1>
         <ContactForm
             contacts={this.state.contacts}
             onSubmit={this.addNewContact}/>

        <h2>Contacts</h2>
        <Filter handlerFilter={this.changeFilter}
                filter={this.state.filter}/>
        <ContactList contacts={filteredContacts}
                     handlerDel={this.delContact}
        />
    </>
  }
}
export default App;


App.propTypes = {
    filter: PropTypes.string,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string,
            sex: PropTypes.bool.isRequired
        })
    )
};


//коментарии ради коммита....