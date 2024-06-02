import User from '../Models/UserModel.js';

const UsersController = {
    // שליפת כל המשתמשים
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // שליפת משתמש לפי מזהה
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('links');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // יצירת משתמש חדש
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;   
            const newUser = await User.create({ name, email, password });
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // עדכון משתמש
    updateUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // מחיקת משתמש
    deleteUser: async (req, res) => {
        try {
          const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

export default UsersController;

   