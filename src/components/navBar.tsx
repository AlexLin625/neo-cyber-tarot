import { TableOfContents } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { Modal } from "./modal";
import { routes } from "../utils/routes";

function MiniNavBar(): React.ReactElement {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="navbar-base justify-between flex lg:hidden px-8">
        <p className="logo">赛博塔罗</p>
        <button
          className="nav-button"
          onClick={() => setShowModal(true)}
        >
          <TableOfContents size={18} />
        </button>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

function FullsizeNavBar(): React.ReactElement {
  return (
    <div className="navbar-base justify-center gap-2 hidden lg:flex">
      <p className="logo">赛博塔罗</p>

      {routes.map((v) => (
        <NavLink to={v.path} key={v.path}>
          <button className="text-foreground nav-button">
            {v.name}
          </button>
        </NavLink>
      ))}
    </div>
  );
}

export function NavBar(): React.ReactElement {
  return (
    <>
      <MiniNavBar />
      <FullsizeNavBar />
    </>
  );
}
