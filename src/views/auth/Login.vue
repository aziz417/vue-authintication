<script setup>
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import axios from "../../../axios"

const router = useRouter()

const fromInputs = reactive({email: '', password: ''});
const fromSubmit = async () => {
    try {
        const {data} = await axios.post('/auth/login/', fromInputs)
        localStorage.setItem("access_token", data.access_token)
        router.push({
            name: 'blog',
        })
    } catch (e) {
        console.log(e.response.error)
    }
    
}
</script>


<template>
    <div class="container">
        <h2>Login</h2>
        <form @submit.prevent="fromSubmit">
            <!-- Email input -->
            <div class="form-outline mb-4">
                <input type="email" v-model="fromInputs.email" id="form2Example1" class="form-control"/>
                <label class="form-label" for="form2Example1">Email address</label>
            </div>
            
            <!-- Password input -->
            <div class="form-outline mb-4">
                <input type="password" v-model="fromInputs.password" id="form2Example2" class="form-control"/>
                <label class="form-label" for="form2Example2">Password</label>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4">Login</button>
        </form>
    </div>


</template>
