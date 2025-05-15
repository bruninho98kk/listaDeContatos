import React from 'react';
import PropTypes from 'prop-types';
import './ContactItem.css'; // Opcional: para estilização

const ContactItem = ({ name, phone, email, onClick }) => {
  return (
    <div className="contact-item" onClick={onClick}>
      <h3 className="contact-name">{name}</h3>
      <p className="contact-phone">📞 {phone}</p>
      <p className="contact-email">✉️ {email}</p>
    </div>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Opcional: para ações ao clicar no item
};

ContactItem.defaultProps = {
  onClick: () => {}, // Função vazia por padrão
};

export default ContactItem;