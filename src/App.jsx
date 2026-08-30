import { BrowserRouter, Routes,Route } from "react-router-dom"

import Body from "./components/Body" 
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests  from "./components/Requests"
import Chat from "./components/Chat"
import ViewProfile from "./components/ViewProfile"
import Landing from "./components/Landing"
import CursorSpotlight from "./components/CursorSpotlight"

function App() {

  return (
    <>
    <CursorSpotlight />
    <Provider store={appStore}>
    <BrowserRouter basename="/"> 
     <Routes>  
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<Body />}>
           <Route path="/feed" element={<Feed />} />
           <Route path="/Profile" element={<Profile />} />
           <Route path="/connections" element={<Connections />} />
           <Route path="/requests" element={<Requests />} />
           <Route path="/chat/:targetUserId" element={<Chat />} />
           <Route path="/user/:userId" element={<ViewProfile />} />
        </Route>
    
     </Routes>
    </BrowserRouter>  
    </Provider>
    </>
  )
}

export default App
