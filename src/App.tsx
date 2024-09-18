import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/global/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Layout } from './components/global/Layout'
import { QuestionsPage } from './pages/QuestionsPage'

const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <Layout children={<DashboardPage />} />
    },
    {
        path: '/',
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
