import { useState, useEffect } from 'react';
import ItemList from './ItemList';

const term = "Item";
const headers = {
  'Content-Type': 'application/json',
};

function Item(API_URL) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItemData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItemData = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error));
  };

  const handleCreate = (item) => {

    console.log(`add item: ${JSON.stringify(item)}`)

    fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({name: item.name, amount: item.amount, hasObtained: item.hasObtained}),
    })
      .then(response => response.json())
      .then(returnedItem => setData([...data, returnedItem]))
      .catch(error => setError(error));
  };

  const handleUpdate = (updatedItem) => {

    console.log(`update item: ${JSON.stringify(updatedItem)}`)

    fetch(`${API_URL}`, {
      method: 'PUT',
      headers,
      
      body: JSON.stringify(updatedItem),
    })
      .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
      .catch(error => setError(error));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(() => setData(data.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting item:', error));
  };

  console.log("handleCreate function:", handleCreate);

  return (
    <div>
      <ItemList
        name={term}
        data={data}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Item;