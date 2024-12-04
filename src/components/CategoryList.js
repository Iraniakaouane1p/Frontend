import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null); // État pour la catégorie à modifier

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setError('Erreur lors de la récupération des catégories');
        console.error(error);
      });
  }, []);

  // Fonction pour supprimer une catégorie
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
      // Mettre à jour la liste des catégories après suppression
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  // Fonction pour gérer la mise à jour d'une catégorie
  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setCategoryToEdit(null); // Réinitialiser le formulaire
  };

  return (
    <div className="p-6">
      {/* Formulaire de création/modification */}
      <CategoryForm
        onCategoryAdded={(newCategory) => setCategories([...categories, newCategory])}
        categoryToEdit={categoryToEdit}
        onCategoryUpdated={handleCategoryUpdated}
      />

      {/* Liste des Catégories avec le titre déplacé au-dessus */}
      <h1 className="text-3xl font-bold mb-6 text-center font-nunito text-primary">
        Liste des Catégories
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg mt-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-4">
                <button
                  className="bg-primary text-white px-3 py-1 rounded shadow hover:bg-secondary"
                  onClick={() => setCategoryToEdit(category)} // Sélectionner la catégorie pour modification
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                  onClick={() => handleDelete(category.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
