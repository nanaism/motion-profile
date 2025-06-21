import { useState } from "react";
import Layout from "./components/Layout";
import type { NavItem } from "./types/navigation";

const App = () => {
  const [activeTab, setActiveTab] = useState<NavItem>("Profile");

  const handleTabClick = (tab: NavItem) => {
    setActiveTab(tab);
  };

  return (
    <Layout handleTabClick={handleTabClick} title={activeTab}>
      {activeTab === "Profile" && <p>Profile</p>}
      {activeTab === "About" && <p>About</p>}
      {activeTab === "Skill" && <p>Skill</p>}
      {activeTab === "Contact" && <p>Contact</p>}
    </Layout>
  );
};

export default App;
