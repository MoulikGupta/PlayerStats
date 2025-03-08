import { useContext, React } from 'react';
import { CategoryContext } from '../context/ContextProvider';
import "../css/headermain.css"
import { useNavigate } from 'react-router';
import AboutUs from './AboutUs';
const UserHeader = ({onLogout}) => {
  const { data } = useContext(CategoryContext);
  const navigate = useNavigate();
  console.log(data)
  // const { userData } = useContext(CategoryContext);
  // const name = userData?.name  'Guest User';
  // const email = userData?.email  'No email provided';
  // const initial = userData?.name ? userData.name.charAt(0).toUpperCase() : 'G';
  //i dont know why this did not work i had to remove it during testing --Moulik
  return (
    <>
      {data ? (
      <header className="header-main">
        <div className="header-inner">
          <div className="header-buttons">
            <button onClick={onLogout} className="tech-logout-btn">
              <span>Log out</span>
            </button>
            <button 
              className="About-US"
              onClick={()=> {
                navigate("/aboutus")
              }}
            >
              <span>About Us</span>
            </button>
          </div>
          <div className="header-pfp">
            <p className="font-medium user-name">{data.name}</p>
            <div className="profile-img-wrapper">
              <img style={{height:"50px", width:"50px"}} src={data?.picture} alt="https://avatarfiles.alphacoders.com/145/thumb-1920-145024.jpg" />
            </div>
          </div>
        </div>
      </header>)
      : (
        <App/>
      )}
    </>

  );
};

export default UserHeader;