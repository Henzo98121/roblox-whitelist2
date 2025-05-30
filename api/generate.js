import crypto from "crypto"

export default async function handler(req, res) {
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

  res.send(key)
}
