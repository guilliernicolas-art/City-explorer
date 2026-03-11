const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '2mb' }));

app.use(express.static(path.join(__dirname, 'public')));

// Proxy sécurisé vers l'API Groq
app.post('/api/claude', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'Clé API Groq non configurée sur le serveur.' } });
  }

  try {
    const userMessage = req.body.messages?.[0]?.content || '';
    const systemMessage = req.body.system || "Tu es un expert local de voyage et guide touristique. Réponds UNIQUEMENT dans le format demandé, sans introduction ni conclusion, directement avec les blocs d'activités.";

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: req.body.max_tokens || 6000,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: { message: data.error?.message || 'Erreur Groq API' }
      });
    }

    // Convertir réponse Groq → format attendu par le client
    const text = data.choices?.[0]?.message?.content || '';
    res.json({
      content: [{ type: 'text', text: text }]
    });

  } catch (err) {
    console.error('Erreur API Groq:', err.message);
    res.status(500).json({ error: { message: 'Erreur serveur : ' + err.message } });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('City Explorer démarré sur le port ' + PORT);
});
