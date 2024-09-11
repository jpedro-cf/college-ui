import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/global/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Layout } from './components/global/Layout'
import { QuestionsPage } from './pages/QuestionsPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout children={<HomePage />} />
    },
    {
        path: '/questoes',
        element: <Layout children={<QuestionsPage />} />
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
