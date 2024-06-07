import { createBrowserRouter } from 'react-router-dom'
import ReservationForm from '../Components/ReservationForm'
import Invoice from '../Components/Invoice'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ReservationForm />,
  },
  {
    path: '/invoice',
    element: <Invoice />,
  },
])
