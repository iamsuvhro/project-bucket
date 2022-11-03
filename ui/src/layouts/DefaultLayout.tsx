import "antd/dist/antd.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Layout} from "antd";
import Feed from "../pages/Feed/Feed";
import Profile from "../pages/Profile/Profile";
import Sidebar from "../components/Sidebar/Sidebar";
import Settings from "../pages/Settings/Settings";
import Error from "../pages/Error/error";



function DefaultLayout() {
  return (
    <Layout hasSider>
      <Sidebar/>
      <Layout className="site-layout" style={{ marginLeft: 200, background:"white" }}>
      </Layout>

      <Suspense>
        <Routes>
        
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/404" element={<Error/>} />
          <Route path="*" element={<Navigate to={`/404`} replace={true} />} />
          
        </Routes>
      </Suspense>
    </Layout>
    
  );
}

export default DefaultLayout;
