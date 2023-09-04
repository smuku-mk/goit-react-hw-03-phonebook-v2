import PropTypes from 'prop-types';

export const ContactListItem = ({ contacts, onButtonClick }) => {
  return (
    <>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}{' '}
          <button type="button" onClick={() => onButtonClick(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </>
  );
};

ContactListItem.propTypes = {
  contacts: PropTypes.array.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
