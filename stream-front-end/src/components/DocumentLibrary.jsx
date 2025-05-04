// import React, { useEffect, useState } from 'react';
// import { Card, TextInput, Button, Spinner, Table } from 'flowbite-react';
// import axios from 'axios';
// import DocumentViewer from './DocumentViewer';

// function DocumentLibrary() {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/videos/type/document');
//       setDocuments(response.data);
      
//       // Set the first document as selected if available and no document is currently selected
//       if (response.data.length > 0 && !selectedDocument) {
//         setSelectedDocument(response.data[0]);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       fetchDocuments();
//       return;
//     }
    
//     setIsSearching(true);
//     try {
//       const response = await axios.get(`http://localhost:8080/api/v1/videos/search?title=${searchQuery}&fileType=document`);
//       setDocuments(response.data);
      
//       // Set the first document as selected if available
//       if (response.data.length > 0) {
//         setSelectedDocument(response.data[0]);
//       } else {
//         setSelectedDocument(null);
//       }
      
//       setIsSearching(false);
//     } catch (error) {
//       console.error('Error searching documents:', error);
//       setIsSearching(false);
//     }
//   };

//   const selectDocument = (document) => {
//     setSelectedDocument(document);
//   };

//   // Function to get document type icon
//   const getDocumentIcon = (fileName) => {
//     if (!fileName) return null;
    
//     const extension = fileName.split('.').pop().toLowerCase();
    
//     switch (extension) {
//       case 'pdf':
//         return (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//         );
//       case 'doc':
//       case 'docx':
//         return (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//         );
//       case 'xls':
//       case 'xlsx':
//         return (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//         );
//       case 'txt':
//         return (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//         );
//       default:
//         return (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//         );
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Document Library</h1>
      
//       <div className="mb-6 flex">
//         <div className="search-container flex-grow">
//           <TextInput
//             id="search"
//             type="text"
//             placeholder="Search documents..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           />
//         </div>
//         <div className="ml-2">
//           <Button onClick={handleSearch} disabled={isSearching}>
//             {isSearching ? (
//               <>
//                 <Spinner size="sm" />
//                 <span className="ml-2">Searching...</span>
//               </>
//             ) : (
//               'Search'
//             )}
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <div className="col-span-1 lg:col-span-2">
//           {selectedDocument ? (
//             <DocumentViewer document={selectedDocument} />
//           ) : (
//             <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
//               <p className="text-gray-500">No document selected</p>
//             </div>
//           )}
//         </div>

//         <div className="col-span-1">
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="p-4 bg-gray-50 border-b">
//               <h2 className="text-xl font-semibold">Document List</h2>
//             </div>
            
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <Spinner size="xl" />
//               </div>
//             ) : documents.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 No documents found
//               </div>
//             ) : (
//               <div className="overflow-y-auto h-96">
//                 <Table hoverable>
//                   <Table.Head>
//                     <Table.HeadCell className="w-12"></Table.HeadCell>
//                     <Table.HeadCell>Name</Table.HeadCell>
//                     <Table.HeadCell>Date</Table.HeadCell>
//                   </Table.Head>
//                   <Table.Body className="divide-y">
//                     {documents.map((doc) => (
//                       <Table.Row 
//                         key={doc.id} 
//                         className={`cursor-pointer ${selectedDocument && selectedDocument.id === doc.id ? 'bg-blue-50' : ''}`}
//                         onClick={() => selectDocument(doc)}
//                       >
//                         <Table.Cell>
//                           <div className="flex justify-center">
//                             {getDocumentIcon(doc.filename || doc.title)}
//                           </div>
//                         </Table.Cell>
//                         <Table.Cell className="font-medium truncate max-w-xs">
//                           {doc.title}
//                         </Table.Cell>
//                         <Table.Cell>
//                           {new Date(doc.uploadDate).toLocaleDateString()}
//                         </Table.Cell>
//                       </Table.Row>
//                     ))}
//                   </Table.Body>
//                 </Table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DocumentLibrary;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spinner, Button } from 'flowbite-react';
import DocumentViewer from './DocumentViewer';

const DocumentLibrary = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/videos/type/other'); // Adjust API endpoint accordingly
      setDocuments(response.data);

      if (response.data.length > 0 && !selectedAudio) {
        setSelectedAudio(response.data[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents", error);
      setLoading(false);
    }
  };

  const handleSelectDocument = (doc) => setSelectedDocument(doc);

  return (
    <div className="p-4">
      <h1 className="text-3xl text-gray-700 font-bold mb-6">📄 Document Library</h1>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {documents.map((doc) => (
              <Card
                key={doc.videoId}
                onClick={() => handleSelectDocument(doc)}
                className={`cursor-pointer hover:shadow-lg transition border ${
                  selectedDocument?.videoId === doc.videoId ? 'border-blue-500' : ''
                }`}
              >
                <h5 className="text-md font-semibold truncate">{doc.title}</h5>
                <p className="text-sm text-gray-400 truncate">{doc.description}</p>
              </Card>
            ))}
          </div>

          {selectedDocument ? (
            <div className="mt-6">
              <DocumentViewer document={selectedDocument} />
            </div>
          ) : (
            <p className="text-center text-gray-600">Select a document to preview it.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentLibrary;

