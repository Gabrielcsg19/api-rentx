/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: Record<string, string>,
    path: string,
  ) {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
