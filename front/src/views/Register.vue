<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template>
    <div class="register-container">
        <div class="left-section">
            <div class="image-wrapper">
                <img src="@/resource/04.jpg" class="background-image" />
                <div class="image-overlay">
                    <h2>开启旅程</h2>
                    <p>加入我们的奶茶世界</p>
                </div>
            </div>
        </div>
        <div class="right-section">
            <div class="register-box">
                <div class="title">
                    <img src="@/resource/03.png" class="logo" />
                    <h1>欢迎加入奶茶商城</h1>
                    <p class="subtitle">开启您的奶茶之旅</p>
                </div>
                <div class="form-container">
                    <el-form label-width="70px" class="register-form">
                        <el-form-item label="用户名">
                            <el-input
                                v-model.trim="user.username"
                                placeholder="请输入用户名"
                                prefix-icon="el-icon-user"
                                aria-required="true"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input
                                v-model.trim="user.password"
                                type="password"
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                show-password
                                aria-required="true"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input
                                v-model.trim="user.confirmPassword"
                                type="password"
                                placeholder="请再次输入密码"
                                prefix-icon="el-icon-lock"
                                show-password
                                aria-required="true"
                            ></el-input>
                        </el-form-item>
                        <el-form-item class="button-group">
                            <el-button
                                type="primary"
                                @click="onSubmit"
                                class="register-btn"
                            >注册</el-button>
                            <el-button
                                @click="$router.push('/login')"
                                class="back-btn"
                            >返回登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from "js-md5";


export default {
    name: "Login",
    data() {
        return {
            user: {},
        };
    },
    methods: {
        onSubmit() {
            if (
                this.user.username === "" ||
                this.user.password === "" ||
                this.user.confirmPassword === ""
            ) {
                this.$message.error("账号或密码不能为空");
                return false;
            }
            if (this.user.password !== this.user.confirmPassword) {
                this.$message.error("两次密码不一致");
                return false;
            }
            this.user.password = md5(this.user.password);
            this.request.post("/register", this.user).then((res) => {
                if (res.code === "200") {
                    this.$message.success("注册成功");
                    this.$router.push("/login");
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
    },
    mounted() {
        
    }
};
</script>

<style scoped>
.register-container {
    height: 100vh;
    display: flex;
    position: relative;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.left-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    padding: 20px;
}

.image-wrapper {
    width: 420px;
    height: 340px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    overflow: hidden;
    transition: all 0.3s ease;
}

.image-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}

.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.image-wrapper:hover .background-image {
    transform: scale(1.05);
}

.image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    color: white;
    text-align: center;
}

.image-overlay h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
}

.image-overlay p {
    margin: 5px 0 0;
    font-size: 16px;
    opacity: 0.9;
}

.right-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    padding: 20px;
}

.register-box {
    width: 380px;
    padding: 30px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.register-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.title {
    text-align: center;
    margin-bottom: 30px;
}

.logo {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.logo:hover {
    transform: scale(1.15) rotate(8deg);
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
}

h1 {
    font-size: 24px;
    color: #333;
    margin: 0;
    font-weight: 600;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
    font-weight: 400;
}

.form-container {
    margin-top: 20px;
}

.register-form {
    margin-top: 20px;
}

.button-group {
    margin-top: 30px;
    text-align: center;
}

.register-btn, .back-btn {
    width: 120px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.register-btn {
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    border: none;
    color: white;
}

.register-btn:hover {
    background: linear-gradient(45deg, #ff8e8e, #ff6b6b);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.back-btn {
    background: #f5f7fa;
    border: 1px solid #ff6b6b;
    color: #ff6b6b;
}

.back-btn:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #ff6b6b;
    border-color: #ff6b6b;
    transform: translateY(-2px);
}

:deep(.el-input__inner) {
    height: 40px;
    border-radius: 20px;
    padding-left: 15px;
    background: #f5f7fa;
    border: 1px solid #dcdfe6;
    transition: all 0.3s ease;
}

:deep(.el-input__inner:focus) {
    border-color: #ff6b6b;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
}

:deep(.el-form-item__label) {
    font-weight: 500;
    color: #333;
}

:deep(.el-input__prefix) {
    color: #ff6b6b;
}

@media (max-width: 768px) {
    .register-container {
        flex-direction: column;
    }
    
    .left-section, .right-section {
        padding: 20px;
    }
    
    .image-wrapper, .register-box {
        width: 100%;
        max-width: 380px;
    }
}

.back-to-login {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 12px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.back-to-login:hover {
    color: #ff6b6b;
    transform: translateX(-5px);
    background: rgba(255, 255, 255, 1);
}

.back-to-login i {
    margin-right: 5px;
    font-size: 16px;
}
</style>