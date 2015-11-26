var name = module.exports.name = 'proxyvator-apm'

var execCP = require('child_process').exec
	, which = require('which')
	, Q = require('q')

var check, clear, exec, setup

check = module.exports.check = function () {
	var deferred

	deferred = Q.defer()

	// Checking apm program
	which('apm', function (error, fullpath) {
		if (error) {
			deferred.reject(new Error(error))
		} else {
			deferred.resolve(fullpath)
		}
	})

	return deferred.promise
}

clear = module.exports.clear = function (options) {
	console.log(name + '::clear')

	check()
		.then(function (fullpath) {
			return exec('apm config delete proxy')
		})
		.then(function () {
			return exec('apm config delete https-proxy')
		})
		.then(function () {
			console.log(name + '::clear# SUCCESS')
		})
		.catch(function (error) {
			console.log(name + '::clear# ERROR:', error)
		})
		.finally()
}

exec = module.exports.exec = function (cmd) {
	var deferred

	deferred = Q.defer()

	// Executing apm program
	execCP(cmd, function (error) {
		if (error) {
			deferred.reject(new Error(error))
		} else {
			deferred.resolve()
		}
	})

	return deferred.promise
}

setup = module.exports.setup = function (options) {
	console.log(name + '::setup')

	check()
		.then(function (fullpath) {
			return exec('apm config set proxy ' + options.http)
		})
		.then(function () {
			if (options.https) {
				return exec('apm config set https-proxy ' + options.https)
			}
		})
		.then(function () {
			console.log(name + '::setup# SUCCESS')
		})
		.catch(function (error) {
			console.log(name + '::setup# ERROR:', error)
		})
		.finally()
}
