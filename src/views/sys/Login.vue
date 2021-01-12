<template>
    <div class="levi-login">
        <div class="levi-login__header">
            <img class="logo" src="../../assets/images/logoy.png" />
            <h1 class="title">Welcome to Levi Vue Admin</h1>
        </div>
        <div class="levi-login__body">
            <div class="login-box">
                <a-form :model="formInline" @submit="handleSubmit" @submit.prevent>
                    <a-form-item>
                        <a-input v-model:value="formInline.user" placeholder="Username">
                            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input v-model:value="formInline.password" type="password" placeholder="Password">
                            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" :disabled="formInline.user === '' || formInline.password === ''"> Log in </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div class="levi-login__footer">
            <img class="logo" src="../../assets/images/logoy.png" />
            <p class="copyright">@copyright levi technology</p>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import router from '/@/router/index'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

export default {
    components: {
        UserOutlined,
        LockOutlined
    },
    data() {
        return {
            formInline: {
                user: 'admin1',
                password: '1234'
            }
        }
    },
    methods: {
        handleSubmit() {
            Cookies.set('token', 'whosyourdaddy')
            router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
.levi-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &__header {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 6vw;
        .logo {
            margin-right: 2vw;
        }
        .title {
            font-weight: normal;
            margin: 0;
            font-size: 3vmin;
            color: #2d2d2d;
        }
    }
    &__body {
        flex: 8;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: url('../../assets/images/bg.png') no-repeat center;
        background-size: 100% 100%;
        .login-box {
            background-color: #fff;
            margin-right: 10vw;
            padding: 4vh 2vw;
        }
    }
    &__footer {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
            margin-right: 2vw;
        }
        .copyright {
            margin: 0;
            font-size: 2vmin;
            color: #2d2d2d;
        }
    }
}
</style>
