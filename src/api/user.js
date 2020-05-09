import request from '@/utils/request'

export function login(data) {
    return request({
        url: 'v1/login/login',
        method: 'post',
        data
    })
}


export function userList(params) {
    return request({
        url: 'v1/admin_user/lists',
        method: 'get',
        params
    })
}

// | edit | del
export function userAdd(data) {
    return request({
        url: 'v1/admin_user/add',
        method: 'post',
        data
    })
}

export function userEdit(data) {
    return request({
        url: 'v1/admin_user/edit',
        method: 'post',
        data
    })
}

export function userDel(data) {
    return request({
        url: 'v1/admin_user/del',
        method: 'post',
        data
    })
}

export function getMenuList(params) {
    return request({
        url: 'v1/menu/getmenujson',
        method: 'get',
        params
    })
}



export function getlists(params) {
    return request({
        url: 'v1/menu/lists',
        method: 'get',
        params
    })
}

export function editMenu(data) {
    return request({
        url: 'v1/menu/edit',
        method: 'post',
        data
    })
}

export function delMenu(data) {
    return request({
        url: 'v1/menu/del',
        method: 'post',
        data
    })
}

export function addMenu(data) {
    return request({
        url: 'v1/menu/add',
        method: 'post',
        data
    })
}

export function getNavigateLists(params) {
    return request({
        url: 'v1/nav/lists',
        method: 'get',
        params
    })
}

export function addNavigateLists(data) {
    return request({
        url: 'v1/nav/add',
        method: 'post',
        data
    })
}

export function delNavigateLists(data) {
    return request({
        url: 'v1/nav/del',
        method: 'post',
        data
    })
}

export function ediNavigateLists(data) {
    return request({
        url: 'v1/nav/edit',
        method: 'post',
        data
    })
}

export function getNavTypeLists(params) {
    return request({
        url: 'v1/nav_type/lists',
        method: 'get',
        params
    })
}

export function delNavTypeLists(data) {
    return request({
        url: 'v1/nav_type/del',
        method: 'post',
        data
    })
}

export function editNavTypeLists(data) {
    return request({
        url: 'v1/nav_type/edit',
        method: 'post',
        data
    })
}

export function addNavTypeLists(data) {
    return request({
        url: 'v1/nav_type/add',
        method: 'post',
        data
    })
}

export function getnavjson(params) {
    return request({
        url: 'v1/nav/getnavjson',
        method: 'get',
        params
    })
}

export function getnavtypejson(params) {
    return request({
        url: 'v1/nav_type/getnavtypejson',
        method: 'get',
        params
    })
}

export function addStrategy(data) {
    return request({
        url: 'v1/strategy/add',
        method: 'post',
        data
    })
}

export function editStrategy(data) {
    return request({
        url: 'v1/strategy/edit',
        method: 'post',
        data
    })
}

export function delStrategy(data) {
    return request({
        url: 'v1/strategy/del',
        method: 'post',
        data
    })

}
export function getStrategy(params) {
    return request({
        url: 'v1/strategy/lists',
        method: 'get',
        params
    })
}