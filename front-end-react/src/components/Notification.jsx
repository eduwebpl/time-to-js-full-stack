export function Notification({message = '', type = 'info'}) {
	return <li className={`notification is-${type}`}>
      {message}
  </li>;
}
