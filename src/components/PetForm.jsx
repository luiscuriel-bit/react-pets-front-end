import { useState } from 'react';

const PetForm = (props) => {
  const initialState = {
    name: '',
    breed: '',
    age: 0,
  };
  // If pet data has been passed as props, we set formData as that pet object.
  // Otherwise, we can assume this is a new pet form, and use the empty initialState object.
  const [formData, setFormData] = useState(props.selected ? props.selected : initialState);

  const handleChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();
    if (props.selected) {
      props.handleUpdatePet(formData, props.selected._id);
    }
    else
      props.handleAddPet(formData);
    // There is no need to reset formData because in App.jsx this component is conditionally mounted. Thus, the state data is lost when isFormOpen is false
    // setFormData({
    //   name: '',
    //   breed: '',
    //   age: 0,
    // });
  };

  return <div className="form-container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={formData.name}
      />
      <label htmlFor="age">Age</label>
      <input type="number"
        name="age"
        id="age"
        onChange={handleChange}
        value={formData.age}
      />
      <label htmlFor="breed">Breed</label>
      <input type="text"
        name="breed"
        id="breed"
        onChange={handleChange}
        value={formData.breed}
      />
      <button type='submit'>{props.selected ? 'Update Pet' : 'Add New Pet'}</button>
    </form>
  </div>
}

export { PetForm };