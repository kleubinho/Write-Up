import { Routes, Route } from "react-router-dom";
import { Comments } from "./pages/comments/comments";
import { Home } from "./pages/posts";
import { User } from "./pages/user";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/comments/:id/comments' element={<Comments/>}/>
      <Route path='/user/:userId' element={<User/>}/>
    </Routes>
  )
}