import { useState } from 'react';
import PropTypes from 'prop-types';

function NewItemForm({ onSubmit, initialItem }) {
  const [formData, setFormData] = useState(initialItem || { name: '', amount: 0, hasObtained: false });
  const [submitType] = useState(onSubmit.name == "handleCreate" ? "Create" : "Update");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onSubmit(formData);
    } catch (error) {
      console.error(`Error ${submitType} item:`, error);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <div className='input-group my-1'>
          <div className='input-group-text'>
            Name:
          </div>

          <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className='input-group my-1'>
          <div className='input-group-text'>
            Amount:
          </div>
          <input className="form-control" type="number" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        {/* <label className='row'>
          Has Obtained:
          <input type="checkbox" name="hasObtained" checked={formData.hasObtained} onChange={handleChange} />
        </label> */}
        <div className='d-flex mx-auto row'>
          <button type="submit" className="btn btn-primary mt-1">{submitType}
          </button>
        </div>
      </form>
    </div>
  );
}

NewItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialItem: PropTypes.object,
};


export default NewItemForm;