<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from "../axios";
const logout = () => {
    const lOut = async () => {
        localStorage.clear()
        try {
            const {data} = await axios.post('/auth/logout/')
            router.push({
                name: 'home',
            })
        }catch (e) {
            console.log(e.response.error)
        }
        
    }
    lOut();
}
</script>

<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <RouterLink class="nav-item nav-link" to="/">Home</RouterLink>
                    <RouterLink class="nav-item nav-link" to="/blogs">Blogs</RouterLink>
                    <RouterLink class="nav-item nav-link" to="/login">Login</RouterLink>
                    <RouterLink class="nav-item nav-link" v-on:click="logout()" to="#">Logout</RouterLink>
                </div>
            </div>
        </nav>
    </div>
  <RouterView />
</template>

<style scoped>

</style>
