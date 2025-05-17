
// Mock users data
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    headline: "Software Engineer at Tech Corp",
    location: "San Francisco Bay Area",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    backgroundImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    about: "Experienced software engineer with a passion for building scalable web applications. Skilled in JavaScript, React, Node.js, and cloud technologies.",
    connections: [2, 3, 4, 5],
    pendingConnections: [6, 7],
    skills: ["JavaScript", "React", "Node.js", "AWS", "Python", "Docker"],
    endorsements: {
      "JavaScript": 25,
      "React": 18,
      "Node.js": 15,
      "AWS": 10,
      "Python": 8,
      "Docker": 5
    },
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        startDate: "2021-06",
        endDate: null,
        description: "Leading frontend development for enterprise applications, managing a team of 5 engineers."
      },
      {
        id: 2,
        title: "Software Engineer",
        company: "Startup Inc",
        location: "San Francisco, CA",
        startDate: "2018-03",
        endDate: "2021-05",
        description: "Developed and maintained web applications using React and Node.js."
      }
    ],
    education: [
      {
        id: 1,
        school: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2014-09",
        endDate: "2018-05"
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password123",
    headline: "Product Manager at Innovation Labs",
    location: "New York, NY",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    connections: [1, 3, 4],
    skills: ["Product Management", "Agile", "UX Design", "Market Research", "Data Analysis"],
    experience: [
      {
        id: 1,
        title: "Product Manager",
        company: "Innovation Labs",
        location: "New York, NY",
        startDate: "2020-01",
        endDate: null
      }
    ]
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    password: "password123",
    headline: "Data Scientist at Analytics Co",
    location: "Boston, MA",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    connections: [1, 2, 5],
    skills: ["Machine Learning", "Python", "Data Analysis", "SQL", "Statistical Modeling"],
    experience: [
      {
        id: 1,
        title: "Data Scientist",
        company: "Analytics Co",
        location: "Boston, MA",
        startDate: "2019-08",
        endDate: null
      }
    ]
  },
  {
    id: 4,
    name: "Lisa Williams",
    email: "lisa.williams@example.com",
    password: "password123",
    headline: "Marketing Director at Global Brand",
    location: "Chicago, IL",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    connections: [1, 2],
    skills: ["Digital Marketing", "Brand Strategy", "Social Media", "Content Creation"],
    experience: [
      {
        id: 1,
        title: "Marketing Director",
        company: "Global Brand",
        location: "Chicago, IL",
        startDate: "2021-02",
        endDate: null
      }
    ]
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    password: "password123",
    headline: "Frontend Developer at WebTech Solutions",
    location: "Austin, TX",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    connections: [1, 3],
    skills: ["JavaScript", "React", "Vue.js", "CSS", "HTML"],
    experience: [
      {
        id: 1,
        title: "Frontend Developer",
        company: "WebTech Solutions",
        location: "Austin, TX",
        startDate: "2020-05",
        endDate: null
      }
    ]
  },
  {
    id: 6,
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    password: "password123",
    headline: "UX Designer at Design Studio",
    location: "Seattle, WA",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    connections: [],
    skills: ["UX/UI Design", "Figma", "User Research", "Prototyping", "Wireframing"],
    experience: [
      {
        id: 1,
        title: "UX Designer",
        company: "Design Studio",
        location: "Seattle, WA",
        startDate: "2021-03",
        endDate: null
      }
    ]
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david.wilson@example.com",
    password: "password123",
    headline: "Backend Engineer at ServerTech",
    location: "Denver, CO",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    connections: [],
    skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Redis"],
    experience: [
      {
        id: 1,
        title: "Backend Engineer",
        company: "ServerTech",
        location: "Denver, CO",
        startDate: "2019-11",
        endDate: null
      }
    ]
  }
];

// Mock posts data
export const posts = [
  {
    id: 1,
    userId: 1,
    content: "Just finished working on a new feature for our product. Excited to share more soon!",
    image: null,
    likes: 25,
    comments: 8,
    shares: 3,
    timestamp: "2023-09-15T10:30:00Z"
  },
  {
    id: 2,
    userId: 2,
    content: "Attending the Product Management Summit this week. Looking forward to connecting with fellow PMs and learning about the latest industry trends. #ProductManagement #Innovation",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 42,
    comments: 12,
    shares: 7,
    timestamp: "2023-09-14T14:45:00Z"
  },
  {
    id: 3,
    userId: 3,
    content: "Just published a new article on machine learning techniques for predictive analytics. Check it out at the link below!",
    image: null,
    likes: 31,
    comments: 15,
    shares: 9,
    timestamp: "2023-09-13T09:15:00Z"
  },
  {
    id: 4,
    userId: 4,
    content: "Our latest marketing campaign exceeded all expectations! Proud of the team's hard work and creative approach. #MarketingSuccess",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 56,
    comments: 23,
    shares: 14,
    timestamp: "2023-09-12T16:20:00Z"
  },
  {
    id: 5,
    userId: 5,
    content: "Just completed the Frontend Masters React Advanced course. Learned a ton about performance optimization and state management!",
    image: null,
    likes: 19,
    comments: 7,
    shares: 2,
    timestamp: "2023-09-11T11:45:00Z"
  },
  {
    id: 6,
    userId: 1,
    content: "Had a great time speaking at the Tech Conference today about scaling web applications. Thanks to everyone who attended!",
    image: "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    likes: 37,
    comments: 14,
    shares: 8,
    timestamp: "2023-09-10T18:30:00Z"
  }
];

// Mock comments data
export const comments = [
  {
    id: 1,
    postId: 1,
    userId: 2,
    content: "That's awesome! Can't wait to hear more about it.",
    timestamp: "2023-09-15T10:45:00Z"
  },
  {
    id: 2,
    postId: 1,
    userId: 3,
    content: "Great work! Is this the feature you mentioned last week?",
    timestamp: "2023-09-15T11:00:00Z"
  },
  {
    id: 3,
    postId: 2,
    userId: 1,
    content: "Let me know your key takeaways from the summit!",
    timestamp: "2023-09-14T15:15:00Z"
  },
  {
    id: 4,
    postId: 3,
    userId: 5,
    content: "Just read your article. The insights on ensemble methods were really helpful.",
    timestamp: "2023-09-13T10:30:00Z"
  }
];

// Mock jobs data
export const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations",
    location: "San Francisco, CA",
    remote: true,
    salary: "$140,000 - $180,000",
    description: "We are looking for a Senior Software Engineer with expertise in React, Node.js, and cloud technologies to join our product team. You'll be responsible for building scalable web applications and mentoring junior developers.",
    requirements: [
      "5+ years experience in software development",
      "Strong knowledge of JavaScript, React, and Node.js",
      "Experience with cloud services (AWS, GCP, or Azure)",
      "Bachelor's degree in Computer Science or related field"
    ],
    postedDate: "2023-09-10T00:00:00Z",
    applicants: 45,
    easyApply: true,
    logo: "https://randomuser.me/api/portraits/lego/1.jpg"
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Digital Solutions Inc",
    location: "New York, NY",
    remote: false,
    salary: "$120,000 - $150,000",
    description: "Digital Solutions Inc is seeking a Product Manager to lead our flagship product development. You'll work closely with engineering, design, and marketing teams to define product strategy and roadmap.",
    requirements: [
      "3+ years experience in product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Experience with agile methodologies"
    ],
    postedDate: "2023-09-08T00:00:00Z",
    applicants: 32,
    easyApply: true,
    logo: "https://randomuser.me/api/portraits/lego/2.jpg"
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    remote: true,
    salary: "$130,000 - $160,000",
    description: "Join our data science team to develop and implement machine learning models that drive business decisions. You'll analyze complex datasets and collaborate with cross-functional teams to deliver actionable insights.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "Strong programming skills in Python or R",
      "Experience with machine learning frameworks and statistical analysis",
      "Knowledge of SQL and data visualization tools"
    ],
    postedDate: "2023-09-05T00:00:00Z",
    applicants: 28,
    easyApply: false,
    logo: "https://randomuser.me/api/portraits/lego/3.jpg"
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "WebTech Solutions",
    location: "Austin, TX",
    remote: true,
    salary: "$90,000 - $120,000",
    description: "WebTech Solutions is looking for a skilled Frontend Developer to create responsive and user-friendly web applications. You'll work closely with designers and backend developers to implement new features and improve existing ones.",
    requirements: [
      "3+ years experience in frontend development",
      "Proficiency in JavaScript, HTML, CSS, and modern frameworks (React, Vue, or Angular)",
      "Experience with responsive design and cross-browser compatibility",
      "Understanding of web performance optimization"
    ],
    postedDate: "2023-09-03T00:00:00Z",
    applicants: 56,
    easyApply: true,
    logo: "https://randomuser.me/api/portraits/lego/4.jpg"
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Creative Design Studio",
    location: "Seattle, WA",
    remote: false,
    salary: "$95,000 - $125,000",
    description: "Creative Design Studio is seeking a talented UX Designer to create intuitive and engaging user experiences for our clients. You'll conduct user research, create wireframes, and collaborate with developers to implement your designs.",
    requirements: [
      "2+ years experience in UX design",
      "Proficiency with design tools (Figma, Sketch, Adobe XD)",
      "Portfolio demonstrating user-centered design process",
      "Strong communication and presentation skills"
    ],
    postedDate: "2023-09-01T00:00:00Z",
    applicants: 39,
    easyApply: true,
    logo: "https://randomuser.me/api/portraits/lego/5.jpg"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    location: "Remote",
    remote: true,
    salary: "$110,000 - $140,000",
    description: "Cloud Systems Inc is looking for a DevOps Engineer to help build and maintain our cloud infrastructure. You'll automate deployment processes, implement monitoring solutions, and ensure system reliability and scalability.",
    requirements: [
      "4+ years experience in DevOps or similar role",
      "Strong knowledge of AWS or GCP services",
      "Experience with containerization (Docker, Kubernetes)",
      "Proficiency in scripting languages (Python, Bash)"
    ],
    postedDate: "2023-08-30T00:00:00Z",
    applicants: 22,
    easyApply: false,
    logo: "https://randomuser.me/api/portraits/lego/6.jpg"
  }
];

// Mock messages data
export const messages = [
  {
    id: 1,
    conversationId: 1,
    senderId: 2,
    receiverId: 1,
    content: "Hi John, I saw your post about the new feature you're working on. Sounds interesting!",
    timestamp: "2023-09-15T11:30:00Z",
    read: true
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 1,
    receiverId: 2,
    content: "Thanks Jane! Yes, it's a major update to our user authentication system. Would love to chat more about it sometime.",
    timestamp: "2023-09-15T11:45:00Z",
    read: true
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 2,
    receiverId: 1,
    content: "That sounds great! I'm actually working on something similar for our product. Maybe we could exchange ideas?",
    timestamp: "2023-09-15T12:00:00Z",
    read: true
  },
  {
    id: 4,
    conversationId: 1,
    senderId: 1,
    receiverId: 2,
    content: "Definitely! Are you free for a call next week?",
    timestamp: "2023-09-15T12:15:00Z",
    read: false
  },
  {
    id: 5,
    conversationId: 2,
    senderId: 3,
    receiverId: 1,
    content: "Hey John, I read your article on React performance optimization. Really helpful stuff!",
    timestamp: "2023-09-14T09:30:00Z",
    read: true
  },
  {
    id: 6,
    conversationId: 2,
    senderId: 1,
    receiverId: 3,
    content: "Thanks Robert! Glad you found it useful. Have you tried implementing any of those techniques?",
    timestamp: "2023-09-14T10:00:00Z",
    read: true
  },
  {
    id: 7,
    conversationId: 2,
    senderId: 3,
    receiverId: 1,
    content: "Yes, I've been using the memoization techniques you mentioned. Saw a significant performance improvement!",
    timestamp: "2023-09-14T10:30:00Z",
    read: false
  }
];

// Mock conversations data
export const conversations = [
  {
    id: 1,
    participants: [1, 2],
    lastMessageId: 4,
    unreadCount: 0,
    lastUpdated: "2023-09-15T12:15:00Z"
  },
  {
    id: 2,
    participants: [1, 3],
    lastMessageId: 7,
    unreadCount: 1,
    lastUpdated: "2023-09-14T10:30:00Z"
  },
  {
    id: 3,
    participants: [1, 4],
    lastMessageId: null,
    unreadCount: 0,
    lastUpdated: "2023-09-10T14:00:00Z"
  }
];

// Mock companies data
export const companies = [
  {
    id: 1,
    name: "Tech Innovations",
    industry: "Technology",
    about: "Tech Innovations is a leading technology company focused on developing cutting-edge software solutions for enterprise clients.",
    website: "https://techinnovations.example.com",
    headquarters: "San Francisco, CA",
    founded: 2010,
    employees: "501-1,000",
    logo: "https://randomuser.me/api/portraits/lego/1.jpg"
  },
  {
    id: 2,
    name: "Digital Solutions Inc",
    industry: "Information Technology",
    about: "Digital Solutions Inc provides comprehensive IT services and software development for businesses across various industries.",
    website: "https://digitalsolutions.example.com",
    headquarters: "New York, NY",
    founded: 2005,
    employees: "1,001-5,000",
    logo: "https://randomuser.me/api/portraits/lego/2.jpg"
  },
  {
    id: 3,
    name: "Analytics Pro",
    industry: "Data Analytics",
    about: "Analytics Pro helps businesses leverage data to make informed decisions through advanced analytics and machine learning solutions.",
    website: "https://analyticspro.example.com",
    headquarters: "Boston, MA",
    founded: 2012,
    employees: "201-500",
    logo: "https://randomuser.me/api/portraits/lego/3.jpg"
  },
  {
    id: 4,
    name: "WebTech Solutions",
    industry: "Web Development",
    about: "WebTech Solutions specializes in creating custom web applications and responsive websites for businesses of all sizes.",
    website: "https://webtech.example.com",
    headquarters: "Austin, TX",
    founded: 2015,
    employees: "51-200",
    logo: "https://randomuser.me/api/portraits/lego/4.jpg"
  },
  {
    id: 5,
    name: "Creative Design Studio",
    industry: "Design",
    about: "Creative Design Studio is a full-service design agency offering UX/UI design, branding, and creative solutions.",
    website: "https://creativedesign.example.com",
    headquarters: "Seattle, WA",
    founded: 2018,
    employees: "11-50",
    logo: "https://randomuser.me/api/portraits/lego/5.jpg"
  }
];

// Mock notifications data
export const notifications = [
  {
    id: 1,
    userId: 1,
    type: "connection_request",
    fromUserId: 6,
    content: "Sarah Miller sent you a connection request",
    read: false,
    timestamp: "2023-09-15T08:30:00Z"
  },
  {
    id: 2,
    userId: 1,
    type: "post_like",
    fromUserId: 2,
    postId: 1,
    content: "Jane Smith liked your post",
    read: true,
    timestamp: "2023-09-15T07:45:00Z"
  },
  {
    id: 3,
    userId: 1,
    type: "post_comment",
    fromUserId: 3,
    postId: 1,
    content: "Robert Johnson commented on your post",
    read: true,
    timestamp: "2023-09-15T07:15:00Z"
  },
  {
    id: 4,
    userId: 1,
    type: "connection_accepted",
    fromUserId: 5,
    content: "Michael Brown accepted your connection request",
    read: false,
    timestamp: "2023-09-14T14:20:00Z"
  },
  {
    id: 5,
    userId: 1,
    type: "job_recommendation",
    jobId: 1,
    content: "New job recommendation: Senior Software Engineer at Tech Innovations",
    read: false,
    timestamp: "2023-09-14T09:00:00Z"
  }
];

// Helper function to get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === id);
};

// Helper function to get post by ID
export const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

// Helper function to get comments by post ID
export const getCommentsByPostId = (postId) => {
  return comments.filter(comment => comment.postId === postId);
};

// Helper function to get job by ID
export const getJobById = (id) => {
  return jobs.find(job => job.id === id);
};

// Helper function to get messages by conversation ID
export const getMessagesByConversationId = (conversationId) => {
  return messages.filter(message => message.conversationId === conversationId);
};

// Helper function to get conversation by users
export const getConversationByUsers = (user1Id, user2Id) => {
  return conversations.find(conversation => 
    conversation.participants.includes(user1Id) && 
    conversation.participants.includes(user2Id)
  );
};

// Helper function to get company by ID
export const getCompanyById = (id) => {
  return companies.find(company => company.id === id);
};

// Helper function to get notifications by user ID
export const getNotificationsByUserId = (userId) => {
  return notifications.filter(notification => notification.userId === userId);
};
