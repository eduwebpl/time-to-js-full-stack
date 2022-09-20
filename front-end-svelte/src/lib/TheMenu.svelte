<script>
	import { isActive, url } from '@roxi/routify'
    import { useQuery } from '@sveltestack/svelte-query';
    import { useOrdersQuery } from '../queries/useOrdersQuery.js';
    import { restaurantsResource } from '../resources/restaurants.resource.js';
    import Notification from './Notification.svelte';

    const restaurantsResult = useQuery(["restaurants"], restaurantsResource.getAll)
    const ordersResult = useOrdersQuery()

    $: ({ isLoading, isError, data, error } = $ordersResult)
</script>

<aside><p class="menu-label">Restaurants</p>
    <ul class="menu-list">
        {#if $restaurantsResult.isLoading }
            <li>
                <Notification message="Loading restaurants..." />
            </li>
        {:else if $restaurantsResult.isError}
            <li>
                <Notification message={$restaurantsResult.error.message} type="danger" />
            </li>
        {:else}
            {#each $restaurantsResult.data as {id, name}}
                {@const link = `/restaurants/${id}`}
                <li>
                    <a class:is-active={$isActive(link)} href={$url(link)}>{name}</a>
                </li>
            {/each}
        {/if}
    </ul>
    <p class="menu-label">Orders</p>
    <ul class="menu-list">
        {#if isLoading }
            <li>
                <Notification message="Loading orders..." />
            </li>
        {:else if isError}
            <li>
                <Notification error={error} type="danger" />
            </li>
        {:else}
            {#each data as {id, date}}
                {@const link = `/orders/${id}`}
                <li>
                    <a class:is-active={$isActive(link)} href={$url(link)}>{date}</a>
                </li>
            {/each}
        {/if}
    </ul>
</aside>
