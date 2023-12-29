"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    const handlePickClick = () => {
        imageInput.current.click();
    };
    const handleImageChange = ({ target: { files } }) => {
        const file = files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        // onload will be triggered when readAsDataURL finishes
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        // Gets the data url from the image to be used as src for the image.
        fileReader.readAsDataURL(file);
    };

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="Image selected by the user."
                            fill
                        />
                    )}
                </div>
                <input
                    ref={imageInput}
                    type="file"
                    className={classes.input}
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
};

export default ImagePicker;
