<template>
<el-container style="height:calc(100% - 62px);margin-top:2px">
  <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
    <leftMenu style="margin-top:5px"></leftMenu>
  </el-aside>
  <el-main>
    <imgMenuShowComp></imgMenuShowComp>

    <button type="button" name="button" @click="save()">save</button>
    <button type="button" name="button" @click="get()">get</button>
    <button type="button" name="button" @click="add()">add</button>
    <button type="button" name="button" @click="update()">update</button>
    <button type="button" name="button" @click="clear()">clear</button>

  </el-main>
</el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'

export default {
  data() {
    return {
      db: null,
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted() {},
  methods: {
    save() {
      let customerData = {
        name: "degAB",
        value: [
          {
            ssn: "555",
            id:12,
            name:'z',
            age:100
          },
          {
            ssn: "666",
            id:2,
            name:'zz',
            age:1000
          }
        ]
      }
      let dbName = "deg"
      var request = indexedDB.open(dbName, 2)
      request.onerror =  (e) => {}
      request.onupgradeneeded = (e) => {
        this.db = e.target.result
        var objectStore = this.db.createObjectStore("customers", {keyPath:'name', autoIncrement:true})
        // objectStore.add(customerData)
      }
      request.onsuccess = (e) => {
        console.log("success!");
        this.db = e.target.result
      }
      request.onerror = (e) => {
        console.log("error!");
        console.log(e);
      }

    },
    get () {
      var tx = this.db.transaction('customers','readonly')
      var store = tx.objectStore("customers")
      var req
      req = store.count()
      console.log(req)
      req.onsuccess = (e) => {
        console.log('success2')
      }
      req.onerror = (e) => {
        console.log('error2')
      }
      req = store.openCursor()
      req.onsuccess = (e) => {
        var cursor = e.target.result
        if (cursor) {
          console.log(cursor.value);
          cursor.continue()
        }
      }


    },
    add () {
      if(this.db) {
        var i = Date.parse(new Date()).toString().substr(0,10);
        var tx = this.db.transaction("customers","readwrite")
        var store = tx.objectStore("customers")
        var req = store.add({name: "z", age: 40, id: "id"+i});
        req.onsuccess = (e) => {
          this.get()
        }
        req.onerror = (e) => {
          console.log("error3");
        }
      }

    },
    clear () {
      var tx = this.db.transaction("customers","readwrite")
      var store = tx.objectStore("customers")
      store.clear()
      this.get()
    },
    update () {
      let self = this
      var tx = this.db.transaction('customers', 'readwrite');
      var store = tx.objectStore('customers');
      var req = store.get('degAB');
      req.onsuccess=function(e){
          var student=e.target.result;
          if (!student) {
            store.add({name: "degAB", value: [1,2,3]});
          } else {
            student.value = [5,6,7];
            store.put(student);
          }
      }

    },
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
</style>
