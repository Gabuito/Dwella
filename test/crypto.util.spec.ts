import { passwordTools } from '../src/utils/crypto.util.ts';

describe('passwordTools', () => {
  const OLD_ENV = process.env;
  let tools: passwordTools;
  const PEPPER = 'test_pepper';
  
  beforeEach(() => {
    process.env = { ...OLD_ENV, PASSWORD_PEPPER: PEPPER };
    tools = new passwordTools();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should hash and verify a password successfully', async () => {
    const password = 'mySecret123';
    const hash = await tools.hash(password);
    expect(typeof hash).toBe('string');
    const isValid = await tools.verify(hash, password);
    expect(isValid).toBe(true);
  });

  it('should fail to verify with wrong password', async () => {
    const password = 'mySecret123';
    const wrongPassword = 'wrongPassword';
    const hash = await tools.hash(password);
    const isValid = await tools.verify(hash, wrongPassword);
    expect(isValid).toBe(false);
  });

  it('should throw if PASSWORD_PEPPER is not set', () => {
    process.env = { ...OLD_ENV };
    delete process.env.PASSWORD_PEPPER;
    expect(() => new passwordTools()).toThrow();
  });

  it('should return a peppered password string', () => {
    const password = 'plain';
    const peppered = tools.pepperedPassword(password);
    expect(typeof peppered).toBe('string');
    expect(peppered).not.toBe(password);
  });
});
