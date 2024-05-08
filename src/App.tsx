import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        )
    },
    {
        path: '/registrar',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
