<script setup></script>

<template>
  <section>
    <h3 class="is-size-3 my-3">Sign to place the Order</h3>
    <form method="get" action="signed">
      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
          <input
            name="email"
            class="input"
            type="email"
            placeholder="Your e-mail"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            name="password"
            class="input"
            type="password"
            placeholder="Your password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" type="submit">Sign in</button>
        </div>
      </div>
    </form>
  </section>
</template>
