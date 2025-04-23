// src/index
//! main entry point of the app
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { authMiddleware } from './middlewares/auth.middleware'
import designControllers from './routes/design/design.controller'

const app = new Hono().basePath('/api')
.use('/api/*', cors())
.use(secureHeaders())
.use(logger())
.use('*', authMiddleware)
.route("/design", designControllers)

// .route('/users', sampleController)

export default app