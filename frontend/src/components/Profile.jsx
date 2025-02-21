import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03e9f4]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#006992]">
              My Health Profile
            </h2>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {userData && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><span className="font-medium">Name:</span> {userData.name}</p>
                    <p><span className="font-medium">Email:</span> {userData.email}</p>
                    <p><span className="font-medium">Age:</span> {userData.age}</p>
                    <p><span className="font-medium">Gender:</span> {userData.gender}</p>
                    <p><span className="font-medium">Phone:</span> {userData.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Medical History</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>{userData.medicalHistory}</p>
                  </div>
                </div>
              </div>

              {userData.reports && userData.reports.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Reports</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {userData.reports.map((report, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <p className="font-medium">{report.date}</p>
                        <p className="text-sm text-gray-600">{report.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 