import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  inputContainer: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "8px 15px",
    fontSize: "16px",
    backgroundColor: "lightgreen",
    border: "none",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    marginTop: "20px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listItem: {
    padding: "5px",
    fontSize: "18px",
    borderBottom: "1px solid gray",
    width: "200px",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceInput: {
    padding: "5px",
    fontSize: "16px",
    width: "100px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  deleteButton: {
    padding: "5px",
    fontSize: "14px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
    borderRadius: "5px",
  },
  editButton: {
    padding: "5px",
    fontSize: "14px",
    backgroundColor: "lightblue",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
  },
  totalContainer: {
    marginTop: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
};

const Home = () => {
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    if (itemInput.trim() !== "") {
      try {
        const response = await axios.post(
          API_URL,
          { name: itemInput, price: 0 },
          { headers: { "Content-Type": "application/json" } }
        );

        setItems([...items, { id: response.data.id, name: itemInput, price: 0 }]);
        setItemInput("");
      } catch (error) {
        console.error("Error adding item:", error.response?.data || error.message);
      }
    }
  };

  const updatePrice = async (id, newPrice) => {
    try {
      await axios.put(`${API_URL}/${id}`, { price: newPrice });
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, price: newPrice } : item
        )
      );
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const startEditing = (id, currentName) => {
    setEditingItemId(id);
    setEditedName(currentName);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { name: editedName });
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, name: editedName } : item
        )
      );
      setEditingItemId(null);
    } catch (error) {
      console.error("Error updating item name:", error);
    }
  };

  const cancelEdit = () => {
    setEditingItemId(null);
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const total = items.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Grocery List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Write a Grocery Item..."
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={addItem} style={styles.button}>
          Add Item
        </button>
      </div>

      <div style={styles.listContainer}>
        <div style={styles.column}>
          <h3>Item List</h3>
          {items.map((item) => (
            <div key={item.id} style={styles.listItem}>
              {editingItemId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={() => saveEdit(item.id)} style={styles.button}>
                    Save
                  </button>
                  <button onClick={cancelEdit} style={styles.deleteButton}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {item.name}
                  <button onClick={() => startEditing(item.id, item.name)} style={styles.editButton}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={styles.column}>
          <h3>Price</h3>
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                placeholder="Enter Price..."
                value={item.price}
                onChange={(e) => updatePrice(item.id, e.target.value)}
                style={styles.priceInput}
              />
              <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.totalContainer}>
        <h2>Total: ₱{total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Home;