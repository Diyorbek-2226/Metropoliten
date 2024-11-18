import  { useState } from 'react';
import useFetchData from '../../../hook/useFetch/UseFetch';
import axiosInstance from '../../../config/DataService';

const Schedule = () => {
  const { data, error, loading, mutate } = useFetchData('main/schedule/');
  const { data: groupData, error: groupError, loading: groupLoading } = useFetchData('main/group/');
  const { data: teacherData, error: teacherError, loading: teacherLoading } = useFetchData('main/teacher-list/');
  const { data: courseData, error: courseError, loading: courseLoading } = useFetchData('main/course/');

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (schedule) => {
    setEditingSchedule({
      ...schedule,
      day: new Date(schedule.day).toISOString().split('T')[0],
    });
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
  
    const { id, title, day, start_time, end_time, group, teacher, course} = editingSchedule;
    const scheduleData = {
      title:title,
      day:day,
      start_time:start_time,
      end_time:end_time,
      group:group,
      teacher:teacher,
      course:course.id,
    };

  console.log(scheduleData);
  
  
    try {
      await axiosInstance.put(`main/schedule/${id}/`, scheduleData);
      alert('Schedule updated successfully!');
      mutate();
      setEditingSchedule(null);
    } catch (error) {
      console.error('Failed to update schedule:', error);
      alert('Failed to update schedule');
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setIsDeleting(true);
      try {
        await axiosInstance.delete(`main/schedule/${id}/`);
        alert('Schedule deleted successfully!');
        mutate();
      } catch (error) {
        console.error('Failed to delete schedule:', error);
        alert('Failed to delete schedule');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading || groupLoading || teacherLoading || courseLoading) {
    return <div className="text-center text-lg mt-6">Loading...</div>;
  }

  if (error || groupError || teacherError || courseError) {
    return <div className="text-center text-lg text-red-600 mt-6">Error loading data</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Schedules</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>
              <th className="border px-4 py-2">Group</th>
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((schedule) => (
              <tr key={schedule.id} className="border-t">
                <td className="border px-4 py-2">{schedule.title}</td>
                <td className="border px-4 py-2">{new Date(schedule.day).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{schedule.start_time}</td>
                <td className="border px-4 py-2">{schedule.end_time}</td>
                <td className="border px-4 py-2">
                  {groupData?.results?.find((g) => g.id === schedule.group)?.name || 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {teacherData?.results?.find((t) => t.id === schedule.teacher)?.fullname || 'N/A'}
                </td>
                <td className="border px-4 py-2">
                <td className="border border-gray-300 px-4 py-2">
          <select
>
            {groupData?.results?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </td>
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Schedule</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingSchedule.title}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, title: e.target.value })}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={editingSchedule.day}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, day: e.target.value })}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={editingSchedule.start_time}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, start_time: e.target.value })}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">End Time</label>
                <input
                  type="time"
                  value={editingSchedule.end_time}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, end_time: e.target.value })}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Group</label>
                <select
                  value={editingSchedule.group}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, group: Number(e.target.value) })}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  {groupData?.results?.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Teacher</label>
                <select
                  value={editingSchedule.teacher}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, teacher: Number(e.target.value) })}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  {teacherData?.results?.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.fullname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Course</label>
                <select
                  value={editingSchedule.course}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, course: Number(e.target.value) })}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  {courseData?.results?.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={isUpdating}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSchedule(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
          
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
