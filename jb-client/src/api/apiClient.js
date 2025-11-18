
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:6790';
const PRODUCTS_ENDPOINT = `${API_URL}/products`;
const IMG_BASE_URL = `${API_URL}/images/`;


// append query string, if it exists
const buildUrlWithQuery = (url, queryParams) => {
  const params = new URLSearchParams(queryParams);
  return `${url}${params.toString()}`;
}

// handle get requests, parsing the response as JSON
const handleGet = async (url, queryParams = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const response = await fetch(`${url}`);
  if (response.ok) {
    return await response.json();
  } else {
    console.error(`GET request to ${url} failed: ${response.statusText}`);
    throw new Error(`GET request to ${url} failed: ${response.statusText}`);
  }
}

const handlePost = async (url, body, queryParams = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`POST request to ${url} failed: ${response.statusText}`);
  }
};

const handlePatch = async (url, body, queryParams = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`PATCH request to ${url} failed: ${response.statusText}`);
  }
};

export { 
  handleGet,
  handlePost,
  handlePatch,
  API_URL,
  PRODUCTS_ENDPOINT, 
  IMG_BASE_URL,
};