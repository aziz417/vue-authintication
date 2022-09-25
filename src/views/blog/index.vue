<script setup>
import {RouterLink} from 'vue-router'
import {reactive} from 'vue'

const dataArray = reactive({blogs: ''});

import axios from "../../../axios";

const blogs = {};
const stringLimited = (str) => {
    if (str.length > 8) {
        return str.substring(0, 8) + '...'
    } else {
        return str
    }
}
const blogsGet = async () => {
    try {
        const {data} = await axios.get('/blogs/index/')
        dataArray.blogs = data.data;
    } catch (e) {
        console.log(e.response.error)
    }
}
blogsGet()

const deleteItem = (id) => {
    
    const itemDelete = async (id) => {
        try {
            const {data} = await axios.delete('/blogs/' + id + '/destroy/')
            if ( data.status === 200){
                // dataArray.blogs.splice(id, 1);
                alert(data.message)
            }
        } catch (e) {
            console.log(e.response.error)
        }
    }
    alert("are you sure delete this item")
    itemDelete(id)
}
</script>
<template>
    <div class="container">
        <RouterLink to="/blogs/create/">Add New</RouterLink>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Slug</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(blog, index) in dataArray.blogs" :key="blog.title">
                <th scope="row">{{ index }}</th>
                <td>{{ blog.title }}</td>
                <td>{{ blog.slug }}</td>
                <td>{{ blog.status === 'true' ? "Publish" : "UnPublish" }}</td>
                <td>{{ stringLimited(blog.description) }}</td>
                <td>
                    <RouterLink :to="`blogs/${blog.id}/?edit=true`">Edit</RouterLink>
                    <button v-on:click="deleteItem(blog.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    
</template>
