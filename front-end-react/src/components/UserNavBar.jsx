import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function UserNavBar() {
  const { isAuth, signOut } = useContext(AuthContext);

  return (
    <section className="is-flex is-justify-content-end	">
      {
        isAuth ?
          <button className="button is-warning" onClick={() => signOut()}> ⤴ </button>
          :
          <Link className="icon-text" to="/sign-in">
            <div className="box icon">🔑</div>
          </Link>
      }
    </section>
  );
}
