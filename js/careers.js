/* ===================================
   CAREERS.JS — Career Paths & Skill Trees
   =================================== */

const Careers = {
    paths: [
        {
            id: 'web',
            name: 'Web Development',
            icon: 'laptop', // Changed to Lucide icon name
            image: 'assets/careers/web.jpg',
            description: 'Build modern websites and web applications. From HTML basics to full-stack frameworks.',
            color: '#667eea',
            skills: [
                {
                    id: 'html-css',
                    name: 'HTML & CSS Fundamentals',
                    level: 'Beginner',
                    platform: 'freeCodeCamp',
                    platformUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
                    description: 'Learn the building blocks of every website',
                    videos: [
                        { id: 'v1', title: 'HTML Full Course for Beginners', duration: '2:02:07', youtube: 'https://www.youtube.com/watch?v=kUMe1FH4CHE' },
                        { id: 'v2', title: 'CSS Full Course for Beginners', duration: '6:18:37', youtube: 'https://www.youtube.com/watch?v=OXGznpKZ_sA' },
                        { id: 'v3', title: 'HTML/CSS Projects', duration: '4:55:12', youtube: 'https://www.youtube.com/watch?v=916GWv2qc08' },
                        { id: 'v4', title: 'CSS Grid Layout Crash Course', duration: '28:55', youtube: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc' },
                        { id: 'v5', title: 'CSS Flexbox in 15 Minutes', duration: '15:08', youtube: 'https://www.youtube.com/watch?v=u044iM9xsWU' }
                    ],
                    quiz: [
                        { q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Mode Language', 'Home Tool Markup Language'], answer: 0 },
                        { q: 'Which CSS property changes the text color?', options: ['font-color', 'text-color', 'color', 'text-style'], answer: 2 },
                        { q: 'What is the correct HTML element for the largest heading?', options: ['<heading>', '<h6>', '<head>', '<h1>'], answer: 3 },
                        { q: 'Which CSS property controls spacing between elements?', options: ['spacing', 'margin', 'gap-size', 'border'], answer: 1 },
                        { q: 'What does CSS Flexbox primarily help with?', options: ['Adding colors', 'Database queries', 'Layout and alignment', 'Server-side logic'], answer: 2 }
                    ]
                },
                {
                    id: 'javascript',
                    name: 'JavaScript Essentials',
                    level: 'Beginner',
                    description: 'Master the language of the web for interactive features',
                    videos: [
                        { id: 'hdI2bqOjy3c', title: 'JavaScript Crash Course For Beginners', duration: '1:40:29' },
                        { id: 'W6NZfCJ1SxI', title: 'JavaScript ES6 Tutorial', duration: '1:02:38' },
                        { id: 'PkZNo7MFNFg', title: 'Learn JavaScript - Full Course', duration: '3:26:42' },
                        { id: '8dWL3wF_OMw', title: 'Async JavaScript Crash Course', duration: '25:34' },
                        { id: 'DHjqpvDnNGE', title: 'JavaScript DOM Crash Course', duration: '39:33' }
                    ],
                    quiz: [
                        { q: 'Which keyword declares a constant in JavaScript?', options: ['var', 'let', 'const', 'static'], answer: 2 },
                        { q: 'What method converts a string to a number?', options: ['Number()', 'toNumber()', 'parseInt() only', 'String()'], answer: 0 },
                        { q: 'What is the DOM?', options: ['Database Object Model', 'Document Object Model', 'Data Output Method', 'Digital Object Manager'], answer: 1 },
                        { q: 'Which array method adds an element to the end?', options: ['append()', 'push()', 'add()', 'insert()'], answer: 1 },
                        { q: 'What does === check in JavaScript?', options: ['Value only', 'Type only', 'Value and type', 'Reference only'], answer: 2 }
                    ]
                },
                {
                    id: 'react',
                    name: 'React.js Framework',
                    level: 'Intermediate',
                    description: 'Build powerful user interfaces with React',
                    videos: [
                        { id: 'w7ejDZ8SWv8', title: 'React JS Crash Course', duration: '1:48:47' },
                        { id: 'b9eMGE7QtTk', title: 'React Tutorial For Beginners 2024', duration: '1:12:00' },
                        { id: 'LDB4uaJ87e0', title: 'React Hooks Explained', duration: '1:05:28' },
                        { id: 'Law7wfdg_ls', title: 'React State Management', duration: '45:15' },
                        { id: '0riHps91AzE', title: 'Full React Course 2024', duration: '2:30:00' }
                    ],
                    quiz: [
                        { q: 'What is JSX?', options: ['A database query language', 'JavaScript XML - syntax extension', 'A CSS framework', 'A testing library'], answer: 1 },
                        { q: 'What React hook manages state?', options: ['useEffect', 'useState', 'useRef', 'useContext'], answer: 1 },
                        { q: 'What is a React component?', options: ['A CSS file', 'A reusable piece of UI', 'A database table', 'A server endpoint'], answer: 1 },
                        { q: 'How do you pass data from parent to child component?', options: ['State', 'Props', 'Hooks', 'Context only'], answer: 1 },
                        { q: 'What does useEffect do?', options: ['Manages state', 'Handles side effects', 'Creates components', 'Styles elements'], answer: 1 }
                    ]
                },
                {
                    id: 'nodejs',
                    name: 'Node.js Backend',
                    level: 'Intermediate',
                    description: 'Server-side JavaScript for building APIs and backends',
                    videos: [
                        { id: 'fBNz5xF-Kx4', title: 'Node.js Crash Course', duration: '1:30:00' },
                        { id: 'L72fhGm1tfE', title: 'Express.js Crash Course', duration: '1:14:58' },
                        { id: '-MTSQjw5DrM', title: 'REST API With Node.js & Express', duration: '1:30:00' },
                        { id: 'ENrzD9HAZK4', title: 'Node.js MongoDB Tutorial', duration: '37:28' },
                        { id: 'Oe421EPjeBE', title: 'Node.js Full Course for Beginners', duration: '2:00:00' }
                    ],
                    quiz: [
                        { q: 'What is Node.js?', options: ['A browser', 'A JavaScript runtime for servers', 'A database', 'A CSS framework'], answer: 1 },
                        { q: 'What is Express.js?', options: ['A database', 'A React library', 'A web framework for Node.js', 'A testing tool'], answer: 2 },
                        { q: 'What does REST stand for?', options: ['Representational State Transfer', 'Real-time Event System Transfer', 'Responsive Server Technology', 'Remote Execution Service Tool'], answer: 0 },
                        { q: 'Which HTTP method is used to create data?', options: ['GET', 'POST', 'DELETE', 'PATCH'], answer: 1 },
                        { q: 'What is middleware in Express?', options: ['A database layer', 'Functions that execute between request and response', 'A frontend template', 'A CSS processor'], answer: 1 }
                    ]
                },
                {
                    id: 'fullstack',
                    name: 'Full-Stack Projects',
                    level: 'Advanced',
                    description: 'Combine frontend and backend to build complete applications',
                    videos: [
                        { id: 'ngc9gnGrafA', title: 'Full Stack Project Tutorial', duration: '2:00:00' },
                        { id: '7CqJlxBYj-M', title: 'MERN Stack Crash Course', duration: '2:00:00' },
                        { id: 'mrHNSanmqQ4', title: 'Full Stack App Tutorial 2024', duration: '3:00:00' },
                        { id: 'O3BUHwfHf84', title: 'Deploy Full Stack App', duration: '45:00' },
                        { id: 'J6mDkcqU_ZE', title: 'Full Stack Web Dev in 2024', duration: '1:15:00' }
                    ],
                    quiz: [
                        { q: 'What is the MERN stack?', options: ['MongoDB, Express, React, Node', 'MySQL, Ember, Ruby, Nginx', 'MongoDB, Electron, React, Next', 'MySQL, Express, React, Node'], answer: 0 },
                        { q: 'What is deployment?', options: ['Writing code', 'Making an app available to users online', 'Testing code', 'Designing UI'], answer: 1 },
                        { q: 'What is an API?', options: ['A design tool', 'Application Programming Interface', 'A database type', 'A programming language'], answer: 1 },
                        { q: 'What is authentication?', options: ['Making a website look good', 'Verifying user identity', 'Writing CSS', 'Deploying an app'], answer: 1 },
                        { q: 'Why use environment variables?', options: ['For styling', 'To store sensitive config securely', 'For animations', 'For debugging'], answer: 1 }
                    ]
                }
            ]
        },
        {
            id: 'data',
            name: 'Data Science',
            icon: 'bar-chart',
            image: 'assets/careers/data.jpg',
            description: 'Analyze data, build models, and extract insights to drive business decisions.',
            color: '#00d2ff',
            skills: [
                {
                    id: 'python-basics',
                    name: 'Python Programming',
                    level: 'Beginner',
                    description: 'Learn Python, the #1 language for data science',
                    videos: [
                        { id: 'rfscVS0vtbw', title: 'Learn Python - Full Course', duration: '4:26:51' },
                        { id: 'kqtD5dpn9C8', title: 'Python for Beginners', duration: '5:58:05' },
                        { id: '_uQrJ0TkZlc', title: 'Python Tutorial for Beginners', duration: '6:14:07' },
                        { id: 'HGOBQPFzWKo', title: 'Python Crash Course', duration: '1:30:00' },
                        { id: 'eWRfhZUzrAc', title: 'Python Full Course 2024', duration: '3:00:00' }
                    ],
                    quiz: [
                        { q: 'What type of language is Python?', options: ['Compiled', 'Interpreted', 'Assembly', 'Machine code'], answer: 1 },
                        { q: 'How do you create a list in Python?', options: ['{}', '[]', '()', '<>'], answer: 1 },
                        { q: 'What keyword defines a function in Python?', options: ['function', 'func', 'def', 'define'], answer: 2 },
                        { q: 'What is a dictionary in Python?', options: ['A list of words', 'Key-value pairs', 'A type of loop', 'A library'], answer: 1 },
                        { q: 'How do you comment in Python?', options: ['//', '/* */', '#', '--'], answer: 2 }
                    ]
                },
                {
                    id: 'pandas',
                    name: 'Pandas & Data Manipulation',
                    level: 'Intermediate',
                    description: 'Master data manipulation and analysis with Pandas',
                    videos: [
                        { id: 'vmEHCJofslg', title: 'Pandas Tutorial', duration: '1:00:27' },
                        { id: 'ZyhVh-qRZPA', title: 'Python Pandas Tutorial', duration: '1:30:00' },
                        { id: 'PcvsOaixUh8', title: 'Data Analysis with Pandas', duration: '45:00' },
                        { id: 'gtjxAH8uaP0', title: 'Pandas DataFrames Explained', duration: '30:00' },
                        { id: 'xi0vhXFPegw', title: 'Advanced Pandas', duration: '1:00:00' }
                    ],
                    quiz: [
                        { q: 'What is a DataFrame?', options: ['A graph', 'A 2D labeled data structure', 'A function', 'A loop'], answer: 1 },
                        { q: 'Which method reads a CSV file in Pandas?', options: ['pd.open_csv()', 'pd.read_csv()', 'pd.load_csv()', 'pd.import_csv()'], answer: 1 },
                        { q: 'How do you select a column in Pandas?', options: ['df.column()', 'df[column_name]', 'df.get(column)', 'df->column'], answer: 1 },
                        { q: 'What does df.describe() do?', options: ['Deletes data', 'Shows summary statistics', 'Renames columns', 'Sorts data'], answer: 1 },
                        { q: 'What method removes missing values?', options: ['df.remove()', 'df.dropna()', 'df.clean()', 'df.delete_null()'], answer: 1 }
                    ]
                },
                {
                    id: 'visualization',
                    name: 'Data Visualization',
                    level: 'Intermediate',
                    description: 'Create stunning charts and visualizations with matplotlib and seaborn',
                    videos: [
                        { id: 'UO98lJQ3QGI', title: 'Matplotlib Tutorial', duration: '32:33' },
                        { id: 'a9UrKTVEeZA', title: 'Seaborn Tutorial', duration: '36:18' },
                        { id: 'nKxLfUrkLE8', title: 'Data Visualization with Python', duration: '1:30:00' },
                        { id: 'GGL6U0bUxSI', title: 'Plotly Python Tutorial', duration: '45:00' },
                        { id: '0P7nCmln7PM', title: 'Complete Data Viz Course', duration: '2:00:00' }
                    ],
                    quiz: [
                        { q: 'What library creates static plots in Python?', options: ['plotly', 'matplotlib', 'pandas', 'numpy'], answer: 1 },
                        { q: 'What chart type shows data distribution?', options: ['Pie chart', 'Bar chart', 'Histogram', 'Line chart'], answer: 2 },
                        { q: 'What is seaborn built on top of?', options: ['pandas', 'numpy', 'matplotlib', 'scikit-learn'], answer: 2 },
                        { q: 'Which plot shows correlation between two variables?', options: ['Pie chart', 'Scatter plot', 'Bar chart', 'Histogram'], answer: 1 },
                        { q: 'What does a heatmap show?', options: ['Temperature', 'Correlation matrix visually', 'File sizes', 'Network traffic'], answer: 1 }
                    ]
                },
                {
                    id: 'ml-basics',
                    name: 'Machine Learning Basics',
                    level: 'Advanced',
                    description: 'Introduction to machine learning algorithms and scikit-learn',
                    videos: [
                        { id: 'Gv9_4yMHFhI', title: 'Machine Learning Full Course', duration: '2:00:00' },
                        { id: '7eh4d6sabA0', title: 'ML with Python Tutorial', duration: '4:00:00' },
                        { id: 'pqNCD_5r0IU', title: 'Scikit-Learn Crash Course', duration: '45:00' },
                        { id: 'i_LwzRVP7bg', title: 'ML Algorithms Explained', duration: '1:00:00' },
                        { id: 'NWONeJKn6kc', title: 'Build Your First ML Model', duration: '30:00' }
                    ],
                    quiz: [
                        { q: 'What is supervised learning?', options: ['Learning without data', 'Learning from labeled data', 'Unsupervised clustering', 'Reinforcement learning'], answer: 1 },
                        { q: 'What is a classification problem?', options: ['Predicting a number', 'Predicting a category', 'Clustering data', 'Reducing dimensions'], answer: 1 },
                        { q: 'What library is used for ML in Python?', options: ['pandas', 'matplotlib', 'scikit-learn', 'seaborn'], answer: 2 },
                        { q: 'What is overfitting?', options: ['Model too simple', 'Model memorizes training data', 'Model is fast', 'Model uses too little data'], answer: 1 },
                        { q: 'What is train-test split?', options: ['Splitting code files', 'Dividing data for training and evaluation', 'Breaking a model', 'Splitting features'], answer: 1 }
                    ]
                }
            ]
        },
        {
            id: 'ai',
            name: 'AI & Machine Learning',
            icon: 'cpu',
            image: 'assets/careers/ai.jpg',
            description: 'Deep dive into artificial intelligence, neural networks, and deep learning.',
            color: '#f093fb',
            skills: [
                {
                    id: 'math-ai',
                    name: 'Math for AI',
                    level: 'Beginner',
                    description: 'Linear algebra, calculus, and statistics for AI',
                    videos: [
                        { id: 'fNk_zzaMoSs', title: 'Linear Algebra Full Course', duration: '2:30:00' },
                        { id: 'WUvTyaaNkzM', title: 'Calculus for Machine Learning', duration: '1:30:00' },
                        { id: 'xxpc-HPKN28', title: 'Statistics for Data Science', duration: '1:00:00' },
                        { id: 'Tt61o2Q6bpE', title: 'Probability for ML', duration: '45:00' },
                        { id: 'r-uOLxNrNk8', title: 'Math for ML Complete Guide', duration: '2:00:00' }
                    ],
                    quiz: [
                        { q: 'What is a matrix?', options: ['A movie', 'A 2D array of numbers', 'A type of graph', 'A formula'], answer: 1 },
                        { q: 'What is a derivative in calculus?', options: ['An integral', 'Rate of change', 'A constant', 'A matrix'], answer: 1 },
                        { q: 'What is the mean?', options: ['Middle value', 'Most common value', 'Average of all values', 'Range of values'], answer: 2 },
                        { q: 'What does a dot product produce?', options: ['A matrix', 'A scalar', 'A vector', 'A graph'], answer: 1 },
                        { q: 'What is standard deviation?', options: ['The mean', 'The median', 'Measure of data spread', 'Data count'], answer: 2 }
                    ]
                },
                {
                    id: 'deep-learning',
                    name: 'Deep Learning & Neural Networks',
                    level: 'Intermediate',
                    description: 'Understand neural networks and deep learning',
                    videos: [
                        { id: 'aircAruvnKk', title: 'Deep Learning Crash Course', duration: '1:30:00' },
                        { id: 'VyWAvY2CF9c', title: 'Neural Networks Explained', duration: '2:00:00' },
                        { id: 'tPYj3fFJGjk', title: 'PyTorch Crash Course', duration: '1:00:00' },
                        { id: 'Mubj_fqiAv8', title: 'TensorFlow in 2024', duration: '1:30:00' },
                        { id: 'GIsg-ZUy0MY', title: 'Complete DL Bootcamp', duration: '3:00:00' }
                    ],
                    quiz: [
                        { q: 'What is a neuron in a neural network?', options: ['A brain cell', 'A computational unit', 'A database', 'A server'], answer: 1 },
                        { q: 'What is backpropagation?', options: ['Forward pass', 'Algorithm to update weights based on error', 'Data preprocessing', 'A type of layer'], answer: 1 },
                        { q: 'What activation function is commonly used?', options: ['SIN', 'ReLU', 'LOG', 'SQRT'], answer: 1 },
                        { q: 'What is an epoch?', options: ['A time period', 'One pass through the entire dataset', 'A layer type', 'A loss function'], answer: 1 },
                        { q: 'Which framework was developed by Google?', options: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras only'], answer: 1 }
                    ]
                },
                {
                    id: 'nlp',
                    name: 'Natural Language Processing',
                    level: 'Advanced',
                    description: 'Process and understand human language with AI',
                    videos: [
                        { id: 'fOvTtapxa9c', title: 'NLP Full Course', duration: '2:00:00' },
                        { id: 'X2vAabgKiuM', title: 'Transformers Explained', duration: '45:00' },
                        { id: 'xvqsFTUsOmc', title: 'BERT and GPT Explained', duration: '30:00' },
                        { id: 'CMrHM8a3hqw', title: 'Text Classification with Python', duration: '1:00:00' },
                        { id: 'RkYuH_K7Fx4', title: 'Build a ChatBot with NLP', duration: '1:30:00' }
                    ],
                    quiz: [
                        { q: 'What is tokenization?', options: ['Encrypting text', 'Breaking text into smaller units', 'Translating text', 'Compressing text'], answer: 1 },
                        { q: 'What does NLP stand for?', options: ['Neural Language Protocol', 'Natural Language Processing', 'Network Level Processing', 'Node Logic Program'], answer: 1 },
                        { q: 'What architecture powers modern LLMs?', options: ['CNN', 'RNN', 'Transformer', 'SVM'], answer: 2 },
                        { q: 'What is sentiment analysis?', options: ['Grammar checking', 'Determining emotion/opinion in text', 'Translation', 'Spell checking'], answer: 1 },
                        { q: 'What is GPT?', options: ['A database', 'Generative Pre-trained Transformer', 'A programming language', 'A testing framework'], answer: 1 }
                    ]
                },
                {
                    id: 'computer-vision',
                    name: 'Computer Vision',
                    level: 'Advanced',
                    description: 'Teach machines to see and understand images',
                    videos: [
                        { id: 'dJYGatp4SvA', title: 'Computer Vision Basics', duration: '1:00:00' },
                        { id: 'WFr2WgN9_xE', title: 'OpenCV Python Course', duration: '3:00:00' },
                        { id: 'pDo6S8eNiYQ', title: 'CNN Explained', duration: '45:00' },
                        { id: 'V_xro1stqNw', title: 'Image Classification Tutorial', duration: '1:00:00' },
                        { id: 'cPmjQ9V6Hbk', title: 'YOLO Object Detection', duration: '1:30:00' }
                    ],
                    quiz: [
                        { q: 'What neural network is best for images?', options: ['RNN', 'CNN', 'GAN', 'Transformer only'], answer: 1 },
                        { q: 'What is a convolutional layer?', options: ['A database layer', 'Applies filters to extract features', 'A fully connected layer', 'An output layer'], answer: 1 },
                        { q: 'What is object detection?', options: ['Finding bugs in code', 'Identifying and locating objects in images', 'Database query', 'Text processing'], answer: 1 },
                        { q: 'What does OpenCV stand for?', options: ['Open Computer Vision', 'Open Code Viewer', 'Online CV', 'Open Core Vision'], answer: 0 },
                        { q: 'What is image segmentation?', options: ['Cropping images', 'Dividing image into meaningful regions', 'Compressing images', 'Rotating images'], answer: 1 }
                    ]
                }
            ]
        },
        {
            id: 'cyber',
            name: 'Cybersecurity',
            icon: 'shield-check',
            image: 'assets/careers/cyber.jpg',
            description: 'Protect systems, networks, and data from digital attacks and threats.',
            color: '#ff5252',
            skills: [
                {
                    id: 'networking',
                    name: 'Networking Fundamentals',
                    level: 'Beginner',
                    description: 'TCP/IP, DNS, HTTP, and how the internet works',
                    videos: [
                        { id: 'qiQR5rTSshw', title: 'Computer Networking Course', duration: '1:20:00' },
                        { id: 'IPvYjXCsTg8', title: 'TCP/IP and Networking Basics', duration: '1:30:00' },
                        { id: '7_LPdttKXPc', title: 'How the Internet Works', duration: '30:00' },
                        { id: 'mpQZVYPuDGU', title: 'DNS Explained', duration: '20:00' },
                        { id: 'VwN91x5i25g', title: 'Complete Networking Tutorial', duration: '2:00:00' }
                    ],
                    quiz: [
                        { q: 'What does TCP stand for?', options: ['Transfer Control Protocol', 'Transmission Control Protocol', 'Text Control Protocol', 'Total Control Protocol'], answer: 1 },
                        { q: 'What port does HTTP use?', options: ['443', '21', '80', '22'], answer: 2 },
                        { q: 'What does DNS do?', options: ['Blocks websites', 'Translates domain names to IPs', 'Encrypts data', 'Manages files'], answer: 1 },
                        { q: 'What layer does IP operate at?', options: ['Application', 'Transport', 'Network', 'Data Link'], answer: 2 },
                        { q: 'What is a firewall?', options: ['A physical wall', 'Network security device/software', 'A virus', 'An operating system'], answer: 1 }
                    ]
                },
                {
                    id: 'linux-security',
                    name: 'Linux & Security Tools',
                    level: 'Beginner',
                    description: 'Master Linux commands and security tools',
                    videos: [
                        { id: 'sWbUDq4S6Y8', title: 'Linux for Beginners', duration: '3:00:00' },
                        { id: 'ZtqBQ68cfJc', title: 'Linux Command Line Full Course', duration: '2:00:00' },
                        { id: 'v8aYhOxZQTA', title: 'Kali Linux Tutorial', duration: '1:30:00' },
                        { id: 'lZAoFs75_cs', title: 'Linux Security Essentials', duration: '1:00:00' },
                        { id: 'wBp0Rb-ZJak', title: 'The 50 Most Popular Linux Commands', duration: '5:00:00' }
                    ],
                    quiz: [
                        { q: 'What command lists files in Linux?', options: ['dir', 'show', 'ls', 'list'], answer: 2 },
                        { q: 'What is sudo?', options: ['A game', 'Super User Do - run as admin', 'A text editor', 'A package manager'], answer: 1 },
                        { q: 'Which Linux distro is for penetration testing?', options: ['Ubuntu', 'Fedora', 'Kali Linux', 'Arch Linux'], answer: 2 },
                        { q: 'What does chmod do?', options: ['Creates files', 'Changes file permissions', 'Deletes files', 'Copies files'], answer: 1 },
                        { q: 'What is the root user?', options: ['Regular user', 'Guest user', 'Administrator with full access', 'Read-only user'], answer: 2 }
                    ]
                },
                {
                    id: 'ethical-hacking',
                    name: 'Ethical Hacking',
                    level: 'Intermediate',
                    description: 'Learn penetration testing and vulnerability assessment',
                    videos: [
                        { id: '3Kq1MIfTWCE', title: 'Ethical Hacking Full Course', duration: '3:30:00' },
                        { id: 'fNzpcB7ODxQ', title: 'Penetration Testing Tutorial', duration: '2:00:00' },
                        { id: 'WnN6dbos5u8', title: 'Web Application Hacking', duration: '1:30:00' },
                        { id: 'wq0SaJAvbew', title: 'Bug Bounty Tutorial 2024', duration: '1:00:00' },
                        { id: 'T_QHYk4EREM', title: 'Nmap Tutorial For Beginners', duration: '45:00' }
                    ],
                    quiz: [
                        { q: 'What is ethical hacking?', options: ['Illegal hacking', 'Testing security with permission', 'Writing malware', 'Social media hacking'], answer: 1 },
                        { q: 'What tool scans for open ports?', options: ['Photoshop', 'Nmap', 'Excel', 'Chrome'], answer: 1 },
                        { q: 'What is SQL injection?', options: ['A database backup', 'Injecting malicious SQL through input', 'A programming language', 'A CSS technique'], answer: 1 },
                        { q: 'What is a vulnerability?', options: ['A feature', 'A weakness that can be exploited', 'A firewall', 'A password'], answer: 1 },
                        { q: 'What does OWASP stand for?', options: ['Open Web App Security Protocol', 'Open Web Application Security Project', 'Online Web App Scanner', 'Open Wireless Access Security'], answer: 1 }
                    ]
                },
                {
                    id: 'cryptography',
                    name: 'Cryptography & Encryption',
                    level: 'Advanced',
                    description: 'Understand encryption, hashing, and secure communication',
                    videos: [
                        { id: 'jhXCTbFnK8o', title: 'Cryptography Full Course', duration: '2:00:00' },
                        { id: 'AQDCe585Lnc', title: 'How Encryption Works', duration: '30:00' },
                        { id: 'NuyzuNBFWxQ', title: 'SSL/TLS Explained', duration: '25:00' },
                        { id: 'Gzem1dEvjnE', title: 'Hashing Algorithms Explained', duration: '20:00' },
                        { id: 'nDgMRngyB_Y', title: 'PKI & Digital Certificates', duration: '45:00' }
                    ],
                    quiz: [
                        { q: 'What is encryption?', options: ['Deleting data', 'Converting data to unreadable format', 'Compressing files', 'Copying data'], answer: 1 },
                        { q: 'What is a hash function?', options: ['Reversible encryption', 'One-way function producing fixed output', 'A password', 'A database query'], answer: 1 },
                        { q: 'What is the difference between symmetric and asymmetric encryption?', options: ['No difference', 'Symmetric uses one key, asymmetric uses two', 'They are the same', 'Asymmetric is weaker'], answer: 1 },
                        { q: 'What is HTTPS?', options: ['Insecure HTTP', 'HTTP with SSL/TLS encryption', 'A programming language', 'A database protocol'], answer: 1 },
                        { q: 'What is a digital certificate?', options: ['A PDF document', 'Proof of identity for secure communication', 'A password file', 'An email attachment'], answer: 1 }
                    ]
                }
            ]
        },
        {
            id: 'mobile',
            name: 'Mobile Development',
            icon: 'smartphone',
            image: 'assets/careers/mobile.jpg',
            description: 'Build native and cross-platform mobile apps for iOS and Android.',
            color: '#00c853',
            skills: [
                {
                    id: 'flutter',
                    name: 'Flutter & Dart',
                    level: 'Beginner',
                    description: 'Build beautiful cross-platform apps with Flutter',
                    videos: [
                        { id: 'VPvVD8t02U8', title: 'Flutter Course for Beginners', duration: '3:42:54' },
                        { id: '1ukSR1GRtMU', title: 'Dart Programming Tutorial', duration: '4:31:05' },
                        { id: 'FTm22_HOcBE', title: 'Flutter Crash Course 2024', duration: '1:30:00' },
                        { id: 'D4nhaszNW4o', title: 'Flutter UI Design', duration: '1:00:00' },
                        { id: 'HQ_ytw58tC4', title: 'Build a Flutter App from Scratch', duration: '2:00:00' }
                    ],
                    quiz: [
                        { q: 'What language does Flutter use?', options: ['JavaScript', 'Kotlin', 'Dart', 'Swift'], answer: 2 },
                        { q: 'Who developed Flutter?', options: ['Apple', 'Microsoft', 'Google', 'Facebook'], answer: 2 },
                        { q: 'What is a Widget in Flutter?', options: ['A database', 'Everything is a widget - UI building block', 'A server', 'A CSS class'], answer: 1 },
                        { q: 'What is hot reload?', options: ['Restarting the phone', 'Instantly seeing code changes without restart', 'Heating the device', 'A crash'], answer: 1 },
                        { q: 'Flutter builds for which platforms?', options: ['Only Android', 'Only iOS', 'iOS, Android, Web, Desktop', 'Only Web'], answer: 2 }
                    ]
                },
                {
                    id: 'react-native',
                    name: 'React Native',
                    level: 'Intermediate',
                    description: 'Build mobile apps with JavaScript and React',
                    videos: [
                        { id: 'obH0Po_RdWk', title: 'React Native Tutorial 2024', duration: '2:30:00' },
                        { id: '0-S5a0eXPoc', title: 'React Native Crash Course', duration: '2:17:00' },
                        { id: 'AkEnidfZnCU', title: 'React Native for Beginners', duration: '1:30:00' },
                        { id: 'VozPNrt-LfE', title: 'React Native Project Tutorial', duration: '3:00:00' },
                        { id: 'mJ3bGvy0WAY', title: 'React Native Navigation', duration: '45:00' }
                    ],
                    quiz: [
                        { q: 'What language is React Native built with?', options: ['Dart', 'Python', 'JavaScript', 'Swift'], answer: 2 },
                        { q: 'Who developed React Native?', options: ['Google', 'Microsoft', 'Apple', 'Meta/Facebook'], answer: 3 },
                        { q: 'Does React Native use native components?', options: ['No, it uses web views', 'Yes, it maps to native UI', 'It only uses HTML', 'It uses canvas'], answer: 1 },
                        { q: 'What is Expo in React Native?', options: ['A testing tool', 'A framework/toolchain for faster development', 'A database', 'A design tool'], answer: 1 },
                        { q: 'Can you share code between React and React Native?', options: ['Never', 'Yes, business logic can be shared', 'Only CSS', 'Only HTML'], answer: 1 }
                    ]
                },
                {
                    id: 'swift-ios',
                    name: 'Swift & iOS Development',
                    level: 'Intermediate',
                    description: 'Build native iOS apps with Swift',
                    videos: [
                        { id: 'comQ1-x2a1Q', title: 'Swift Programming Tutorial', duration: '3:39:18' },
                        { id: 'CwA1VWP0Ldw', title: 'SwiftUI Full Course', duration: '4:00:00' },
                        { id: 'n5X_V81OYnQ', title: 'iOS App Dev for Beginners', duration: '2:00:00' },
                        { id: '09TeUXjzpKs', title: 'Build Your First iOS App', duration: '1:30:00' },
                        { id: 'F2ojC6TNwws', title: 'Swift Concurrency Explained', duration: '45:00' }
                    ],
                    quiz: [
                        { q: 'What language is used for iOS development?', options: ['Java', 'Kotlin', 'Swift', 'C#'], answer: 2 },
                        { q: 'What IDE is used for iOS development?', options: ['VS Code', 'Android Studio', 'Xcode', 'IntelliJ'], answer: 2 },
                        { q: 'What is SwiftUI?', options: ['A database', 'A declarative UI framework', 'A testing tool', 'A server framework'], answer: 1 },
                        { q: 'What is an Optional in Swift?', options: ['A required value', 'A value that can be nil', 'A loop', 'A function type'], answer: 1 },
                        { q: 'What platform do iOS apps run on?', options: ['Android', 'Windows', 'Apple devices', 'Linux only'], answer: 2 }
                    ]
                },
                {
                    id: 'kotlin-android',
                    name: 'Kotlin & Android',
                    level: 'Intermediate',
                    description: 'Build native Android apps with Kotlin',
                    videos: [
                        { id: 'EExSSotojVI', title: 'Kotlin Course for Beginners', duration: '2:28:00' },
                        { id: 'fis26HvvDII', title: 'Android Development Course', duration: '11:54:00' },
                        { id: 'BBWyXo-3JGQ', title: 'Jetpack Compose Tutorial', duration: '1:30:00' },
                        { id: 'cDabx3SjuOY', title: 'Build Your First Android App', duration: '2:00:00' },
                        { id: 'FjrKMcnKXwI', title: 'Android App Architecture', duration: '1:00:00' }
                    ],
                    quiz: [
                        { q: 'What language is recommended for Android dev?', options: ['Swift', 'Python', 'Kotlin', 'Ruby'], answer: 2 },
                        { q: 'What IDE is used for Android development?', options: ['Xcode', 'Android Studio', 'VS Code', 'Eclipse'], answer: 1 },
                        { q: 'What is Jetpack Compose?', options: ['A music app', 'Modern Android UI toolkit', 'A database', 'An email client'], answer: 1 },
                        { q: 'What is an Activity in Android?', options: ['A CSS class', 'A screen or UI component', 'A database table', 'A network call'], answer: 1 },
                        { q: 'What is the Android SDK?', options: ['A programming language', 'Software Development Kit for Android', 'A design tool', 'An operating system'], answer: 1 }
                    ]
                }
            ]
        },
        {
            id: 'cloud',
            name: 'Cloud Computing',
            icon: 'cloud',
            image: 'assets/careers/cloud.jpg',
            description: 'Master cloud platforms, DevOps practices, and infrastructure management.',
            color: '#ffab00',
            skills: [
                {
                    id: 'aws-basics',
                    name: 'AWS Fundamentals',
                    level: 'Beginner',
                    description: 'Learn Amazon Web Services core services',
                    videos: [
                        { id: 'ulprqHHWlng', title: 'AWS Cloud Practitioner Course', duration: '4:00:00' },
                        { id: 'k1RI5locZE4', title: 'AWS Tutorial for Beginners', duration: '3:00:00' },
                        { id: 'ZB5ONbD_SMY', title: 'AWS Services Overview', duration: '1:00:00' },
                        { id: '3hLmDS179YE', title: 'AWS EC2 Tutorial', duration: '30:00' },
                        { id: 'r4YIdn2eTm4', title: 'AWS S3 Tutorial', duration: '25:00' }
                    ],
                    quiz: [
                        { q: 'What does AWS stand for?', options: ['Advanced Web Services', 'Amazon Web Services', 'Application Web Server', 'Automated Web System'], answer: 1 },
                        { q: 'What is EC2?', options: ['A database', 'Virtual servers in the cloud', 'A storage service', 'A networking tool'], answer: 1 },
                        { q: 'What is S3 used for?', options: ['Computing', 'Object storage', 'Email', 'DNS'], answer: 1 },
                        { q: 'What is the cloud?', options: ['Weather', 'On-demand computing resources over the internet', 'A type of software', 'A programming language'], answer: 1 },
                        { q: 'What is IAM in AWS?', options: ['A monitoring tool', 'Identity and Access Management', 'A database', 'A load balancer'], answer: 1 }
                    ]
                },
                {
                    id: 'docker',
                    name: 'Docker & Containers',
                    level: 'Intermediate',
                    description: 'Containerize applications with Docker',
                    videos: [
                        { id: 'fqMOX6JJhGo', title: 'Docker Tutorial for Beginners', duration: '2:10:00' },
                        { id: 'pTFZFxd4hOI', title: 'Docker in 100 Seconds', duration: '2:00' },
                        { id: '3c-iBn73dDE', title: 'Docker Compose Tutorial', duration: '1:30:00' },
                        { id: 'pg19Z8LL06w', title: 'Docker Networking', duration: '45:00' },
                        { id: 'kTp5xUtcalw', title: 'Docker Full Course 2024', duration: '3:00:00' }
                    ],
                    quiz: [
                        { q: 'What is Docker?', options: ['A programming language', 'A platform to containerize applications', 'A database', 'An OS'], answer: 1 },
                        { q: 'What is a Docker container?', options: ['A virtual machine', 'A lightweight, isolated package of software', 'A server', 'A network'], answer: 1 },
                        { q: 'What file defines a Docker image?', options: ['package.json', 'Dockerfile', 'config.yaml', 'docker.xml'], answer: 1 },
                        { q: 'What is Docker Hub?', options: ['A code editor', 'A registry for Docker images', 'A monitoring tool', 'A CI/CD tool'], answer: 1 },
                        { q: 'What does docker-compose do?', options: ['Writes music', 'Manages multi-container applications', 'Creates databases', 'Monitors servers'], answer: 1 }
                    ]
                },
                {
                    id: 'kubernetes',
                    name: 'Kubernetes',
                    level: 'Advanced',
                    description: 'Orchestrate containers at scale with Kubernetes',
                    videos: [
                        { id: 'X48VuDVv0do', title: 'Kubernetes Tutorial for Beginners', duration: '3:36:00' },
                        { id: 's_o8dwzRlu4', title: 'Kubernetes Crash Course', duration: '1:00:00' },
                        { id: 'PziYflu8cB8', title: 'Kubernetes Architecture Explained', duration: '30:00' },
                        { id: 'qmDzcu5uY1I', title: 'K8s Deployment Strategies', duration: '45:00' },
                        { id: 'EQNO_B8YZE8', title: 'Kubernetes Full Course', duration: '4:00:00' }
                    ],
                    quiz: [
                        { q: 'What is Kubernetes?', options: ['A programming language', 'Container orchestration platform', 'A database', 'An editor'], answer: 1 },
                        { q: 'What is a Kubernetes Pod?', options: ['A server room', 'Smallest deployable unit with containers', 'A network', 'A firewall'], answer: 1 },
                        { q: 'Who originally developed Kubernetes?', options: ['AWS', 'Microsoft', 'Google', 'Facebook'], answer: 2 },
                        { q: 'What is kubectl?', options: ['A database tool', 'Command-line tool for K8s', 'A monitoring service', 'A container runtime'], answer: 1 },
                        { q: 'What is a Kubernetes Service?', options: ['A payment plan', 'Exposes pods to network traffic', 'A database type', 'A container image'], answer: 1 }
                    ]
                },
                {
                    id: 'cicd',
                    name: 'CI/CD & DevOps',
                    level: 'Advanced',
                    description: 'Automate building, testing, and deploying code',
                    videos: [
                        { id: 'scEDHsr3APg', title: 'DevOps Course for Beginners', duration: '2:30:00' },
                        { id: 'R8_veQiYBjI', title: 'GitHub Actions Tutorial', duration: '1:30:00' },
                        { id: 'f4idgaq2VqA', title: 'Jenkins Full Course', duration: '3:00:00' },
                        { id: '7S_lB7Hv_LM', title: 'CI/CD Pipeline Explained', duration: '30:00' },
                        { id: 'PGyhBwLyK2U', title: 'GitOps & ArgoCD', duration: '1:00:00' }
                    ],
                    quiz: [
                        { q: 'What does CI stand for?', options: ['Computer Interface', 'Continuous Integration', 'Code Inspector', 'Cloud Infrastructure'], answer: 1 },
                        { q: 'What does CD stand for?', options: ['Code Delivery', 'Continuous Deployment/Delivery', 'Cloud Database', 'Compact Disc'], answer: 1 },
                        { q: 'What is a CI/CD pipeline?', options: ['A data pipeline', 'Automated workflow for build, test, deploy', 'A network cable', 'A database connection'], answer: 1 },
                        { q: 'What is GitHub Actions?', options: ['A social media feature', 'CI/CD platform built into GitHub', 'A code editor', 'A project management tool'], answer: 1 },
                        { q: 'What is Infrastructure as Code?', options: ['Writing code on paper', 'Managing infrastructure through code files', 'A frontend framework', 'A database query'], answer: 1 }
                    ]
                }
            ]
        }
    ],

    // --- Render career path cards ---
    renderPaths() {
        const grid = document.getElementById('career-paths-grid');
        const progress = App.getProgress();

        grid.innerHTML = this.paths.map(career => {
            const totalSkills = career.skills.length;
            const completedSkills = career.skills.filter(s =>
                progress.completedSkills.includes(s.id)
            ).length;
            const percent = Math.round((completedSkills / totalSkills) * 100);

            const skillTags = career.skills.slice(0, 4).map(s =>
                `<span class="skill-tag">${s.name}</span>`
            ).join('');

            return `
                <div class="career-card" onclick="Careers.openCareer('${career.id}')" style="animation-delay: ${this.paths.indexOf(career) * 0.1}s">
                    <div class="career-card-image" style="background-image: url('${career.image}')"></div>
                    <div class="career-card-content">
                        <div class="career-card-header">
                            <i data-lucide="${career.icon}" class="career-icon"></i>
                            <h3>${career.name}</h3>
                        </div>
                        <p>${career.description}</p>
                        <div class="career-skills-preview">${skillTags}</div>
                        <div class="career-card-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${percent}%"></div>
                            </div>
                            <span class="progress-label">${percent}%</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // --- Open a specific career path ---
    openCareer(careerId) {
        const career = this.paths.find(c => c.id === careerId);
        if (!career) return;

        this.currentCareer = career;

        document.getElementById('career-detail-icon').innerHTML = `<i data-lucide="${career.icon}" style="width: 48px; height: 48px; color: var(--color-primary);"></i>`;
        document.getElementById('career-detail-title').textContent = career.name;
        document.getElementById('career-detail-desc').textContent = career.description;

        const progress = App.getProgress();
        const tree = document.getElementById('skill-tree');

        // Render as a Flow Chart
        let html = '<div class="flow-chart-container">';
        
        career.skills.forEach((skill, i) => {
            const isCompleted = progress.completedSkills.includes(skill.id);
            const watchedCount = progress.watchedVideos.filter(v => v.startsWith(skill.id + '::')).length;
            const totalVideos = skill.videos.length;
            const skillPercent = Math.round((watchedCount / totalVideos) * 100);

            // Add connector from previous node
            if (i > 0) {
                html += `
                    <div class="flow-connector ${isCompleted || progress.completedSkills.includes(career.skills[i-1].id) ? 'active' : ''}" style="height: 60px;">
                        <div class="flow-connector-arrow"></div>
                    </div>
                `;
            }

            html += `
                <div class="flow-node ${isCompleted ? 'completed' : ''}" 
                     onclick="Careers.openSkill('${career.id}', '${skill.id}')" 
                     style="animation-delay: ${i * 0.15}s">
                    <div class="flow-node-content">
                        <div class="flow-node-icon">
                            ${isCompleted ? '✓' : i + 1}
                        </div>
                        <div class="flow-node-info">
                            <div class="flow-node-title">${skill.name}</div>
                            <div class="flow-node-desc">${skill.description}</div>
                            <div class="skill-node-progress" style="height: 4px; margin-top: 8px;">
                                <div class="skill-node-progress-fill" style="width: ${skillPercent}%"></div>
                            </div>
                        </div>
                        <div style="font-size: 12px; color: var(--text-muted); min-width: 60px; text-align: right;">
                            ${skillPercent}%
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        tree.innerHTML = html;

        document.getElementById('back-to-careers').onclick = () => App.navigate('careers-page');

        // Populate career-level overview progress bar
        const totalSkills = career.skills.length;
        const completedCount = career.skills.filter(s => progress.completedSkills.includes(s.id)).length;
        const careerPct = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

        const copFill = document.getElementById('cop-fill');
        const copPct = document.getElementById('cop-percent');
        const copSteps = document.getElementById('cop-steps');

        if (copFill) copFill.style.width = careerPct + '%';
        if (copPct) copPct.textContent = careerPct + '%';
        if (copSteps) {
            copSteps.innerHTML = career.skills.map(s => {
                const done = progress.completedSkills.includes(s.id);
                return `<span class="cop-step ${done ? 'done' : ''}">${done ? '✓ ' : ''}${s.name}</span>`;
            }).join('');
        }

        App.navigate('career-detail-page');
    },

    // --- Open a specific skill for learning ---
    openSkill(careerId, skillId) {
        const career = this.paths.find(c => c.id === careerId);
        const skill = career?.skills.find(s => s.id === skillId);
        if (!skill) return;

        this.currentCareer = career;
        this.currentSkill = skill;
        Videos.loadSkill(skill);

        document.getElementById('back-to-career').onclick = () => Careers.openCareer(careerId);
        App.navigate('skill-page');
    }
};
