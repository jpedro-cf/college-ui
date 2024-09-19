import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/global/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Layout } from './components/global/Layout'
import { QuestionsPage } from './pages/QuestionsPage'
import { AdminPage } from './pages/AdminPage'

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
    },
    {
        path: '/admin',
        element: <ProtectedRoute roles={['admin']} children={<Layout children={<AdminPage />} />} />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
