import sidebar from "./sidebar.module.css";
import logo from "../../../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { Link } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
const Sidebar = () => {
  function logout() {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  }
  const { user } = useAuth();
  return (
    <div className={sidebar.sidebarContainer}>
      <div className={sidebar.sidebarHeader}>
        <img src={logo} alt="image" />
        <h3>{user?.firstname + " " + user?.lastname} </h3>
      </div>
      <div className={sidebar.sidebarLinks}>
        <ul>
          <li>
            {user !== null && user.roleUser === "INSTRUCTOR" && (
              <Link to="/dashboard/add_classroom">
                <FontAwesomeIcon className={sidebar.icons} icon={faPlus} />
                Create Classroom
              </Link>
            )}
          </li>
          <li>
            <Link to="/dashboard/view_classroom">
              <FontAwesomeIcon className={sidebar.icons} icon={faEye} />
              View Classrooms
            </Link>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon className={sidebar.icons} icon={faMessage} />
              Messages
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon className={sidebar.icons} icon={faChartSimple} />
              Reports and analytics
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon className={sidebar.icons} icon={faUser} />
              Profile
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon className={sidebar.icons} icon={faBell} />
              Notification
            </a>
          </li>
        </ul>
      </div>
      <div className={sidebar.sidebarLogout}>
        <button onClick={logout}>
          <FontAwesomeIcon
            className={sidebar.icons}
            icon={faArrowRightFromBracket}
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
