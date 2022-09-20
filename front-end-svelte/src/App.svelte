<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <Router {routes} />
</QueryClientProvider>
