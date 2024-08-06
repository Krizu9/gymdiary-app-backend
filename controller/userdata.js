const getuserdata = async (req, res) => {
    try {
        const user = await User.findById(req.user.id
        ).populate('actions');
        res.send(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getuserdata;