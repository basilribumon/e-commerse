import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../../layouts/AdminLayout";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../redux/adminProductSlice";

function AdminProducts() {
  const dispatch = useDispatch();
  const [search,setSearch] = useState("");

 const [editingProduct, setEditingProduct] =
  useState(null);

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "15px",
};

  const {
    products,
    loading,
    error,
  } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 const handleEdit = (product) => {
  setEditingProduct({ ...product });
};
const [showAddModal, setShowAddModal] =
useState(false);

const [newProduct, setNewProduct] =
useState({
  title: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  description: "",
});

const filteredProducts = products.filter((product)=>{
  const keyword = search.toLowerCase();

  return(
    product.title.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  )
})


return (
  <AdminLayout>

    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h1>📦 Product Management</h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        {/* Add Product */}
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add Product
        </button>
      </div>
    </div>

    {/* Add Product Modal */}
    {showAddModal && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            width: "500px",
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            ➕ Add Product
          </h2>
          {/* Product Title */}
<input
  style={inputStyle}
  placeholder="Product Title"
  value={newProduct.title}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      title: e.target.value,
    })
  }
/>

{/* Category */}
<select
  style={inputStyle}
  value={newProduct.category}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      category: e.target.value,
    })
  }
>
  <option value="">Select Category</option>
  <option value="IOS">IOS</option>
  <option value="Samsung">Samsung</option>
  <option value="Google">Google</option>
  <option value="OnePlus">OnePlus</option>
  <option value="Redmi">Redmi</option>
  <option value="Realme">Realme</option>
  <option value="Oppo">Oppo</option>
  <option value="Vivo">Vivo</option>
  <option value="Nothing">Nothing</option>
</select>

{/* Price */}
<input
  style={inputStyle}
  type="number"
  placeholder="Price"
  value={newProduct.price}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      price: Number(e.target.value),
    })
  }
/>



          {/* Your Product Inputs Start Here */}

      <input
        style={inputStyle}
        type="number"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            stock: Number(e.target.value),
          })
        }
      />

      <input
        style={inputStyle}
        placeholder="Image URL"
        value={newProduct.image}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            image: e.target.value,
          })
        }
      />

      <textarea
        style={{
          ...inputStyle,
          height: "120px",
        }}
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            description: e.target.value,
          })
        }
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() =>
            setShowAddModal(false)
          }
          style={{
            background: "#6c757d",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            dispatch(addProduct(newProduct));

            setShowAddModal(false);

            setNewProduct({
              title: "",
              category: "",
              price: "",
              stock: "",
              image: "",
              description: "",
            });
          }}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Product
        </button>
      </div>
    </div>
  </div>
)}
     {editingProduct && (
      
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: "500px",
        padding: "30px",
        borderRadius: "15px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        ✏️ Edit Product
      </h2>

      <input
        style={inputStyle}
        value={editingProduct.title}
        placeholder="Product Title"
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            title: e.target.value,
          })
        }
      />

           <select
  style={inputStyle}
  value={newProduct.category}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      category: e.target.value,
    })
  }
>
  <option value="">Select Category</option>
  <option value="IOS">IOS</option>
  <option value="Samsung">Samsung</option>
  <option value="Google">Google</option>
  <option value="OnePlus">OnePlus</option>
  <option value="Redme">Redme</option>
  <option value="Realme">Realme</option>
  <option value="Oppo">Oppo</option>
  <option value="Vivo">Vivo</option>
  <option value="Nothing">Nothing</option>
</select>

      <input
        style={inputStyle}
        type="number"
        value={editingProduct.price}
        placeholder="Price"
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            price: Number(e.target.value),
          })
        }
      />

      <input
        style={inputStyle}
        type="number"
        value={editingProduct.stock}
        placeholder="Stock"
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            stock: Number(e.target.value),
          })
        }
      />

      <input
        style={inputStyle}
        value={editingProduct.image}
        placeholder="Image URL"
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            image: e.target.value,
          })
        }
      />

      <textarea
        style={{
          ...inputStyle,
          height: "120px",
        }}
        value={editingProduct.description}
        placeholder="Description"
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            description: e.target.value,
          })
        }
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
        }}
      >
        <button
          onClick={() =>
            setEditingProduct(null)
          }
          style={{
            padding: "10px 18px",
            border: "none",
            background: "#6c757d",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            dispatch(
              updateProduct(
                editingProduct
              )
            );

            setEditingProduct(null);
          }}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "#28a745",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  </div>
)}

      {loading && <h3>Loading...</h3>}

      {error && <h3>{error}</h3>}

      {!loading && (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    width="70"
                    height="70"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </td>

                <td>{product.title}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.stock}</td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                    style={{
                      background: "#ffc107",
                      color: "black",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        deleteProduct(
                          product.id
                        )
                      )
                    }
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}

export default AdminProducts;