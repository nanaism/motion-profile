import { useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Skill from "./components/Skill";
import type { NavItem } from "./types/navigation";

const App = () => {
  const [activeTab, setActiveTab] = useState<NavItem>("Profile");

  const handleTabClick = (tab: NavItem) => {
    setActiveTab(tab);
  };

  return (
    <Layout handleTabClick={handleTabClick} title={activeTab}>
      {activeTab === "Profile" && <Profile />}
      {activeTab === "About" && <About />}
      {activeTab === "Skill" && <Skill />}
      {activeTab === "Contact" && <Contact />}
    </Layout>
  );
};

export default App;
