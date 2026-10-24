import {apiRequest} from "./apiClient";
export const getEvents = (params = {}) => {
    const query =  new URLSearchParams();
    for(const [key,value] of Object.entries(params)) {
        if(value !== undefined && value !== null && value !==""){
            query.set(key,String(value));
        }
    }
    const search = query.toString();
    return apiRequest(
        `/events${search ? `?${search}` : ""}`
    );
};
export const getEventById = (id) => apiRequest(`/events/${id}`);
export const createEvent = (eventData,token) => 
    apiRequest("/events",{
        method: "POST",
        body: eventData,
        token,
    });
export const updateEvent = (id,updates,token) => 
   apiRequest(`/events/${id}`,{
    method: "PATCH",
    body: updates,
    token,
   });
export const deleteEvent = (id,token) => 
    apiRequest(`/events/${id}`,{
        method: "DELETE",
        token,
    });
export const uploadEventImage = (file,token) => {
    const formData = new FormData();
    formData.append("image",file);
    return apiRequest("/events/image",{
        method: "POST",
        body: formData,
        token,
    });
};
