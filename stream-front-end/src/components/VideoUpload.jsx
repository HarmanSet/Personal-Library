// import React, { useState } from 'react'
// import videoLogo from '../assets/record-icon.png';
// import { Alert, Button, Card, FileInput, Label, Progress, Textarea, TextInput } from 'flowbite-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function VideoUpload() {

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [meta, setMeta] = useState({
//     title: '',
//     description: '',
//   })
//   const [progress, setProgress] = useState(0)
//   const [uploading, setUploading] = useState(false)
//   const [message, setMessage] = useState("")

//   function handleFileChange(event) {
//     console.log(event.target.files[0])
//     setSelectedFile(event.target.files[0])
//   }

//   function formFieldChange(event) {
//     // console.log(event.target.name)
//     // console.log(event.target.value)
//     setMeta({
//       ...meta,
//       [event.target.name]: event.target.value,
//     })

//   }

//   function handleForm(formEvent) {
//     formEvent.preventDefault()
//     if (!selectedFile) {
//       alert("Select File!")
//       return
//     }

//     saveVideoToServer(selectedFile, meta)
//   }

//   function resetForm() {
//     setMeta({
//       title: '',
//       description: ''
//     })
//     setSelectedFile(null)
//     setUploading(false)
//     // setMessage('')
//   }

//   //Submit the file to the server
//   async function saveVideoToServer(video, videoMetaData) {
//     setUploading(true);

//     //api call

//     try {

//       let formData = new FormData()
//       formData.append("title", videoMetaData.title)
//       formData.append("description", videoMetaData.description)
//       formData.append("file", selectedFile)

//       let response = await axios.post('http://localhost:8080/api/v1/videos', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         onUploadProgress: (ProgressEvent) => {
//           const progress = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)

//           console.log(progress)
//           setProgress((progress))
//         }
//       })

//       console.log(response)
//       setProgress(0)

//       setMessage("File Uploaded " + response.data.videoId)
//       setUploading(false)
//       toast.success("File uploaded successfully!")

//       resetForm()
//     } catch (error) {
//       console.log(error)
//       setMessage("Error in uploading File")
//       setUploading(false)
//       toast.error("File not uploaded!")
//     }

//   }


//   return (
//     <div className='text-white'>

//       <Card className='flex flex-col items-center'>
//         <h1>
//           Upload Videos
//         </h1>
//         <div>
//           <form noValidate className="flex flex-col space-y-6" onSubmit={handleForm}>

//             <div>
//               <Label className="mb-2 block" htmlFor="file-upload">
//                 Video Title
//               </Label>
//               <TextInput value={meta.title} onChange={formFieldChange} name="title" placeholder='Enter Title' />
//             </div>

//             <div className="max-w-md">
//               <div className="mb-2 block">
//                 <Label htmlFor="comment">Video Description</Label>
//               </div>
//               <Textarea value={meta.description} onChange={formFieldChange} name="description" id="comment" placeholder="Enter Video Description" required rows={4} />
//             </div>

//             <div className='flex items-center space-x-5 justify-center'>
//               <div className="shrink-0">
//                 <img className="h-14 w-14 object-cover" src={videoLogo} alt="File" />
//               </div>
//               <label className="block">
//                 <span className="sr-only">Choose video file</span>
//                 <input
//                   name="file"
//                   onChange={handleFileChange}
//                   type="file"
//                   className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
//                 />
//               </label>
//             </div>

//             <div>
//               {uploading &&
//                 <Progress
//                   color='green'
//                   progress={progress}
//                   progressLabelPosition="inside"
//                   textLabel="Uploading . . ."
//                   textLabelPosition="outside"
//                   size="lg"
//                   labelProgress
//                   labelText
//                 />}

//             </div>

//             <div>
//               {message && (
//                 <Alert color='success' rounded withBorderAccent onDismiss={() => setMessage('')}>
//                   <span className="font-medium">Success alert! </span>
//                   {message}
//                 </Alert>
//               )}
//             </div>

//             <div className='flex justify-center'>
//               <Button disabled={uploading} type='submit'>Submit</Button>
//             </div>

//           </form>
//         </div>

//       </Card>

//     </div>
//   )
// }

// export default VideoUpload

import React, { useState } from 'react';
import { Card, TextInput, Textarea, Button, Select, FileInput, Alert } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VideoUpload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileType: 'video',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.file) {
      setError('Please provide a title and select a file to upload');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('fileType', formData.fileType);
    data.append('file', formData.file);

    try {
      await axios.post('http://localhost:8080/api/v1/videos/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        fileType: 'video',
        file: null
      });
      
      // Redirect to appropriate library based on file type after 2 seconds
      setTimeout(() => {
        navigate(formData.fileType === 'video' ? '/' : formData.fileType === 'audio' ? '/audio' : '/documents');
      }, 2000);
      
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err.response?.data?.message || 'An error occurred during upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Media</h1>
      
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert color="failure" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert color="success" className="mb-4">
              File uploaded successfully! Redirecting...
            </Alert>
          )}
          
          <div className="mb-4">
            <div className="mb-2 block">
              <label htmlFor="title" className="font-medium">Title</label>
            </div>
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter media title"
              required
            />
          </div>
          
          <div className="mb-4">
            <div className="mb-2 block">
              <label htmlFor="description" className="font-medium">Description</label>
            </div>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter media description (optional)"
              rows={4}
            />
          </div>
          
          <div className="mb-4">
            <div className="mb-2 block">
              <label htmlFor="fileType" className="font-medium">Media Type</label>
            </div>
            <Select
              id="fileType"
              name="fileType"
              value={formData.fileType}
              onChange={handleInputChange}
              required
            >
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="document">Document</option>
            </Select>
          </div>
          
          <div className="mb-6">
            <div className="mb-2 block">
              <label htmlFor="file" className="font-medium">File</label>
            </div>
            <FileInput
              id="file"
              onChange={handleFileChange}
              helperText={
                formData.fileType === 'video' ? 'MP4, WebM, and MOV files are supported' :
                formData.fileType === 'audio' ? 'MP3, WAV, and OGG files are supported' :
                'PDF, DOCX, and TXT files are supported'
              }
              required
            />
          </div>
          
          {loading && uploadProgress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mt-2">{uploadProgress}% Uploaded</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Media'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default VideoUpload;