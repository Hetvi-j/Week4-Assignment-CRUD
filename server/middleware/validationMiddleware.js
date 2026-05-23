export const validateUser = (
  req,
  res,
  next
) => {

  const {
    name,
    email,
    phone,
    password,
    role
  } = req.body;

  // Required Fields
  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !role
  ) {

    return res.status(400).json({
      success: false,
      message:
        "All fields are required"
    });
  }

  // Email Validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {

    return res.status(400).json({
      success: false,
      message:
        "Invalid Email Format"
    });
  }

  // Phone Validation
  const phoneRegex =
    /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {

    return res.status(400).json({
      success: false,
      message:
        "Phone must be 10 digits"
    });
  }

  // Password Validation
  if (password.length < 6) {

    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 6 characters"
    });
  }

  next();
};