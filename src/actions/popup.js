export const POPUP_OPEN = 'POPUP_OPEN'
export const POPUP_CLOSE = 'POPUP_CLOSE'

export const openPopup = (name) => ({type: POPUP_OPEN, name})
export const closePopup = () => ({type: POPUP_CLOSE})
