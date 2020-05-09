import { commontRouterMap } from '@/router'

const mutations = {
    set_routers: (state, routers) => {
        state.routersComponents = commontRouterMap.concat(routers)
    }
}

export default mutations