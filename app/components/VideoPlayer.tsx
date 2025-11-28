import React from "react";

interface Props {
  videokey: string;
  name: string;
  isVisible: () => void;
}
const VideoPlayer = ({ videokey, name, isVisible }: Props) => {
  return (
    <div className="flex items-center justify-center mx-auto">
      
      <iframe
        src={`https://www.youtube.com/embed/${videokey}`}
        title={name}
        allowFullScreen
        width="800"
        height="650"
      ></iframe>


      <span onClick={isVisible} className="absolute top-10 right-10 cursor-pointer hover:scale-95 font-bold text-lg">X</span>
    </div>
  );
};

export default VideoPlayer;
