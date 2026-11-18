const API_BASE = 'http://localhost:8000/api';

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      query.append(key, val);
    }
  });
  const res = await fetch(`${API_BASE}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchSimilarProducts(id) {
  const res = await fetch(`${API_BASE}/products/${id}/similar`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchDeals() {
  const res = await fetch(`${API_BASE}/products/deals`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchBestOf() {
  const res = await fetch(`${API_BASE}/products/best-of`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchTopPicks() {
  const res = await fetch(`${API_BASE}/products/top-picks`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchBanners() {
  const res = await fetch(`${API_BASE}/banners`);
  if (!res.ok) return [];
  return res.json();
}

export async function sendOtp(phoneOrEmail) {
  const res = await fetch(`${API_BASE}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_or_email: phoneOrEmail })
  });
  return res.json();
}

export async function verifyOtp(phoneOrEmail, otp) {
  const res = await fetch(`${API_BASE}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_or_email: phoneOrEmail, otp })
  });
  return res.json();
}

export async function createOrder(orderData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchOrderById(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`);
  if (!res.ok) throw new Error('Order not found');
  return res.json();
}
