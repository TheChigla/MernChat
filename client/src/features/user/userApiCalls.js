import axios from 'axios'
import { addErrors, addSuccess } from '../toast/toastSlice'
import { setUser } from './userSlice'

// @POST | Login user //
const loginUser = async (dispatch, body) => {
  await axios
    .post(`${import.meta.env.VITE_API_URI}/user/login`, body)
    .then(res => {
      localStorage.setItem('token', res.data)

      dispatch(addSuccess({ success: 'Succesfully logged in' }))
      dispatch(addErrors({ errors: null }))

      setTimeout(() => {
        window.location.href = '/conversations'
      }, 1000)
    })
    .catch(err => {
      dispatch(addErrors({ errors: [err.response.data] }))
      dispatch(addSuccess({ success: null }))
    })
}

// @POST | Register user //
const registerUser = async (dispatch, body) => {
  await axios
    .post(`${import.meta.env.VITE_API_URI}/user/register`, body)
    .then(res => {
      localStorage.setItem('token', res.data)

      dispatch(addSuccess({ success: 'Succesfully registered' }))
      dispatch(addErrors({ errors: null }))

      setTimeout(() => {
        window.location.href = '/conversations'
      }, 1000)
    })
    .catch(err => {
      if (err.response && err.response.data) {
        let errors = []
        Object.entries(err.response.data).map(([key, value]) => {
          errors.push(value.message)
        })
        dispatch(addErrors({ errors }))
        dispatch(addSuccess({ success: null }))
      }
    })
}

// @GET | Ger user //
const getUser = async dispatch => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .get(`${import.meta.env.VITE_API_URI}/user`, config)
    .then(async res => {
      // Payload for redux
      const payload = {
        user: res.data,
      }

      await dispatch(setUser(payload))
    })
    .catch(err => {
      console.log(err)
    })
}

export { loginUser, registerUser, getUser }
