import { useState, useEffect } from 'react';
import NewItemForm from './NewItemForm.jsx'
import axios from 'axios';
import PropTypes from 'prop-types';

function ItemList({ apiUrl }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setItems(response.data);
      setShowForm(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCreate = async (newItem) => {
    try {
      const response = await axios.post(apiUrl, newItem);
      setItems([...items, response.data]);
      setShowForm(false);
    } catch (error) {
      setError(error);
    }
  }

  const handleUpdate = async (updatedItem) => {
    try {
      await axios.put(`${apiUrl}`, updatedItem);
      setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    } catch (error){
      setError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setShowForm(true)}>New Item</button>
      </div>
      <h1>Item List</h1>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {Array.isArray(items) && items.map(item => (
          <li key={item.id}>
            <div>{item.amount} {item.name}</div>
            <div>Has Obtained: {item.hasObtained ? 'Yes' : 'No'}</div>
            <button onClick={() => handleUpdate(item)}>Update</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
        {showForm && <NewItemForm onSubmit={handleCreate} />}
      </ul>
      
    </div>
  );
}

ItemList.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default ItemList;
