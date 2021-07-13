/* eslint-disable no-console */
async function startServer(app, port) {
	console.info(`starting https server at port ${port} ...`);
	return new Promise(resolve => {
		const server = app.listen(port, () => {
			console.log(`Listening on port ${port}`);
			resolve(server);
		});
	});
}

let stopped = false;

async function stopServer(server) {
	return new Promise(resolve => {
		if (!stopped) {
			stopped = true;
			console.info('stopping https server ...');
			server.close(error => {
				if (error) {
					console.error(error.message);
				}
				console.info('stopped https server');
				resolve();
			});
		} else {
			resolve();
		}
	});
}

module.exports = {
	startServer,
	stopServer,
};
