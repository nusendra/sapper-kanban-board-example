import { writable } from 'svelte/store';

const state = [
		{
			name: '',
			items: []
		},
		{
			name: '',
			items: []
		},
		{
			name: '',
			items: []
		},
		{
			name: '',
			items: []
		},
		{
			name: '',
			items: []
		},
];

export const columns = writable(state);
