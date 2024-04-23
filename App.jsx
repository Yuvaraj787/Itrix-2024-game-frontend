  //useEffect(function,[dependencies])
  //useEffect(function,[value]) => changes only when 'value' changes
  //useEffect(function,[]) => when it mounts

// Client-side code (React)
import React, { useState ,useEffect} from 'react';
import Axios from "axios";
const userid = "yogasimman";
const PORT = 7000;
const SERVER_URL = `http://localhost:${PORT}`


function UserProfile() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [updatedName, setUpdatedName] = useState("Guest");
  const [username, setUsername] = useState(userid);
  const [email, setEmail] = useState("guest@gmail.com");
  const [profilePicture, setProfilePicture] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [gender, setGender] = useState("Female");
  const [nos, setNos] = useState(0); //Number of matches played
  const [nosw, setNosw] = useState(0); //Number of matches won
  const [pos, setPos] = useState(0); //Position in overall Leaderboard
  const [genderError, setGenderError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [flippedProfile, setFlippedProfile] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState(""); 

  const [intervalId, setIntervalId] = useState(null);

  const [inputName, setInputName] = useState("");
  const [inputEmail,setInputEmail] = useState("");
  const [inputFavoriteTeam,setInputFavoriteTeam] = useState("");
  const [inputGender,setInputGender] = useState("");
  useEffect(() => {
    getData();
  }, []);

  // Function to fetch data from server
  const getData = async () => {
    try {
      const response = await Axios.post(`${SERVER_URL}/api`, { username }); // Send username to the server
      const userData = response.data[0]; // Assuming only one user is returned
      if (userData && userData.name) {
        setUpdatedName(userData.name);
         // Set the name received from the server
      }
      if (userData && userData.email){
        setEmail(userData.email);
        //Set the email received from the server
      }
      if (userData && userData.favoriteTeam){
        setFavoriteTeam(Team_Fullname(userData.favoriteTeam));
        setFlippedProfile(true);
      }
      if (userData && userData.gender){
        setGender(userData.gender);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateName = async (value) => {
    try {
      await Axios.post(`${SERVER_URL}/updateName`, { user: username, name: value });
      console.log("Name updated successfully");
       // Refresh data after update
      setNameError(""); // Clear name error after successful update
    } catch (error) {
      console.error(error);
      console.log("Error updating name");
      setNameError("Error updating name. Please try again."); // Set name error if update fails
    }
  }

  const updateEmail = async()=>{
    try{
      await Axios.post(`${SERVER_URL}/updateEmail`,{user: username, email: inputEmail});
      console.log("Email updated sucessfully");
      setEmailError("");
    }catch(error){
      console.error(error);
      console.log("Error updating email");
      setEmailError("Error updating email. Please try again");// Set email error if update fails
    }
  }

  const updateGender = async()=>{
    try{
      await Axios.post(`${SERVER_URL}/updateGender`,{user: username, gender: inputGender});
      console.log("Gender updated sucessfully");
    }catch(error){
      console.error(error);
      console.log("Error updating gender");
      setGenderError("Error updating gender. Please try again");// Set email error if update fails
    }
  }

  const updateFavoriteTeam = async (value) => {
    try {
      await Axios.post(`${SERVER_URL}/updateFavoriteTeam`, { user: username, favouriteTeam: value });
      console.log("Favorite Teams updated successfully");
      setFlippedProfile(true); // Assuming this should be set to true after updating the favorite team
    } catch (error) {
      console.error(error);
      console.log("Error updating FavoriteTeam");
      // Handle error if needed
    }
  }

  function Team_Fullname(team){
    switch(team){
      case "csk":
        return "Chennai Super Kings";
      case "dc":
        return "Delhi Captials";
      case "gt":
        return "Gujarat Titans";
      case "mi":
        return "Mumbai Indians";
      case "rr":
        return "Rajastan Royals";
      case "srh":
        return "Sunrises Hyderabad";
      case "lsg":
        return "Lucknow Super Giants";
      case "pbks":
        return "Punjab Kings"
      case "kkr":
        return "Kolkata Knight Riders";
      case "rcb":
        return "Royal Challengers Bangaluru";
      default:
        return "";
    }
  }


  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const startInterval = () => {
    const id = setInterval(() => {
      setFlippedProfile((prevFlipped) => !prevFlipped);
    }, 7000);
    setIntervalId(id);
  };

  const handleFavoriteTeamChange = (event) => {
    setInputFavoriteTeam(Team_Fullname(event.target.value));
    updateFavoriteTeam(inputFavoriteTeam);
    
    if(event.target.value !== ""){
      setFlippedProfile(true); 
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
    startInterval();
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validateName(name) {
    return name.trim() !== ""; 
  }


 /* const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
    setNameError(validateName(event.target.value) ? "" : "Name cannot be empty");
    if(validateName(event.target.value)){

    }
  };*/
  const handleNameChange = (event) => {
    setInputName(event.target.value);
    if(validateName(event.target.value)){
      
      setNameError("");
      
    }else{
      setNameError("Name cannot be empty")
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlenos = (event) => {
    setNos(event.target.value);
  };

  const handlenosw = (event) => {
    setNosw(event.target.value);
  };

  const handlepos = (event) => {
    setPos(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setInputEmail(newEmail);
    setEmailError(validateEmail(newEmail) ? "" : "Please enter a valid email address");
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setProfilePicture(event.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (event) => {
    setInputGender(event.target.value);
    setGenderError(event.target.value ? "" : "Please select a gender");
  };

  const handleOldpassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewpassword = (event) => {
    setNewPassword(event.target.value);
  }

  const handleUpdateProfile = () => {
    setShowUpdateProfile(true);
    setShowChangePassword(false);
    setInputName(updatedName);
    setInputEmail(email);
    
  };

  const handleChangePassword = () => {
    setShowUpdateProfile(false);
    setShowChangePassword(!showChangePassword);
  };

  const handleCancel = () => {
    setShowUpdateProfile(false);
    setShowChangePassword(false);
  };

  const handleSave = () => {

    if (validateName(inputName)) {
      updateName(inputName);
    }else{
      setNameError("Name cannot be empty");
      return;
    }

    if(validateEmail(inputEmail)){
      updateEmail(inputEmail);
      setShowUpdateProfile(false);
      setShowChangePassword(false);
    }else{
      setEmailError("Type an vaild email")
      return;
    }
    console.log(inputGender);
    if(inputGender !== ""){
      updateGender(inputGender);
      setGenderError("");
    }else{
      setGenderError("Please select a gender");
      return;
    }
    getData();
  };

  const handleLogout = () => {
    // To be implemented
  };

  const handleSavePassword = () => {
    // To be implemented
    setShowChangePassword(false);
  };

  const handleCancelPassword = () => {
    setOldPassword("");
    setNewPassword("");
    setShowChangePassword(false);
  };

  function getLogoPath(team) {
    switch (team) {
      case "Chennai Super Kings":
        return "https://images.news18.com/webstories/2023/12/CSK-logo.webp";
      case "Delhi Capitals":
        return "https://i.pinimg.com/originals/a4/87/26/a48726809d1115236c20842dc781ae55.png";
      case "Kolkata Knight Riders":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmCLrWtlSGhYmIHTYyfEXtQo5-IcD2QgMP9UpkpRB2yg&s";
      case "Mumbai Indians":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOH2yOeX5nsp3zi-1Uns6epuUncn2hYk6CMXdy-YgkUgE7_Ws39Kf9FbW2n2ZrFOOORCw&usqp=CAU";
      case "Punjab Kings":
        return "https://images.news18.com/ibnlive/uploads/2022/02/pbks-logo.jpg";
      case "Rajasthan Royals":
        return "https://i.pinimg.com/736x/b2/21/ee/b221ee9ae9ecb3fa0f158161ef457e29.jpg";
      case "Royal Challengers Bengaluru":
        return "https://pbs.twimg.com/media/GJCsBF0bgAAjIUJ.jpg";
      case "Sunrisers Hyderabad":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lxmOeMUENTD8kvlFaEvdDung2r-VJsNek-njywiZbirnTW7Bnjbav2gD5WADOr9YOyM&usqp=CAU";
      case "Lucknow Super Giants":
        return "https://ugc.production.linktr.ee/MM2e4q2QBW5A7uVa440L_unnamed.png";
      case "Gujarat Titans":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHSgfKLmCHgwli70hOpIX-6dLrFNpC_-lijRUUrisFkTFew8Hy-mJuU6Sb1P_inberMNQ&usqp=CAU";
      default:
        return "";  
    }
  }

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col justify-center items-center ">
      <div className="h-full w-full bg-cover bg-no-repeat ">
      
        <main className="flex justify-center items-center mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-4 bg-white bg-opacity-50 p-4 mt-[-0.75in] ">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                  <h1 className="text-3xl font-bold font-bold">User Profile</h1>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 font-bold border border-transparent rounded-full shadow-sm  font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                    <svg class="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                      Sign Out
                    </button>

                </div>
                <div className="px-4 py-5 sm:px-6">
                  {/* Profile Picture */}
                  {!showChangePassword && (
                    <div>
                      <p className="text-lg font-bold text-blue-700 flex justify-center">Profile Picture</p>
                      <dd className="mt-1 text-sm text-gray-900">
                        <br/><br/>
                        {showUpdateProfile ? (
                          <div className="flex justify-center">
                            <label htmlFor="fileInput" className="relative cursor-pointer bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-md py-2 px-4 shadow-md hover:shadow-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6 inline-block mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                              </svg>
                              <span>Upload Files</span>
                            </label>
                            <input
                              id="fileInput"
                              type="file"
                              onChange={handleProfilePictureChange}
                              className="hidden"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto w-32 h-32 relative -mt-3 border-4 border-white rounded-full overflow-hidden">
                            {favoriteTeam && (
                              <img
                                className="object-cover object-top w-full"
                                src={flippedProfile ? getLogoPath(favoriteTeam) : (profilePicture || (gender === 'Male' ? "https://cdn-icons-png.flaticon.com/128/6997/6997674.png" : (gender === 'Female' ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png" : "https://cdn-icons-png.flaticon.com/128/1144/1144760.png")))}
                                alt={`${favoriteTeam} Logo`}
                              />
                            )}
                            {!favoriteTeam && (
                              <img
                                className="object-cover object-top w-full"
                                src={profilePicture || (gender === 'Male' ? "https://cdn-icons-png.flaticon.com/128/6997/6997674.png" : (gender === 'Female' ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png" : "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"))}
                                alt="Profile"
                              />
                            )}
                          </div>
                        )}
                      </dd>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 py-4">
                      
                      {/* Username */}
                      <div>
                        <dt className="text-lg font-bold text-blue-700">Username:</dt>
                        <dd className="mt-1  font-semibold text-gray-900 font-medium">{username}</dd>
                      </div>
                      {/* Name */}
                      <div>
                      <dt className="text-lg font-bold text-blue-700">Name:</dt>
                        <dd className="mt-1   font-semibold text-gray-900">
                          {showUpdateProfile ? (
                            <div className="mb-4 relative">
                              <input
                                type="text"
                                value={inputName}
                                onChange={handleNameChange}
                                className={`border-blue-800 focus:border-indigo-500 focus:ring focus:ring-indigo-700 rounded-md p-2 bg-blue-100 ${nameError ? 'border-red-500' : 'hover:shadow-md'}`}
                              />
                              {nameError && 
                                <p className="absolute top-full left-0 text-red-500 text-sm mt-1">{nameError}</p>
                              }
                            </div>
                          ) : (
                            updatedName
                          )}
                        </dd>
                      </div>
    
                      {/* Gender */}
                      <div>
                      <dt className="text-lg font-bold text-blue-700">Gender:</dt>
                        <dd className="mt-1   font-semibold text-gray-900">
                          {showUpdateProfile ? (
                            <div>
                              <select id="gender" onChange={handleGenderChange} className="border-blue-800 focus:border-indigo-500 focus:ring focus:ring-indigo-700 rounded-md p-2 bg-blue-100">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                              </select>
                              {genderError && 
                                <p className="text-red-500 text-sm mt-1">{genderError}</p>
                              }
                            </div>
                          ) : (
                            gender
                          )}
                        </dd>
                      </div>
      
                      {/* Email */}
                      <div>
                      <dt className="text-lg font-bold text-blue-700">Email:</dt>
                        <dd className="mt-1  font-semibold text-gray-900">
                          {showUpdateProfile ? (
                            <div className="mb-4 relative">
                              <input 
                                type="email" 
                                value={inputEmail} 
                                onChange={handleEmailChange} 
                                placeholder="Enter new value" 
                                className={`border-blue-800 focus:border-indigo-500 focus:ring focus:ring-indigo-700 rounded-md p-2 bg-blue-100 ${emailError ? 'border-red-500' : 'hover:shadow-md'}`} 
                              />
                              {emailError && 
                                <p className="absolute top-full left-0 text-red-500 text-sm mt-1">{emailError}</p>
                              }
                            </div>
                          ) : (
                            email
                          )}
                        </dd>
                      </div>

                      {/* Password */}
                      <div>
                      <dt className="text-lg font-bold text-blue-700">Password:</dt>
                        <dd className="mt-1  font-semibold text-gray-900">
                          {showChangePassword ? (
                            <div className="mb-4 relative">
                              <label className="block text-black-500 text-sm font-bold mb-2">Enter Old Password:</label>
                              <input 
                                type="password" 
                                value={oldPassword} 
                                onChange={handleOldpassword} 
                                placeholder="Enter your Old Password" 
                                className="border-blue-800 focus:border-indigo-500 focus:ring focus:ring-indigo-700 rounded-md p-2 bg-blue-100"
                              />
                          
                              <label className="block text-black-500 text-sm font-bold mb-2">Enter New Password:</label>
                              <input 
                                type="password" 
                                value={newPassword} 
                                onChange={handleNewpassword} 
                                placeholder="Enter your New Password" 
                                className="border-blue-800 focus:border-indigo-500 focus:ring focus:ring-indigo-700 rounded-md p-2 bg-blue-100"
                              />
                              
                            </div>
                          ) : (
                            "*********"
                          )}
                        </dd>
                      </div>
    
                      {/* Favorite Team */}
                      <div>
                      <dt className="text-lg font-bold text-blue-700">Favourite Team:</dt>
                        <dd className="mt-1  font-semibold text-gray-900">
                          {showUpdateProfile ? (
                            <div className="mb-4">
                              <select  onChange={handleFavoriteTeamChange} className="border-blue-800 focus:border-indigo-500 focus:ring focus:ring-indigo-700 rounded-md p-2 bg-blue-100">
                                <option value="">Select</option>
                                <option value="csk">Chennai Super Kings</option>
                                <option value="dc">Delhi Capitals</option>
                                <option value="kkr">Kolkata Knight Riders</option>
                                <option value="mi">Mumbai Indians</option>
                                <option value="pbks">Punjab Kings</option>
                                <option value="rr">Rajasthan Royals</option>
                                <option value="rcb">Royal Challengers Bengaluru</option>
                                <option value="srh">Sunrisers Hyderabad</option>
                                <option value="lsg">Lucknow Super Giants</option>
                                <option value="gt">Gujarat Titans</option>
                              </select>
                            </div>
                          ) : (
                            favoriteTeam
                            
                          )}
                        </dd>
                      </div>
    
                      {/* Number of matches played */}
                      <div>
                        <dt className="text-lg font-bold text-blue-700">Number of matches played:</dt>
                        <dd className="mt-1  font-semibold text-gray-900">{nos}</dd>
                      </div>
    
                      {/* Number of matches won */}
                      <div>
                        <dt className="text-lg font-bold text-blue-700">Number of matches won:</dt>
                        <dd className="mt-1  font-semibold text-gray-900">{nosw}</dd>
                      </div>
    
                      {/* Position in overall Leaderboard */}
                      <div>
                        <dt className="text-lg font-bold text-blue-700">Position in overall Leaderboard:</dt>
                        <dd className="mt-1  font-semibold text-gray-900">{pos}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  {showUpdateProfile ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {showChangePassword ? (
                        <>
                          <button
                            onClick={handleSavePassword}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelPassword}
                            className="inline-flex items-center ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className='flex justify-center'>
                          <button
                            onClick={handleUpdateProfile}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-blue-100 bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Update User Profile
                          </button>
                          <button
                            onClick={handleChangePassword}
                            className="inline-flex items-center ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-blue-100 bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Change Password
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserProfile;

