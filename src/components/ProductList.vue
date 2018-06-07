<template>
    <div class="product-list-box">
        <div class="product-list">
            <div class="list">
                <router-link v-for="info of infos" :to="'/product/'+info._id" class="product" :key="info._id">
                <div class="main-pic">
                    <img :src="info.p_pics[0]" alt="">
                </div>
                <div class="spec">
                    <h4 class="title">{{info.p_name}}</h4>
                    <div class="price">{{'￥：'+info.p_price}}</div>
                </div>
            </router-link>
            </div>
            <div class="page-option" v-if="infos.length !=0">
                <button class="prev-page option" :disabled="!page.prevable" :class="{'no-allowed': !page.prevable}"
                @click="selectPrev">
                    <
                </button>
                <a href="javascript:;" v-for="(pageCode,index) of pageMount" class="option"
                :class="{highLightPage: index+1 == page.currentPage}" :data-index="index+1"
                @click="selectPage">
                    {{index+1}}
                </a>
                <button class="prev-page option" :disabled="!page.nextable" :class="{'no-allowed': !page.nextable}"
                @click="selectNext">
                    >
                </button>
            </div>
          
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      infos: [],
      page: {
        prevable: false,
        nextable: true,
        pageSum: 1,
        currentPage: 1
      }
    };
  },
  computed: {
    pageMount: function() {
      if (this.page.pageSum <= 6) return this.page.pageSum;
      return 6;
    }
  },
  beforeRouteUpdate(to, from, next) {
    let callback = function(pageInfo) {
      this.infos = pageInfo.infos;
      this.page.pageSum = pageInfo.pageSum;
      if (this.page.pageSum == 1) {
        this.page.prevable = false;
        this.page.nextable = false;
      }

      next();
    };
    if (to.query.p_keyword)
      //针对查询关键字时
      this.getRouteInfo(to, callback);
    else {
      let queryPage = to.query.page || 1;
      if (queryPage) {
        if (fetch) {
          fetch('/productList?page='+queryPage, {
            method: "get"
          })
            .then(response => {
              return response.json();
            })
            .then(infos => {
              // if (!sessionStorage["_" + (this.page.currentPage - 1)])
              //   sessionStorage[
              //     "_" + (this.page.currentPage - 1)
              //   ] = JSON.stringify(infos.list);
              this.infos = infos.list;
              this.page.currentPage = queryPage;
              if (this.page.currentPage == 1) {
                this.page.prevable = false;
                this.page.nextable = true;
              }
              if(this.page.currentPage == this.pageSum){
                this.page.prevable = true;
                this.page.nextable = false;
              }
              
              // this.$router.push({ query: { page: this.page.currentPage } });
              // _updateState.call(this);
            })
            .catch(err => {
              if (err){
                this.page.currentPage = from.query.page;
                throw err;
              } 
            });
        }
      }
      next();
    }
  },
  beforeRouteEnter(to, from, next) {
    let p_keyword = to.query.p_keyword;
    if (p_keyword) {
      console.log(p_keyword)
      if (fetch) {
        let request = new Request("/productList?p_keyword=" + p_keyword);
        fetch(request)
          .then(response => {
            return response.json();
          })
          .then(pageInfo => {
            console.log(pageInfo);
            next(vm => {
              console.log('inited...')
              vm.infos = pageInfo.infos;
              vm.page.pageSum = pageInfo.pageSum;
              if (vm.page.pageSum == 1) {
                vm.page.prevable = false;
                vm.page.nextable = false;
              }
            });
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    }
    else next();
  },
  created: function() {
    let queryPage = this.$route.query.page;
    if (!this.$route.query.p_keyword) {
      if (fetch) {
        queryPage = queryPage || 1;
        fetch("/productList?page=" + queryPage, {
          method: "get",
          headers: {
            // 'Accept': 'application/json'
          }
        })
          .then(response => {
            return response.json();
          })
          .then(infos => {
            console.log(infos);
            this.infos = infos.list;
            this.page.pageSum = infos.pageMount;
            if (this.page.pageSum == 1) {
              this.page.prevable = false;
              this.page.nextable = false;
            }
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    }
  },
  methods: {
    selectPage: function(event) {
      event = event || window.event;
      // function _stateUpdate() {
      //   this.page.currentPage = pageIndex;
      //   if (this.page.currentPage == 1) {
      //     this.page.prevable = false;
      //   } else {
      //     this.page.prevable = true;
      //   }
      //   if (this.page.currentPage == this.page.pageSum) {
      //     this.page.nextable = false;
      //   } else {
      //     this.page.nextable = true;
      //   }
      //   this.$router.push({ query: { page: pageIndex } });
      // }
      let pageIndex = parseInt(event.target.dataset.index); //先转换成整型，后面被坑到了。。。
      // if (sessionStorage["_" + pageIndex]) {
      //   this.infos = JSON.parse(sessionStorage["_" + pageIndex]);
      //   _stateUpdate.call(this);
      // } else
      if (fetch) {
        fetch(`/productList?page=${pageIndex}`, {
          method: "get"
        })
          .then(response => {
            return response.json();
          })
          .then(infos => {
            // if (!sessionStorage[pageIndex]) {
            //   sessionStorage.setItem(
            //     "_" + pageIndex,
            //     JSON.stringify(infos.list)
            //   );
            // }

            this.infos = infos.list;
            this.page.currentPage = pageIndex;
            if (this.page.currentPage == 1) {
              this.page.prevable = false;
            } else {
              this.page.prevable = true;
            }
            if (this.page.currentPage == this.page.pageSum) {
              this.page.nextable = false;
            } else {
              this.page.nextable = true;
            }
            this.$router.push({ query: { page: pageIndex } });
            // _stateUpdate.call(this);
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    },
    selectPrev: function() {
      // function _updateState() {
      //   this.page.currentPage = this.page.currentPage - 1;
      //   if (this.page.currentPage == 1) {
      //     this.page.prevable = false;
      //   }
      //   this.page.nextable = true;
      //   this.$router.push({ query: { page: this.page.currentPage } });
      // }
      // if (sessionStorage["_" + (this.page.currentPage - 1)]) {
      //   this.infos = JSON.parse(
      //     sessionStorage["_" + (this.page.currentPage - 1)]
      //   );
      //   _updateState.call(this);
      // } else

      console.log(this.$route);
      let p_keyword = this.$route.query.p_keyword;
      if (p_keyword) {
        let queryPage = this.$route.query.page;
        if (fetch) {
          let request = new Request(
            "/productList?p_keyword=" +
              p_keyword +
              "&&page=" +
              this.page.currentPage -
              1
          );
          fetch(request)
            .then(response => {
              return response.json();
            })
            .then(infos => {
              this.infos = infos.list;
              this.page.currentPage = this.page.currentPage - 1;
              if (this.page.currentPage == 1) {
                this.page.prevable = false;
              }
              this.page.nextable = true;
              this.$router.push(
                { path: this.$route.fullPath },
                { query: { page: this.page.currentPage } }
              );
            })
            .catch(err => {
              if (err) throw err;
            });
        }
      } else if (fetch) {
        fetch(`/productList?page=${this.page.currentPage - 1}`, {
          method: "get"
        })
          .then(response => {
            return response.json();
          })
          .then(infos => {
            // if (!sessionStorage["_" + (this.page.currentPage - 1)])
            //   sessionStorage[
            //     "_" + (this.page.currentPage - 1)
            //   ] = JSON.stringify(infos.list);
            this.infos = infos.list;
            this.page.currentPage = this.page.currentPage - 1;
            if (this.page.currentPage == 1) {
              this.page.prevable = false;
            }
            this.page.nextable = true;
            this.$router.push({ query: { page: this.page.currentPage } });
            // _updateState.call(this);
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    },
    selectNext: function() {
      // function _updateState() {
      //   this.page.currentPage = this.page.currentPage + 1;
      //   if (this.page.currentPage == this.page.pageSum)
      //     this.page.nextable = false;
      //   this.page.prevable = true;
      //   this.$router.push({ query: { page: this.page.currentPage } });
      // }
      // if (sessionStorage["_" + (this.page.currentPage + 1)]) {
      //   this.infos = JSON.parse(
      //     sessionStorage["_" + (this.page.currentPage + 1)]
      //   );
      //   _updateState.call(this);
      // } else
      let p_keyword = this.$route.query.p_keyword;
      if (p_keyword) {
        let queryPage = this.$route.query.page;
        if (fetch) {
          let request = new Request(
            "/productList?p_keyword=" +
              p_keyword +
              "&&page=" +
              this.page.currentPage +
              1
          );
          fetch(request)
            .then(response => {
              return response.json();
            })
            .then(infos => {
              this.infos = infos.list;
              this.page.currentPage = this.page.currentPage + 1;
              if (this.page.currentPage == this.page.pageSum)
                this.page.nextable = false;
              this.page.prevable = true;
              this.$router.push(
                { path: this.$route.fullPath },
                { query: { page: this.page.currentPage } }
              );
            })
            .catch(err => {
              if (err) throw err;
            });
        }
      } else if (fetch) {
        fetch(`/productList?page=${this.page.currentPage + 1}`, {
          method: "get"
        })
          .then(response => {
            return response.json();
          })
          .then(infos => {
            // if (!sessionStorage["_" + (this.page.currentPage + 1)])
            //   //如果在storage里没有查找到存储，进行存储
            //   sessionStorage[
            //     "_" + (this.page.currentPage + 1)
            //   ] = JSON.stringify(infos.list);
            this.infos = infos.list;
            this.page.currentPage = this.page.currentPage + 1;
            if (this.page.currentPage == this.page.pageSum)
              this.page.nextable = false;
            this.page.prevable = true;
            this.$router.push({ query: { page: this.page.currentPage } });
            // _updateState.call(this);
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    },
    getRouteInfo(to, callback) {
      let p_keyword = to.query.p_keyword;
      if (fetch) {
        let request = new Request("/productList?p_keyword=" + p_keyword);
        fetch(request)
          .then(response => {
            return response.json();
          })
          .then(pageInfo => {
            console.log(pageInfo);
            callback.call(this, pageInfo);
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    }
  },
  watch: {
    $route: function(to, from) {}
  }
};
</script>
<style>
.product-list {
  width: 1190px;
  margin: 0 auto;
  margin-top: 50px;
}
.product-list .list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 140px;
}
.product-list .product {
  width: 170px;
  padding: 10px;
  display: block;
  border: 1px solid rgb(210, 210, 210);
  margin: 10px;
}
.product-list .product:hover {
  box-shadow: 0px 0px 4px 3px rgb(233, 233, 233);
}
.product-list .product:hover .spec > .title {
  color: #9999ee;
}
.product-list .product > .main-pic {
  width: 100%;
  height: 200px;
}
.product-list .product > .main-pic > img {
  width: 100%;
  height: 100%;
}
.product-list .product > .spec > .title {
  width: 100%;
  margin: 0;
}
.product-list .product > .spec > .price {
  width: 100%;
  color: #99a4ef;
}
.page-option {
  display: flex;
  justify-content: center;
}
.page-option .option {
  text-align: center;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border: 1px solid rgb(210, 210, 210);
}
.no-allowed {
  cursor: not-allowed;
}
.highLightPage{
  color: rgb(124, 89, 188);
  font-weight: 700
}
</style>
