const ejs = require('ejs');
const puppeteer = require('puppeteer');
const fs = require('fs');
async function generatePDF(template, data, retries = 3, delay = 5000) {
    const renderHtml = () => ejs.render(template, data);

    const createPDF = async () => {
        try {
            // Render the EJS template with the provided data
            const html = renderHtml();
            // Launch a new browser instance
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Set the content of the page
            await page.setContent(html);

            // Generate PDF from the page
            const buffer = await page.pdf({ format: 'Letter', printBackground: true });

            // Close the browser
            await browser.close();

            // Convert the buffer to base64
            return buffer.toString('base64');
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const retryOperation = async (operation, retries, delay) => {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                return await operation();
            } catch (err) {
                if (attempt < retries - 1) {
                    console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    throw new Error(`All ${retries} attempts failed.`);
                }
            }
        }
    };

    return retryOperation(createPDF, retries, delay);
}

module.exports = { generatePDF };
