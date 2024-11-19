import React, { useState, useEffect } from 'react';

import { Pencil, Trash2, X } from 'lucide-react';
import useFetchData from '../../../hook/useFetch/UseFetch';
import PutRequest from '../../../hook/putRequest/PutRequest';
import DeleteRequest from '../../../hook/deleteRequest/DeleteRequest';

export default function Document() {
  const { data: documentData, loading, error, refetch } = useFetchData('main/documents/');
  const { putRequest, loading: putLoading, error: putError } = PutRequest('main/documents/');
  const { deleteRequest, loading: deleteLoading, error: deleteError } = DeleteRequest('main/documents/');
  const [documents, setDocuments] = useState([]);

  const [editingDoc, setEditingDoc] = useState(null);
  const [editForm, setEditForm] = useState({
    command_number: '',
    order_date: '',
    description: ''
  });

  useEffect(() => {
    if (documentData?.results) {
      setDocuments(documentData.results);
    }
  }, [documentData]);

  useEffect(() => {
    if (editingDoc) {
      setEditForm({
        command_number: editingDoc.command_number || '',
        order_date: editingDoc.order_date || '',
        description: editingDoc.description || ''
      });
    }
  }, [editingDoc]);

  const handleEdit = (doc) => {
    setEditingDoc(doc);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await putRequest(`${editingDoc.id}/`, editForm);
      setEditingDoc(null);
      refetch(); // Refetch the data after update
    } catch (err) {
      console.error('Failed to update document:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteRequest(`${id}/`);
        refetch(); // Refetch the data after deletion
      } catch (err) {
        console.error('Failed to delete document:', err);
      }
    }
  };

  if (loading || putLoading || deleteLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Document Manager</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Command Number</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-b">
                <td className="py-2 px-4">{doc.command_number}</td>
                <td className="py-2 px-4">{doc.order_date}</td>
                <td className="py-2 px-4">{doc.description}</td>
                <td className="py-2 px-4 flex justify-end space-x-2">
                  <button 
                    onClick={() => handleEdit(doc)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                  >
                    <Pencil size={16} className="mr-1" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleUpdate} className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Edit Document</h2>
              <button type="button" onClick={() => setEditingDoc(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="command_number">
                Command Number:
              </label>
              <input
                id="command_number"
                type="text"
                name="command_number"
                value={editForm.command_number}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order_date">
                Order Date:
              </label>
              <input
                id="order_date"
                type="date"
                name="order_date"
                value={editForm.order_date}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
            </div>
            <div className="flex items-center justify-end">
              <button 
                type="submit"
                disabled={putLoading}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {putLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      )}

      {(putError || deleteError) && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {putError?.message || deleteError?.message}
        </div>
      )}
    </div>
  );
}