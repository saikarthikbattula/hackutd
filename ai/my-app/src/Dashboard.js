import React, { useState, useEffect } from "react";
import { auth, GoogleAuthProvider, signInWithPopup, signOut } from "./firebase"; // Firebase functions
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  // Profile and data
  const profile = {
    name: "Sai Karthik Battula",
    experience: "Intermediate Developer",
    profilePic: user?.photoURL || "https://via.placeholder.com/150",
  };

  const courses = [
    { title: "React Fundamentals", progress: 80 },
    { title: "Advanced JavaScript", progress: 50 },
    { title: "Backend Development with Python", progress: 30 },
  ];

  const achievements = [
    "Completed 5 Projects",
    "100 Hours of Coding",
    "Certified React Developer",
  ];

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
  };

  const handleCourseClick = (course) => {
    setPopupContent(`${course.title} is ${course.progress}% complete.`);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent("");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              {user ? (
                <a href="#" onClick={handleSignOut}>
                  <i className="icon">🔒</i>
                  Logout
                </a>
              ) : (
                <a href="#" onClick={handleLoginWithGoogle}>
                  <i className="icon">🔓</i>
                  Login with Google
                </a>
              )}
            </li>
          </ul>
        </nav>

        {user && (
          <div className="sidebar-profile">
            <img src={user.photoURL} alt="Profile" className="profile-picture" />
            <span>{user.displayName}</span>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="content-container">
          <div className="profile-box">
            <img src={profile.profilePic} alt="Profile" />
            <h3>{profile.name}</h3>
            <p>{profile.experience}</p>
          </div>

          <div className="courses-box">
            <h3>Courses Started</h3>
            <ul>
              {courses.map((course, idx) => (
                <li key={idx} onClick={() => handleCourseClick(course)}>
                  {course.title} - {course.progress}%
                </li>
              ))}
            </ul>
          </div>

          <div className="experience-bar">
            <h3>Experience Progress</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="achievements-box">
            <h3>Achievements</h3>
            <ul>
              {achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2024 Sai Karthik Battula. All Rights Reserved.</p>
      </footer>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              ✖
            </span>
            <h3>Course Details</h3>
            <p>{popupContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
