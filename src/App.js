import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm'; 

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [activeSection, setActiveSection] = useState("produits"); // Gère quelle section est active (produits ou catégories)

  // Récupérer les produits
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => {
        setError('Erreur lors de la récupération des produits');
        console.error(error);
      });
  }, []);

  // Récupérer les catégories
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => {
        setError('Erreur lors de la récupération des catégories');
        console.error(error);
      });
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Fonction pour afficher les sections
  const showSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="App bg-blue-100 min-h-screen"> {/* Fond bleu pour toute la page */}
      {/* Header */}
      <header className="bg-white text-black p-4 flex justify-between items-center shadow-md">
        <img
          src="https://teachr.fr/assets/images/logo.png?v=593bbf3b4c"
          alt="Logo"
          className="h-12"
        />
        {/* Titre au centre */}
        <h1
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold font-nunito"
          style={{
            background: 'linear-gradient(45deg, #007bff, #fd7e14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Gestion Produits et Catégories
        </h1>
        <div className="absolute right-4 flex space-x-6">
          {/* Buttons to switch between sections */}
          <button
            className="bg-[#fd7e14] text-white px-6 py-2 rounded-lg hover:bg-[#e67e22] font-nunito"
            onClick={() => showSection("produits")} // Show product section
          >
            Gestion des Produits
          </button>
          <button
            className="bg-[#007bff] text-white px-6 py-2 rounded-lg hover:bg-[#0056b3] font-nunito"
            onClick={() => showSection("categories")} // Show category section
          >
            Gestion des Catégories
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Affichage de la section Produits */}
        {activeSection === "produits" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-nunito text-[#fd7e14]">Gestion des Produits</h2>
            <ProductForm onProductAdded={() => {}} />
            <ProductList products={products} />
          </div>
        )}

        {/* Affichage de la section Catégories */}
        {activeSection === "categories" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-nunito text-[#fd7e14]">Gestion des Catégories</h2>
            {/* <CategoryForm onCategoryAdded={handleCategoryAdded} /> */}
            <CategoryList categories={categories} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
