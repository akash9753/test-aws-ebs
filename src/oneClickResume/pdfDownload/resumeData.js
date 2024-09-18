// resumeData.js

const resumeData = {
  configuration: {
    fontSize: '16px',
    lineHeight: '1.2',
    fontFamily: "'Calibri', 'Arial', sans-serif",
    color: '#000',
    linkColor: '#00008B',
    headerFontSize: '20px',
    subHeaderFontSize: '14px',
    pdfConfig: {
      format: 'A4',
      printBackground: true,
      margin: {
        top: '5mm',
        right: '5mm',
        bottom: '5mm',
        left: '5mm'
      }
    }
  },
  name: "Akash Patel",
  contact: {
    email: "akash9753@gmail.com",
    phone: "+919753290759",
    linkedin: "linkedin/akash-p-862961bb/",
    github: "github/akash9753",
    leetcode: "leetcode/akash9753/",
    portfolio: "https://akashpatelportfolio.netlify.app/"
  },
  workExperience: [
    {
      company: "AGATI CLINICAL: CLINICAL DATA SERVICES",
      title: "Software Engineer I",
      location: "Bengaluru",
      startDate: "01-09-2022",
      endDate: "Present",
      responsibilities: [
        "Developed a block-level UI for visual representation using the Google Blockly library in clinical data Transbot project.",
        "Implemented UI functionality to run Python or SaaS programs and generate defined XML metadata files by setting visual blocks.",
        "Utilized React as the frontend framework and translated Figma designs into web pages.",
        "Frontend development involved the use of the Syncfusion library.",
        "Implemented data storage in the database through Excel file uploads.",
        "Created a metadata annotation cascade dropdown predictive text table with 7000 rows, optimizing load time to 1400ms.",
        "Backend API development for certain backend components using the ASP.NET framework.",
        // "Full Stack Developer for the E-Rating project.",
        // "Designed to store all organizational data and calculate project load percentage for individual employees.",
        // "Developed a React Syncfusion table for management to view detailed employee information and assign employees to different client projects.",
        // "Implemented functionality to calculate project load percentage based on leave and project duration time.",
        // "Implemented Role based routing authentication.",
        // "Implemented Redux Toolkit for state management."
      ]
    },
    {
      company: "HURIX DIGIATL",
      title: "Software Programmer",
      location: "Pune",
      startDate: "01-01-2022",
      endDate: "31-08-2022",
      responsibilities: [
        "Contributed to the development of the SME Tool project, designed for gathering details of experienced employees joining the organization.",
        "Implemented a live notification service within the SME Tool application using the React library.",
        "Angular Frontend Developer for the Bronzeverse project, a US client's book publishing subscription-based platform.",
        "Addressed long-pending issues related to API integration.",
        "Converted AdobeXD designs into a mobile-first responsive design using html saas css and bootstrap."
      ]
    },
    // {
    //   company: "CYBAGE",
    //   title: "Quality Assurance Engineer",
    //   location: "Pune",
    //   startDate: "01-05-2021",
    //   endDate: "31-12-2021",
    //   responsibilities: [
    //     "Contributed to the quality assurance efforts on the TechData US project.",
    //     "Identified and documented software defects in the TechData application.",
    //     "Collaborated with the development team to reproduce and address identified issues, including work on the SAP system.",
    //     "Conducted manual testing, utilizing testing tools and methodologies to ensure software functionality and performance, with a focus on regression testing."
    //   ]
    // }
  ],
  personalProjects: [
    {
      name: "FOOD DELIVERY WEB APP",
      technologies: "React, Nodejs, Typescipt, Mongodb, PostgreSQL, AWS, Docker, SonarQube, Microservices, Jest, Zustand",
      description: "I spearheaded the development of a food delivery project, adhering to industry-best practices. To ensure code quality, I implemented SonarQube for comprehensive test coverage, accompanied by written test cases for each API. Emphasizing security, I instituted pre-merge security checks before code integration into the main branch. TypeScript was employed as the programming language for both frontend and backend development, fostering maintainability and readability. The project embraced a microservices architecture for efficient management of the product and user catalog. Seamless automation and build creation were achieved through Docker for CI/CD, while AWS served as the deployment platform, ensuring scalability and reliability in the infrastructure. The entire codebase is available on GitHub."
    },
    // {
    //   name: "EMPLOYEE MANAGEMENT SYSTEM",
    //   technologies: "ASP.NET, C#, React, JavaScript, Antd, Mongodb",
    //   description: "The Employee Management Project is a comprehensive system designed to streamline workforce administration. It offers features for employee onboarding, performance tracking, and attendance management. The project enhances organizational efficiency by providing a centralized platform for HR operations, ensuring seamless and effective employee lifecycle management."
    // },
    // {
    //   name: "FREE RESUME BUILDER",
    //   technologies: "Nodejs, React, Javascript, Mongodb, AWS",
    //   description: "As a Full Stack Developer, I spearheaded the creation of a cutting-edge Free Resume Builder. Leveraging my expertise in both front-end and back-end development, the platform offers user-friendly interfaces for seamless resume creation. This project not only showcases my technical skills but also underscores my commitment to delivering practical solutions for user-centric experiences."
    // }
  ],
  skills: {
    languages: ["Javascript", "Typescript", "Java", "C#","HTML/CSS"],
    farmworkOrLibaray: ["React", "Nodejs", "Express", "ASP Dot Net"],
    database:["Mongodb","Mysql", "PostgreSQL"],
    softwareOrTechnology: ["Git", "Github Action", "Autometic CI CD", "AWS", "Docker", "Sonarqube", "Jest", "Microservices", "Jira"]
  },
  education: [
    {
      degree: "Post Graduate Diploma In Advance Computing PGDAC",
      institution: "CDAC",
      location: "Mumbai",
      graduationDate: "01-01-2021"
    },
    {
      degree: "BTech Mechanical",
      institution: "RGTU",
      location: "Jabalpur",
      graduationDate: "01-06-2018"
    }
  ]
};

// Custom function to format date as month and year
function formatDate(dateString) {
  if (dateString === 'Present') return 'Present';
  
  const date = new Date(dateString.split('-').reverse().join('-'));
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export { resumeData, formatDate };