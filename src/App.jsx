import { useState, useEffect } from 'react';
// import { index } from './services/petService.js';
import * as petService from './services/petService.js';
import './App.css';
import { PetList } from './components/PetList.jsx';
import { PetDetail } from './components/PetDetail.jsx';
import { PetForm } from './components/PetForm.jsx';

function App() {
  const [petList, setPetList] = useState([]);

  // The callback function in useEffect cannot be async. Therefore, we declare a function inside of it to be async and invokit immediately afterwards 
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();

        if (pets.error) {
          throw new Error(pets.error);
        }
        setPetList(pets);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPets();
  }, []); // When the array of dependencies is empty the callback only runs one time (first render)

  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const updateSelected = pet => setSelected(pet);

  const handleFormView = pet => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(prevState => !prevState);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      if (newPet.error) {
        throw new Error(newPet.error);
      }
      setPetList([...petList, newPet]);
      setIsFormOpen(false);
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePet = async (pet, petId) => {
    try {
      const updatedPet = await petService.update(pet, petId);
      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }
      // Update petList with the edited pet
      setPetList(petList.map(pet => pet._id !== petId ? pet : updatedPet));
      // If we don't set selected to the updated pet object, the details page will reference outdated data until the page reloads.
      setSelected(updatedPet);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemovePet = async petId => {
    try {
      const deletedPet = await petService.delete(petId);
      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }
      setPetList(petList.filter(pet => pet._id !== petId));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PetList petList={petList} updateSelected={updateSelected} isFormOpen={isFormOpen} handleFormView={handleFormView} />
      {
        isFormOpen ? (
          <PetForm handleAddPet={handleAddPet} selected={selected} handleUpdatePet={handleUpdatePet} />
        ) : (
          <PetDetail selected={selected} handleFormView={handleFormView} handleRemovePet={handleRemovePet} />
        )
      }
    </>
  );
};

export default App;
