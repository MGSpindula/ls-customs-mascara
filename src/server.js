/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// Example API route
server.get('/api/status', (req, res) => {
res.json({ status: 'ok', message: 'API running' });
});


// Serve Next.js pages
server.all('*', (req, res) => {
return handle(req, res);
});


const port = 3000;
server.listen(port, () => {
console.log(`Server listening on http://localhost:${port}`);
});