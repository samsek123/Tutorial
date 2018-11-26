<template>
  <div v-if="load">
    <div class="banner">
      <img v-bind:src="`${foldername}static/img/banner.png`" class="banner_img" />
    </div>
    <div class="headericon">
      <img v-bind:src="`${foldername}static/img/voteimage.png`" class="header_img" />
    </div>
    <div class="votewrapper">
      <p v-bind:class="type" class="vote_text" v-if="description">{{description}}</p>
      <div class="imagewrapper">
        <div
        v-for="(image, index) in imagelist"
        v-bind:key="image.id"
        v-bind:style="{ height: (height + 90) + 'px' }"
        class="vote_thumbnail">
          <div
          ref="gallery"
          class="gallery-wrapper"
          v-bind:style="{ height: height + 'px', 'background-image': `url(${image.picurl})` }"
          @click="previewindex = index">
          </div>
          <div class="image_wrapper_description">
            <div
            class="image_description"
            v-if="image.description"
            v-bind:class="image.language">
              {{`${image.description.substring(0, 15)}...`}}
            </div>
            <div class="vote_button">
              <div>
                <img
                @click="vote(image.id, 'unselect')"
                v-if="selectimagelist.includes(image.id)"
                class="vote_icon"
                v-bind:src="`${foldername}static/img/heart_vote.png`" />
                <img
                @click="vote(image.id, 'select')"
                v-else
                class="vote_icon"
                v-bind:src="`${foldername}static/img/heart_notvote.png`">
                <br/>
              </div>
              <span class="vote_num">{{(image.vote_num > 0) ? image.vote_num : ''}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_button">
      <img
      @click="voteimage"
      v-bind:src="`${foldername}static/img/button/button01_${type}.png`"
      class="overlaybutton"/>
      <img class="relative"
      v-bind:src="`${foldername}static/img/bottom.png`"/>
    </div>
    <div class="image-model" v-if="previewindex > -1">
      <div class="image-model-image">
        <div class="image-model-inner">
          <div class="close-icon" @click="previewindex = -1">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
          <div class="relative">
            <div v-if="previewindex > 0" class="leftbutton" @click="previewindex -= 1">
              <div class="icon-content">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </div>
            </div>
            <div
            v-if="previewindex < (imagelist.length-1)"
            class="rightbutton"
            @click="previewindex += 1">
              <div class="icon-content">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </div>
            <div class="overflowy scrollstyle">
              <img v-bind:src="imagelist[previewindex].picurl" />
            </div>
          </div>
          <div class="image-model-wrapper">
            <div
            class="image-model-description"
            v-bind:class="imagelist[previewindex].language"
            v-if="imagelist[previewindex].description">
              {{imagelist[previewindex].description}}
            </div>
            <div class="image-model-vote-button">
              <div>
                <img
                @click="vote(imagelist[previewindex].id, 'unselect')"
                v-if="selectimagelist.includes(imagelist[previewindex].id)"
                class="vote_icon"
                v-bind:src="`${foldername}static/img/heart_vote.png`" />
                <img
                @click="vote(imagelist[previewindex].id, 'select')"
                v-else
                class="vote_icon"
                v-bind:src="`${foldername}static/img/heart_notvote.png`" />
                <br/>
              </div>
              <span
              class="vote_num">
                {{(imagelist[previewindex].vote_num > 0) ? imagelist[previewindex].vote_num : ''}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tnc-model" v-if="tncmodel">
      <div class="tnc-model-image">
        <div class="tnc-model-inner">
          <p class="tnc-subtitle" v-bind:class="type">{{pageitem.tnc}}</p>
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
import { getconfig, checkvote, getimage, voteimage } from '../service';
import { foldername } from '../config';

export default {
  name: 'VotePage',
  data() {
    return {
      screenheight: 300,
      // show left
      tncmodel: true,
      // tnc model
      load: false,
      height: 0,
      // userid
      userid: '',
      // description
      description: '',
      tnc: '',
      pageitem: {},
      // imagelist
      imagelist: [],
      selectimagelist: [],
      // overlaybutton
      previewindex: -1,
      type: '',
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
      if (parseInt(result.result, 10) > 0) {
        // this.$router.push({ path: '/success' });
        window.location.href = './success';
      }
    }
    // check all description
    result = await getconfig(`${type}_description`);
    if (result.status !== 'error') {
      this.description = result.result;
    }
    result = await getconfig(`${type}_tnc`);
    if (result.status !== 'error') {
      this.tnc = result.result;
    }
    result = await getconfig(`${type}_votepage`);
    if (result.status !== 'error') {
      this.pageitem = JSON.parse(result.result);
    }
    // get all image
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
    vote(id, type) {
      if (type === 'select') {
        this.selectimagelist.push(id);
      } else {
        const position = this.selectimagelist.indexOf(id);
        this.selectimagelist.splice(position, 1);
      }
    },
    async voteimage() {
      const userid = localStorage.getItem('userid');
      if (this.selectimagelist.length <= 0) {
        /* eslint-disable */
        alert(this.pageitem.warning);
      } else {
        const requestlist = {
          action: 'voteimage',
          user_id: userid,
          image_list: this.selectimagelist,
        };
        const result = await voteimage(requestlist);
        if (result.status !== 'error') {
          // this.$router.push({ path: '/success' });
          window.location.href = './success';
        } else {
          /* eslint-disable */
          alert(result.result);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tnc-model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 300;
}
.facebook, .en {
  letter-spacing: 1px;
}
</style>
