import { handler } from '../src/handlers/user';
import { mockEvent } from './mocks/mockEvent';

describe('user handler', () => {
  it('returns a valid response', async () => {
    expect.hasAssertions();
    const response = await handler(mockEvent, null, null);
    console.log(response);
  });
});
