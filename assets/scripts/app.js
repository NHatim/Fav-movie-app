const selectAddMovie = document.getElementById('add-modal');
const selectAddMovieBtn = document.querySelector('header button');
const selectBackDrop = document.getElementById('backdrop');
const selectCancelBtn = selectAddMovie.querySelector('.btn--passive');
const selectAddBtn = selectCancelBtn.nextElementSibling;
const selectInputElements = document.querySelectorAll('input');
const selectMovieEntry = document.querySelector('#entry-text');
const selectUl = document.querySelector('#movie-list');
const deleteMovieModal = document.querySelector('#delete-modal');


const movies = [];


const addMovieModal = () => {
  selectAddMovie.classList.add('visible'); //Rends visible la div pour rajouter les films
  toggleBackDrop(); //rends tout ce qui est autour gris
};

const toggleBackDrop = () => {
  selectBackDrop.classList.toggle('visible'); //fonction principale qu'on fait appelle elle permet de rendre la classe backdrop visible
};

const closeMovieModal = () => {
  selectAddMovie.classList.remove('visible')//rends non visible la boîte de dialogue pour ajouter des films
}


const deleteMovie = id => {
  movies.splice(id, 1);
  selectUl.children[id].remove();
  cancelMovieDeletionHandler();
  clearUIMovie();
}

const cancelMovieDeletionHandler = () => {

  toggleBackDrop();
  deleteMovieModal.classList.remove('visible');// rends invisible la boîte de suppression de film

}

const checkDeleteMovieHandler = id => {

  deleteMovieModal.classList.add('visible');//rends visible la boîte de suppression de film
  toggleBackDrop();
  const cancelBtnDeletionMovie = deleteMovieModal.querySelector('.btn--passive')
  let confirmBtnDeletionMovie = deleteMovieModal.querySelector('.btn--danger');

  confirmBtnDeletionMovie.replaceWith(confirmBtnDeletionMovie.cloneNode(true));

  confirmBtnDeletionMovie = deleteMovieModal.querySelector('.btn--danger');

  // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); // will not work :(
    
  cancelBtnDeletionMovie.removeEventListener('click', cancelMovieDeletionHandler);
  cancelBtnDeletionMovie.addEventListener('click', cancelMovieDeletionHandler);
  confirmBtnDeletionMovie.addEventListener('click', deleteMovie.bind(null,id));

  
}
const clearUIMovie = () => {
  if (movies.length === 0) {
    selectMovieEntry.style.display = 'block';
  } else {
    selectMovieEntry.style.display = 'none';
  }
};

const clearInput = () => {
  for (const userInput of selectInputElements) {
    userInput.value = '';
  }
};

const backDropHandler = () => {
  closeMovieModal();
  cancelMovieDeletionHandler();
  clearInput();
};

const cancelBtnHandler = () => {
  closeMovieModal();
  toggleBackDrop();
  clearInput();
};

const renderUINewMovie = (myObj) => {
  const renderedLi = document.createElement('li');
  renderedLi.className = 'movie-element';
  renderedLi.innerHTML = `
  <div class="movie-element__image">
    <image src ="${myObj[myObj.length - 1].img}" alt="${myObj[myObj.length - 1].title}"> 
  </div>
  <div class ="movie-element__info">
    <h2>${myObj[myObj.length - 1].title}</h2>
    <p>${myObj[myObj.length - 1].rating}/5 stars</p>
  </div>`;
  renderedLi.addEventListener('click', checkDeleteMovieHandler.bind(null, myObj[myObj.length - 1].id))

  selectUl.append(renderedLi);
};

const addMovieBtnHandler = () => {
  const titleValue = selectInputElements[0].value;
  const imgValue = selectInputElements[1].value;
  const ratingValue = selectInputElements[2].value;

  if (
    titleValue.trim() === '' ||
    imgValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    return alert('Please beware of our ratings 1 to 5 or to empty strings');
  }

  const myNewMovie = {
    id: movies.length,
    title: titleValue.trim(),
    img: imgValue.trim(),
    rating: ratingValue.trim(),
  };

  movies.push(myNewMovie);

  clearUIMovie();
  closeMovieModal();
  toggleBackDrop();
  clearInput();
  renderUINewMovie(movies);
};

selectAddMovieBtn.addEventListener('click', addMovieModal);
selectBackDrop.addEventListener('click', backDropHandler);
selectCancelBtn.addEventListener('click', cancelBtnHandler);
selectAddBtn.addEventListener('click', addMovieBtnHandler);
