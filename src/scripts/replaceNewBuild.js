const fs = require("fs");
const path = require("path");

const sourceDir = "./build/static/js";
const targetDir = "./src/dict/pages/HomePage";
const indexPath = path.join(targetDir, "index.html");

fs.readdir(sourceDir, (err, sourceFiles) => {
	if (err) throw err;

	const newFile = sourceFiles.find((file) => file.startsWith("main.") && file.endsWith(".js"));
	if (!newFile) {
		console.log("No new JS file found");
		return;
	}

	fs.readdir(targetDir, (err, targetFiles) => {
		if (err) throw err;

		const oldFile = targetFiles.find((file) => file.startsWith("main.") && file.endsWith(".js"));
		if (oldFile) {
			fs.unlink(path.join(targetDir, oldFile), (err) => {
				if (err) throw err;
				console.log(`${oldFile} was deleted`);
			});
		}

		const sourceFile = path.join(sourceDir, newFile);
		const targetFile = path.join(targetDir, newFile);

		fs.copyFile(sourceFile, targetFile, (err) => {
			if (err) throw err;
			console.log(`${newFile} was copied to ${targetDir}`);

			// After copying the file, replace the filename in index.html
			fs.readFile(indexPath, "utf8", function (err, data) {
				if (err) {
					return console.log(err);
				}
				var result = data.replace(/main\.\w+\.min\.js/g, newFile.replace(".js", ".min.js"));

				fs.writeFile(indexPath, result, "utf8", function (err) {
					if (err) return console.log(err);
					console.log(`Replaced old filename with ${newFile} in ${indexPath}`);
				});
			});
		});
	});
});
