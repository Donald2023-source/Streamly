import React from "react";

interface Props {
  key: string;
  name: string;
}
const VideoPlayer = ({ key, name }: Props) => {
  return (
    <div>
      <h2>Video Player Component</h2>
      <iframe
        src={`https://www.youtube.com/embed/${key}`}
        title={name}
     
        allowFullScreen
        width="560"
        height="315"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
