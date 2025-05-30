import crypto from "crypto"

export default async function handler(req, res) {
  const body = req.body

  if (!body || !body.content) return res.status(400).send("Requisição inválida")

  if (body.content.toLowerCase() === "!genkey") {
    const key = crypto.randomBytes(6).toString("hex")

    await fetch("https://hmbkknxewroraztzzqhr.supabase.co/rest/v1/keys", {
      method: "POST",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYmtrbnhld3JvcmF6dHp6cWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDcxNTAsImV4cCI6MjA2NDIyMzE1MH0.T4y4NKHrpKrQOiaZZt7_N1jbii75NmuAELL6hJiBJtI",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYmtrbnhld3JvcmF6dHp6cWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDcxNTAsImV4cCI6MjA2NDIyMzE1MH0.T4y4NKHrpKrQOiaZZt7_N1jbii75NmuAELL6hJiBJtI",
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        id: key,
        used: false,
        hwid: null
      })
    })

    await fetch("https://discord.com/api/webhooks/1378152906196521052/p-rxCOQ8NYiAPwwZZd8hKprhjF253Pkrvz6p2QDwf-sZB79Y2xfLd0IzOtV593BtLxms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔑 **Key gerada com sucesso:** \`${key}\`\nUse-a no script para vincular seu HWID.`
      })
    })

    return res.status(200).send("Key gerada e enviada.")
  }

  return res.status(200).send("Comando ignorado.")
}
