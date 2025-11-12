import React from "react";

interface Props {
  videokey: string;
  name: string;
}
const VideoPlayer = ({ videokey, name }: Props) => {
  return (
    <div>
      <h2>Video Player Component</h2>
      <iframe
        src={`https://www.youtube.com/embed/${videokey}`}
        title={name}
        allowFullScreen
        width="560"
        height="315"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
