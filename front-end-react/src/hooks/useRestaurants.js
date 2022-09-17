import { useEffect, useState } from 'react';
import { restaurantsResource } from '../resources/restaurants.resource';

export function useRestaurants() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()
	const [restaurants, setRestaurants] = useState([])

	useEffect(() => {

		restaurantsResource.getAll()
			.then((data) => {
				// console.log(data)
				setRestaurants(data)
			}).catch(err => {
			setError(err)
		}).finally(() => {
			setLoading(false)
		})
	}, [])

	 return {loading, error, restaurants}
}
