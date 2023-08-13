import Cookie from 'js-cookie'

const setCookie = (cookieName: string, cookieValue: string) => {
    Cookie.set(cookieName, cookieValue, {
        expires: 1, //7 Days
    })
}

export default setCookie