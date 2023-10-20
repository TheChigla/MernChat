import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import store from './app/store'
import Conversations from './pages/Conversations'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/conversations'
            element={<Conversations disabled={true} />}
          />
          <Route
            path='/conversations/:id'
            element={<Conversations disabled={false} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
