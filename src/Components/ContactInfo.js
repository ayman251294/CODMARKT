// Importing necessary libraries and components
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Importing WhatsApp icon from react-icons

// ContactInfo component
export const ContactInfo = () => {
    return (
        // Container for contact information
        <div className="contact-container">
            <h2 className="contact-heading">Contact Us</h2>
            <p className="contact-info">Phone: +1234567890</p>
            <p className="contact-info">Email: contact@lorem.org</p>
            <p className="contact-info">Address: 11 Rue Maurice Bouchor 75014 PARIS</p>
            <p className="contact-info">WhatsApp: +212656246627</p>
            <a href="https://wa.me/1234567890" className="contact-link">
                <button className="whatsapp-button">
                    <FaWhatsapp /> WhatsApp
                </button>
            </a>
        </div>
    );
}