const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const PRODUCTS_ENDPOINT = `${API_URL}/products`;

const buildUrlWithQuery = (url, queryParams) => {
  const params = new URLSearchParams(queryParams);
  return `${url}${params.toString()}`;
}

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
    return response.statusText;
  } else {
    throw new Error(`POST request to ${url} failed: ${response.statusText}`);
  }
};

const handleDelete = async (url, queryParams = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (response.ok) {
    return response.statusText;
  } else {
    throw new Error(`DELETE request to ${url} failed: ${response.statusText}`);
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
    return response.statusText;
  } else {
    throw new Error(`PATCH request to ${url} failed: ${response.statusText}`);
  }
};

export { 
  handleGet, 
  handlePost, 
  handleDelete,
  handlePatch,
  PRODUCTS_ENDPOINT, 
};