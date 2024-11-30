import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Set up the proxy to forward requests to the external API
app.use('/api', createProxyMiddleware({
  target: 'https://extensions.chatgptextension.ai', // Replace with your target API
  changeOrigin: true, // Adjust the origin to match the target server
  pathRewrite: {
    '^/api': '', // Strip '/api' from the start of the request path
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request: ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('Error during proxy request:', err);
    res.status(500).json({ message: 'Proxy request failed' });
  }
}));

// Log requests that hit the proxy server
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Start the server
app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
