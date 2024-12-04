import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Si tu utilises React Toastify pour les notifications

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };
    fetchProducts();
  }, []);

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fonction pour supprimer un produit
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast.success('Produit supprimé avec succès !'); // Notification de succès
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      toast.error('Erreur lors de la suppression du produit.'); // Notification d'erreur
    }
  };

  // Fonction pour commencer l'édition d'un produit
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Fonction pour mettre à jour un produit
  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/products/${updatedProduct.id}`, updatedProduct);
      setProducts(products.map((p) => (p.id === updatedProduct.id ? response.data : p)));
      setEditingProduct(null);
      toast.success('Produit modifié avec succès !'); // Notification de succès
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
      toast.error('Erreur lors de la modification du produit.'); // Notification d'erreur
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-nunito text-[#fd7e14]">
        Liste des Produits
      </h1>

      {/* Formulaire de modification de produit */}
      {editingProduct ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(editingProduct);
          }}
          className="mb-6"
        >
          <div className="mb-4">
            <label className="block font-nunito text-lg">Nom</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-nunito text-lg">Description</label>
            <input
              type="text"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              className="border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-nunito text-lg">Prix</label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              className="border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-nunito text-lg">Catégorie</label>
            <select
              value={editingProduct.category?.id || ''}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: categories.find((cat) => cat.id === parseInt(e.target.value)),
                })
              }
              className="border border-gray-300 px-4 py-2 rounded"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#fd7e14] text-white px-4 py-2 rounded mr-2"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
        </form>
      ) : null}

      {/* Affichage des produits sous forme de tableau */}
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Prix</th>
            <th className="border border-gray-300 px-4 py-2">Catégorie</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.description}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price} €</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.category ? product.category.name : 'Non défini'}
              </td>
                <td className="border border-gray-300 px-4 py-2">
                <button
                    onClick={() => handleEdit(product)}
                    className="bg-primary text-white px-3 py-1 rounded shadow hover:bg-secondary mr-2"
                >
                    Modifier
                </button>
                <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
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

export default ProductList;
