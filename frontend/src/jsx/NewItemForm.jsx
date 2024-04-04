import { useState } from 'react';
import PropTypes from 'prop-types';

function NewItemForm({ onSubmit, initialItem }) {
  const [formData, setFormData] = useState( initialItem || { name: '', amount: 0, hasObtained: false });
  const [submitType] = useState(onSubmit.name == "handleCreate" ? "Create" : "Update");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onSubmit(formData);
    } catch(error){
      console.error(`Error ${submitType} item:`, error);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Amount:
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
      </label>
      <label>
        Has Obtained:
        <input type="checkbox" name="hasObtained" checked={formData.hasObtained} onChange={handleChange} />
      </label>
      <button type="submit">{submitType}</button>
    </form>
  );
}

NewItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialItem: PropTypes.object,
};


export default NewItemForm;