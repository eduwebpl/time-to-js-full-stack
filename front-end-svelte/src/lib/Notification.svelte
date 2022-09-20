<script>
    export let message = ''
    export let type = 'info'
    export let error = new Error('')

    const computedClass = `notification is-${type}`
    message = error?.response?.data?.message || error?.message  || message
</script>

<div class={computedClass}>
    {message}
</div>
