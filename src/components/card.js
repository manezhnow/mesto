const cardLikeButtonActiveClass = 'card__like-button_is-active';

export function createCard(cardData, cardTemplate, deleteCard, likeCard, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    likeButton.addEventListener('click', function () {
        likeCard(likeButton);
    });

    cardImage.addEventListener('click', function () {
        openImagePopup(cardData);
    });

    return cardElement;
}

export const deleteCard = (card) => {
    card.remove();
};

export const likeCard = (likeButton) => {
    likeButton.classList.toggle(cardLikeButtonActiveClass);
};
