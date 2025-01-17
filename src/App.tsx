import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Risks } from "./components/Risks";
import { ImprovementActions } from "./components/pages/ImprovementActions";
import { DocsApproval } from "./components/pages/DocsApproval";
import { Processes } from "./components/pages/Processes";
import { Resources } from "./components/pages/Resources";
import { Control } from "./components/pages/Control";
import { Interested } from "./components/pages/Interested";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Dashboard />}></Route>
            <Route path="/risks" element={<Risks />}></Route>
            <Route path="/processes" element={<Processes />}></Route>
            <Route path="/documents" element={<DocsApproval />}></Route>
            <Route path="/resources" element={<Resources />}></Route>
            <Route path="/improvement" element={<ImprovementActions />}></Route>
            <Route path="/control" element={<Control />}></Route>
            <Route path="/interested" element={<Interested />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
