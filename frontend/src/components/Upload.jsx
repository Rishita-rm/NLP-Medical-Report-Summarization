import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineCloudUpload, AiOutlineFile, AiOutlineDelete } from 'react-icons/ai';
import Feedback from './Feedback';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [reportType, setReportType] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [showFeedback, setShowFeedback] = useState(false);
  const [processedReportId, setProcessedReportId] = useState(null);

  React.useEffect(() => {
    if (!user) {
      navigate('/contact');
    }
  }, [user, navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (!user) {
      navigate('/contact');
      return;
    }
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!user) {
      navigate('/contact');
      return;
    }
    fileInputRef.current.click();
  };

  const reportTypes = [
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'Ultrasound',
    'Pathology',
    'Other'
  ];

  const handleProcessReport = async () => {
    try {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      console.log('Processing file:', file);

      // After successful processing
      clearInterval(interval);
      setUploadProgress(100);
      setProcessedReportId('some-report-id'); // Set this to your actual report ID
      setShowFeedback(true);
    } catch (error) {
      console.error('Error processing report:', error);
      setUploadProgress(0);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#006992]">Upload Progress</h2>
                <span className="text-sm text-gray-500">Step 1 of 2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#03e9f4] h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-[#006992] mb-8">
              Upload Your Medical Report
            </h1>

            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Report Type Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4]"
                  required
                >
                  <option value="">Select Report Type</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Upload Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                  <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#03e9f4] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Upload Box */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${dragActive ? 'border-[#03e9f4] bg-[#03e9f4]/5' : 'border-gray-300 hover:border-[#03e9f4]'}`}
                onClick={handleClick}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.txt"
                />

                {!file ? (
                  <>
                    <AiOutlineCloudUpload className="mx-auto h-16 w-16 text-[#03e9f4]" />
                    <p className="mt-4 text-gray-600">
                      Click to upload or drag and drop your medical report
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, TXT
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AiOutlineFile className="h-8 w-8 text-[#03e9f4]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-6">
                  <button
                    onClick={handleProcessReport}
                    className="w-full bg-[#03e9f4] text-white px-6 py-3 rounded-lg hover:bg-[#02c4d3] transition-all"
                    disabled={!reportType}
                  >
                    Upload and Process Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showFeedback && (
        <Feedback
          reportId={processedReportId}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
};

export default Upload;