import React from 'react'
import { useLocation } from 'react-router-dom'

interface SearchParams {
    error?: string
    error_description?: string
    state?: string
    code?: string
    linkedin_redirect_url?: string
}

const LinkedInPopup = () => {
    
    const location = useLocation();
    const params = new URLSearchParams(location.search) as SearchParams
    if (params.error) {
        const errorMessage = params.error_description || 'Login failed. Please try again.';
        window.opener && window.opener.postMessage({ error: params.error, state: params.state, errorMessage, from: 'Linked In' }, window.location.origin);
        // Close tab if user cancelled login
        if (params.error === 'user_cancelled_login') {
          window.close();
        }
    }
    if (params.code) {
        window.opener && window.opener.postMessage({ code: params.code, state: params.state, from: 'Linked In'}, window.location.origin);
    }

    if(params.linkedin_redirect_url) {
        window.location.href = params.linkedin_redirect_url
      }
    
    return (
        <>
        </>
    )
}

export default LinkedInPopup