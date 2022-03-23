/* eslint-disable @typescript-eslint/no-explicit-any */
interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: Record<string, string>,
    path: string,
  ): Promise<void>;
}

export { IMailProvider };
