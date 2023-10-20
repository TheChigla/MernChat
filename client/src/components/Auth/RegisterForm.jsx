import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = ({
  handleAuth,
  setFirstName,
  setLastName,
  setUsername,
  setEmail,
  setPassword,
}) => {
  return (
    <form action='' className='auth-form' onSubmit={e => handleAuth(e)}>
      <div className='auth-form__wrapper max-w-xs lg:max-w-md w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='auth-form__flex flex gap-3'>
          <div className='auth-form__input w-full'>
            <input
              type='text'
              name=''
              id='firstName'
              placeholder='First name'
              className='w-full h-12 border pl-3 pr-3 outline-none mb-3'
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='auth-form__input w-full'>
            <input
              type='text'
              name=''
              id='lastName'
              placeholder='Last name'
              className='w-full h-12 border pl-3 pr-3 outline-none mb-3'
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='auth-form__input'>
          <input
            type='text'
            name=''
            id='username'
            placeholder='username'
            className='w-full h-12 border pl-3 pr-3 outline-none mb-3'
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='auth-form__input'>
          <input
            type='email'
            name=''
            id='email'
            placeholder='email'
            className='w-full h-12 border pl-3 pr-3 outline-none mb-3'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='auth-form__input'>
          <input
            type='password'
            name=''
            id='password'
            placeholder='password'
            className='w-full h-12 border pl-3 pr-3 outline-none mb-3'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='auth-form__submit'>
          <input
            type='submit'
            value='Register'
            className='h-12 border pl-3 pr-3 outline-none mb-3 rounded w-full bg-blue-500 text-white font-semibold text-base cursor-pointer'
          />
        </div>

        <div className='auth-form__reminder text-center'>
          Already have an account?{' '}
          <a href='/' className='hover:text-blue-500'>
            Login
          </a>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
