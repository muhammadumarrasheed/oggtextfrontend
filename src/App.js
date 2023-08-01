import React, { useState } from 'react';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileUploaded(true);
    };

    const handleFileUpload = async() => {
        if (!file) {
            alert('Please upload a file first!');
            return;
        }

        setLoading(true);
        setTranscript('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/convertToText', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                console.error('Error:', data.error);
                alert('An error occurred during transcription.');
            } else {
                setTranscript(data.transcript);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during transcription.');
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = "App" >
        <
        h1 > OGG to Text Conversion < /h1> <
        h2 > Upload your OGG audio file and convert it to text < /h2> <
        div id = "dropArea"
        className = { fileUploaded ? 'active' : '' } >
        <
        label htmlFor = "oggFile" >
        <
        input type = "file"
        id = "oggFile"
        accept = ".ogg"
        onChange = { handleFileSelect }
        /> <
        p > {
            fileUploaded ?
            'File uploaded. Click "Convert to Text" to transcribe.' : 'Drag and drop your .ogg file here or click to choose a file'
        } <
        /p> < /
        label > <
        /div> <
        div id = "fileUploadedMessage"
        style = {
            { display: fileUploaded ? 'block' : 'none' }
        } >
        File uploaded successfully!
        <
        /div> <
        div id = "uploadButtonContainer" >
        <
        button onClick = { handleFileUpload }
        disabled = { loading || !fileUploaded } >
        Convert to Text <
        /button> < /
        div > {
            loading && < div id = "loadingMessage" > Processing... < /div>} <
            div id = "transcriptContainer" > { transcript } < /div> < /
            div >
        );
    }

    export default App;