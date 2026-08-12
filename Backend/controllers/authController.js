const user = require("../model/user.js");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //TODOS: PASSWORD HASHING AND VALIDATION
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //TODOS:IMPLEMENT JWT TOKEN GENERATION FOR USER AUTHENTICATION
    //TODOS:OTP SENDING AND VERIFICATION FOR EMAIL VERIFICATION
    //TODOS: WELCOME EMAIL SENDING AFTER SUCCESSFUL REGISTRATION

    const user = user.create({ name, email, password: hashedPassword });
    if(user){
      const otp = Math.floor(100000 + Math.random() * 900000);

      const message = `Welcome to Scam Store! Your OTP for email verification is: ${otp}`;

      await sendEmail(email, "Email Verification", message);
      res.status(201).json({
         _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified,
          token: generateToken(user._id),
          message: "User registered successfully. Please check your email for OTP verification."
         });

    }else{
      res.status(400).json({ message: "Invalid user data" });
    }
    
    const existingUser = await user.findOne({ email });

    if(existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };