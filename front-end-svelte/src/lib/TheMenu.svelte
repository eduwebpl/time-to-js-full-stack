<script>
	import { isActive, url } from '@roxi/routify'

    const restaurants = [
			{id: 1, name: 'Example'},
			{id: 2, name: 'Example 2'},
			{id: 3, name: 'Example 3'},
    ]

    const orders = [
        {id: 1, date: '02/09'},
        {id: 2, date: '04/09'},
        {id: 3, date: '06/09'}
    ]
</script>

<aside><p class="menu-label">Restaurants</p>
    <ul class="menu-list">
        {#each restaurants as {id, name}}
            {@const link = `/restaurants/${id}`}
            <li>
                <a class:is-active={$isActive(link)} href={$url(link)}>{name}</a>
            </li>
        {/each}
    </ul>
    <p class="menu-label">Orders</p>
    <ul class="menu-list">
        {#each orders as {id, date}}
            {@const link = `/orders/${id}`}
            <li>
                <a class:is-active={$isActive(link)} href={$url(link)}>{date}</a>
            </li>
        {/each}
    </ul>
</aside>
