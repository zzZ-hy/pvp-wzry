<template>
  <div class="login-container">
    <div class="login-flex">
      <el-card header="请先登录" class="login-card">
        <el-form @submit.native.prevent="login">
          <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="model.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" style="width: 100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login(){
      const res = await this.$http.post('login',this.model)
      sessionStorage.token = res.data.token
      sessionStorage.username = res.data.username
      this.$router.push('/')
      this.$message.success('登录成功')
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
}

.login-flex {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 30rem;
}
</style>