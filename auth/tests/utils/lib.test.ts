import { getCookieCfg, getJwt, getOneHourAhead } from '../../src/utils/lib';

const expectedJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwiaWQiOiJpZCIsInN0YXR1cyI6InN0YXR1cyIsImlhdCI6MjY3ODQwMCwiZXhwIjoyNjgyMDAwfQ';

describe('lib tests', () => {
  Date.now = jest.fn(() => new Date(Date.UTC(1970, 1, 1)).valueOf());
  test('getOneHourAhead returns date with one hour ahead', () => {
    const oneHourAhead = getOneHourAhead();
    expect(oneHourAhead.toUTCString()).toEqual('Sun, 01 Feb 1970 01:00:00 GMT');
  });

  test('getCookieCfg returns proper cookie config', () => {
    const cookiesCfg = getCookieCfg();
    expect(cookiesCfg).toEqual({
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
    });
  });

  test('getJew returns undefined when secret is undefined', () => {
    const jwt = getJwt('email', 'id', 'status', process.env.test1234);
    expect(jwt).toBe(undefined);
  });

  test('getJew returns a signed jwt', () => {
    const jwt = getJwt('email', 'id', 'status', 'secret');
    expect(jwt!.startsWith(expectedJwt)).toBe(true);
  });
});
