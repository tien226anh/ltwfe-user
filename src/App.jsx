import { Sidebar } from "./layout/index";
import { useGlobalContext } from "./context/context";
import Router from "./routes/routes";

function App() {
  const { state } = useGlobalContext();

  return (
    <div style={{ margin: "0 auto" }}>
      <Sidebar isShowing={state.showSidebar} />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Router />
      </div>
    </div>
  );
}

export default App;
