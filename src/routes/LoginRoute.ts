import { phoneNumber } from 'aws-sdk/clients/importexport';
import { body } from 'express-validator';

import AuthCode, { AuthCodeDocument } from '../models/AuthCode';
import { UserDocument } from '../models/User';
import TextService from '../services/TextService';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import RouteError from '../utils/RouteError';

type LoginBody = Pick<UserDocument, 'phoneNumber'>;

export default class LoginRoute extends BaseRoute<boolean> {
  constructor() {
    super({
      method: RouteMethod.POST,
      path: '/login'
    });
  }

  middleware() {
    return [
      body('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('This is not a valid phone number')
    ];
  }

  /**
   * Creates an AuthCode in the DB, and sends a text to the given phone number
   * with the OTP code.
   *
   * If the text was not sent successfully, should throw 500 error.
   *
   * @throws {RouteError} - If there was an issue sending the text message.
   * @returns True if text was sent successfully.
   */
  async content(req: ApplicationRequest<{}, LoginBody>): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { phoneNumber } = req.body;

    await AuthCode.deleteMany({ phoneNumber });
    const authCode: AuthCodeDocument = await AuthCode.create({ phoneNumber });

    const ifTextSent: boolean = await TextService.sendText({
      message: `Your OTP code: ${authCode.value}`,
      to: phoneNumber
    });

    if (!ifTextSent) {
      throw new RouteError({
        message: 'Failed to send OTP code text, please try again.',
        statusCode: 500
      });
    }
    return true;
  }
}
