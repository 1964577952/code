import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const CurrentKey ='Current'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCurrent() {
  return Cookies.get(CurrentKey)
}

export function setCurrent(current) {
  return Cookies.set(CurrentKey, current)
}

export function removeCurrent() {
  return Cookies.remove(CurrentKey)
}

