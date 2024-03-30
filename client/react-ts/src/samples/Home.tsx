import {Outlet} from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function Home(){
  return (
    <>
      <menu>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </menu>
      <Outlet/>
    </>
  );
}