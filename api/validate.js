export default async function handler(req, res) {
  const { key, hwid } = req.query

  const headers = {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYmtrbnhld3JvcmF6dHp6cWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDcxNTAsImV4cCI6MjA2NDIyMzE1MH0.T4y4NKHrpKrQOiaZZt7_N1jbii75NmuAELL6hJiBJtI",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYmtrbnhld3JvcmF6dHp6cWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDcxNTAsImV4cCI6MjA2NDIyMzE1MH0.T4y4NKHrpKrQOiaZZt7_N1jbii75NmuAELL6hJiBJtI"
  }

  const getKey = await fetch(`https://hmbkknxewroraztzzqhr.supabase.co/rest/v1/keys?id=eq.${key}`, {
    method: "GET",
    headers: headers
  })

  const data = await getKey.json()
  const k = data[0]

  if (!k) return res.send("invalid_key")

  if (!k.used) {
    await fetch(`https://hmbkknxewroraztzzqhr.supabase.co/rest/v1/keys?id=eq.${key}`, {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ used: true, hwid: hwid })
    })

    await fetch("https://discord.com/api/webhooks/1378152906196521052/p-rxCOQ8NYiAPwwZZd8hKprhjF253Pkrvz6p2QDwf-sZB79Y2xfLd0IzOtV593BtLxms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `✅ Key ativada: \`${key}\`\n🔒 HWID: \`${hwid}\``
      })
    })

    return res.send("valid")
  }

  if (k.hwid === hwid) return res.send("valid")

  return res.send("hwid_mismatch")
}
