import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../State/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
const apiurl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState('Account Settings');
  const [error, setError] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${apiurl}/auth/getuser`, {
          withCredentials: true,
        });
        setUser(response?.data?.user);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch user profile');
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add API call logic to save user data
    console.log('Saved data:', formData);
    setIsEditable(false);
  };

  const handleLogout = async () => {
    try {
      let response = await dispatch(logout());
      // if(response)
      console.log(response, 'logout')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }

    // Add logout logic here
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'Account Settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 roboto mb-1">Name:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly={!isEditable}
                  onChange={handleInputChange}
                  className={`w-full border-gray-700 rounded-md p-2 border-pprimary-500 focus:outline-none ${isEditable ? 'bg-gray-200' : 'bg-gray-100'
                    }`}
                />
              </div>
              <div>
                <label className="block text-gray-600 roboto mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly={!isEditable}
                  onChange={handleInputChange}
                  className={`w-full border-gray-700 rounded-md p-2 border-pprimary-500 focus:outline-none ${isEditable ? 'bg-gray-200' : 'bg-gray-100'
                    }`}
                />
              </div>
              <div>
                <label className="block text-gray-600 roboto mb-1">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  readOnly={!isEditable}
                  onChange={handleInputChange}
                  className={`w-full border-gray-700 rounded-md p-2 border-pprimary-500 focus:outline-none ${isEditable ? 'bg-gray-200' : 'bg-gray-100'
                    }`}
                />
              </div>
              <div className="flex gap-2">
                {isEditable ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-pprimary text-white rounded-md hover:bg-opacity-90"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditable(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-pprimary text-white rounded-md hover:bg-opacity-90"
                    >
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLogout()}
                      className="px-4 py-2 bg-pprimary text-white rounded-md hover:bg-opacity-90"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        );
      default:
        return <div className="bg-white p-6 rounded-lg shadow-md">{selectedSection} Section</div>;
    }
  };

  return (
    <div className="flex justify-center px-4 mt-[10rem]  ">
      <div className="flex flex-col lg:flex-row w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-white w-full lg:w-1/4 border-r border-gray-200">
          <ul className="space-y-2 p-4">
            {['Account Settings', 'My Orders', 'My Wishlist', 'My Cart', 'Payments'].map(
              (section) => (
                <li
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`cursor-pointer p-2 rounded-md text-center ${selectedSection === section
                    ? 'bg-pprimary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {section}
                </li>
              )
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 ">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
