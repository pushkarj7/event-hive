const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

export async function apiRequest(
  endpoint,
  { method = "GET", body, token, params } = {}
) {
  let url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params && typeof params === "object") {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (body !== undefined && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method,
    headers,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || `Request failed (${response.status})`);
  }

  return result;
}

// Event API helpers
export async function getEvents(filters = {}) {
  return apiRequest("/events", { method: "GET", params: filters });
}

export async function getEventById(id) {
  return apiRequest(`/events/${id}`, { method: "GET" });
}

export async function createEventApi(eventData, token) {
  return apiRequest("/events", { method: "POST", body: eventData, token });
}

export async function updateEventApi(id, updates, token) {
  return apiRequest(`/events/${id}`, { method: "PATCH", body: updates, token });
}

export async function deleteEventApi(id, token) {
  return apiRequest(`/events/${id}`, { method: "DELETE", token });
}

export async function registerApi(userData) {
  return apiRequest("/auth/register", { method: "POST", body: userData });
}

export async function uploadEventImageApi(file, token) {
  const formData = new FormData();
  formData.append("image", file);
  return apiRequest("/events/image", { method: "POST", body: formData, token });
}

