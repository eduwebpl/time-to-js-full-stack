<script>
    import { goto } from '@roxi/routify';
    import { useMutation } from '@sveltestack/svelte-query';
    import { invalidateOrders } from '../queries/useOrdersQuery.js';
    import { authResource } from '../resources/auth.resource.js';
    import { authStore } from '../stores/auth.store.js';

    const credentials = {
		email: '',
        password: ''
    }

    $: isValid = Boolean(credentials.email && credentials.password)
    const mutation = useMutation( ({ email, password }) => authResource.signIn(email, password))
    const invalidate =  invalidateOrders()

	function handleSubmit() {
        if(!isValid) {
		    return
        }
        $mutation.mutate(credentials, {
            onSuccess: ({token}) => {
              authStore.singIn(credentials.email, token)
              $goto('/')
            },
            onError: () => authStore.signOut(),
            onSettled: () => invalidate()
        })
    }
</script>

<section>
    <h3 class="is-size-3 my-3">Sign to place the Order</h3>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="field"><label class="label">E-mail</label>
            <div class="control"><input name="email" class="input" type="email"
                                        bind:value={credentials.email}
                                        placeholder="Your e-mail"></div>
        </div>
        <div class="field"><label class="label">Password</label>
            <div class="control"><input name="password" class="input" type="password"
                                        bind:value={credentials.password}
                                        placeholder="Your password"></div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-link" type="submit">Sign in</button>
            </div>
        </div>
    </form>
</section>
