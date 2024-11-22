"use client";

import React, { useState } from "react";

export default function AddDocument() {
  const [formData, setFormData] = useState({
    command_number: "",
    order_date: new Date().toISOString().split("T")[0], // Default to current date
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitFormData.append(key, formData[key]);
    });
    if (selectedFile) {
      submitFormData.append("file", selectedFile, selectedFile.name);
    }

    try {
      const response = await fetch(
        "http://67.205.170.103:8001/api/v1/main/documents/",
        {
          method: "POST",
          body: submitFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response:", result);

      // Reset form after successful submission
      setFormData({
        command_number: "",
        order_date: new Date().toISOString().split("T")[0],
        description: "",
      });
      setSelectedFile(null);
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="command_number" className="block text-sm font-medium text-gray-700 mb-1">
            Command Number
          </label>
          <input
            id="command_number"
            type="text"
            name="command_number"
            value={formData.command_number}
            onChange={handleInputChange}
            required
            aria-label="Command Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="order_date" className="block text-sm font-medium text-gray-700 mb-1">
            Order Date
          </label>
          <input
            id="order_date"
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={handleInputChange}
            required
            aria-label="Order Date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            aria-label="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="file_upload" className="block text-sm font-medium text-gray-700 mb-1">
            File Upload
          </label>
          <input
            id="file_upload"
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            Error: {error}
          </p>
        )}
      </form>
    </div>
  );
}
