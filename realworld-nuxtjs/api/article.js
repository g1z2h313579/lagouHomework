import {request} from '@/plugins/request'

export const getArticles = (params) => {
    return request({
        method : 'GET',
        url : '/api/articles',
        params
    })
}


export const getFeedArticles = (params) => {
    return request({
        method : 'GET',
        url : '/api/articles/feed',
        // headers : {
        //     Authorization : `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMzNjk4LCJ1c2VybmFtZSI6Imd6aCIsImV4cCI6MTYxNTY4NzY2NX0.Eof044pGZyj_At7xB2r4dvzO6t1Y7BynIXmWxvJ_BTg`
        // },
        params
    })
}

export const addFavorite = slug => {
    return request({
        method : 'POST',
        url : `/api/articles/${slug}/favorite`,
    })
}

export const deleteFavorite = slug => {
    return request({
        method : 'DELETE',
        url : `/api/articles/${slug}/favorite`,
    })
}

export const getArticle = slug => {
    return request({
        method : 'GET',
        url : `/api/articles/${slug}`,
    })
}

export const getComments = slug => {
    return request({
        method : 'GET',
        url : `/api/articles/${slug}/comments`,
    })
}
