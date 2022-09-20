<script>
	import { params } from '@roxi/routify'
    import { useMutation, useQuery } from '@sveltestack/svelte-query';
    import { onDestroy } from 'svelte';
	import Notification from '../../lib/Notification.svelte';
    import { invalidateOrders } from '../../queries/useOrdersQuery.js';
    import { ordersResource } from '../../resources/orders.resource.js';
	import { restaurantsResource } from '../../resources/restaurants.resource.js';
    import { isAuth } from '../../stores/auth.store.js';

	$: restaurantResult = useQuery(["restaurants", $params.id], () => restaurantsResource.getOne($params.id))
    const makeOrder = useMutation(({ address, productsIds, restaurantId }) =>
			ordersResource.makeOrder({
				address,
				productsIds,
				restaurantId,
			})
		);
    const invalidate =  invalidateOrders()

    let deliveryAddress = ''
    let selectedIds = {};
	$: selectedIdKeys = Object.entries(selectedIds).filter(([, value]) => value).map(([key]) => Number(key))
    $: isOrderValid = Boolean(selectedIdKeys.length && deliveryAddress)
    $: fullPrice = ($restaurantResult.data?.products || [])
				.filter((p) => selectedIdKeys.includes(p.id))
				.map((p) => p.price)
				.reduce((a, b) => a + b, 0)

    function handleMakeOrderClick() {
		if(!isOrderValid) {
			return
        }
	    $makeOrder.mutate({ address: deliveryAddress, productsIds: selectedIdKeys, restaurantId: Number($params.id) }, {
				onSuccess() {
					invalidate()
					selectedIds = {}
				}
        })
    }

    const unsubscribe = params.subscribe(() => {
	    selectedIds = {}
    })

    onDestroy(unsubscribe)
</script>

<section>
    {#if $restaurantResult.isLoading}
        <Notification message="Loading restaurant..."/>
    {:else if $restaurantResult.isError}
        <Notification error={$restaurantResult.error} type="danger"/>
    {:else}
        {@const {name, address, products} = $restaurantResult.data}
        <h3 class="is-size-3 my-3">{name}</h3>
        <div class="box">{address}</div>
        <article class="panel is-info"><p class="panel-heading">Delivery menu</p>
            {#each products as {id, name, price}}
            <div class="panel-block">
                <label class="checkbox">
                    <input type="checkbox" bind:checked={selectedIds[id]}> {name} | {price}zł</label>
            </div>
            {/each}
        </article>
        {#if $isAuth}
            <div class="box">
                <label>
                    <span>Delivery address: </span>
                    <textarea class="textarea" bind:value={deliveryAddress}></textarea>
                </label>
            </div>
            <div class="is-flex is-justify-content-end">
                <button class="button is-link is-light" style:opacity={isOrderValid ? 1 : 0.5} on:click={handleMakeOrderClick}>
                    🛵 Order selected ({fullPrice} zł)
                </button>
            </div>
        {/if}
    {/if}
</section>
