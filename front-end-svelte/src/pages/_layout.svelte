<script>
	import Header from '../lib/TheHeader.svelte';
    import TheMenu from '../lib/TheMenu.svelte';
	import UserNavBar from '../lib/UserNavBar.svelte';
</script>

<main class="container">
    <Header />
    <UserNavBar />
    <div class="columns">
        <div class="column is-2">
           <TheMenu />
        </div>
        <div class="column">
            <slot></slot>
        </div>
    </div>
</main>
