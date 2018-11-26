 <template>
  <div v-if="load" class="wrapper">
    <div class="banner">
      <img v-bind:src="`${foldername}static/img/banner.png`" class="banner_img" />
    </div>
    <div class="headericon">
      <img v-bind:src="`${foldername}static/img/heartimage.png`" class="heart_image" />
      <img v-bind:src="`${foldername}static/img/heart_${type}.gif`" class="header_img" />
      <img v-bind:src="`${foldername}static/img/successimage.png`" class="success_image" />
    </div>
    <div class="bottom_button">
      <div class="button_list">
        <!-- img
        v-if="form && type === 'wechat'"
        @click="formprompt = !formprompt"
        v-bind:src="`${foldername}static/img/button/button05_${type}.png`"
        class="twobutton"/ -->
        <img
        @click="rankpage"
        v-bind:src="`${foldername}static/img/button/button02_${type}.png`"
        class="twobutton"/>
      </div>
      <img v-bind:src="`${foldername}static/img/bottom.png`"/>
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
    <div class="form-model" v-if="formprompt">
      <div class="form-model-image">
        <div class="form-model-inner">
          <div class="close-icon" @click="formprompt = false">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
          <p class="form-content scrollstyle" v-if="formdetail" v-html="formdetail"></p>
          <input type="text" class="forminput" v-model="name" v-bind:placeholder="pageitem.name" />
          <input
          type="text"
          class="forminput"
          v-model="email"
          v-bind:placeholder="pageitem.email" />
          <p class="remindermsg">{{pageitem.schoolreminder}}</p>
          <input
          type="text"
          class="forminput"
          v-model="subject"
          v-bind:placeholder="pageitem.school" />
          <p class="red" v-if="warning">{{warning}}</p>
          <p class="text-align-center margin-top">
            <img
            class="tncbutton"
            v-bind:src="`${foldername}static/img/button/button01_${type}.png`"
            @click="submitform" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { submitform, getconfig, checkvote, checkform } from '../service';
import { foldername } from '../config';

export default {
  name: 'SuccessPage',
  data() {
    return {
      formprompt: false,
      // show left
      tncmodel: false,
      // tnc model
      load: false,
      userid: '',
      tnc: '',
      formdetail: '',
      // form check
      form: false,
      // form content
      name: '',
      email: '',
      subject: '',
      // warning
      warning: '',
      type: '',
      // description
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
    result = await checkform(userid);
    if (result.status !== 'error') {
      if (parseInt(result.result, 10) <= 0) {
        this.form = true;
      }
    }
    result = await getconfig(`${type}_tnc`);
    if (result.status !== 'error') {
      this.tnc = result.result;
    }
    result = await getconfig(`${type}_form`);
    if (result.status !== 'error') {
      this.formdetail = result.result;
    }
    result = await getconfig(`${type}_successpage`);
    if (result.status !== 'error') {
      this.pageitem = JSON.parse(result.result);
    }
    this.load = true;
  },
  methods: {
    rankpage() {
      // this.$router.push({ path: '/rank' });
      window.location.href = './rank';
    },
    async submitform() {
      /* eslint-disable */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const userid = localStorage.getItem('userid');
      this.warning = '';
      if (!this.name || !this.email || !this.subject) {
        this.warning = this.pageitem.misswarning;
      } else if (!re.test(this.email)) {
        this.warning = this.pageitem.emailwarning;
      } else {
        const requestlist = {
          action: 'voterinsert',
          user_id: userid,
          name: this.name,
          email: this.email,
          subject: this.subject,
        };
        const result = await submitform(requestlist);
        if (result.status !== 'error') {
          this.formprompt = false;
          this.form = false;
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
.wrapper {
  position: relative;
}
.bottom_button {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>
