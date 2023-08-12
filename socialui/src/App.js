import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ExploreFeeds from "./pages/Explore/Explore";
import BookmarkFeeds from "./pages/Bookmarks/Bookmarks";
import Profile from "./pages/Profile/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (boolean, user = {}) => {
    setIsLoggedIn(boolean);
    setUser(user);
  };

  return (
    <Routes>
      {/* Anyone can access these routes */}
      <Route path="login" element={<Login isLoggedIn={isLoggedIn} />} />
      <Route path="register" element={<Register isLoggedIn={isLoggedIn} />} />
      <Route path="user-feed" element={<ExploreFeeds />} />

      {/* Only Loggedin user can access these routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            handleLogin={handleLogin}
            isLoggedIn={isLoggedIn}
            user={user}
          />
        }
      >
        <Route index element={<HomePage user={user} />} />
        <Route
          path="/explore-feeds"
          element={<ExploreFeeds userId={user?._id} />}
        />
        <Route path="/bookmark" element={<BookmarkFeeds user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Route>
      <Route path="*" element={<div>Not authorized</div>} />
    </Routes>
  );
}

export default App;
