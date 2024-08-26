import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGPTSearch = () => {

    dispatch(toggleGptSearch());

  }

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if(user){

        console.log("User : " , user);

        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email : email, displayName: displayName, photoURL: photoURL}));

        navigate("/browse");

      }else{
        //user is signed out
        dispatch(removeUser());
        console.log("signing out /")
        navigate("/");
      }

    })
  
    return () => unsubscribe();
    
  }, [])

  return (
    <div className="absolute w-screen px-4 py-1.5 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-52 "
        src={LOGO}
        alt="Logo"
      />

      {user && (
        <div>
          {/* <img src={user.photoUrl} alt="profile" /> */}

          <button onClick={handleGPTSearch} className="font-semibold bg-purple-600 rounded-lg text-gray-100 m-4 w-20 h-10 text-sm" >GPT Search</button>

          <button
            onClick={handleSignOut}
            className="font-semibold bg-red-600 rounded-lg text-gray-100 m-4 w-20 h-10 text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
