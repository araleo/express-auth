export const mockOkUser = {
  name: 'test user',
  email: 'test@test.com',
  password: 'testUser1234!',
};

export const mockBadUsername = {
  name: '          ',
  email: 'test@test.com',
  password: 'testUser1234!',
};

export const mockBadEmail = {
  name: 'test user',
  email: 'test',
  password: 'testUser1234!',
};

export const mockBadPassword = {
  name: 'test user',
  email: 'test@test.com',
  password: 'test',
};

export const mockBadUser = {
  name: '           ',
  email: 'test',
  password: 'test',
};

export const mockOkLogin = {
  email: 'test@test.com',
  password: 'testUser1234!',
};

export const mockBadEmailLogin = {
  email: 'test',
  password: 'testUser1234!',
};

export const mockBadPasswordLogin = {
  email: 'test@test.com',
  password: '          ',
};

export const mockNoEmailLogin = {
  email: 'tester@test.com',
  password: 'testUser1234!',
}

export const mockWrongPasswordLogin = {
  email: 'tester@test.com',
  password: 'testUser1234!',
}

