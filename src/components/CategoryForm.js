import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ onCategoryAdded, categoryToEdit, onCategoryUpdated }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
    } else {
      setName('');
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };

    try {
      if (categoryToEdit) {
        // Modifier une catégorie existante
        const response = await axios.put(
          `http://127.0.0.1:8000/api/categories/${categoryToEdit.id}`,
          categoryData
        );
        onCategoryUpdated(response.data); // Met à jour la liste des catégories
      } else {
        // Ajouter une nouvelle catégorie
        const response = await axios.post('http://127.0.0.1:8000/api/categories', categoryData);
        onCategoryAdded(response.data); // Ajoute la nouvelle catégorie à la liste
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout/modification de la catégorie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#fd7e14] text-center font-nunito">Ajouter / Modifier une catégorie</h2>

      <div className="mb-4">
        <label className="block text-lg font-nunito mb-2">Nom de la catégorie</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de la catégorie"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd7e14]"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#fd7e14] text-white py-3 rounded-lg hover:bg-[#e67e22] transition duration-300"
      >
        {categoryToEdit ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </form>
  );
};

export default CategoryForm;
