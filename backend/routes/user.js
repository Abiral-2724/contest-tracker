// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;

// Create user

router.post('/login' ,async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
       
        const tokenData = {
            userId: user._id,
            userRole: user.userType,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber:user.phoneNumber
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            token:token,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
)



router.post('/signup', async (req, res) => {
    try {
        const { fullname ,email, password ,phoneNumber} = req.body;
         
        if (!fullname || !email || !password || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };
        if(phoneNumber.length != 10){
            return res.status(400).json({
                message: "Enter a valid phone number",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }

        const phone = await User.findOne({phoneNumber}) ;
        if(phone){
            return res.status(400).json({
                message: 'Phone number already exits try another',
                success: false,
            })
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname , 
            email,
             password : hashedPassword ,
             phoneNumber,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });


    } catch (error) {
        console.log(error);
    }
});

router.get('/logout' ,async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
})

// Bookmark a contest
router.post('/:id/bookmark', async (req, res) => {
  try {
    const { contestId } = req.body;
    
    if (!contestId) {
      return res.status(400).json({ message: 'Contest ID is required' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if contest is already bookmarked
    if (user.bookmarkedContests.includes(contestId)) {
      return res.status(400).json({ message: 'Contest already bookmarked' });
    }
    
    user.bookmarkedContests.push(contestId);
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove bookmark
router.delete('/:id/bookmark/:contestId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.bookmarkedContests = user.bookmarkedContests.filter(
      id => id.toString() !== req.params.contestId
    );
    
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/reminders', async (req, res) => {
    try {
      // First find the user to get current preferences
      const existingUser = await User.findById(req.params.id);
      
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Merge existing preferences with updates
      const updatedPreferences = {
        ...existingUser.reminderPreferences || {},
        ...req.body
      };
      
      // Update with merged preferences
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { reminderPreferences: updatedPreferences },
        { new: true }
      );
      
      res.json(user);
    } catch (err) {
      console.error('Error updating reminder preferences:', err);
      res.status(500).json({ message: err.message });
    }
  });

// Get user's bookmarked contests
router.get('/:id/bookmarks', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('bookmarkedContests');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.bookmarkedContests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;