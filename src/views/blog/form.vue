<script setup>
import {reactive} from 'vue'

const fromInputs = reactive({title: '', status: false, description: ''});
const formData = reactive({editData: ''});
import axios from "../../../axios"
import {useRoute} from 'vue-router'


const route = useRoute()
const id = route.params.id
if (id) {
    const editBlog = async () => {
        try {
            const {data} = await axios.get('/blogs/' + id + '/retrieve/')
            fromInputs.title = data.data.title;
            fromInputs.image = data.data.image;
            fromInputs.status = data.data.status;
            fromInputs.description = data.data.description;
        } catch (e) {
            console.log(e.response.error)
        }
    }
    editBlog()
}


const fromSubmit = async () => {
    try {
        if (id){
            formData.editData = await axios.patch('/blogs/'+id+'/update/', fromInputs)
        }else{
            formData.editData = await axios.post('/blogs/store/', fromInputs)
        }
        const { data } = formData.editData
        
        if ( formData.editData.status === 200){
            alert(data.message)
        }
    } catch (e) {
        console.log(e.response.error)
    }
}
</script>


<template>
    <div class="row d-flex ">
        <div class="col-sm-6">
            <h2>Blog Create</h2>
            <form @submit.prevent="fromSubmit">
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="text" v-model="fromInputs.title" id="title" class="form-control"/>
                    <label class="form-label" for="title">Title</label>
                </div>
                
                <!--                status-->
                <div class="form-check">
                    <input class="form-check-input" v-model="fromInputs.status" value="true" type="checkbox" id="status">
                    <label class="form-check-label" for="status">
                        Status
                    </label>
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" v-model="fromInputs.description" id="description"
                              rows="3"></textarea>
                </div>
                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
            </form>
        </div>
    </div>

</template>
