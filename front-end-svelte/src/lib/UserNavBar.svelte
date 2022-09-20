<script>
	import { authStore, isAuth } from '../stores/auth.store.js';
</script>

<section class="is-flex is-justify-content-end	">
    {#if $isAuth}
        <button class="button is-warning" on:click={() => authStore.signOut()} > ⤴</button>
    {:else }
    <a class="icon-text" href="/sign-in">
        <div class="box icon">🔑</div>
    </a>
    {/if}
</section>
