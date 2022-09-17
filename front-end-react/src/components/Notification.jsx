export function Notification({message = '', type = 'info'}) {
	return <div className={`notification is-${type}`}>
      {message}
  </div>;
}
