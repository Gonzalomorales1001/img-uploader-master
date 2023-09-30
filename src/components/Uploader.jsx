import React, { useEffect, useState } from 'react';
import { upload as sendImage } from '../helpers/upload';

const Uploader = () => {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (image) {
            upload();
        }
    }, [image]);


    const upload = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.set('image', image);
        const resp = await sendImage(formData);
        setUploaded({ link: resp.link, name: resp.name });
        return setUploading(false);
    }

    const reset = () => {
        setUploaded(null);
        setUploading(false);
    }

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
                            {uploaded.link ? (
                                <>
                                    <span className="material-symbols-rounded check-circle">check_circle</span>
                                    <h2 className="uploader-title">Uploaded Successfully!</h2>
                                    <img className='img-uploaded' src={uploaded.link} alt={uploaded.name} />
                                    <div className="uploaded-link">
                                        <p>{uploaded.link}</p>
                                        <button className="uploader-button" onClick={() => navigator.clipboard.writeText(uploaded.link)}>Copy Link</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-center">
                                        <span className="material-symbols-rounded cancel">cancel</span>
                                        <h2 className="uploader-title">Oops! Something went wrong...</h2>
                                        <p className="uploader-text">An error occurred while uploading the image</p>
                                        <button className="uploader-button" onClick={reset}>Try Again</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <form id='uploader-form' encType='multipart/form-data' className="uploader-box uploader">
                            <h1 className='uploader-title'>Upload your image</h1>
                            <p className="uploader-subtitle">File should be Jpeg, Png...</p>
                            <div className="uploader__drag-drop">
                                <img src='/image.svg' alt="drag and drop" />
                                <p className='uploader-text'>Drag & Drop your image here</p>
                            </div>
                            <span className='uploader-text'>Or</span>
                            <button className="uploader-button" onClick={test} type='button'>
                                Choose your file
                            </button>
                            <label htmlFor="image" className='d-none'>image</label>
                            <input type="file" name="image" id="image" accept='jpg,.jpeg,.png,.gif,.webp' onChange={(e) => setImage(e.target.files[0])} />
                        </form>

                    )

                )
            }
            <address>created by <a href="https://github.com/Gonzalomorales1001" target="_blank" rel="noopener noreferrer">Gonzalomorales1001</a> - devChallenges.io</address>
        </main>
    )
}

export default Uploader