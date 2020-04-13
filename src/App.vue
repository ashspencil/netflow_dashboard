<template>
    <v-app>
        <!-- 側邊導覽列 -->
        <v-navigation-drawer app v-model="drawer">

            <!-- 網頁標題 -->
            <v-list-item to="/">
                <v-list-item-content>
                    <v-list-item-title class="title"> 選單列 </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <!-- 選單 -->
            <v-list shaped>
                <v-list-item-group v-model="item" color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.href" @click.stop="drawer = !drawer">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>

        <!-- 頂部導覽列 -->
        <v-app-bar app color="primary" dark collapse>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <!-- 內容區塊 -->
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>

        <!-- footer -->
        <v-footer app class="justify-center"></v-footer>

    </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      item: 1,
      items: [
        {
          text: 'ST三樓北(SW: 220)',
          icon: 'mdi-clock',
          href: '/switch3fn'
        },
        {
          text: 'ST四樓南(SW: 230)',
          icon: 'mdi-account',
          href: '/switch4fs'
        },
        {
          text: 'ST四樓北(SW: 240)',
          icon: 'mdi-flag',
          href: '/switch4fn'
        },
        {
          text: 'NMG',
          icon: 'mdi-flag',
          href: '/nmg'
        }
      ]
    }
  }
}
</script>
<style scope>
    .v-application a {
        color: #000000;
    }
</style>
