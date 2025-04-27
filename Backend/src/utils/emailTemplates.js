
const otpEmailTemplate = (otp) => {
    return `
      <h1>Your Email Verification Code</h1>
      <p>Please use the following OTP to verify your account:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 2 minutes.</p>
    `;
  };
  
export default otpEmailTemplate;