import { ResetPasswordUserController } from '@module/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@module/accounts/useCases/sendForgotPassowordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
