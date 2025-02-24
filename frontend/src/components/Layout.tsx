import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="p-4">
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
