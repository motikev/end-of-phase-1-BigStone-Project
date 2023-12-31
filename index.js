document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3000';
  const productList = document.getElementById('product-list');
  const categorySelect = document.getElementById('category');
  const searchButton = document.querySelector('#banner button[type="submit"]');
  const reviewForm = document.getElementById('review-form');

  const fetchLocalData = async (endpoint) => {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  const createListItem = (item) => {
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
    const reviewForm = document.createElement('form');
    reviewForm.innerHTML = `
      <label for="review">Leave a review:</label>
      <textarea id="review" name="review" required></textarea>
      <button type="submit">Submit</button>
    `;
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const review = event.target.elements.review.value;
      const data = { productId: item.id, review };
      postReview(data);
    });
    listItem.append(image, name, description, price, rating, reviewForm);
    listItem.classList.add('product-list-item');
    return listItem;
  }

  const renderListItems = (items) => {
    productList.innerHTML = '';
    if (items.length === 0) {
      productList.textContent = 'No products found';
      return;
    }
    const list = document.createElement('ul');
    items.forEach(item => {
      const listItem = createListItem(item);
      list.appendChild(listItem);
    });
    productList.appendChild(list);
  }

  const postReview = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Review submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting review');
    }
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