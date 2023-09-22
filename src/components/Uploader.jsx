import React, { useState } from 'react'

const Uploader = () => {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(null);
    const [error, setError] = useState(false);

    const test = () => {
        setUploading(true);
        setTimeout(() => {
            setUploaded(true);
            setUploading(false);
        }, 2000);
    }
    return (
        <main>
            {
                uploading ? (
                    <div className="uploader-box uploading">
                        <h2 className='uploader-title'>Uploading...</h2>
                        <div className="progress" role="progressbar" aria-label="Uploading" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar"></div>
                        </div>
                    </div>
                ) : (
                    uploaded ? (
                        <div className="uploader-box uploader uploaded">
                            {error ? (
                                <>
                                    <div className="text-center">
                                        <span class="material-symbols-rounded cancel">cancel</span>
                                        <h2 className="uploader-title">Oops! Something went wrong...</h2>
                                        <p className="uploader-text">An error occurred while uploading the image</p>
                                    </div>
                                    <div className='text-center'>
                                        <button className="uploader-button">Try Again</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span class="material-symbols-rounded check-circle">check_circle</span>
                                    <h2 className="uploader-title">Uploaded Successfully!</h2>
                                    <img className='img-uploaded' src="https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png" alt="bliss" />
                                    <div className="uploaded-link">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio consequatur delectus in culpa doloribus magni provident est quo quae. Repudiandae?</p>
                                        <button className="uploader-button">Copy Link</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="uploader-box uploader">
                            <h1 className='uploader-title'>Upload your image</h1>
                            <p className="uploader-subtitle">File should be Jpeg, Png...</p>
                            <div className="uploader__drag-drop">
                                <img src='/image.svg' alt="drag and drop" />
                                <p className='uploader-text'>Drag & Drop your image here</p>
                            </div>
                            <span className='uploader-text'>Or</span>
                            <button className="uploader-button" onClick={test}>Choose your file</button>
                        </div>

                    )

                )
            }
            <address>created by <a href="https://github.com/Gonzalomorales1001" target="_blank" rel="noopener noreferrer">Gonzalomorales1001</a> - devChallenges.io</address>
        </main>
    )
}

export default Uploader