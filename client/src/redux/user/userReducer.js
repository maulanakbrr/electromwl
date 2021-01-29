import UserActionsTypes from './userTypes'

const INITIAL_STATE = {
  currentUser: null,
  userUpdate: null,
  errorMessage: null,
  userDetails: {},
  isFetching: false,
  isUpdated: false
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.USER_LOGIN_START:
    case UserActionsTypes.USER_REGISTER_START:
    case UserActionsTypes.USER_DETAILS_START:
    case UserActionsTypes.USER_UPDATE_PROFILE_START:
      return{
        ...state,
        isFetching: true,
        isUpdated: false
      }
    case UserActionsTypes.USER_LOGIN_SUCCESS:
    case UserActionsTypes.USER_REGISTER_SUCCESS:
      return{
        ...state,
        isFetching: false,
        currentUser: action.payload,
        errorMessage: null,
        isUpdated: false
      }
    case UserActionsTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: action.payload,
        userDetails: action.payload,
        errorMessage: null,
        isUpdated: true
      }
    case UserActionsTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userDetails: action.payload,
        errorMessage: null,
        isUpdated: false
      }
    case UserActionsTypes.USER_LOGIN_FAIL:
    case UserActionsTypes.USER_REGISTER_FAIL:
    case UserActionsTypes.USER_DETAILS_FAIL:
    case UserActionsTypes.USER_UPDATE_PROFILE_FAIL:
      return{
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        isUpdated: false
      }
    case UserActionsTypes.USER_LOGOUT:
      return{
        ...state,
        currentUser: null,
        errorMessage: null,
        userDetails: null,
        isFetching: false,
        isUpdated: false
      }
    default:
      return state
  }
}

export default userReducer