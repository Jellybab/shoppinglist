import { useState, useEffect, useCallback } from 'react';
import NewItemForm from './NewItemForm.jsx'
import axios from 'axios';
import PropTypes from 'prop-types';

function ItemList({ apiUrl }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      setItems(response.data);
      setShowForm(false);
    } catch (error) {
      setError(error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
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
      const response = await axios.put(`${apiUrl}`, updatedItem);
      setItems(items.map(item => (item.id == response.data.id ? response.data : item)));
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

  const toggleEditMode = (id) => {
    setItems(items.map(item => (item.id === id ? {...item, editMode: !item.editMode} : item)));
  }

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
            {item.editMode ? (
              <NewItemForm
                initialItem={item}
                onSubmit={handleUpdate}
                onCancel={() => toggleEditMode(item.id)}
              />
            ) : (
              <>
                <div>{item.amount} {item.name}</div>
                <div>Has Obtained: {item.hasObtained ? 'Yes' : 'No'}</div>
                <button onClick={() => toggleEditMode(item.id)}>Update</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
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
