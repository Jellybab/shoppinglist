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
    } catch (error) {
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
    setItems(items.map(item => (item.id === id ? { ...item, editMode: !item.editMode } : item)));
  }

  return (
    <div className='container'>
      <div className='d-flex'>
        <h1 className="mx-auto">Item List</h1>
      </div>

      {error && <p>Error: {error.message}</p>}
      <ul className='container d-flex-col'>
        {Array.isArray(items) && items.map(item => (
          <li key={item.id} className='row mt-2 border border-dark rounded'>
            {item.editMode ? (
              <NewItemForm
                initialItem={item}
                onSubmit={handleUpdate}
                onCancel={() => toggleEditMode(item.id)}
              />
            ) : (
              <>
                  <div className='d-flex justify-content-sm-around'>
                  <div className='col align-self-center'>{item.amount}</div>
                    <div className='col align-self-center'>
                      {item.name}
                  </div>
                  {/* <div className='col-1'>Has Obtained: {item.hasObtained ? 'Yes' : 'No'}</div> */}
                    <button className="btn btn-danger btn-sm col-1 mx-2 my-1 align-self-center" onClick={() => handleDelete(item.id)}>Del</button>
                </div>
                <button className="btn btn-primary btn-sm mt-1" onClick={() => toggleEditMode(item.id)}>Update</button>
              </>
            )}
          </li>
        ))}
        <div className='d-flex mt-2 row border border-dark rounded'>
          {!showForm && <button className="btn btn-primary mx-auto" onClick={() => setShowForm(true)}>New Item</button>}
          {showForm && <NewItemForm onSubmit={handleCreate} />}
        </div>
        
      </ul>

    </div>
  );
}

ItemList.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default ItemList;
