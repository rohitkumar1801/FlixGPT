const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="py-6 text-sm  w-1/4">{overview}</p>

      <div>
        <button className="bg-white text-black rounded-lg text-md font-semibold px-10 p-2 hover:bg-opacity-75">
          Play
        </button>
        <button className="bg-gray-400 text-white rounded-lg text-md px-10 p-2 mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
