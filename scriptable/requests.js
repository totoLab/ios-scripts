// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: file-code;

// https://gist.github.com/yoav-lavi/11e6b9e8e5b807ff20ddbb7d9d515229

const post = async ({ url, body, headers = {} }) => {
    const request = new Request(url);
    request.body = JSON.stringify(body);
    request.method = methods.post;
    request.headers = {
      ...defaultHeaders,
      ...headers
    };
    return await request.loadJSON();
}

const put = async ({ url, body, headers = {} }) => {
    const request = new Request(url);
    request.body = JSON.stringify(body);
    request.method = methods.put;
    request.headers = {
      ...defaultHeaders,
      ...headers
    };
    return await request.loadJSON();
}

const get = async ({ url, headers = {} }) => {
    const request = new Request(url);
    request.method = methods.get;
    request.headers = {
      ...defaultHeaders,
      ...headers
    };
    return await request.loadJSON();
}

const defaultHeaders = {
	"Accept": "application/json",
	"Content-Type": "application/json"
}

const methods = {
  get: "GET",
  post: "POST",
  put: "PUT"
}

module.exports = {post, put, get}
