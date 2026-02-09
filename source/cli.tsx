import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import { App } from './ui.js';
import { getPet, feedPet } from './logic.js';
import { simpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';

const cli = meow(
	`
	Usage
	  $ termi-gotchi

	Commands
	  feed  Feed the pet (runs automatically by git hook)
	  init  Install the git hook

	Examples
	  $ termi-gotchi
	  $ termi-gotchi init
`,
	{
		importMeta: import.meta,
	},
);

const run = async () => {
	const command = cli.input[0];

	if (command === 'init') {
		const gitHookPath = path.resolve(process.cwd(), '.git/hooks/post-commit');
		// Check if .git exists
		if (!fs.existsSync(path.resolve(process.cwd(), '.git'))) {
			console.error('Error: Not a git repository. Run "git init" first.');
			process.exit(1);
		}

		const hookScript = `#!/bin/sh
# Run termi-gotchi after every commit
termi-gotchi feed
`;
		fs.writeFileSync(gitHookPath, hookScript);
		fs.chmodSync(gitHookPath, '755');
		console.log("Git Hook Installed! Your pet is watching...");
		return;
	}

	if (command === 'feed') {
		const git = simpleGit();
		try {
			// Try to get diff from last commit
			// If it's the first commit, HEAD^ might fail.
			// basic try-catch for now.
			let insertions = 0;
			let deletions = 0;

			try {
				const diff = await git.diffSummary(['HEAD^', 'HEAD']);
				insertions = diff.insertions;
				deletions = diff.deletions;
			} catch (e) {
				// Fallback for first commit or other errors
				// Maybe list files? For now, just give some default xp
				insertions = 10;
			}

			const result = feedPet(insertions, deletions);
			// We could just print a message, but rendering the App is cooler.
			// Ideally we render it and then exit after a few seconds?
			// Ink apps run until unmounted. 
			// We can just render it and let the user Ctrl+C or we can exit automatically.
			// For post-commit hook, we probably want it to exit automatically.

			// Let's pass a prop to App to auto-exit? Or just handle it here.
			const { unmount } = render(<App pet={result} />);
			setTimeout(() => unmount(), 2500);
			return;

		} catch (e) {
			console.error("Error feeding pet:", e);
		}
	}

	// Default: Show status
	const pet = getPet();
	render(<App pet={pet} />);
};

run();
