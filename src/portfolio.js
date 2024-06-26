/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Shehwar",
  title: "Hi, I'm Shehwar",
  subTitle: emoji(
    "Web developer with 5 years of industry experience, specializing in building scalable applications. I excel in frontend development using React.js, Vue.js, and Next.js, and have strong backend skills with Node.js, Express.js, and Nest.js. I am dedicated to delivering high-quality, efficient solutions and continuously enhancing my skill set. 🚀"
  ),
  resumeLink: "", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/shehwar-ahmad",
  linkedin: "https://www.linkedin.com/in/shehwar-ahmad/",
  gmail: "shehwar.dev@gmail.com",
  gitlab: "",
  facebook: "",
  medium: "https://medium.com/@shehwar",
  stackoverflow: "https://stackoverflow.com/users/9979508/shehwar",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Transform coffee into code!",
  skills: [
    emoji(
      "⚡ Develop highly interactive Front end / User Interfaces for Web applications"
    ),
    emoji(
      "⚡ Engineer a robust and scalable Backend foundation for Web applications"
    ),
    emoji("⚡ Best Coding Practices to keep App Scalable and Well Managed"),
    emoji("⚡ Integration of third party services")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "bootstrap",
      fontAwesomeClassname: "fab fa-bootstrap"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "node.js",
      fontAwesomeClassname: "fab fa-brands fa-node"
    },
    {
      skillName: "vue",
      fontAwesomeClassname: "fab fa-brands fa-vuejs"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "University of Gujrat",
      logo: require("./assets/images/uog-logo.webp"),
      subHeader: "Bachelor of Science in Computer Science",
      duration: "Oct 2015 - Nov 2019",
      desc: "",
      descBullets: [
        "CGPA 3.37 / 4",
        "Major Courses include Website Development, Android Development, Aritificial Intelligence and Digital Image Processing",
        "Final Year Project: Currency Detection and Classification Android App using Machine Learning"
      ]
    },
    {
      schoolName: "Punjab Group of Colleges",
      logo: require("./assets/images/pgclogo.png"),
      subHeader: "Fsc Pre-Engineering",
      duration: "September 2013 - August 2015",
      desc: "",
      descBullets: ["A Grade"]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend Development (React.js, Next.js, Vue.js)", //Insert stack or technology you have experience in
      progressPercentage: "99%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend Development (Node.js, Express.js, Nest.js)",
      progressPercentage: "96%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Web Development",
      company: "Upwork",
      companylogo: require("./assets/images/upwork.png"),
      date: "June 2019 – Feb 2020",
      // desc: "Providing I.T services to International clients. This gave me exposure of working with some awesome people and businesses.",
      descBullets: [
        "WordPress",
        "JavaScript",
        "Data Analysis - Python",
        "Data Visualization - Tableau"
      ]
    },
    {
      role: "Front-End Developer",
      company: "Nova Solutions",
      companylogo: require("./assets/images/nova-logo.png"),
      date: "Feb 2020 – March 2022",
      // desc: "I call working at Nova Solutions as the beginning of my Web Development Career. I provided Layout conversion services, which includes converting Figma PSD Designs into responsive web pages.",
      descBullets: ["React Js", "Material UI", "SASS", "Tailwind", "Bootstrap"]
    },
    {
      role: "Front-End Developer",
      company: "Contrive Solutions",
      companylogo: require("./assets/images/contrive.png"),
      date: "March 2022 – August 2023",
      // desc: "Working with Contrive Solutions has helped me grow as a developer. I have worked with high-end projects which has given me the opportunity to expand my tech stack.",
      descBullets: [
        "React Js ",
        "Vue Js ",
        "TypeScript",
        "Redux",
        "Material UI",
        "Bootstrap"
      ]
    },
    {
      role: "Software Engineer",
      company: "MTP",
      companylogo: require("./assets/images/mtp.png"),
      date: "August 2023 – Present",
      // desc: "Working with Contrive Solutions has helped me grow as a developer. I have worked with high-end projects which has given me the opportunity to expand my tech stack.",
      descBullets: ["Next.js", "Nest.js", "React Js", "Vue Js", "AWS"]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/veva.png"),
      projectName: "VevaCollect",
      projectDesc:
        "Audio, file sharing, credits and metadata built specifically for the music industry. Store all of your released and unreleased music, share audio, credits and collaborate.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://vevacollect.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/ifacility.png"),
      projectName: "Ifacility",
      projectDesc:
        "Ifacility provides services in Security Sector. They help you install what you need to safeguard your business, property, and people, our end-to-end service delivers a whole lot more.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.ifacility.co.uk/"
        }
      ]
    },
    {
      image: require("./assets/images/powandgo.png"),
      projectName: "Powandgo",
      projectDesc:
        "The first charge sharing service that will change the way to charge electric vehicle, saving money in charging costs and allowing charging station owners to earn.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.powandgo.com"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Software Architecture: Patterns for Developers",
      subtitle: "",
      image: require("./assets/images/Software-Architecture.png"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.linkedin.com/learning/certificates/2d499e9b6e5d56c232dd45021234a1dd0eb2baeef644be18c2a2f7ca941b3253?trk=share_certificate"
        }
      ]
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      subtitle: "",
      image: require("./assets/images/Javascript.png"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.freecodecamp.org/certification/shehwar/javascript-algorithms-and-data-structures"
        }
      ]
    },
    {
      title: "Learning Next.js",
      subtitle: "",
      image: require("./assets/images/nextjs.jpeg"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.linkedin.com/learning/certificates/2540eb47a70e7631e73c459e8171ccc12ed5213126bd48c2f2c50fd93bd5ab74"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "",
  email_address: "Shehwar.dev@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};
