import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  localStorage.clear();
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
  };
  if (user?.uid) {
    navigate("/");
  }
  return (
    <div className=" ml-2  ssm:ml-[var(--marginLeftCustom)] xl:mr-[var(--marginRightCustom)] mb-[200px] xl:mb-0 text-center py-8 ">
      <h1 className="text-light-title-color">Welcome to Zing Mp3</h1>
      <button className="mt-12 bg-green-400" onClick={handleLoginWithGoogle}>
        <i className="fa-brands fa-google-plus-g mr-4"></i>Login with Google
      </button>
    </div>
  );
};

export default Login;
