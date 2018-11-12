const blameNetwork = require('../index');

const mockIsUp = () => {
	Promise.resolve(true);
};

jest.mock('is-up');
describe('check blame-my-network to work as desired', () => {
	it('should return promise by default', () => {
		const result = blameNetwork('https://www.google.com');
		expect(result).toBeInstanceOf(Promise);
	});

	it('should return values for default correct values', async () => {
		const result = await blameNetwork('https://www.google.com');
		console.log(result);
		expect(result).toHaveProperty('status');
		expect(result).toHaveProperty('reason');
	});
});
