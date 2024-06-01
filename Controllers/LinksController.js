import Link from '../models/link.js';

const LinksController = {
    // שליפת כל הקישורים
    getLinks: async (req, res) => {
        try {
            const links = await Link.find();
            res.json(links);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // שליפת קישור לפי מזהה
    getLinkById: async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
            res.json(link);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // יצירת קישור חדש
    createLink: async (req, res) => {
        try {
            const { originalUrl } = req.body;
            const newLink = await Link.create({ originalUrl });
            res.status(201).json(newLink);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // עדכון קישור
    updateLink: async (req, res) => {
        try {
            const { originalUrl } = req.body;
            const link = await Link.findByIdAndUpdate(req.params.id, { originalUrl }, { new: true });
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
            res.json(link);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // מחיקת קישור
    deleteLink: async (req, res) => {
        const { id } = req.params;
        try {
            const link = await Link.findByIdAndDelete(id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
            res.json({ message: 'Link deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // מנגנון הפניה מחדש (Redirect)
    redirectLink: async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }

            // הוספת קליק חדש
            link.clicks.push({
                ipAddress: req.ip,
            });

            await link.save();

            res.redirect(link.originalUrl);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

export default LinksController;
