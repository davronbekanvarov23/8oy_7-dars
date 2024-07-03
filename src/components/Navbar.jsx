//firebase
import { auth } from "../firebase/fireBaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

//redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/userSlice";

//rrd
import { Link } from "react-router-dom";

//components
import { FaBarsStaggered } from "react-icons/fa6";
import { Mode, Weather } from "../components";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutProfile = async () => {
    try {
      await signOut(auth);
      toast.success(`See you soon`);
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <header className=" bg-base-200">
      <nav className=" align-element navbar">
        <div className=" navbar-start">
          <Link to="/" className="hidden lg:btn">
            Home
          </Link>
          <div className="dropdown ml-2 ">
            <label tabIndex="0" className="btn btn-ghost lg:hidden ">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1]  p-2 shadow "
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Mode />
              </li>{" "}
              <li>
                <button onClick={logoutProfile}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className=" navbar-center">
          <Link to="/create" className="hidden lg:btn">
            Create
          </Link>
        </div>
        <div className=" navbar-end">
          <Weather />

          <span className="hidden lg:block">
            <Mode />
          </span>
          <h1 className=" ml-2">{user.displayName}</h1>
          <div className="avatar ml-5">
            <div className="rounded-full ring ring-offset-2 size-8 object-cover">
              <img src={user.photoURL} alt="" className="object-cover" />
            </div>
          </div>
          <button
            onClick={logoutProfile}
            className="hidden lg:btn ml-5 lg:btn-primary  "
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
