import axios from "axios";
import { useAuth } from "../common/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user, loginWithGoogle, setUser } = useAuth();
  const handleLogOut = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
};

export default Home;
