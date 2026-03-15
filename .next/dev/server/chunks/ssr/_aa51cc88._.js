module.exports = [
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
"[project]/app/auth/register/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function RegisterPage() {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('buyer');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubmit = async ()=>{
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["register"])(name, email, password, role);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setToken"])(result.token);
            setStatus('Account created.');
        } catch (error) {
            setStatus(error?.message ?? 'Registration failed.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-md space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-semibold",
                children: "Create account"
            }, void 0, false, {
                fileName: "[project]/app/auth/register/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input",
                        placeholder: "Full name",
                        value: name,
                        onChange: (event)=>setName(event.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/auth/register/page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input",
                        placeholder: "Email",
                        value: email,
                        onChange: (event)=>setEmail(event.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/auth/register/page.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input",
                        type: "password",
                        placeholder: "Password",
                        value: password,
                        onChange: (event)=>setPassword(event.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/auth/register/page.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "input",
                        value: role,
                        onChange: (event)=>setRole(event.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "buyer",
                                children: "Buyer"
                            }, void 0, false, {
                                fileName: "[project]/app/auth/register/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "seller",
                                children: "Seller"
                            }, void 0, false, {
                                fileName: "[project]/app/auth/register/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/auth/register/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-primary",
                        onClick: handleSubmit,
                        children: "Create account"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/register/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/60",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/app/auth/register/page.tsx",
                        lineNumber: 58,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/auth/register/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/auth/register/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_aa51cc88._.js.map