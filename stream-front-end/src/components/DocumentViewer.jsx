import React, { useState } from 'react';
import { Card, Button, Spinner } from 'flowbite-react';

function DocumentViewer({ document }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!document) {
    return null;
  }

  const documentUrl = `http://localhost:8080/api/v1/videos/stream/${document.id}`;
  const fileExtension = document.filename ? document.filename.split('.').pop().toLowerCase() : 'pdf';

  const isPdf = fileExtension === 'pdf';
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension);
  const isText = ['txt', 'md', 'json', 'csv'].includes(fileExtension);

  const handleLoadSuccess = () => {
    setLoading(false);
    setError(null);
  };

  const handleLoadError = () => {
    setLoading(false);
    setError("Failed to load document preview. Try downloading the file to view it.");
  };

  // Determine the viewer type based on file extension
  const renderDocumentPreview = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <Spinner size="xl" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center h-96 bg-gray-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-600 text-center">{error}</p>
        </div>
      );
    }

    if (isPdf) {
      return (
        <iframe
          src={`${documentUrl}#toolbar=0`}
          className="w-full h-96 rounded-lg border border-gray-200"
          title={document.title}
          onLoad={handleLoadSuccess}
          onError={handleLoadError}
        />
      );
    } else if (isImage) {
      return (
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 h-96">
          <img
            src={documentUrl}
            alt={document.title}
            className="max-h-full max-w-full object-contain"
            onLoad={handleLoadSuccess}
            onError={handleLoadError}
          />
        </div>
      );
    } else if (isText) {
      // For text files, we would ideally fetch the content and display it
      // This is a simplified version
      return (
        <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-auto">
          <p className="text-center text-gray-500">
            Text preview not available. Please download the file to view it.
          </p>
        </div>
      );
    } else {
      // For other file types, show a generic message
      return (
        <div className="flex flex-col justify-center items-center h-96 bg-gray-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600 text-center">Preview not available for this file type.</p>
          <p className="text-gray-600 text-center">Please download the file to view it.</p>
        </div>
      );
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{document.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span>Uploaded on {new Date(document.uploadDate).toLocaleDateString()}</span>
          {document.filename && (
            <span className="ml-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{fileExtension.toUpperCase()}</span>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        {renderDocumentPreview()}
      </div>
      
      {document.description && (
        <div className="px-4 pb-4">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{document.description}</p>
        </div>
      )}
      
      <div className="px-4 pb-4 flex space-x-2">
        <Button color="light" href={documentUrl} download={document.title}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download
        </Button>
        
        <Button color="light" onClick={() => navigator.clipboard.writeText(documentUrl)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          Copy Link
        </Button>
        
        <Button color="light" onClick={() => window.open(documentUrl, '_blank')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          Open in New Tab
        </Button>
      </div>
    </Card>
  );
}

export default DocumentViewer;