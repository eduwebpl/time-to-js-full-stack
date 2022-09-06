export function SignInPage() {

	const handleSubmit = (ev) => ev.preventDefault()

	return <section><h3 className="is-size-3 my-3">Sign to place the Order</h3>
		<form onSubmit={handleSubmit}>
			<div className="field"><label className="label">E-mail</label>
				<div className="control"><input name="email" className="input" type="email"
				                                placeholder="Your e-mail" /></div>
			</div>
			<div className="field"><label className="label">Password</label>
				<div className="control">
					<input name="password" className="input" type="password"
				                                placeholder="Your password" />
				</div>
			</div>
			<div className="field">
				<div className="control">
					<button className="button is-link" type="submit">Sign in</button>
				</div>
			</div>
		</form>
	</section>;
}
