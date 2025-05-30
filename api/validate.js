import fs from "fs"
import path from "path"

export default async function handler(req, res) {
  const { key, hwid } = req.query
  const filePath = path.resolve("./keys.json")
  const db = JSON.parse(fs.readFileSync(filePath, "utf8"))

  if (!db[key]) return res.send("invalid_key")

  if (!db[key].used) {
    db[key].used = true
    db[key].hwid = hwid

    await fetch("https://discord.com/api/webhooks/1378152906196521052/p-rxCOQ8NYiAPwwZZd8hKprhjF253Pkrvz6p2QDwf-sZB79Y2xfLd0IzOtV593BtLxms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `✅ Key ativada: \`${key}\`\n🔒 HWID: \`${hwid}\``
      })
    })

    fs.writeFileSync(filePath, JSON.stringify(db, null, 2))

    return res.send("valid")
  }

  if (db[key].used && db[key].hwid === hwid) return res.send("valid")

  return res.send("hwid_mismatch")
}