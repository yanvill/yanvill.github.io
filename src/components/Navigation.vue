<template>
    <nav class="navbar navbar-dark bg-dark">
      <router-link
        to="/"
        tag="a"
        class="navbar-brand">Yannick Villanueva</router-link>

      <router-link
        to="/contact"
        tag="a"
        class="nav-link">Contact</router-link>
    </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
  .navbar {
    padding: 0.5rem 1rem;
    justify-content: inherit;
  }

  .nav-link {
    color: white;
  }

  .nav-link:hover {
    color: gray;
  }

  .nav-link:focus, .nav-link:active {
    color: black;
  }

</style>
