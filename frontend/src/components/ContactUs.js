import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const ContactUs = () => {
    const [submitting, setSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            convenientTime: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().required('Required'),
            convenientTime: Yup.date().required('Required').min(new Date(), 'Convenient time must be in the future'),
            message: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {

            const toastLoad = toast.loading('Submitting data');
            try {
                setSubmitting(true);
                // Handle form submission logic here
                const response = await axios.post(`http://localhost:5000/api/contacts`, values);
                const json = await response.data;
                console.log({ json });
                // toast.dismiss('load');
                toast.success('Form Submitted successfully.',{id: toastLoad});

                // Show alert and clear form
                setShowAlert(true);
                formik.resetForm();

                // Hide alert after 3 seconds
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error(`Error submitting form: ${error}`,{id: toastLoad})
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="my-5">
        <Toaster  />    
            <div className="contact-us-container">
                <h2>Contact Us</h2>
                {showAlert && (
                    <div className="alert alert-success" role="alert">
                        Form submitted successfully!
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error-message">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error-message">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="error-message">{formik.errors.phone}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="convenientTime">Convenient Time to Call:</label>
                        <input
                            type="datetime-local"
                            id="convenientTime"
                            name="convenientTime"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.convenientTime}
                        />
                        {formik.touched.convenientTime && formik.errors.convenientTime ? (
                            <div className="error-message">{formik.errors.convenientTime}</div>
                        ) : null}
                    </div>



                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                        />
                        {formik.touched.message && formik.errors.message ? (
                            <div className="error-message">{formik.errors.message}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
