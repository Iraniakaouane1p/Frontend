import React, { useState } from 'react';
import api from '../axios';

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, description, price, categoryId };
    api.post('products', newProduct)
      .then((response) => {
        onProductAdded(response.data);
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit :", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#fd7e14] text-center font-nunito">Ajouter un produit</h2>

      <div className="mb-4">
        <label className="block text-lg font-nunito mb-2">Nom du produit</label>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd7e14]"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-nunito mb-2">Description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd7e14]"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-nunito mb-2">Prix</label>
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd7e14]"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-nunito mb-2">Catégorie ID</label>
        <input
          type="text"
          placeholder="Catégorie ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd7e14]"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#fd7e14] text-white py-3 rounded-lg hover:bg-[#e67e22] transition duration-300"
      >
        Ajouter
      </button>
    </form>
  );
};

export default ProductForm;
