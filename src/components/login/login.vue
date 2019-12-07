<template>
    <div class="login-form">
        <login-form style="height: calc(100vh - 2px);"></login-form>
        <common-footer class="hidden-xs-only"></common-footer>
    </div>
</template>

<script>
    import loginForm from './login_form'
    import commonFooter from '../../components/common/footer'
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        name: "login",
        components: {loginForm, commonFooter},
        mounted() {
            this.$axios.get(this.$api.logout).then(()=>{

            }).catch((error)=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .login-form {
        background: url("../../assets/img/bg3.png");
        background-size: cover;
        padding-top: 1px;
    }

</style>