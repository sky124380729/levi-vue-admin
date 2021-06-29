<template>
    <div class="levi-login">
        <div class="levi-login__header">
            <img class="logo" src="../../assets/images/logo.png" />
            <h1 class="title">Welcome to Levi Vue Admin</h1>
        </div>
        <div class="levi-login__body">
            <div class="login-box">
                <a-page-header :ghost="false" title="Welcome to Levi Vue Admin">
                    <a-form layout="vertical" :model="model" @submit.prevent="handleLogin">
                        <a-form-item>
                            <a-input v-model:value="model.username" placeholder="username">
                                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="model.password" type="password" placeholder="password">
                                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button class="submit" type="primary" html-type="submit"> Login </a-button>
                        </a-form-item>
                    </a-form>
                </a-page-header>
            </div>
        </div>
        <div class="levi-login__footer">
            <img class="logo" src="../../assets/images/logo.png" />
            <p class="copyright">@copyright levi technology</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import storage from '@pinkbin/storage'
import router from '/@/router/index'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '/@/apis/modules/login'

export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined
    },
    setup() {
        const model = reactive({
            username: 'levi',
            password: '123456'
        })
        const handleLogin = async () => {
            const { username, password } = model
            const res = await login({
                username,
                password
            })
            if (!res) return
            storage.cookie.set('token', res.data.token)
            router.push('/')
        }
        const schemas = ref([{ key: 'username', component: 'Input' }])
        return {
            model,
            handleLogin,
            schemas
        }
    }
})
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
            height: 2.2vw;
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
            padding: 2vh 1.2vw;
            border-radius: 0.5vh 0.5vw;
        }
        .submit {
            width: 100%;
            height: 36px;
        }
    }
    &__footer {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
            margin-right: 2vw;
            height: 2.2vw;
        }
        .copyright {
            margin: 0;
            font-size: 2vmin;
            color: #2d2d2d;
        }
    }
}
</style>
