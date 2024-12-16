I'll help you create a Markdown markup for this content. Here's a clean, structured version:

# Proxy Server for API Key Security

This proxy server securely relays requests to external APIs, protecting sensitive API keys from being exposed in client-side applications.

## Features

- Hides API keys by managing them server-side.
- Enables secure communication between the client and external APIs.
- Implements CORS to support cross-origin requests.

## Usage

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd <repository-folder>
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add your API key:
for example existing endpoint is a chat with Jamba 1.5 model https://docs.ai21.com/reference/jamba-15-api-ref

```plaintext
STUDIO_AI_21_API_KEY=your_api_key_here
```

5. Start the server:

```bash
npm run build
```

6. Make requests to the proxy endpoint:

for example
```bash
POST http://localhost:3000/proxy/santa
```

## Example

**Client-side Request:**

```javascript
const response = await fetch("http://localhost:3000/proxy/santa", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({messages: [{role: 'user', content: "user messge"}]}),
});
const data = await response.json();
console.log(data);
```

Вот оформленный раздел Customization в Markdown:

## Customization

You can easily add new endpoints to the server by extending the Express configuration in `server.js`. For example:

```javascript
app.post('/custom-endpoint', async (req, res) => {
  // Your custom logic here
});
```

## License

This project is open-source and available under the MIT License.
