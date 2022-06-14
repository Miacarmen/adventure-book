import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutation";
import { collapseTagsString } from "../utils/tagConversion";
import Map from "../components/Map";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function AddPost() {
  //setting up upload image
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  ///upload image by cloudinary
  const uploadImage = (e) => {
    const files = e.target.files;
    // Abort if more than 4 files
    if (files.length > 4) {
      alert("Too many files!");
      setImages([]);
      e.target.value = null;
      return;
    }
    const filePromises = [];
    const fileUrls = [];
    setLoading(true);
    // The Cloudinary API doesn't support multiple files in one go, so we need a separate fetch for each image
    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "kyliedefault");
      const promise = fetch(
        "https://api.cloudinary.com/v1_1/dw5epcgjt/image/upload",
        {
          method: "post",
          body: data
        }
      )
        .then((res) => res.json())
        .then((data) => fileUrls.push(data.secure_url));
      filePromises.push(promise);
    }
    // Proceed only once all files have confirmed being uploaded
    Promise.all(filePromises).then(() => {
      setImages(fileUrls);
      setLoading(false);
    });
  };

  // when the button is clicked for new post to create - run this function
  const [createPost, setPost] = useState({
    title: "",
    content: "",
    tags: [""]
  });

  const [pushPins, setPushPins] = useState([]);

  const [location, setLocation] = useState([0.01, 0.01]);

  function readLocation(arg) {
    setPushPins([arg.latitude, arg.longitude]);
    setLocation([arg.latitude, arg.longitude]);
  }

  const [addPost] = useMutation(CREATE_POST);

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const processedLocation = { latitude: location[0], longitude: location[1] };

    try {
      if (images.length === 0) {
        throw new Error("Must have at least one image");
      }
      if (images.length > 4) {
        throw new Error("Can't have more than 4 images");
      }
      await addPost({
        variables: {
          images: images,
          title: createPost.title,
          content: createPost.content,
          tags: createPost.tags,
          location: processedLocation
        }
      });
      window.location.assign("/dashboard");
    } catch (e) {
      alert(e);
    }
  };

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "tags") {
      value = collapseTagsString(value);
    }
    setPost({
      ...createPost,
      [name]: value
    });
  }
  return (
    <div className="pageContainer">
      <div className="card-body">
        <div className="card bg-primary text-primary-content justify-center postCard">
          <h1 className="card-title justify-center text-secondary-content text-3xl p-4 mt-8">
            Add A Post!
          </h1>
          <div className="card-body mt-8 justify-center grid grid-cols-2 addCard">
            <div className="mt-28 mx-10 inputComp">
              <div className="m-2">
                <input
                  type="file"
                  name="file"
                  multiple="multiple"
                  accept="image/jpeg, image/png, image/jpg"
                  placeholder="add image"
                  onChange={uploadImage}
                  className="place-items-center"
                />
                {loading ? (
                  <>
                    <h3>Uploading Images...</h3>
                  </>
                ) : (
                  <>
                    <div className="grid row">
                      {images.map((image, index) => {
                        return (
                          <img
                            key={index}
                            src={image}
                            style={{ width: "300px" }}
                            alt="Loaded preview"
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div className="m-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="m-3">
                <input
                  type="text"
                  name="tags"
                  placeholder="#Tags"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="m-3">
                <textarea
                  name="content"
                  className="textarea textarea-bordered w-full"
                  placeholder="Description of where you went activities, restaurants..."
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="ml-16 m-2 mapDiv">
              <h3 className="text-lg font-bold locationTxt">
                Click On The Map To Pin A Location
              </h3>
              <Map
                height="440px"
                width="43vw"
                locations={[pushPins]}
                onClick={readLocation}
              />
              <div className="pt-2 text-lg font-bold ">
                <p>Latitude: {location[0]}</p>
                <p>Longitude: {location[1]}</p>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end m-6 mr-16 addBtn">
            <Link to="/dashboard">
              <button
                onClick={handlePostSubmit}
                className="btn btn-accent rounded-full"
              >
                ADD POST
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
