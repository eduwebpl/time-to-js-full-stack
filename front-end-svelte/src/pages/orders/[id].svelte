<script>
    import { params } from '@roxi/routify'
    import { formatDate } from '../../date.helper';
    import Notification from '../../lib/Notification.svelte';
    import { useOrderQuery } from '../../queries/useOrdersQuery.js';

    $: orderResult = useOrderQuery($params.id)

    function getBackgroundColor (status = 'IN_PROGRESS') {
        return {
          IN_PROGRESS: "#e8d592",
          DELIVERED: "rgba(3,175,175,0.16)",
          CANCELED: "#ce3e3e",
        }[status] || ""
    }
</script>

<section>
    {#if $orderResult.isLoading}
        <Notification message="Loading order..."/>
    {:else if $orderResult.isError}
       <Notification error={$orderResult.error} type="danger"/>
    {:else}
        {@const {restaurant, date, products, delivery} = $orderResult.data}
        <h3 class="is-size-3 my-3">Order from: {formatDate(date)}</h3>
        <div class="box">Restaurant: {restaurant.name}</div>
        <div class="box">Products:
            <ul>
                {#each products as product}
                <li> {product.product.name} | {product.price} PLN</li>
                {/each}
            </ul>
        </div>
        <div class="box" style:background-color={getBackgroundColor(delivery.status)}>Delivery status:
            <div>
                {delivery.status} | {formatDate(delivery.deliveryDate)}
                <hr>
                {delivery.address}
            </div>
        </div>
    {/if}
</section>
