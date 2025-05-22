exports.submitRequest = async (req, res) => {
    const { softwareId, accessType, reason } = req.body;
    try {
        const requestRepo = req.app.locals.dataSource.getRepository('Request');
        const userRepo = req.app.locals.dataSource.getRepository('User');
        const softwareRepo = req.app.locals.dataSource.getRepository('Software');
        const user = await userRepo.findOne({ where: { id: req.user.id } });
        const software = await softwareRepo.findOne({ where: { id: softwareId } });
        if (!software) {
            return res.status(404).json({ message: 'Software not found' });
        }
        const request = requestRepo.create({ user, software, accessType, reason, status: 'Pending' });
        await requestRepo.save(request);
        res.status(201).json({ message: 'Request submitted', request });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateRequestStatus = async (req, res) => {
    if (req.user.role !== 'manager' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Managers or Admins only' });
    }
    const { id } = req.params;
    const { status } = req.body; // 'Approved' or 'Rejected'
    try {
        const requestRepo = req.app.locals.dataSource.getRepository('Request');
        const request = await requestRepo.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        request.status = status;
        await requestRepo.save(request);
        res.json({ message: `Request ${status.toLowerCase()}`, request });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getAllPendingRequests = async (req, res) => {
    if (req.user.role !== 'manager' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Managers or Admins only' });
    }
    try {
        const requestRepo = req.app.locals.dataSource.getRepository('Request');
        const pendingRequests = await requestRepo.find({ where: { status: 'Pending' } });
        res.json(pendingRequests);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 