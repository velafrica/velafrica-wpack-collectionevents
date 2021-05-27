import React from 'react';
import { hot } from 'react-hot-loader';
import Box from './components/Box';
import CollectionEventWidget from './components/CollectionEventWidget';

const App = () => (
	<Box heading="Sammelanlässe">
		<CollectionEventWidget />
	</Box>
);

export default hot(module)(App);
