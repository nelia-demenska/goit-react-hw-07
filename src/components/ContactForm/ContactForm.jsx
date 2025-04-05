import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';


export default function ContactForm() {

    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);

    const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    if (contacts.some(contact => contact.name === name)) {
    alert(`${name} is already in contact list!`);
    return;
    }

    dispatch(addContact({ id: Date.now().toString(), name, number }));

    resetForm(); 
};

    const UserSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Must be min 3 chars')
    .required('Required'),
    number: Yup.string()
        .min(3)
        .required('Required'),
});
    
    return (
        <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}>
            
            <Form className={css.form}>
                <div className={css.group}>
        <label className={css.label}>Name:</label>
        <Field className={css.input} type="text" name="name" />
        <ErrorMessage
            className={css.error}
            name="name"
            component="span"
        />
                </div>
                
                <div className={css.group}>
        <label className={css.label}>Phone:</label>
        <Field className={css.input} type="tel" name="number" />
                    <ErrorMessage
                        className={css.error}
                        name="number"
                        component="span" />
                </div>

                <button className={css.button} type="submit">Add contact</button>
            </Form>
        </Formik>
    )
}
