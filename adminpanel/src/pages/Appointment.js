import React, { useEffect, useState } from 'react';
import config from '../config';
import { Oval } from 'react-loader-spinner'; // Import the spinner component

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${config.apiUrl}api/customer/getinquiry`); // Adjust URL as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval height={50} width={50} color="#4A90E2" visible={true} />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments booked.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b py-2 px-4 text-left">Name</th>
                <th className="border-b py-2 px-4 text-left">Address</th>
                <th className="border-b py-2 px-4 text-left">Contact</th>
                <th className="border-b py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="border-b py-2 px-4">{appointment.name}</td>
                  <td className="border-b py-2 px-4">{appointment.address}</td>
                  <td className="border-b py-2 px-4">{appointment.contact}</td>
                  <td className="border-b py-2 px-4">{new Date(appointment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
