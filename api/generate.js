import fs from "fs"
import path from "path"
import crypto from "crypto"

export default function handler(req, res) {
  const filePath = path.resolve("./keys.json")
  const db = JSON.parse(fs.readFileSync(filePath, "utf8"))

  const key = crypto.randomBytes(6).toString("hex")

  db[key] = { used: false, hwid: null }

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2))

  res.send(key)
}
