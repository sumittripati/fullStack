// 1. authController.js
// Sirf authentication–related kaam:
// register
// login
// logout
// refresh token

const User = require("../Models/useSchema");
const createToken = require("../Utils/tokenGenerater");

// register user
const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false, message: "Email already exists. Please login."
            });
        }
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User account created successfully", user });
    } catch (err) {
        console.error("Error registering user:", err);
        next(err)
    }
};

// login user
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // 1. Find user + get password field
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        //2. compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        //3. generate token
        const token = createToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,       // 🔒 JS cannot access (prevent XSS)
            secure: true,         // 🔒 Only HTTPS (production me on)
            sameSite: "strict",   // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        next(error);
    }
}

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // immediately expire
    sameSite: "strict",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// change password 
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        // const user = await User.findById(req.user.id).select("+password");

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2. New Password Match Check
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password & confirm password do not match",
            });
        }

        // const user = await User.findById(req.user._id).select("+password");
           const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 4. Check Old Password
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // 5. Update Password
        user.password = newPassword;
        await user.save(); // hashing automatically ho jayega (pre-save)

        // 6. Generate New Token
        const token = user.getJwtToken();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
// login with google

// resister user with token
// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // User already exist check
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     // Create new user
//     const user = await User.create({ name, email, password });

//     // Create token
//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// confirm password
// const = register = async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({
//       success: false,
//       message: "Passwords do not match",
//     });
//   }

//   const user = await User.create({ name, email, password });

//   res.status(201).json({
//     success: true,
//     message: "User Registered",
//   });
// };



module.exports = { register, login, logout, changePassword};