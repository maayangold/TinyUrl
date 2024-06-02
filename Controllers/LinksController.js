import Link from "../Models/LinkModel.js"; 

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
            const shortUrl = "http://maayan.shortness/" + newLink._id;
            newLink.shortUrl = shortUrl;
            await newLink.save(); 
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

    // Redirect
    redirectLink: async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
            
            // Check if there is a parameter in the query string that matches the targetParamName
            const targetParamValue = req.query[link.targetParamName];
            if (targetParamValue) {
                const click = {
                    ipAddress: req.ip,
                    targetParamValue: targetParamValue
                };
                link.clicks.push(click);
            } else {
                link.clicks.push({
                    ipAddress: req.ip,
                });
            }
    
            await link.save();

            //  res.redirect(link.originalUrl);
            res.json(link.originalUrl);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

export default LinksController;
