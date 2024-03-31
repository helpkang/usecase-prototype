import {Outlet} from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function Home(){
  return (
    <>
      <menu>
        <Link to="/">Home</Link>
        |
        <Link to="/product-local">Product-Local</Link>
        <Link to="/product-api">Product-API</Link>
      </menu>
      <Outlet/>
    </>
  );
}