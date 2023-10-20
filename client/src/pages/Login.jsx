import React, { useEffect, useState } from 'react'
import LoginForm from '../components/Auth/LoginForm'
import { loginUser } from '../features/user/userApiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'

const Login = () => {
  // States for login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Dispatch for redux
  const dispatch = useDispatch()

  // Get errors from redux
  const errors = useSelector(state => state.toast.errors)

  // Get success from redux
  const success = useSelector(state => state.toast.success)

  // Call toast for error
  useEffect(() => {
    if (errors) {
      toast.error(errors)
    }
  }, [errors])

  // Call toast for success
  useEffect(() => {
    if (success) {
      toast.success(success)
    }
  }, [success])

  // Handle login function
  const handleAuth = async e => {
    e.preventDefault()

    // Call login function
    await loginUser(dispatch, { username, password })
  }

  if (!localStorage.getItem('token')) {
    return (
      <main>
        <Toaster position='top-left' />
        <LoginForm
          handleAuth={handleAuth}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </main>
    )
  } else {
    window.location.href = '/conversations'
  }
}

export default Login
