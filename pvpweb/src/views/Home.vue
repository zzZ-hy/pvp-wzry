<template>
  <div class="home">
    <div>
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
          <img class="w-100" src="../assets/images/3.jpeg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/3.jpeg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/3.jpeg" alt="">
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
      </swiper>
      <!--   swper end   -->
      <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
        <div class="d-flex flex-wrap">
          <div class="nav-item mb-3" v-for="item in 12" :key="item">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </div>
        </div>
        <div class="bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
        </div>
      </div>
      <!--   nav-icons end   -->

      <my-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link tag="div"
                       :to="`/article/${item._id}`"
                       class="py-2 fs-lg d-flex ai-center"
                       v-for="item in category.newsList"
                       :key="item._id">
            <span class="border-cats p-1">{{ item.categoryName }}</span>
            <span class="flex-1 px-1 text-dark text-ellipsis">{{ item.title }}</span>
            <span class="text-grey-1 fs-sm">{{ item.createdAt | date }}</span>
          </router-link>
        </template>
      </my-list-card>

      <my-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
        <template #items="{category}">
          <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
            <router-link tag="div"
                         :to="`/hero/${item._id}`"
                         class="p-2 text-center"
                         style="width: 20%;"
                         v-for="item in category.heroList"
                         :key="item._id"
            >
              <img :src="item.avatar" class="w-100" alt="">
              <div>{{ item.name }}</div>
            </router-link>
          </div>
        </template>
      </my-list-card>

    </div>
  </div>
</template>

<script>

import dayjs from "dayjs";

export default {
  name: 'home',
  components: {},
  filters: {
    date(value) {
      return dayjs(value).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        },
        autoplay: {
          delay: 2000
        }
      },
      newsCats: [],
      heroCats: []
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    background: map-get($colors, 'white');
    border-radius: 0.1538rem;

    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;

    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>