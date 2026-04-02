export default function validateClient(req, res, next) {
    const { name, email } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    next();
}