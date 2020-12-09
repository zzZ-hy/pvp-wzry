<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="info">
        <el-tab-pane label="基本信息" name="info">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="背景图片">
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="bannerUpload">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,index) in model.partners" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes"
                             :key="hero._id"
                             :value="hero._id"
                             :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="被谁克制" name="restrained">
          <el-button size="small" @click="model.restrained.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,index) in model.restrained" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes"
                             :key="hero._id"
                             :value="hero._id"
                             :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.restrained.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="克制谁" name="moderation">
          <el-button size="small" @click="model.moderation.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,index) in model.moderation" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes"
                             :key="hero._id"
                             :value="hero._id"
                             :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.moderation.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 2rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  props: ['id'],
  data() {
    return {
      model: {
        name: '',
        avatar: '',
        scores: {},
        skills: [],
        partners: [],
        restrained: [],
        moderation: []
      },
      categories: [],
      items: [],
      heroes: []
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'avatar', res.url)
      // this.model.avatar = res.url
    },
    bannerUpload(res) {
      this.$set(this.model, 'banner', res.url)
      // this.model.banner = res.url
    },
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/heroes', this.model)
      }
      this.$router.push('/heroes/list')
      this.$message.success('保存成功!')
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`)

      this.model = Object.assign({}, this.model , res.data)
      // this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)

      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)

      this.items = res.data
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`)

      this.heroes = res.data
    }
  },
  created() {
    this.id && this.fetch()
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes()
  }
}
</script>

<style scoped>

</style>