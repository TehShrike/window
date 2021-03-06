/* eslint new-cap: ["error", { "capIsNew": false }] */
import test from 'ava';
import Window from '../';
import expectedProperties from './fixtures/expectedProperties';

test('jsdom config is passed through', t => {
	const userAgent = 'Custom user agent';
	const window = new Window({ userAgent });
	t.is(window.navigator.userAgent, userAgent);
});

test('properties haven\'t changed', t => {
  // These options need to be enabled so we can iterate on all properties
	const window = new Window({
		features: {
			FetchExternalResources: false,
			ProcessExternalResources: false
		}
	});
	const properties = Object.getOwnPropertyNames(window);

	expectedProperties.forEach(expected => {
		if (properties.indexOf(expected) === -1) {
			console.log('Removed:', expected);
		}
	});

	properties.forEach(prop => {
		if (expectedProperties.indexOf(prop) === -1) {
			console.log('Added:', prop);
		}
	});

	t.deepEqual(expectedProperties.sort(), properties.sort());
});
