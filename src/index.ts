// src/index
//! main entry point of the app
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { authMiddleware, TAuthVariables } from './middlewares/auth.middleware'

const app = new Hono<{ Variables: TAuthVariables }>().basePath('/api/design')
.use('/api/*', cors())
.use(secureHeaders())
.use(logger())
.use('*', authMiddleware)
.post('/', async (c) => {
    return c.text("hello world from design", 200)
})
// .route('/users', sampleController)

export default app