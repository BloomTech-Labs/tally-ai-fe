import React, {useState} from 'react'
import axiosWithAuth from '../../auth/axiosWithAuth'

const ImageUpload = (props) => {

      const [file, setFile] = useState(null)


    const onFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axiosWithAuth
        .post(`https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/business/${props.id}/upload`,formData, config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
              console.log(error);
        });
    }


    const onChange = e => {
        setFile({file:e.target.files[0]});
    }

        return (
            <form onSubmit={onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {onChange} />
                <button type="submit">Upload</button>
            </form>
        )

}

export default ImageUpload