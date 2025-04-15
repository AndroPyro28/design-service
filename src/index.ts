// src/index
//! main entry point of the app
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'

const app = new Hono().basePath('/api')
.use('/api/*', cors())
.use(secureHeaders())
.use(logger())
.get('/', async (c) => {
    return c.text("hello world from design", 200)
})
// .route('/users', sampleController)

export default app