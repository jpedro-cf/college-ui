import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/global/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Layout } from './components/global/Layout'
import { QuestionsPage } from './pages/QuestionsPage'
import { AdminPage } from './pages/AdminPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { ProfilePage } from './pages/ProfilePage'

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
        path: '/categorias',
        element: <Layout children={<CategoriesPage />} />
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
        path: '/perfil/:id',
        element: (
            <ProtectedRoute roles={['student', 'admin', 'manager']} children={<Layout children={<ProfilePage />} />} />
        )
    },
    {
        path: '/admin',
        element: <ProtectedRoute roles={['admin', 'manager']} children={<Layout children={<AdminPage />} />} />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
