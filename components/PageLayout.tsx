import { ScriptProps } from "next/script";
import Link from "next/link";
import { IUserAuthResponse } from "interfaces/User";

interface PageLayoutProps extends ScriptProps {
  userData: IUserAuthResponse | null
}

const PageLayout = ({ children, userData }: PageLayoutProps) => {
  return (
    <>
      <header>
          <h1>liveHUB</h1>
          
      </header>
      <nav>
          <ul>
              <li><Link href={"/"}><a>Home</a></Link></li>
              <li><Link href={"/bands"}><a>Bands</a></Link></li>
              {userData==null?
              <li><Link href={"/login"}><a>Login</a></Link></li>
              :<li><Link href={`/panel/${userData.id}`}>Panel</Link></li>
            }
          </ul>
      </nav>
      <main>{children}</main>
      <footer>copyright Livehub 2022</footer>
    </>
  );
};
export default PageLayout;
