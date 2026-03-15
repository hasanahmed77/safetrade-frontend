(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/mock.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockProducts",
    ()=>mockProducts
]);
const mockProducts = [
    {
        id: 1,
        seller_id: 1,
        title: 'Vintage DSLR Camera',
        description: 'Well maintained DSLR with two lenses.',
        category: 'Electronics',
        price: 320,
        image: 'https://placehold.co/600x400?text=Camera'
    },
    {
        id: 2,
        seller_id: 1,
        title: 'Ergonomic Office Chair',
        description: 'Comfortable chair with lumbar support.',
        category: 'Furniture',
        price: 140,
        image: 'https://placehold.co/600x400?text=Chair'
    },
    {
        id: 3,
        seller_id: 1,
        title: 'Mechanical Keyboard',
        description: 'Hot-swappable switches, RGB lights.',
        category: 'Accessories',
        price: 85,
        image: 'https://placehold.co/600x400?text=Keyboard'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/events.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EVENTS",
    ()=>EVENTS,
    "emitCartUpdated",
    ()=>emitCartUpdated,
    "emitNotificationsUpdated",
    ()=>emitNotificationsUpdated
]);
const EVENTS = {
    cartUpdated: 'safetrade:cart-updated',
    notificationsUpdated: 'safetrade:notifications-updated'
};
function emitCartUpdated() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new Event(EVENTS.cartUpdated));
}
function emitNotificationsUpdated() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new Event(EVENTS.notificationsUpdated));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "checkout",
    ()=>checkout,
    "createCoupon",
    ()=>createCoupon,
    "createProduct",
    ()=>createProduct,
    "deleteAdminProduct",
    ()=>deleteAdminProduct,
    "deleteAdminUser",
    ()=>deleteAdminUser,
    "getAdminCoupons",
    ()=>getAdminCoupons,
    "getAdminOrders",
    ()=>getAdminOrders,
    "getAdminPayments",
    ()=>getAdminPayments,
    "getAdminProducts",
    ()=>getAdminProducts,
    "getAdminReturns",
    ()=>getAdminReturns,
    "getAdminUsers",
    ()=>getAdminUsers,
    "getCart",
    ()=>getCart,
    "getInvoice",
    ()=>getInvoice,
    "getMe",
    ()=>getMe,
    "getNotifications",
    ()=>getNotifications,
    "getOrders",
    ()=>getOrders,
    "getProduct",
    ()=>getProduct,
    "getProducts",
    ()=>getProducts,
    "getReturns",
    ()=>getReturns,
    "getSellerOrders",
    ()=>getSellerOrders,
    "getSellerProducts",
    ()=>getSellerProducts,
    "login",
    ()=>login,
    "markNotificationRead",
    ()=>markNotificationRead,
    "register",
    ()=>register,
    "removeFromCart",
    ()=>removeFromCart,
    "requestReturn",
    ()=>requestReturn,
    "updateAdminUser",
    ()=>updateAdminUser,
    "updateCoupon",
    ()=>updateCoupon,
    "updateReturnStatus",
    ()=>updateReturnStatus,
    "upgradeToSeller",
    ()=>upgradeToSeller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/events.ts [app-client] (ecmascript)");
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:8000/api") ?? 'http://localhost:8000/api';
async function apiFetch(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options.headers ?? {}
        },
        cache: 'no-store'
    });
    if (!response.ok) {
        let message = 'Request failed';
        try {
            const data = await response.json();
            if (data?.message) {
                message = data.message;
            } else if (data?.errors) {
                message = Object.values(data.errors).flat().join(' ');
            }
        } catch  {
            const text = await response.text();
            if (text) message = text;
        }
        throw new Error(message);
    }
    return response.json();
}
async function getProducts(params) {
    const search = new URLSearchParams();
    if (params?.category) search.set('category', params.category);
    if (params?.sort) search.set('sort', params.sort);
    if (params?.page) search.set('page', String(params.page));
    if (params?.perPage) search.set('per_page', String(params.perPage));
    if (params?.q) search.set('q', params.q);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    try {
        const result = await apiFetch(`/products${suffix}`);
        if (result?.data && result?.last_page) {
            return {
                data: result.data,
                meta: {
                    last_page: result.last_page,
                    current_page: result.current_page
                }
            };
        }
        return result;
    } catch  {
        return {
            data: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"],
            meta: {
                last_page: 1,
                current_page: 1
            }
        };
    }
}
async function getSellerProducts(token) {
    return apiFetch('/seller/products', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getSellerOrders(token) {
    return apiFetch('/seller/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function createProduct(token, payload) {
    return apiFetch('/products', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
}
async function getProduct(id) {
    try {
        return await apiFetch(`/products/${id}`);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].find((p)=>p.id === Number(id)) ?? null;
    }
}
async function login(email, password) {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
}
async function register(name, email, password, role) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password,
            role
        })
    });
}
async function getMe(token) {
    return apiFetch('/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function upgradeToSeller(token) {
    return apiFetch('/me/role', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getCart(token) {
    return apiFetch('/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function addToCart(token, productId, quantity) {
    const cart = await apiFetch('/cart/items', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            product_id: productId,
            quantity
        })
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitCartUpdated"])();
    return cart;
}
async function removeFromCart(token, itemId) {
    const cart = await apiFetch(`/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitCartUpdated"])();
    return cart;
}
async function checkout(token, couponCode) {
    const result = await apiFetch('/checkout', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            coupon_code: couponCode
        })
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitCartUpdated"])();
    return result;
}
async function getOrders(token) {
    return apiFetch('/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getAdminCoupons(token) {
    return apiFetch('/admin/coupons', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getAdminUsers(token) {
    return apiFetch('/admin/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getAdminProducts(token) {
    return apiFetch('/admin/products', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getAdminOrders(token) {
    return apiFetch('/admin/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getAdminPayments(token) {
    return apiFetch('/admin/payments', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getAdminReturns(token) {
    return apiFetch('/admin/returns', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function deleteAdminProduct(token, id) {
    return apiFetch(`/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function updateAdminUser(token, id, role) {
    return apiFetch(`/admin/users/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            role
        })
    });
}
async function deleteAdminUser(token, id) {
    return apiFetch(`/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function createCoupon(token, payload) {
    return apiFetch('/admin/coupons', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
}
async function updateCoupon(token, id, payload) {
    return apiFetch(`/admin/coupons/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
}
async function updateReturnStatus(token, id, status) {
    return apiFetch(`/admin/returns/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            status
        })
    });
}
async function requestReturn(token, payload) {
    return apiFetch('/returns', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
}
async function getReturns(token) {
    return apiFetch('/returns', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getInvoice(token, orderId) {
    return apiFetch(`/orders/${orderId}/invoice`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function getNotifications(token) {
    return apiFetch('/notifications', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function markNotificationRead(token, id) {
    const item = await apiFetch(`/notifications/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitNotificationsUpdated"])();
    return item;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearToken",
    ()=>clearToken,
    "getToken",
    ()=>getToken,
    "getUser",
    ()=>getUser,
    "setToken",
    ()=>setToken,
    "setUser",
    ()=>setUser
]);
const TOKEN_KEY = 'safetrade_token';
const USER_KEY = 'safetrade_user';
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(TOKEN_KEY, token);
}
function setUser(user) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function getUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function clearToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useAuth() {
    _s();
    const [user, setUserState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
            const cached = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
            if (!token) {
                setUserState(null);
                setLoading(false);
                return;
            }
            if (cached) {
                setUserState(cached);
                setLoading(false);
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])(token).then({
                "useAuth.useEffect": (data)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUser"])(data.user);
                    setUserState(data.user);
                }
            }["useAuth.useEffect"]).catch({
                "useAuth.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearToken"])();
                    setUserState(null);
                }
            }["useAuth.useEffect"]).finally({
                "useAuth.useEffect": ()=>setLoading(false)
            }["useAuth.useEffect"]);
        }
    }["useAuth.useEffect"], []);
    return {
        user,
        loading
    };
}
_s(useAuth, "UWZogTguAh7FG4SDOV6Tl9YlpCU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/realtime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectRealtime",
    ()=>connectRealtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pusher$2d$js$2f$dist$2f$web$2f$pusher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pusher-js/dist/web/pusher.js [app-client] (ecmascript)");
'use client';
;
function connectRealtime(params) {
    const apiUrl = ("TURBOPACK compile-time value", "http://localhost:8000/api") ?? 'http://localhost:8000/api';
    const authUrl = apiUrl.replace(/\/api\/?$/, '') + '/broadcasting/auth';
    const key = ("TURBOPACK compile-time value", "local") ?? 'local';
    const host = ("TURBOPACK compile-time value", "127.0.0.1") ?? '127.0.0.1';
    const port = Number(("TURBOPACK compile-time value", "8080") ?? 8080);
    const scheme = ("TURBOPACK compile-time value", "http") ?? 'http';
    const pusher = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pusher$2d$js$2f$dist$2f$web$2f$pusher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](key, {
        cluster: 'mt1',
        wsHost: host,
        wsPort: port,
        wssPort: port,
        forceTLS: scheme === 'https',
        enabledTransports: [
            'ws',
            'wss'
        ],
        disableStats: true,
        authorizer: (channel)=>({
                authorize: async (socketId, callback)=>{
                    try {
                        const response = await fetch(authUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${params.token}`
                            },
                            body: JSON.stringify({
                                socket_id: socketId,
                                channel_name: channel.name
                            })
                        });
                        const data = await response.json();
                        callback(null, data);
                    } catch (error) {
                        callback(error, null);
                    }
                }
            })
    });
    const channel = pusher.subscribe(`private-users.${params.userId}`);
    channel.bind('notification.created', params.onNotification);
    return ()=>{
        channel.unbind_all();
        pusher.unsubscribe(`private-users.${params.userId}`);
        pusher.disconnect();
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/events.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/realtime.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function Header() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [cartCount, setCartCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [notifCount, setNotifCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const nav = [
        {
            href: '/',
            label: 'Home'
        },
        {
            href: '/shop',
            label: 'Shop'
        },
        {
            href: '/cart',
            label: 'Cart'
        },
        {
            href: '/orders',
            label: 'Orders'
        },
        ...user?.role === 'seller' ? [
            {
                href: '/dashboard',
                label: 'Seller'
            }
        ] : [],
        ...user?.role === 'admin' ? [
            {
                href: '/admin',
                label: 'Admin'
            }
        ] : []
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
            if (!token || !user) {
                setCartCount(0);
                setNotifCount(0);
                return;
            }
            const refreshCart = {
                "Header.useEffect.refreshCart": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCart"])(token).then({
                        "Header.useEffect.refreshCart": (cart)=>{
                            const count = cart.items?.reduce({
                                "Header.useEffect.refreshCart": (sum, item)=>sum + item.quantity
                            }["Header.useEffect.refreshCart"], 0) ?? 0;
                            setCartCount(count);
                        }
                    }["Header.useEffect.refreshCart"]).catch({
                        "Header.useEffect.refreshCart": ()=>setCartCount(0)
                    }["Header.useEffect.refreshCart"]);
                }
            }["Header.useEffect.refreshCart"];
            const refreshNotifs = {
                "Header.useEffect.refreshNotifs": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNotifications"])(token).then({
                        "Header.useEffect.refreshNotifs": (items)=>{
                            const unread = items.filter({
                                "Header.useEffect.refreshNotifs": (n)=>!n.read_at
                            }["Header.useEffect.refreshNotifs"]).length;
                            setNotifCount(unread);
                        }
                    }["Header.useEffect.refreshNotifs"]).catch({
                        "Header.useEffect.refreshNotifs": ()=>setNotifCount(0)
                    }["Header.useEffect.refreshNotifs"]);
                }
            }["Header.useEffect.refreshNotifs"];
            refreshCart();
            refreshNotifs();
            const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectRealtime"])({
                token,
                userId: user.id,
                onNotification: {
                    "Header.useEffect.disconnect": ()=>refreshNotifs()
                }["Header.useEffect.disconnect"]
            });
            const poll = window.setInterval({
                "Header.useEffect.poll": ()=>{
                    refreshCart();
                    refreshNotifs();
                }
            }["Header.useEffect.poll"], 10000);
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENTS"].cartUpdated, refreshCart);
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENTS"].notificationsUpdated, refreshNotifs);
            return ({
                "Header.useEffect": ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENTS"].cartUpdated, refreshCart);
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENTS"].notificationsUpdated, refreshNotifs);
                    disconnect();
                    window.clearInterval(poll);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        user
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "border-b border-white/10 bg-black/40 backdrop-blur",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "text-lg font-semibold tracking-[0.2em] text-neon",
                    children: "SAFETRADE"
                }, void 0, false, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "hidden items-center gap-6 text-sm text-white/70 md:flex",
                    children: nav.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: `hover:text-white ${pathname === item.href ? 'text-white' : ''}`,
                            children: item.label
                        }, item.href, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs uppercase tracking-[0.3em] text-white/60",
                                children: user.name
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                className: "btn-ghost relative",
                                "aria-label": "Cart",
                                title: "Cart",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this),
                                    cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-2 -right-2 rounded-full bg-neon px-1.5 py-0.5 text-[10px] font-semibold text-black",
                                        children: cartCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/notifications",
                                className: "btn-ghost relative",
                                "aria-label": "Notifications",
                                title: "Notifications",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this),
                                    notifCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-2 -right-2 rounded-full bg-ember px-1.5 py-0.5 text-[10px] font-semibold text-black",
                                        children: notifCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 112,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-ghost",
                                "aria-label": "Logout",
                                title: "Logout",
                                onClick: ()=>{
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearToken"])();
                                    window.location.href = '/';
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth/login",
                                className: "btn-ghost",
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth/register",
                                className: "btn-primary",
                                children: "Join"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Header.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Header.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(Header, "nq9NbxQHYLdzYVmIC8ID52AqBbA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5b875afe._.js.map