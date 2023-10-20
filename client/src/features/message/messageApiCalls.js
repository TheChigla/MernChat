import axios from 'axios'
import { setMessages, updateMessages } from './messageSlice'

// @POST | Send message //
const sendMessage = async body => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .post(`${import.meta.env.VITE_API_URI}/message`, body, config)
    .then(res => {})
    .catch(err => {
      console.log(err)
    })
}

// @GET | Set messages //
const getMessages = async (dispatch, chatId) => {
  // Token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  await axios
    .get(`${import.meta.env.VITE_API_URI}/message/${chatId}`, config)
    .then(res => {
      dispatch(setMessages({ messages: res.data }))
    })
    .catch(err => {
      console.log(err)
    })
}

// Add message //
const addMessage = (dispatch, body) => {
  dispatch(updateMessages({ message: body }))
}

export { sendMessage, getMessages, addMessage }
