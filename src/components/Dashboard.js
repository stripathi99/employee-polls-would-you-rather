import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage.js";
import LeaderBoard from "./Leaderboard";
import PageNotFound from "./PageNotFound";

const Dashboard = () => (
  <Container>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/add" element={<NewQuestion />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/leaderboard" exact={true} element={<LeaderBoard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  </Container>
);

export default Dashboard;
