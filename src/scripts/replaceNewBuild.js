const fs = require("fs").promises;
const path = require("path");

const sourceDirs = {
	js: "./build/static/js",
	css: "./build/static/css",
};
const targetDir = "./src/dict/pages/HomePage";
const indexPath = path.join(targetDir, "index.html");

async function replaceFiles(fileType) {
	const sourceFiles = await fs.readdir(sourceDirs[fileType]);

	const newFile = sourceFiles.find((file) => file.startsWith("main.") && file.endsWith(`.${fileType}`));
	if (!newFile) {
		console.log(`No new ${fileType.toUpperCase()} file found`);
		return;
	}

	const targetFiles = await fs.readdir(targetDir);

	const oldFile = targetFiles.find((file) => file.startsWith("main.") && file.endsWith(`.${fileType}`));
	if (oldFile) {
		await fs.unlink(path.join(targetDir, oldFile));
		console.log(`${oldFile} was deleted`);
	}

	const sourceFile = path.join(sourceDirs[fileType], newFile);
	const targetFile = path.join(targetDir, newFile);

	await fs.copyFile(sourceFile, targetFile);
	console.log(`${newFile} was copied to ${targetDir}`);

	// After copying the file, replace the filename in index.html
	const data = await fs.readFile(indexPath, "utf8");
	var result = data.replace(new RegExp(`main\\.\\w+\\.min\\.${fileType}`, "g"), newFile.replace(`.${fileType}`, `.min.${fileType}`));

	await fs.writeFile(indexPath, result, "utf8");
	console.log(`Replaced old filename with ${newFile} in ${indexPath}`);
}

async function main() {
	await replaceFiles("js");
	await replaceFiles("css");
}

main();
