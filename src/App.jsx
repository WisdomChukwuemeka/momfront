import { Navbar } from "../components/navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Dashboard } from "../components/dashboard";
import { EventList } from "../components/eventlist";
import { EventForm } from "../components/eventform";
import { Register } from "../auth/register";
import { Login } from "../auth/login";
import { VideoForm } from "../components/videosform";
import { ProtectedRoute } from "../auth/protected_route";
import { Footer } from "../components/footer";
import { VideoList } from "../components/videolist";
import { TestimonyForm } from "../components/testimonyform";
import { TestimonyList } from "../components/testimonylist";
import { Contact } from "../components/contact";
import { Books } from "../components/book";
import { Home } from "../components/home";
export const App = () => {
  return(
    <>
      <div className="container text-3xl font-bold min-h-screen">
        {/* <DataTable /> */}
          {/* <Form /> */}

      
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Navbar />}>
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route index element={<Home />} />
          
           <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book" element={<Books />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/videos' element={<VideoForm />} />
            <Route path='/videos-items' element={<VideoList />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/eventform" element={<EventForm />} />
            <Route path="/testimonyform" element={<TestimonyForm />} />
            <Route path="/testimony-items" element={<TestimonyList />} />
          </Route>
          </Route>
            </Routes>
          
        </BrowserRouter>

        
      </div>

 
      <div className="mt-auto  bg-gray-800 text-white py-1 text-center w-full">
            <Footer />
      </div>
    </>
  )
}