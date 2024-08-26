import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [firebaseAuthError, setFirebaseAuthError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  // Submit handler
  const onSubmit = (data) => {
    console.log(data);

    if (!isSignInForm) {
      //signup
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          updateProfile(user, {
            displayName: data.fullName, photoURL: `https://ui-avatars.com/api/?name=${data.fullName}`
          }).then(() => {
            
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email : email, displayName: displayName, photoURL: photoURL}));

          }).catch((error) => {
            // An error occurred
            // ...
          });

          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFirebaseAuthError(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFirebaseAuthError(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute">
        <img
          src={BACKGROUND_IMG}
          alt="Background"
        />
      </div>

      <form
        className="w-1/4 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Full Name Field */}
        {!isSignInForm && (
          <div>
            <input
              className="p-4 my-4 w-full bg-gray-800 rounded-lg"
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: !isSignInForm })}
            />
            {errors.fullName && (
              <p className="text-red-500">Full Name is required</p>
            )}
          </div>
        )}

        {/* Email Field */}
        <div>
          <input
            className="p-4 my-4 w-full bg-gray-800 rounded-lg"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <input
            className="p-4 my-4 w-full bg-gray-800 rounded-lg"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Firebase Auth Error */}

        {firebaseAuthError && (
          <p className="text-red-500"> {firebaseAuthError} </p>
        )}

        {/* Submit Button */}
        <button type="submit" className="p-4 my-6 w-full rounded-lg bg-red-700">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle Sign In/Sign Up Link */}
        <p
          className="py-4 cursor-pointer font-semibold text-gray-300"
          onClick={toggleSignIn}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
