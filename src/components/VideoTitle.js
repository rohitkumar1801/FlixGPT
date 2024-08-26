

const VideoTitle = ({title, overview}) => {
  return (

    <div className="pt-36 px-12">

    <h1 className="text-4xl font-bold">{title}</h1>
    <p className="py-6 text-md  w-1/4">{overview}</p>

    <div>
        <button className="bg-gray-400 text-white rounded-lg text-lg px-10 p-2">Play</button>
        <button className="bg-gray-400 text-white rounded-lg text-lg px-10 p-2 mx-2">More Info</button>
    </div>
      
    </div>
  )
} 

export default VideoTitle
