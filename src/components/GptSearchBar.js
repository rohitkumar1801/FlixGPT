import { useRef } from "react";
import client from "../utils/openAi";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async() => {
    console.log(searchText.current.value);

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });

      console.log(chatCompletion);

  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        
        className="w-1/2 bg-black bg-opacity-40  grid grid-cols-12 rounded-lg "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
        ref={searchText}
          className="p-4 m-4 col-span-9 rounded-lg"
          type="text"
          placeholder="What would you like  to watch today ?"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
