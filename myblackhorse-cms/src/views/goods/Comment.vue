<template>
    <div class="page">
        <Comment :artid="$route.query.id"></Comment>
    </div> 
</template>

<script>
import Comment from "@/components/comment.vue"
export default {
    components:{
        Comment
    }
}
</script>
