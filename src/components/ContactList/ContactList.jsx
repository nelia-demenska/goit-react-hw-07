import Contact from "../Contact/Contact";
import css from './ContactList.module.css';
import { useSelector } from "react-redux";

export default function ContactList() {
    
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filters.name.toLowerCase());

    const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
    );

    return (
    <ul className={css.list}>
        {filteredContacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
        ))}
    </ul>
    );
};
