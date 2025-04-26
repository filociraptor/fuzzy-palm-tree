import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from './supabaseClient';

function App() {
  const [glazes, setGlazes] = useState([]);
  const [newGlaze, setNewGlaze] = useState({ name: '', ingredients: '', results: '' });

  useEffect(() => {
    const fetchGlazes = async () => {
      const { data, error } = await supabase.from('glazes').select();
      if (error) {
        console.error('Error fetching data: ', error);
      } else {
        setGlazes(data);
      }
    };
    fetchGlazes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, ingredients, results } = newGlaze;

    const { data, error } = await supabase
      .from('glazes')
      .insert([{ name, ingredients: ingredients.split(','), results }]);

    if (error) {
      console.error('Error adding glaze: ', error);
    } else {
      setGlazes([...glazes, ...data]);
      setNewGlaze({ name: '', ingredients: '', results: '' });
    }
  };

  return (
    <div>
      <h1>Pottery Glaze Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Glaze Name"
          value={newGlaze.name}
          onChange={(e) => setNewGlaze({ ...newGlaze, name: e.target.value })}
        />
        <textarea
          placeholder="Ingredients (comma-separated)"
          value={newGlaze.ingredients}
          onChange={(e) => setNewGlaze({ ...newGlaze, ingredients: e.target.value })}
        />
        <textarea
          placeholder="Results"
          value={newGlaze.results}
          onChange={(e) => setNewGlaze({ ...newGlaze, results: e.target.value })}
        />
        <button type="submit">Add Glaze</button>
      </form>

      <ul>
        {glazes.map((glaze) => (
          <li key={glaze.id}>
            <h3>{glaze.name}</h3>
            <p>Ingredients: {glaze.ingredients.join(', ')}</p>
            <p>Results: {glaze.results}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
