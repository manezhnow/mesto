const popupOpenedClass = 'popup_is-opened';
const popupAnimatedClass = 'popup_is-animated';

function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector(`.${popupOpenedClass}`);

        closeModal(openedPopup);
    }
}

export function openModal(popup) {
    popup.classList.add(popupOpenedClass);
    document.addEventListener('keydown', handleEscapeKey);
}

export function closeModal(popup) {
    if (!popup) {
        return;
    }

    popup.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', handleEscapeKey);
}

export function enableModalAnimation(popup) {
    popup.classList.add(popupAnimatedClass);
}

export function closeModalByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}
