import { useState,createContext, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Items from "./scenes/Items";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import AddItem from "./scenes/addItem";
import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar/calendar";
import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import Geography from "./scenes/geography";
import FAQ from "./scenes/faq";

export const CollapseContext = createContext();

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(()=>{
    localStorage.setItem("isNavCollapsed" , isCollapsed)
  },[setIsCollapsed])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CollapseContext.Provider value={{isCollapsed, setIsCollapsed}}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar}/>
          <main className="content" style={{marginLeft: `${isCollapsed? "80px":"270px"}`}}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/items" element={<Items />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/add-item" element={<AddItem/>}/>
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/pie" element={<Pie />} /> */}
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
        </CollapseContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
