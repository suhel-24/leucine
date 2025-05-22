const bcrypt = require('bcrypt');
const User = require('../entities/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userRepo = req.app.locals.dataSource.getRepository('User');
        const existing = await userRepo.findOne({ where: { username } });
        if (existing) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepo.create({ username, password: hashedPassword, role });
        await userRepo.save(user);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userRepo = req.app.locals.dataSource.getRepository('User');
        const user = await userRepo.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 