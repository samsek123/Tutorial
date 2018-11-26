<template>
  <div v-if="load">
    <div class="banner">
      <img v-bind:src="`${foldername}static/img/banner.png`" class="banner_img" />
    </div>
    <div class="headericon">
      <img
      v-bind:src="`${foldername}static/img/heartimage.png`"
      class="heart_image"
      style="margin-bottom: -10%;" />
      <img
      v-bind:src="`${foldername}static/img/rankimage_${type}.png`"
      class="header_img"
      style="width: 80%; margin-left: 10%;" />
      <div
      v-bind:key="item.id"
      class="container rankwrapper"
      v-for="(item, index) in imagelist">
        <div class="col-xs-3 vertical-align support-text">
          {{pageitem.number}}{{index+1}}{{pageitem.rank}}
        </div>
        <div class="col-xs-2 vertical-align">
          <div class="gallery-thumbnail">
            <div
            ref="gallery"
            class="gallery-wrapper"
            v-bind:style="{ height: height + 'px', 'background-image': `url(${item.picurl})` }"
            >
            </div>
            <div
            ref="gallery"
            class="gallery-wrapper gallery-wrapper-overlay"
            v-bind:style="{ height: height + 'px', 'background-image': `url(${item.picurl})` }"
            >
            </div>
          </div>
        </div>
        <div class="col-xs-4 vertical-align support-text">
          {{item.name}}
        </div>
        <div class="col-xs-3 vertical-align heart-icon">
          <i class="fa fa-heart" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;{{item.numberofvote}}
        </div>
      </div>
    </div>
    <div class="bottom_button">
      <div class="button_list">
        <img
        v-if="type==='wechat'"
        @click="shareinfo"
        v-bind:src="`${foldername}static/img/button/button03_${type}.png`"
        class="twobutton"/>
        <a href="https://www.facebook.com/sharer/sharer.php?u=http://clients.atwemine.cn/ust_valentine/" target="_blank">
          <img
          v-if="type==='facebook'"
          @click="sharefacebook"
          v-bind:src="`${foldername}static/img/button/button03_${type}.png`"
          class="twobutton"/>
        </a>
      </div>
      <img v-bind:src="`${foldername}static/img/bottom.png`"/>
    </div>
    <div v-if="wechatshare" class="share-wrapper" @click="wechatshare = !wechatshare">
      <img v-bind:src="`${foldername}static/img/icon_share.png`" class="share-icon"/>
    </div>
    <div class="tnc-model" v-if="tncmodel">
      <div class="tnc-model-image">
        <div class="tnc-model-inner">
          <p class="tnc-subtitle">{{pageitem.tnc}}</p>
          <div class="tnc-content scrollstyle" v-if="tnc" v-html="tnc"></div>
          <p class="text-align-center">
            <img
            class="tncbutton"
            v-bind:src="`${foldername}static/img/button/button04_${type}.png`"
            @click="tncmodel = false" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import { getconfig, checkvote, getimage } from '../service';
import { foldername } from '../config';

export default {
  name: 'SuccessPage',
  data() {
    return {
      height: 0,
      // show left
      tncmodel: false,
      wechatshare: false,
      imagelist: [],
      // tnc model
      load: false,
      userid: '',
      type: '',
      tnc: '',
      // page description
      pageitem: {},
      foldername,
    };
  },
  async mounted() {
    const type = localStorage.getItem('type');
    const userid = localStorage.getItem('userid');
    this.userid = userid;
    this.type = type;
    if (!userid) {
      window.location.href = './oauth/auth.php';
    }
    // check vote
    let result = await checkvote(userid);
    if (result.status !== 'error') {
      if (parseInt(result.result, 10) <= 0) {
        // this.$router.push({ path: '/vote' });
        window.location.href = './vote';
      }
    }
    result = await getconfig(`${type}_tnc`);
    if (result.status !== 'error') {
      this.tnc = result.result;
    }
    result = await getconfig(`${type}_rankpage`);
    if (result.status !== 'error') {
      this.pageitem = JSON.parse(result.result);
    }
    result = await getimage();
    if (result.status !== 'error') {
      const beforefilter = result.result;
      const afterfilter = [];
      beforefilter.forEach((element) => {
        const tempelement = element;
        tempelement.numberofvote = parseInt(tempelement.numberofvote, 10);
        if (tempelement.numberofvote < 10) {
          tempelement.vote_num = tempelement.numberofvote;
        } else if (tempelement.numberofvote >= 10) {
          tempelement.vote_num = `${Math.floor(tempelement.numberofvote / 10)} +`;
        }
        afterfilter.push(element);
      });
      afterfilter.sort((a, b) => {
        if (parseInt(a.numberofvote, 10) < parseInt(b.numberofvote, 10)) {
          return 1;
        }
        if (parseInt(a.numberofvote, 10) >= parseInt(b.numberofvote, 10)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      if (afterfilter.length > 5) {
        afterfilter.splice(5, afterfilter.length - 5);
      }
      this.imagelist = afterfilter;
    }
    this.load = true;
    const that = this;
    Vue.nextTick(() => {
      that.height = that.$refs.gallery[0].clientWidth;
      that.screenheight = screen.height * 0.4;
    });
  },
  methods: {
    shareinfo() {
      if (this.type === 'wechat') {
        this.wechatshare = !this.wechatshare;
      } else {
        // share facebook
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gallery-wrapper {
  border-radius: 50%;
}
.gallery-thumbnail {
  position: relative;
  width: 50px;
  height: 50px;
}
.gallery-wrapper {
  z-index: 10;
  margin-top: 0;
  margin-bottom: 0;
}
.gallery-wrapper-overlay {
  -webkit-filter: blur(1px);
  filter: blur(1px);
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  z-index: 0;
}
</style>
