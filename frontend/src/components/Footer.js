import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    const contactInfo = {
        address: '123 Main Street, City, Country',
        email: 'info@example.com',
        phone: '+1 123-456-7890',
    };

    const socialMediaLinks = {
        facebook: 'https://www.facebook.com/tech-solution',
        twitter: 'https://twitter.com/tech-solution',
        linkedin: 'https://www.linkedin.com/in/tech-solution',
        instagram: 'https://www.instagram.com/tech-solution',
    };

    const icons = {
        facebook: FaFacebook,
        twitter: FaTwitter,
        linkedin: FaLinkedin,
        instagram: FaInstagram,
    };

    const usefulLinks = [
        { label: 'About Us', url: '/#AboutUs' },
        { label: 'Services', url: '/services' },
        { label: 'Products', url: '/products' },
        { label: 'Contact Us', url: '/contact' },
    ];

    const IconComponent = ({iconName}) =>{
        const Icon = icons[iconName];
        return  <Icon/>
    }
    return (
        <>
         <div className="contact-details-container">
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p>
                    <strong>Address:</strong> {contactInfo.address}
                </p>
                <p>
                    <strong>Email:</strong> {contactInfo.email}
                </p>
                <p>
                    <strong>Phone:</strong> {contactInfo.phone}
                </p>
            </div>

            <div className="social-media">
                <h3>Social Media</h3>
                <ul>
                    {Object.entries(socialMediaLinks).map(([platform, link]) => (
                        <li key={platform}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <IconComponent key={platform} iconName={platform}/><span>/tech-solution</span> 
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="useful-links">
                <h3>Useful Links</h3>
                <ul>
                    {usefulLinks.map(({ label, url }) => (
                        <li key={label}>
                            <Link to={url}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Tech Solution. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer