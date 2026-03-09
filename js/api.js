 
const API_BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

 
async function fetchAllIssues() {
    try {
        console.log('Fetching from:', `${API_BASE_URL}/issues`);
        const response = await fetch(`${API_BASE_URL}/issues`);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API response:', result);
        
        return result.data || [];
    } catch (error) {
        console.error('Error fetching all issues:', error);
        throw error;
    }
}
 
async function fetchIssueById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/issue/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // Return the data object from the response
        return result.data || null;
    } catch (error) {
        console.error('Error fetching issue:', error);
        throw error;
    }
}

 
async function searchIssues(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/issues/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
       
        return result.data || [];
    } catch (error) {
        console.error('Error searching issues:', error);
        throw error;
    }
}

 
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
