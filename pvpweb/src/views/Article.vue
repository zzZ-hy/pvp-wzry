<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-xs">2020-12-09</div>
    </div>
    <div class="px-3 body fs-xl" v-html="model.body"></div>
    <div class="px-3 py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link tag="div"
                     :to="`/article/${item._id}`"
                     class="py-1 d-flex"
                     v-for="item in model.related"
                     :key="item._id"
        >
          <div class="flex-1">{{item.title}}</div>
          <div class="text-grey fs-xs">2020-12-09</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    id: {required: true}
  },
  data(){
    return {
      model: null
    }
  },
  watch: {
    id: 'fetch'
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
      console.log(this.model);
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: 1px solid;
    }
  }
}
</style>