export function OrderPage() {
	return <section><h3 className="is-size-3 my-3">Order from: 01/09 12:58:34</h3>
		<div className="box">Restaurant: Sea food restaurant</div>
		<div className="box">Products:
			<ul>
				<li> 12.5 PLN</li>
				<li> 79.2 PLN</li>
			</ul>
		</div>
		<div className="box" style={{backgroundColor: 'lightgreen'}}>Delivery status:
			<div>DELIVERED (01/09 13:22:34)
				<hr />
					My HOME 455
			</div>
		</div>
	</section>;
}
