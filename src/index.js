  const menu = document.getElementById('ramen-menu');
  const detail = document.getElementById('ramen-detail');
  const form = document.getElementById('new-ramen');
  
 fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        menu.appendChild(img);
        img.addEventListener('click', () => {
        
          fetch(`http://localhost:3000/ramens/${ramen.id}`)
            .then(response => response.json())
            .then(details => {
            
              detail.innerHTML = `
                <h4>${details.name}</h4>
                <p>Restaurant: ${details.restaurant}</p>
                <img src="${details.image}" alt="${details.name}">
                <p>Rating: ${details.rating}</p>
                <p>Comment: ${details.comment}</p> `;
            })
             
            .catch(error => console.error(error));
        });
        
      })
    })
  

form.addEventListener('submit', event => {
  event.preventDefault();

  const nameInput = document.querySelector('#new-name').value;
  const imageInput = document.querySelector('#new-image');
  const restaurantInput = document.querySelector('#new-restaurant');
  const ratingInput = document.querySelector('#new-rating');
  const commentInput = document.querySelector('#new-comment');

  const newRamenDiv = document.createElement('div');
  const newRamenName = document.createElement('h2');
  const newRamenImage = document.createElement('img');
  const newRamenRestaurant = document.createElement('p');
  const newRamenRating = document.createElement('p');
  const newRamenComment = document.createElement('p');

  newRamenName.textContent = nameInput.value;
  newRamenImage.src = imageInput.value;
  newRamenRestaurant.textContent = restaurantInput.value;
  newRamenRating.textContent = `Rating: ${ratingInput.value}`;
  newRamenComment.textContent = `Comment: ${commentInput.value}`;

  newRamenDiv.appendChild(newRamenName);
  newRamenDiv.appendChild(newRamenImage);
  newRamenDiv.appendChild(newRamenRestaurant);
  newRamenDiv.appendChild(newRamenRating);
  newRamenDiv.appendChild(newRamenComment);

  menu.appendChild(newRamenDiv);
  form.reset();  
});
