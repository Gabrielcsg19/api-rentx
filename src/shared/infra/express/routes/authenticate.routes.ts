import { Router } from 'express';

import { AuthenticateUserController } from '@module/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@module/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
