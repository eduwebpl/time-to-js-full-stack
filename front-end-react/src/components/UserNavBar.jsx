import { Link } from 'react-router-dom';

export function UserNavBar() {
	return <section className="is-flex is-justify-content-end	">
		<Link className="icon-text" to="/sign-in">
      <div className="box icon">🔑</div>
  </Link>
	</section>;
}
