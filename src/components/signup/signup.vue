<template>
    <div class="signup-form">
        <signup-form></signup-form>
        <common-footer style="clear: both;" class="hidden-xs-only"></common-footer>
    </div>
</template>

<script>
    import signupForm from './signup_form'
    import commonFooter from '../../components/common/footer'
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        name: "signup",
        components: {signupForm, commonFooter}
    }
</script>

<style scoped>
    .signup-form {
        background: url("../../assets/img/bg4.jpg");
        background-size: cover;
        min-height: 100vh;
    }
</style>