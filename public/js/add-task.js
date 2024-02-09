const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#Task-name').value.trim();
  
    if (name) {
      const response = await fetch(`/routes/index`, {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create Task');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/routes/index/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete Task');
      }
    }
  };
  
  document
    .querySelector('.new-Task-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.Task-list')
    .addEventListener('click', delButtonHandler);
  