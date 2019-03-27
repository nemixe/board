<template>
    <a class="button is-white width-max border-gray" style="justify-content: left;text-align: left">
        <div style="justify-content: left">
            {{ value.name }}
        </div>
    </a>
</template>

<script>
export default {
     props: {
        value: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="stylus" scoped>
    .border-gray
        border: 1px solid #ebebeb;
</style>
