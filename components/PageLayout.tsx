import { ScriptProps } from "next/script";
import Link from "next/link";
import { IUserAuthResponse } from "interfaces/User";

const PageLayout = ({ children }: ScriptProps) => {
  return (
    <>
      <header>
          <h1>liveHUB</h1>
          
      </header>
      <nav>
          <ul>
              <li><Link href={"/"}><a>Home</a></Link></li>
              <li><Link href={"/bands"}><a>Bands</a></Link></li>
              <li><Link href={"/panel"}><a>Panel</a></Link></li>
          </ul>
      </nav>
      <main>{children}</main>
      <footer>copyright Livehub 2022</footer>
    </>
  );
};
export default PageLayout;
