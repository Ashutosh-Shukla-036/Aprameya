import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Footer } from "./components/Footer";
import { Film } from "./pages/Films";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import FilmDetail from "./components/FilmDetail";
import DetailedReview from "./components/DetailedReview";
import ReviewPage from "./pages/ReviewPage";
import CrowdFundingPage from "./pages/CrowdFunding";
import ScrollToTop from "./components/ScrollToTop";
import WatchList from "./pages/WatchList";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <div className="bg-custom-gradient text-white">
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/films" element={<Film />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/film/:title" element={<FilmDetail />}></Route>
        <Route path="/reviews" element={<DetailedReview/>}></Route>
        <Route path="/review" element={<ReviewPage/>}></Route>
        <Route path="/watchlist" element={<WatchList/>}></Route>
        <Route path="/funding" element={<CrowdFundingPage />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/termsofservice" element={<TermsOfService />}></Route>
        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
