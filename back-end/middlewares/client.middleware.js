function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function validateClient(req, res, next) {
  const name = req.body?.name?.trim();
  const email = req.body?.email?.trim();
  const phone = req.body?.phone?.trim() || "";

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  req.body = { name, email: email.toLowerCase(), phone };
  next();
}
