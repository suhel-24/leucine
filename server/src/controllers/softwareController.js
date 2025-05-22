const Software = require('../entities/Software');

exports.createSoftware = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    const { name, description, accessLevels } = req.body;
    try {
        const softwareRepo = req.app.locals.dataSource.getRepository('Software');
        const existing = await softwareRepo.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({ message: 'Software with this name already exists' });
        }
        const software = softwareRepo.create({ name, description, accessLevels });
        await softwareRepo.save(software);
        res.status(201).json({ message: 'Software created successfully', software });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getAllSoftware = async (req, res) => {
    try {
        const softwareRepo = req.app.locals.dataSource.getRepository('Software');
        const allSoftware = await softwareRepo.find();
        res.json(allSoftware);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 