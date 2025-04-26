// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL // Replace with your Supabase API URL
const supabaseKey = process.env.SUPABASE_KEY // Replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes (for adding and fetching glaze combinations)
app.post('/api/glazes', async (req, res) => {
  const { name, ingredients, results } = req.body;

  const { data, error } = await supabase
    .from('glazes')
    .insert([{ name, ingredients: ingredients.split(','), results }]);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.get('/api/glazes', async (req, res) => {
  const { data, error } = await supabase
    .from('glazes')
    .select();

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
