import puppeteer from 'puppeteer';
import { resumeData, formatDate } from './resumeData.js';
import { s3, PutObjectCommand } from '../../config/asw.js';
import resumePdf from './model.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateAndSavePdf = async (req, res) => {
  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.name} - Resume</title>
        <style>
            body {
                font-family: ${resumeData.configuration.fontFamily};
                font-size: ${resumeData.configuration.fontSize};
                line-height: ${resumeData.configuration.lineHeight};
                color: ${resumeData.configuration.color};
                margin: 0;
                padding: 0;
                // border: 1px solid green;
            }
            .content {
                padding: 0px;
                // border: 1px solid red;
            }
            h1 {
                font-size: ${resumeData.configuration.headerFontSize};
                margin: 0 0 5px 0;
                padding-top: 5px;
                text-align: center;
            }
            h2 {
                font-size: ${resumeData.configuration.subHeaderFontSize};
                margin: 20px 0 10px 0;
                color: ${resumeData.configuration.color};
                border-bottom: 1px solid ${resumeData.configuration.color};
                padding-bottom: 5px;
                text-transform: uppercase;
            }
            p {
                margin: 0 0 8px 0;
            }
            .contact-info {
                text-align: center;
                margin-bottom: 15px;
                font-size: 0.9em;
            }
            .contact-info a {
                color: ${resumeData.configuration.linkColor};
                text-decoration: none;
            }
            .section {
                margin-bottom: 15px;
            }
            .job-title, .job-company {
                font-weight: bold;
            }
            .job-details {
                float: right;
                font-style: italic;
            }
            ul {
                margin: 8px 0;
                padding-left: 25px;
            }
            li {
                margin-bottom: 5px;
            }
            .project-title {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1>${resumeData.name}</h1>
            <div class="contact-info">
                <a href="mailto:${resumeData.contact.email}">${resumeData.contact.email}</a> | ${resumeData.contact.phone} | 
                <a href="https://www.linkedin.com/in/${resumeData.contact.linkedin}">${resumeData.contact.linkedin}</a> | 
                <a href="https://github.com/${resumeData.contact.github}">${resumeData.contact.github}</a> | 
                <a href="https://leetcode.com/${resumeData.contact.leetcode}">${resumeData.contact.leetcode}</a> | 
                <a href="${resumeData.contact.portfolio}">${resumeData.contact.portfolio}</a>
            </div>

            <h2>Work Experience</h2>
            ${resumeData.workExperience.map(job => `
                <div class="section">
                    <p>
                        <span class="job-company">${job.company}</span> | <span class="job-title">${job.title}</span>
                        <span class="job-details">${job.location} | ${formatDate(job.startDate)} - ${formatDate(job.endDate)}</span>
                    </p>
                    <ul>
                        ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}

            <h2>Personal Projects</h2>
            ${resumeData.personalProjects.map(project => `
                <div class="section">
                    <p class="project-title">${project.name} <i>(${project.technologies})</i></p>
                    <p>${project.description}</p>
                </div>
            `).join('')}

            <h2>Skills</h2>
            <div class="section">
                <p><strong>Languages:</strong> ${resumeData.skills.languages.join(', ')}</p>
                <p><strong>Farmwork or Libaray:</strong> ${resumeData.skills.webDevelopment.join(', ')}</p>
                <p><strong>Database:</strong> ${resumeData.skills.webDevelopment.join(', ')}</p>
                <p><strong>Software Or Technology:</strong> ${resumeData.skills.technologies.join(', ')}</p>
            </div>

            <h2>Education</h2>
            ${resumeData.education.map(edu => `
                <div class="section">
                    <p class="job-title">${edu.degree} <span class="job-details">${edu.location} | ${formatDate(edu.graduationDate)}</span></p>
                    <p>${edu.institution}</p>
                </div>
            `).join('')}
        </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ 
      ...resumeData.configuration.pdfConfig,
      displayHeaderFooter: false,
    });

    // Define the local file path for saving in the 'generated_pdfs' folder
    const fileName = `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`;
    const pdfDir = path.join(__dirname, 'generated_pdfs');
    const pdfFilePath = path.join(pdfDir, fileName);

    // Create the 'generated_pdfs' directory if it doesn't exist
    await fs.mkdir(pdfDir, { recursive: true });

    // Save the PDF to the 'generated_pdfs' folder
    await fs.writeFile(pdfFilePath, pdfBuffer);
    console.log(`PDF saved locally at: ${pdfFilePath}`);

    // Read the file from local storage
    const fileContent = await fs.readFile(pdfFilePath);

    // Upload PDF to S3
    const uploadParams = {
      Bucket: process.env.bucket,
      Key: fileName,
      Body: fileContent,
      ContentType: 'application/pdf',
      ACL: 'public-read',
    };

    const command = new PutObjectCommand(uploadParams);
    const data = await s3.send(command);

    // Save the S3 URL in MongoDB
    const pdfUrl = `https://${process.env.bucket}.s3.${process.env.region}.amazonaws.com/${fileName}`;
    const pdfEntry = new resumePdf({ url: pdfUrl });
    await pdfEntry.save();

    // Send the URL as a response
    res.json({ success: true, pdfUrl });
  } catch (error) {
    console.error("Error in PDF generation:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to generate and save PDF",
      error: error.message
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};