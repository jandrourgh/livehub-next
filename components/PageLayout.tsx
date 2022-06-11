import { ScriptProps } from "next/script";
import Link from "next/link";
import React from "react"
import { IUserAuthResponse } from "interfaces/User";

const PageLayout = ({ children }: ScriptProps) => {
  return (
    <>
    <div>
      <header className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>liveHUB</h1>
          </div>
        </div>
      </header>
    </div>
    <div className="row">
      <nav className="navbar navbar-expand py-0">
        <div className="container-fluid d-flex justify-content-center">
          <ul className="navbar-nav">
              <li className="nav-item"><Link href={"/"}><a className="nav-link">Home</a></Link></li>
              <li className="nav-item"><Link href={"/bands"}><a className="nav-link">Bands</a></Link></li>
              <li className="nav-item"><Link href={"/panel"}><a className="nav-link">Panel</a></Link></li>
          </ul>
        </div>
      </nav>

    </div>
      <main>{children}</main>
      <footer>copyright Livehub 2022</footer>
    </>
  );
};
export default PageLayout;
