export const mockOkUser = {
  name: 'test user',
  email: 'test@test.com',
  password: 'testUser1234!',
};

export const mockBadUsername = {
  name: '          ',
  email: 'test@test.com',
  password: 'testUser1234!',
}

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