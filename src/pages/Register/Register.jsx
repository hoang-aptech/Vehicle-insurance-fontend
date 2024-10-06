import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    address: '',
    phone: '',
    email: '',
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeGenerationTime, setCodeGenerationTime] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setCodeGenerationTime(new Date()); // Store the current time when the code is generated
    emailjs.send('service_xe6f9kj', 'template_3z2uslk', {
      to_email: formData.email,
      verification_code: code,
      message: `Thank you for registering on our website. Here is your verification code: ${code}`,
    }, 'laGrWQghcmlQSS4rS')
      .then((result) => {
        console.log('Email sent:', result.text);
        setIsCodeSent(true);
      }, (error) => {
        console.log('Failed to send email:', error.text);
      });
  };

  const handleVerify = () => {
    const now = new Date();
    const expirationTime = new Date(codeGenerationTime.getTime() + 30 * 60000); // Add 30 minutes

    if (verificationCode === generatedCode) {
      if (now <= expirationTime) {
        setIsVerified(true);
        
        axios.post('https://localhost:7289/api/Users', {
          username: formData.username,
          fullname: formData.fullname,
          password: formData.password,
          verified: true,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          role: 'User',
          deleted: false,
          avatar: null,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .then(response => {
          console.log('User registered successfully:', response.data);
        })
        .catch(error => {
          console.error('Error registering user:', error);
        });
      } else {
        alert('Verification code has expired!');
      }
    } else {
      alert('Verification code is incorrect!');
    }
  };

  return (
    <div>
      {!isCodeSent ? (
        <form>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="button" onClick={handleRegister}>Register</button>
        </form>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="button" onClick={handleVerify}>Verify</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
