import React, { useEffect, useState } from 'react'
import RegisterForm from '../components/Auth/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { registerUser } from '../features/user/userApiCalls'

const Register = () => {
  // States for login form
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
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
      errors.forEach(error => {
        toast.error(error)
      })
    }
  }, [errors])

  // Call toast for success
  useEffect(() => {
    if (success) {
      toast.success(success)
    }
  }, [success])

  // Handle register function
  const handleAuth = async e => {
    e.preventDefault()

    // Call register function
    await registerUser(dispatch, {
      firstName,
      lastName,
      username,
      email,
      password,
    })
  }

  if (!localStorage.getItem('token')) {
    return (
      <main>
        <Toaster position='top-left' />
        <RegisterForm
          handleAuth={handleAuth}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </main>
    )
  } else {
    window.location.href = '/conversations'
  }
}

export default Register
