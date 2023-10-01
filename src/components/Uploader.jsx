import React, { useEffect, useState, useRef } from 'react';
import { upload as sendImage } from '../helpers/upload';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

const Uploader = () => {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(null);
    const [image, setImage] = useState(null);

    const [show, setShow] = useState(false);
    const target = useRef(null);

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
        setUploaded({ link: resp.link, name: resp.name, error: resp.error });
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
                                    <img className='img-uploaded' src={URL.createObjectURL(image)} alt={`${uploaded.name} preview`} />
                                    <div className="uploaded-link">
                                        <p>{uploaded.link}</p>
                                        <button className="uploader-button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Copied!" ref={target} onClick={() => { navigator.clipboard.writeText(uploaded.link); setShow(!show) }}>Copy Link</button>
                                        <Overlay target={target.current} show={show} placement="right">
                                            {(props) => (
                                                <Tooltip id="overlay-example" {...props}>
                                                    Copied!
                                                </Tooltip>
                                            )}
                                        </Overlay>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-center">
                                        <span className="material-symbols-rounded cancel">cancel</span>
                                        <h2 className="uploader-title">Oops! Something went wrong...</h2>
                                        <p className="uploader-subtitle">An error occurred while uploading the image</p>
                                        <p className="uploader-text">{uploaded.error}</p>
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
                                <input type="file" name="image" id="image" accept='jpg,.jpeg,.png,.gif,.webp' onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <span className='uploader-text'>Or</span>
                            <label className="uploader-button" type='button'>
                                Choose your file
                                <input type="file" name="image" id="image" accept='jpg,.jpeg,.png,.gif,.webp' onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </form>

                    )

                )
            }
            <address>created by <a href="https://github.com/Gonzalomorales1001" target="_blank" rel="noopener noreferrer">Gonzalomorales1001</a> - devChallenges.io</address>
        </main>
    )
}

export default Uploader