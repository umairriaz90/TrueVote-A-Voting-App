import { useState } from 'react';

export function OtpLoginForm({ method, onSubmit }) {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    // Implement OTP sending logic here
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        type: method, 
        identifier 
      })
    });
    if (response.ok) setOtpSent(true);
  };

  const verifyOtp = async () => {
    const credentials = method === 'email' 
      ? { email: identifier }
      : { phone: identifier };
    await onSubmit(credentials);
  };

  return (
    <div>
      <input
        type={method === 'email' ? 'email' : 'tel'}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder={`Enter your ${method}`}
      />
      {!otpSent ? (
        <button onClick={sendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}
    </div>
  );
}
