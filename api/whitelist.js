export default function handler(req, res) {
  const { key } = req.query
  const wl = ["proxo_key", "chave123", "kitten123"]
  if (wl.includes(key)) res.send("valid")
  else res.send("invalid")
}
