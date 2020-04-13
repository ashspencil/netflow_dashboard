<template>
    <v-app id="inspire">
        <v-container fluid v-for="align in alignments" :key="align.lab" class="grey lighten-5 ma-0 pa-0">
            <v-col no-gutters v-for="a in 1" :key="a" class="pa-0"> <!--不動-->
                <v-card dark flat class="pa-2 text-center">
                    LAB - ST{{ align.lab}}
                </v-card>
                <v-row no-gutters> <!--toobar 不動-->
                    <v-col v-for="(n, i) in 2" :key="i">
                        <v-card flat color="teal darken-1" class="pa-1">
                            <v-row class="pa-0 ma-1"> <!--微調過於繁瑣 直接以&nbsp;調整-->
                                {{ align.port[i].name }}
                                <v-row justify="end" v-if="!loading">
                                    <v-btn rounded color="success"
                                        :disabled="align.port[i].operstatus === 2">
                                        <v-icon left>done</v-icon> RUNNING
                                    </v-btn>
                                    &nbsp;
                                    <v-btn rounded color="warning"
                                        :disabled="align.port[i].adminstatus === 1">
                                        <v-icon left>warning</v-icon> STOPING
                                    </v-btn>
                                    &nbsp;
                                    <v-btn rounded color="error"
                                        :disabled="align.port[i].suspendedstatus === 2">
                                        <v-icon left>error</v-icon> SUSPENDED
                                    </v-btn>
                                    &nbsp;
                                    <v-btn fab x-small dark color="primary"
                                        @click="loadingDatas(align.port[i])">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    &nbsp;&nbsp;
                                </v-row>
                            </v-row>
                        </v-card>
                        <v-card flat class="pa-0">
                            <v-img :src="align.port[i].graph" :aspect-ratio="12/5"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-container>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class="headline">修改設定</v-card-title>
                    <v-col align="center">
                        <v-select
                            v-model="action"
                            :items="selections"
                            :menu-props="{ maxHeight: '300' }"
                            label="Select"
                            hint="選取欲修改之設定"
                            persistent-hint>
                        </v-select>
                    </v-col>
                    <v-col align="end">
                        <v-btn color="red darken-1" text @click="dialog = false">
                            取消
                        </v-btn>
                        <v-btn color="green darken-1" text @click="updateDatas()">
                            確認
                        </v-btn>
                    </v-col>
            </v-card>
        </v-dialog>
        <v-snackbar
          v-model="SnackbarVisiable"
          :color="SnackbarColor"
          :right="true"
          :top="true"
          :timeout=3000
          :multi-line="true"
        >
        {{ SnackbarMessage }}
        </v-snackbar>
    </v-app>
</template>

<script>

import { getSnmpWalkAll, updateStatus } from '@/apis/snmp'

export default {
  data () {
    return {
      device: 'nmg',
      dialog: false,
      loading: false,
      ifAdminStatusDatas: [],
      ifOperStatusDatas: [],
      ifOperSuspendedStatusDatas: [],
      selections: [ 'Admin', 'Suspended' ],
      action: '',
      SnackbarVisiable: false,
      SnackbarColor: 'success',
      SnackbarMessage: '',
      datas: {},
      alignments: [
        {
          lab: 'lab-1',
          port: [
            {
              name: 'port-1',
              graph: '這是lab-1的port1'
            },
            {
              name: 'port-2',
              graph: '這是lab-1的port2'
            }
          ]
        },
        {
          lab: 'lab-2',
          port: [
            {
              name: 'port-3',
              graph: '這是lab-2的port1'
            },
            {
              name: 'port-4',
              graph: '這是lab-2的port2'
            }
          ]
        },
        {
          lab: 'lab-3',
          port: [
            {
              name: 'port-5',
              graph: '這是lab-3的port1'
            },
            {
              name: 'port-6',
              graph: '這是lab-3的port2'
            }
          ]
        },
        {
          lab: 'lab-4',
          port: [
            {
              name: 'port-7',
              graph: '這是lab-4的port1'
            },
            {
              name: 'port-8',
              graph: '這是lab-4的port2'
            }
          ]
        },
        {
          lab: 'lab-5',
          port: [
            {
              name: 'port-9',
              graph: '這是lab-5的port1'
            },
            {
              name: 'port-10',
              graph: '這是lab-5的port2'
            }
          ]
        },
        {
          lab: 'lab-6',
          port: [
            {
              name: 'port-11',
              graph: '這是lab-6的port1'
            },
            {
              name: 'port-12',
              graph: '這是lab-6的port2'
            }
          ]
        },
        {
          lab: 'lab-7',
          port: [
            {
              name: 'port-13',
              graph: '這是lab-7的port1'
            },
            {
              name: 'port-14',
              graph: '這是lab-7的port2'
            }
          ]
        },
        {
          lab: 'lab-8',
          port: [
            {
              name: 'port-15',
              graph: '這是lab-8的port1'
            },
            {
              name: 'port-16',
              graph: '這是lab-8的port2'
            }
          ]
        },
        {
          lab: 'lab-9',
          port: [
            {
              name: 'port-17',
              graph: '這是lab-9的port1'
            },
            {
              name: 'port-18',
              graph: '這是lab-9的port2'
            }
          ]
        },
        {
          lab: 'lab-10',
          port: [
            {
              name: 'port-19',
              graph: '這是lab-10的port1'
            },
            {
              name: 'port-20',
              graph: '這是lab-10的port2'
            }
          ]
        },
        {
          lab: 'lab-11',
          port: [
            {
              name: 'port-21',
              graph: '這是lab-11的port1'
            },
            {
              name: 'port-22',
              graph: '這是lab-11的port2'
            }
          ]
        },
        {
          lab: 'lab-12',
          port: [
            {
              name: 'port-23',
              graph: '這是lab-12的port1'
            },
            {
              name: 'port-24',
              graph: '這是lab-12的port2'
            }
          ]
        },
        {
          lab: 'lab-13',
          port: [
            {
              name: 'port-25',
              graph: '這是lab-13的port1'
            },
            {
              name: 'port-26',
              graph: '這是lab-13的port2'
            }
          ]
        },
        {
          lab: 'lab-14',
          port: [
            {
              name: 'port-27',
              graph: '這是lab-14的port1'
            },
            {
              name: 'port-28',
              graph: '這是lab-14的port2'
            }
          ]
        },
        {
          lab: 'lab-15',
          port: [
            {
              name: 'port-29',
              graph: '這是lab-15的port1'
            },
            {
              name: 'port-30',
              graph: '這是lab-15的port2'
            }
          ]
        },
        {
          lab: 'lab-16',
          port: [
            {
              name: 'port-31',
              graph: '這是lab-16的port1'
            },
            {
              name: 'port-32',
              graph: '這是lab-16的port2'
            }
          ]
        },
        {
          lab: 'lab-17',
          port: [
            {
              name: 'port-33',
              graph: '這是lab-17的port1'
            },
            {
              name: 'port-34',
              graph: '這是lab-17的port2'
            }
          ]
        },
        {
          lab: 'lab-18',
          port: [
            {
              name: 'port-35',
              graph: '這是lab-18的port1'
            },
            {
              name: 'port-36',
              graph: '這是lab-18的port2'
            }
          ]
        },
        {
          lab: 'lab-19',
          port: [
            {
              name: 'port-37',
              graph: '這是lab-19的port1'
            },
            {
              name: 'port-38',
              graph: '這是lab-19的port2'
            }
          ]
        },
        {
          lab: 'lab-20',
          port: [
            {
              name: 'port-39',
              graph: '這是lab-20的port1'
            },
            {
              name: 'port-40',
              graph: '這是lab-20的port2'
            }
          ]
        },
        {
          lab: 'lab-21',
          port: [
            {
              name: 'port-41',
              graph: '這是lab-21的port1'
            },
            {
              name: 'port-42',
              graph: '這是lab-21的port2'
            }
          ]
        },
        {
          lab: 'lab-22',
          port: [
            {
              name: 'port-43',
              graph: '這是lab-22的port1'
            },
            {
              name: 'port-44',
              graph: '這是lab-22的port2'
            }
          ]
        },
        {
          lab: 'lab-23',
          port: [
            {
              name: 'port-45',
              graph: '這是lab-23的port1'
            },
            {
              name: 'port-46',
              graph: '這是lab-23的port2'
            }
          ]
        },
        {
          lab: 'lab-24',
          port: [
            {
              name: 'port-47',
              graph: '這是lab-24的port1'
            },
            {
              name: 'port-48',
              graph: '這是lab-24的port2'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.loading = true
    this.getDatas()
  },
  methods: {
    getDatas () {
      getSnmpWalkAll({
        device: this.device
      })
        .then(response => {
          this.ifAdminStatusDatas = response.data.admin.slice(0, 48)
          this.ifOperStatusDatas = response.data.oper.slice(0, 48)
          this.ifOperSuspendedStatusDatas = response.data.suspended.slice(0, 48)
          this.fetchDatas(this.ifAdminStatusDatas, this.ifOperStatusDatas, this.ifOperSuspendedStatusDatas, this.alignments)
          this.loading = false
        })
        .catch(error => {
          if (error.response.status !== 200) {
            this.showSnackbar('error', `讀取Switch狀態失敗`)
          }
        })
    },
    fetchDatas (source1, source2, source3, target) {
      let count = 0
      for (var i = 0; i < target.length; i++) {
        for (var j = 0; j <= 1; j++) {
          target[i].port[j].adminoid = source1[count].Name
          target[i].port[j].adminstatus = source1[count].Value
          target[i].port[j].operstatus = source2[count].Value
          target[i].port[j].suspendedoid = source3[count].Name
          target[i].port[j].suspendedstatus = source3[count].Value
          count++
        }
      }
    },
    loadingDatas (item) {
      this.dialog = true
      this.datas = item
    },
    updateDatas () {
      updateStatus({
        device: this.device,
        action: this.action,
        adminoid: this.datas.adminoid,
        adminstatus: this.datas.adminstatus,
        suspendedoid: this.datas.suspendedoid,
        suspendedstatus: this.datas.suspendedstatus
      })
        .then(response => {
          this.dialog = false
          this.showSnackbar('success', `更改${this.action}狀態成功`)
          this.action = ''
          this.getDatas() // refresh
        })
        .catch(error => {
          if (error.response.status !== 200) {
            this.dialog = false
            this.showSnackbar('error', `更改${this.action}狀態失敗`)
            this.action = ''
          }
        })
    },
    showSnackbar (status, message) {
      this.SnackbarColor = status
      this.SnackbarMessage = message
      this.SnackbarVisiable = true
    }
  }
}
</script>
