module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/mock.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    "getAdminCoupons",
    ()=>getAdminCoupons,
    "getAdminReturns",
    ()=>getAdminReturns,
    "getCart",
    ()=>getCart,
    "getInvoice",
    ()=>getInvoice,
    "getMe",
    ()=>getMe,
    "getOrders",
    ()=>getOrders,
    "getProduct",
    ()=>getProduct,
    "getProducts",
    ()=>getProducts,
    "getSellerProducts",
    ()=>getSellerProducts,
    "login",
    ()=>login,
    "register",
    ()=>register,
    "removeFromCart",
    ()=>removeFromCart,
    "requestReturn",
    ()=>requestReturn,
    "updateCoupon",
    ()=>updateCoupon,
    "updateReturnStatus",
    ()=>updateReturnStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock.ts [app-ssr] (ecmascript)");
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
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
async function getProducts() {
    try {
        const data = await apiFetch('/products');
        return data.data ?? [];
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockProducts"];
    }
}
async function getSellerProducts(token) {
    return apiFetch('/seller/products', {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockProducts"].find((p)=>p.id === Number(id)) ?? null;
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
async function getCart(token) {
    return apiFetch('/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function addToCart(token, productId, quantity) {
    return apiFetch('/cart/items', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            product_id: productId,
            quantity
        })
    });
}
async function removeFromCart(token, itemId) {
    return apiFetch(`/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
async function checkout(token, couponCode) {
    return apiFetch('/checkout', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            coupon_code: couponCode
        })
    });
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
async function getAdminReturns(token) {
    return apiFetch('/admin/returns', {
        headers: {
            Authorization: `Bearer ${token}`
        }
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
async function getInvoice(token, orderId) {
    return apiFetch(`/orders/${orderId}/invoice`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
}),
"[project]/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function setToken(token) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function setUser(user) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getUser() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function clearToken() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/lib/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useAuth() {
    const [user, setUserState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        const cached = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUser"])();
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMe"])(token).then((data)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setUser"])(data.user);
            setUserState(data.user);
        }).catch(()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearToken"])();
            setUserState(null);
        }).finally(()=>setLoading(false));
    }, []);
    return {
        user,
        loading
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05322be2._.js.map