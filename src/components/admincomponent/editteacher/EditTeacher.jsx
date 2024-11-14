import React, { useState } from 'react';
import axios from 'axios';
import useFetchData from '../../../hook/useFetch/UseFetch';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa'; 

export default function EditTeacher() {
  const { data, error, loading, refetch } = useFetchData('main/teacher-list/');
  const [editData, setEditData] = useState(null);
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://67.205.170.103:8001/api/v1/main/teacher/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        refetch(); // Refresh the list after deletion
      } else {
        console.error('Failed to delete teacher:', response.data);
        alert('Failed to delete teacher. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting teacher:', error.response || error);
      alert('Error deleting teacher. Please try again later.');
    }
  };

  const handleUpdate = async (id) => {
    if (!editData || editData.id !== id) {
      console.error('Edit data is missing or does not match the selected ID.');
      return;
    }

    try {
      const payload = {
        fullname: editData.fullname,
        birthday: editData.birthday,
        gender: editData.gender === 'male' ? 'male' : 'female',
        adress: editData.adress,
        expertise: editData.expertise,
        place_of_birth: editData.place_of_birth,
        work_place: editData.work_place,
        avatar: editData.avatar,
        user: editData.user?.id,
      };

      const response = await axios.put(
        `http://67.205.170.103:8001/api/v1/main/teacher/${id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        refetch(); // Refresh the list after update
        setEditData(null); // Reset editData
      } else {
        console.error('Failed to update teacher:', response.data);
        alert('Failed to update teacher. Try again later.');
      }
    } catch (error) {
      console.error('Error updating teacher:', error.response?.data || error);
      alert(
        `Failed to update teacher: ${
          error.response?.data?.gender?.[0] ||
          error.response?.data?.user?.[0] ||
          'Try again later.'
        }`
      );
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4 w-full overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Avatar</th>
            <th className="py-2 px-4 text-left">Birthday</th>
            <th className="py-2 px-4 text-left">Gender</th>
            <th className="py-2 px-4 text-left">Address</th>
            <th className="py-2 px-4 text-left">Expertise</th>
            <th className="py-2 px-4 text-left">Place of Birth</th>
            <th className="py-2 px-4 text-left">Work Place</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((teacher) => (
            <tr key={teacher.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <input
                    type="url"
                    value={editData.avatar || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, avatar: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                    placeholder="Enter Avatar URL"
                  />
                ) : (
                  teacher.avatar && (
                    <img
                      src={teacher.avatar}
                      alt="Avatar"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  )
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <input
                    type="date"
                    value={editData.birthday}
                    onChange={(e) =>
                      setEditData({ ...editData, birthday: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  teacher.birthday
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <select
                    value={editData.gender}
                    onChange={(e) =>
                      setEditData({ ...editData, gender: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  teacher.gender
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <input
                    type="text"
                    value={editData.adress}
                    onChange={(e) =>
                      setEditData({ ...editData, adress: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  teacher.adress
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <input
                    type="text"
                    value={editData.expertise}
                    onChange={(e) =>
                      setEditData({ ...editData, expertise: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  teacher.expertise
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <input
                    type="text"
                    value={editData.place_of_birth}
                    onChange={(e) =>
                      setEditData({ ...editData, place_of_birth: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  teacher.place_of_birth
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <input
                    type="text"
                    value={editData.work_place}
                    onChange={(e) =>
                      setEditData({ ...editData, work_place: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  teacher.work_place
                )}
              </td>
              <td className="py-3 px-4">
                {editData?.id === teacher.id ? (
                  <button
                    onClick={() => handleUpdate(teacher.id)}
                    className="text-green-600 hover:text-green-800 mr-2"
                    title="Save"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditData(teacher)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
