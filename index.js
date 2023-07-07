document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3000';
  const productList = document.getElementById('product-list');
  const categorySelect = document.getElementById('category');
  const searchButton = document.querySelector('#banner button[type="submit"]');

  const fetchLocalData = async (endpoint) => {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  const renderListItems = (items) => {
    productList.innerHTML = '';
    if (items.length === 0) {
      productList.textContent = 'No products found';
      return;
    }
    const list = document.createElement('ul');
    items.forEach(item => {
      const listItem = document.createElement('li');
      const image = new Image();
      image.src = item.image;
      image.alt = item.name;
      const name = document.createElement('h4');
      name.textContent = item.name;
      const description = document.createElement('p');
      description.textContent = item.description;
      const price = document.createElement('p');
      price.textContent = `@Ksh. ${item.price}`;
      const rating = document.createElement('div');
      rating.classList.add('rating');
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star', i >= item.rating ? 'star-empty' : 'star-filled');
        rating.appendChild(star);
      }
      listItem.append(image, name, description, price, rating);
      list.appendChild(listItem);
    });
    productList.appendChild(list);
  }

  const filterProducts = async () => {
    const category = categorySelect.value;
    const endpoint = category === 'all' ? 'materials' : `materials?category=${category}`;
    try {
      const data = await fetchLocalData(endpoint);
      renderListItems(data);
    } catch (error) {
      console.error(error);
      productList.textContent = 'Error fetching products';
    }
  }

  categorySelect.addEventListener('change', filterProducts);
  searchButton.addEventListener('click', () => alert('Message sent'));
});