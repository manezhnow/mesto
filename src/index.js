import './pages/index.css';
import logoUrl from './images/logo.svg';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { initialCards } from './components/cards.js';
import {
    closeModal,
    closeModalByOverlay,
    enableModalAnimation,
    openModal,
} from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const headerLogo = document.querySelector('.header__logo');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.elements.name;
const descriptionInput = profileEditForm.elements.description;
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardAddForm = document.forms['new-place'];
const cardNameInput = cardAddForm.elements['place-name'];
const cardLinkInput = cardAddForm.elements.link;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

headerLogo.src = logoUrl;

function getNormalizedImageLink(link) {
    return link.trim();
}

function openImagePopup(cardData) {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;

    openModal(imagePopup);
}

function getCardElement(cardData) {
    return createCard(cardData, cardTemplate, deleteCard, likeCard, openImagePopup);
}

initialCards.forEach(function (item) {
    const card = getCardElement(item);
    placesList.append(card);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(profileEditPopup);
});

profileEditForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(profileEditPopup);
});

cardAddButton.addEventListener('click', function () {
    openModal(cardAddPopup);
});

cardAddForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const card = getCardElement({
        name: cardNameInput.value,
        link: getNormalizedImageLink(cardLinkInput.value),
    });

    placesList.prepend(card);
    cardAddForm.reset();
    closeModal(cardAddPopup);
});

popupCloseButtons.forEach(function (closeButton) {
    const popup = closeButton.closest('.popup');

    closeButton.addEventListener('click', function () {
        closeModal(popup);
    });
});

popups.forEach(function (popup) {
    enableModalAnimation(popup);
    popup.addEventListener('mousedown', closeModalByOverlay);
});
