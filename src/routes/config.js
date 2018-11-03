export default {
    menus: [ // 菜单相关路由
        {
            key: '/app/award', title: '圈子发奖', icon: 'copy',
            subs: [
                { key: '/app/award/receive', title: '领取中', component: 'Receive'},
                { key: '/app/award/closeing', title: '已关闭', component: 'CloseIng'},
            ],
        },
       
        {
            key: '/app/user', title: '用户管理', icon: 'area-chart',
            subs: [
                { key: '/app/chart/echarts', title: '普通用户', component: 'Echarts' },
                { key: '/app/chart/recharts', title: '屏蔽中', component: 'Recharts' },
            ],
        },
        {
            key: '/app/brand', title: '品牌管理', icon: 'area-chart',
            subs: [
                { key: '/app/brand/add', title: '新建品牌', component: 'Add' },
                { key: '/app/brand/online', title: '上线品牌', component: 'Online' },
                { key: '/app/brand/shield', title: '已屏蔽', component: 'Shield' },
            ],
        },
       
    ],
    others: [] // 非菜单相关路由
}