// app/BookAppointment/page.js
import BookAppointment from '@/components/BookAppointment';
import ProtectedPage from '../../components/ProtectedPage';

export default function page() {
  return (
    <ProtectedPage>
         <BookAppointment />
    </ProtectedPage>
   
  );
}