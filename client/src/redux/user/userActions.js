import axios from 'axios'
import UserActionsTypes from './userTypes'

export const userLoginStart = () => ({
  type: UserActionsTypes.USER_LOGIN_START
})

export const userLoginSuccess = user => ({
  type: UserActionsTypes.USER_LOGIN_SUCCESS,
  payload: user
})

export const userLoginFail = errorMessage => ({
  type: UserActionsTypes.USER_LOGIN_FAIL,
  payload: errorMessage
})

export const userLogout = () => ({
  type: UserActionsTypes.USER_LOGOUT
})

export const userRegisterStart = () => ({
  type: UserActionsTypes.USER_REGISTER_START
})

export const userRegisterSuccess = user => ({
  type: UserActionsTypes.USER_REGISTER_SUCCESS,
  payload: user
})

export const userRegisterFail = errorMessage => ({
  type: UserActionsTypes.USER_REGISTER_FAIL,
  payload: errorMessage
})

export const userDetailsStart = () => ({
  type: UserActionsTypes.USER_DETAILS_START
})

export const userDetailsSuccess = user => ({
  type: UserActionsTypes.USER_DETAILS_SUCCESS,
  payload: user
})

export const userDetailsFail = errorMessage => ({
  type: UserActionsTypes.USER_DETAILS_FAIL,
  payload: errorMessage
})

export const userUpdateProfileStart = () => ({
  type: UserActionsTypes.USER_UPDATE_PROFILE_START
})

export const userUpdateProfileSuccess = user => ({
  type: UserActionsTypes.USER_UPDATE_PROFILE_SUCCESS,
  payload: user
})

export const userUpdateProfileFail = errorMessage => ({
  type: UserActionsTypes.USER_UPDATE_PROFILE_FAIL,
  payload: errorMessage
})

export const userLoginStartAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginStart())
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('api/users/login', { email, password }, config)

    dispatch(userLoginSuccess(data))
  } catch (error) {
    dispatch(userLoginFail(
      error.response && error.response.data.message ? error.response.data.message : error.message
    ))
  }
}

export const userRegisterStartAsync = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterStart())

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('api/users', { name, email, password }, config)

    dispatch(userRegisterSuccess(data))
  } catch (error) {
    dispatch(userRegisterFail(
      error.response && error.response.data.message ? error.response.data.message : error.message
    ))
  }
}

export const getUserDetailsAsync = (id, currentUser) => async (dispatch) => {
  try {
    const { token } = currentUser

    dispatch(userDetailsStart())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    const { data } = await axios.get(`api/users/${id}`, config)

    dispatch(userDetailsSuccess(data))
  } catch (error) {
    dispatch(userDetailsFail(
      error.response && error.response.data.message ? error.response.data.message : error.message
    ))
  }
}

export const updateUserDetailsAsync = (user, currentUser) => async (dispatch) => {
  try {
    const { token } = currentUser

    console.log(user)

    dispatch(userUpdateProfileStart())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    const { data } = await axios.put(`api/users/profile`, user,  config)

    dispatch(userUpdateProfileSuccess(data))
  } catch (error) {
    dispatch(userUpdateProfileFail(
      error.response && error.response.data.message ? error.response.data.message : error.message
    ))
  }
}