const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const response = await fetch(BASE_URL);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const create = async (formData) => {
    try {
        const response = await fetch(BASE_URL, {
            // Method - to override the default GET method
            method: 'POST',
            // Headers , we are sending JSON data, so we attach a Content-Type header
            // and specify that the data being sent is type 'application/json'
            headers: {
                'Content-Type': 'application/json',
            },
            // The form data, converted from object to JSON string is sent as the body 
            body: JSON.stringify(formData),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const update = async (pet, petId) => {
    try {
        const response = await fetch(`${BASE_URL}/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pet),
        })
        return await response.json();
    }
    catch (error) {
        console.error(error);
    }
}

const deletePet = async petId => {
    try {
        const deletedPet = await fetch(`${BASE_URL}/${petId}`, {
            method: 'DELETE',
        });
        return await deletedPet.json();
    }
    catch (error) {
        console.error(error);
    }
};

export { index, create, update, deletePet as delete };