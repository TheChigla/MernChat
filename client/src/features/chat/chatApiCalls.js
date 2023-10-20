import axios from 'axios'
import { setChat, setChats } from './chatSlice'
import { addErrors, addSuccess } from '../toast/toastSlice'

// @GET | Get user chats //
const getChats = async dispatch => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .get(`${import.meta.env.VITE_API_URI}/chat`, config)
    .then(async res => {
      // Payload for redux
      const payload = {
        chats: res.data,
      }

      await dispatch(setChats(payload))
    })
    .catch(err => {
      console.log(err)
    })
}

// @GET | Get current chat //
const getChat = async (dispatch, chatId) => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .get(`${import.meta.env.VITE_API_URI}/chat/${chatId}`, config)
    .then(async res => {
      await dispatch(setChat({ chat: res.data }))
    })
    .catch(err => {
      if (
        err.response.data ===
        "You don't have permission to view this conversation"
      ) {
        window.location.href = '/conversations'
      }
      console.log(err)
    })
}

// @POST | Create chat //
const createChat = async chatName => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .post(`${import.meta.env.VITE_API_URI}/chat`, { chatName }, config)
    .then(res => {
      window.location.href = `/conversations/${res.data.chatId}`
    })
    .catch(err => {
      console.log(err)
    })
}

// @POST | Join in chat //
const joinChat = async (dispatch, chatId) => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .post(`${import.meta.env.VITE_API_URI}/chat/join`, { chatId }, config)
    .then(res => {})
    .catch(err => {
      if (err.response && err.response.data) {
        let errors = []

        errors.push(err.response.data)

        dispatch(addErrors({ errors }))
        dispatch(addSuccess({ success: null }))
      }
    })
}

export { getChats, getChat, createChat, joinChat }
