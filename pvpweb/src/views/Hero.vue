<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/images/logo.png" height="30">
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-3">攻略站</span>
      </div>
      <router-link tag="div" :to="`/`" class="text-white fs-xs">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{backgroundImage: `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">{{ heroCategories }}</div>
        <div class="d-flex jc-between py-1">
          <div class="scores" v-if="model.scores">
            <span class="text-grey-2">难度</span>
            <span class="badge bg-primary text-grey-2">{{ model.scores.difficult }}</span>
            <span class="text-grey-2">技能</span>
            <span class="badge bg-blue-1 text-grey-2">{{ model.scores.skills }}</span>
            <span class="text-grey-2">攻击</span>
            <span class="badge bg-danger text-grey-2">{{ model.scores.attack }}</span>
            <span class="text-grey-2">生存</span>
            <span class="badge bg-dark-2 text-grey-2">{{ model.scores.survive }}</span>
          </div>
          <router-link tag="span" to="/" class="text-gery fs-sm text-grey-2">皮肤: 4&gt;</router-link>
        </div>
      </div>
    </div>
    <!--  bg end  -->

    <div class="content-body">
      <div class="nav jc-around mx-3 py-3 fs-lg border-bottom">
        <div class="nav-item pt-2"
             :class="{active:active === i}"
             v-for="(item,i) in ['英雄初识','进阶攻略']"
             :key="i"
             @click="$refs.list.$swiper.slideTo(i)">
          <div class="nav-link">{{item}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list"
                @slide-change="()=> active = $refs.list.$swiper.realIndex"
                :options="{autoHeight: true}"
        >
          <swiper-slide>
            <div>
              <div>
                <div class="d-flex jc-around">
                  <button class="py-2">英雄介绍视频</button>
                  <button class="py-2">一图识英雄 &nbsp;&nbsp;</button>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            1111111
          </swiper-slide>
        </swiper>
      </div>
<!--      <div class="bg-white">-->
<!--        <div class="d-flex jc-around mx-3 py-3 fs-lg border-bottom">-->
<!--          <div class="text-dark">英雄初识</div>-->
<!--          <div class="text-dark">进阶攻略</div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    id: {required: true}
  },
  data() {
    return {
      model: null,
      active: 0
    }
  },
  computed: {
    heroCategories() {
      if (this.model.categories.length > 1) {
        return this.model.categories.map(v => v.name).join('/')
      } else {
        return this.model.categories.map(v => v.name).join('')
      }
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/hero/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }

  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    .scores {
      .badge {
        margin: 0 0.7rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, .2);
      }
    }
  }
}
</style>