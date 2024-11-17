import React, { useState } from 'react';
import useFetchData from '../../../hook/useFetch/UseFetch';
import axiosInstance from '../../../config/DataService';

const Schedule = () => {
  const { data, error, loading, mutate } = useFetchData('main/schedule/');
  const { data: groupData, error: groupError, loading: groupLoading } = useFetchData('main/group/');
  const { data: teacherData, error: teacherError, loading: teacherLoading } = useFetchData('main/teacher-list/');
  const { data: courseData, error: courseError, loading: courseLoading } = useFetchData('main/course/');

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // Track if updating
  const [isDeleting, setIsDeleting] = useState(false); // Track if deleting

  const handleEdit = (schedule) => {
    setEditingSchedule({
      ...schedule,
      day: schedule.day.split('T')[0], // Format the date as needed
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // Disable update button while processing
    try {
      await axiosInstance.put(`main/schedule/${editingSchedule.id}/`, editingSchedule);
      alert('Schedule updated successfully!');
      mutate();
      setEditingSchedule(null);
    } catch (error) {
      console.error('Failed to update schedule:', error);
      alert('Failed to update schedule');
    } finally {
      setIsUpdating(false); // Re-enable the button after update
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setIsDeleting(true); // Disable delete button while processing
      try {
        await axiosInstance.delete(`main/schedule/${id}/`);
        alert('Schedule deleted successfully!');
        mutate();
      } catch (error) {
        console.error('Failed to delete schedule:', error);
        alert('Failed to delete schedule');
      } finally {
        setIsDeleting(false); // Re-enable the button after delete
      }
    }
  };

  if (loading || groupLoading || teacherLoading || courseLoading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error || groupError || teacherError || courseError) {
    return <div style={styles.error}>Error loading data</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Schedules</h1>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Start Time</th>
              <th style={styles.th}>End Time</th>
              <th style={styles.th}>Group</th>
              <th style={styles.th}>Teacher</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((schedule) => (
              <tr key={schedule.id} style={styles.tr}>
                <td style={styles.td}>{schedule.title}</td>
                <td style={styles.td}>{new Date(schedule.day).toLocaleDateString()}</td>
                <td style={styles.td}>{schedule.start_time}</td>
                <td style={styles.td}>{schedule.end_time}</td>
                <td style={styles.td}>{groupData?.results?.find(g => g.id === schedule.group)?.name || 'N/A'}</td>
                <td style={styles.td}>{teacherData?.results?.find(t => t.id === schedule.teacher)?.fullname || 'N/A'}</td>
                <td style={styles.td}>{courseData?.results?.find(c => c.id === schedule.course)?.name || 'N/A'}</td>
                <td style={styles.td}>
                  <button onClick={() => handleEdit(schedule)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(schedule.id)} style={styles.deleteButton} disabled={isDeleting}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingSchedule && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>Edit Schedule</h2>
            <form onSubmit={handleUpdate} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Title:
                  <input
                    type="text"
                    value={editingSchedule.title}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, title: e.target.value })}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Date:
                  <input
                    type="date"
                    value={editingSchedule.day}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, day: e.target.value })}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Start Time:
                  <input
                    type="time"
                    value={editingSchedule.start_time}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, start_time: e.target.value })}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  End Time:
                  <input
                    type="time"
                    value={editingSchedule.end_time}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, end_time: e.target.value })}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Group:
                  <select
                    value={editingSchedule.group}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, group: Number(e.target.value) })}
                    required
                    style={styles.input}
                  >
                    {groupData?.results?.map((group) => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Teacher:
                  <select
                    value={editingSchedule.teacher}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, teacher: Number(e.target.value) })}
                    required
                    style={styles.input}
                  >
                    {teacherData?.results?.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>{teacher.fullname}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Course:
                  <select
                    value={editingSchedule.course}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, course: Number(e.target.value) })}
                    required
                    style={styles.input}
                  >
                    {courseData?.results?.map((course) => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.saveButton} disabled={isUpdating}>Save</button>
                <button type="button" onClick={() => setEditingSchedule(null)} style={styles.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};






const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#f8f8f8',
    color: '#333',
    fontWeight: 'bold',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    verticalAlign: 'middle',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '500px',
  },
  modalHeader: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5px',
    color: '#666',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '20px',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
    marginTop: '20px',
  },
};

export default Schedule;