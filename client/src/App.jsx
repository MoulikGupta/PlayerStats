
import { useEffect, useState, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import DashboardStats from './DashboardStats'
import './App.css'
import { CategoryContext } from './context/ContextProvider'
import PlayerProfile from './components/PlayerProfile';
import AboutUs from './components/AboutUs'

function App() {
  const {isAuthenticated, setIsAuthenticated, data, setData, players, setPlayers, playerStats, sePlayerStats, category} = useContext(CategoryContext)
  const [user, setUser] = useState(null)

  const getPlayers = async()=>{
    try {
      const response = await fetch("http://localhost:5000/players")
      const jsonData = await response.json()
      setPlayers(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  useEffect(() => {
    if (user && user.access_token) {
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => console.log("Fetching Error", err));
    }
  }, [user]);

  useEffect(() => {
    getPlayers()
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setIsAuthenticated(true)
      // console.log("Login Success :)", codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed :(', error)
  });
  
  const handleLogout = () => {
    setData(null);
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    googleLogout();
  };


  // const responseMessage = (response) => {
  //   console.log("Login Success :)", response);
  //   setIsAuthenticated(true)
  // };
  // const errorMessage = (error) => {
  //   console.log("Login Failed :(", error);
  //   setIsAuthenticated(false)
  // };

  // const handleLogout = () => {
  //   setIsAuthenticated(false)
  //   localStorage.removeItem('isAuthenticated')
  // }
  // Moulik: I have commented out the above code and replaced it and have used Our custom hook googleLogout() to logout the user
  
return (
  
  <div>
    <Routes>
      <Route path="/" element={isAuthenticated  ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={data ? <DashboardStats onLogout={handleLogout} userProfile={data}  signIn={login}/> : <Navigate to="/login" />} />
      <Route path="/player/:id" element={<PlayerProfile />} />
      <Route path="/aboutus" element={<AboutUs/>} />
      <Route 
        path="/login" 
        element={
          !data ? (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="min-h-screen flex items-center justify-center">
              <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                  Player Stats Viewer
                </h1>
                <button
                  onClick={() => login()}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
            </div>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404 - Not Found</h1>
              <p className="text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
              <button
                onClick={() => window.history.back()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        }
      />
    </Routes>
  </div>
  
);

}

export default App