const { GoogleAIFileManager } = require("@google/generative-ai/server");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
        mimeType,
        displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
}

async function waitForFilesActive(files) {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
        let file = await fileManager.getFile(name);
        while (file.state === "PROCESSING") {
            process.stdout.write(".");
            await new Promise((resolve) => setTimeout(resolve, 10_000));
            file = await fileManager.getFile(name);
            console.log(" ------------------------------------ " + file.mimeType + " " + file.uri)
        }
        if (file.state !== "ACTIVE") {
            throw Error(`File ${file.name} failed to process`);
        }
    }

    console.log("All files are ready!")
}


async function handleFile(filePath) {
    const files = [
        await uploadToGemini(filePath, "application/pdf"),
    ];

    waitForFilesActive(files);
    
    return files;
}

module.exports = {
    handleFile,
};
