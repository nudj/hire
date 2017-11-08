const {
  booleanChoices,
  questionTypes
} = require('./lib/constants')

const {
  YES,
  NO
} = booleanChoices
const {
  // TEXT,
  FREETEXT,
  CHOICE
} = questionTypes

const data = {
  assets: [],
  companies: [],
  conversations: [],
  jobs: [],
  people: [],
  referrals: [],
  applications: [],
  hirers: [],
  employees: [],
  recommendations: [],
  internalMessages: [],
  externalMessages: [],
  surveyMessages: [],
  surveys: [],
  surveySections: [],
  surveyQuestions: [],
  companyTasks: [],
  personTasks: [],
  tokens: [],
  employeeSurveys: [],
  accounts: [],
  messages: [],
  connections: []
}
data.companies = data.companies.concat([
  {
    id: 'company1',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    industry: ['IT', 'Mining', 'Healthcare'],
    location: 'London',
    logo: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2F2a%2F89%2Fde%2F2a89dee5376d13e8d378e797d4e7e5fc.gif',
    name: 'Fake Company',
    slug: 'fake-company',
    url: 'http://omg.fake-company.com',
    description: 'OMG this company is SO hot right now. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.',
    onboarded: true
  },
  {
    id: 'company2',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    industry: ['Winning'],
    location: 'London',
    logo: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2F2a%2F89%2Fde%2F2a89dee5376d13e8d378e797d4e7e5fc.gif',
    name: 'nudj',
    slug: 'nudj',
    url: 'https://nudj.co',
    description: 'OMG this company is SO hot right now. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.',
    onboarded: true
  }
])
data.jobs = data.jobs.concat([
  {
    id: 'job1',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Senior Full-Stack Software Engineer',
    slug: 'senior-full-stack-software-engineer-2',
    url: 'https://bulb.workable.com/j/389500EB72',
    status: 'PUBLISHED',
    bonus: 1000,
    description: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
    type: 'Permanent',
    remuneration: 'Competitive + Options',
    experience: '16 billion years',
    requirements: 'building large-scale web-based applications in 🐔, 💅🏼 and 💩.',
    templateTags: ['food'],
    tags: [
      'Software',
      'Developer',
      'Full-Stack'
    ],
    location: 'London',
    company: 'company99',
    relatedJobs: [
      '2'
    ]
  },
  {
    id: 'job2',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Senior Fake Test Job',
    slug: 'senior-fake-test-job',
    url: 'https://fake.com',
    status: 'PUBLISHED',
    bonus: 1000,
    description: 'Fake job! vitae sodales velit ligula quis ligula. Sed et tincidunt nisi. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.',
    type: 'Permanent',
    remuneration: 'Competitive + Options',
    experience: '300+ years',
    requirements: 'building large-scale web-based applications in 🐔, 💅🏼 and 💩.',
    templateTags: ['food', 'film'],
    tags: [
      'Fake',
      'Job'
    ],
    location: 'London',
    company: 'company1',
    relatedJobs: [
      '1'
    ]
  }
])
data.people = data.people.concat([
  {
    id: 'person1',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Nick',
    lastName: 'Collings',
    email: 'nick@nudj.co',
    url: 'http://test.com/',
    title: 'Tech Lead',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: 'person2',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Robyn',
    lastName: 'McGirl',
    email: 'robyn@nudj.co',
    url: 'http://test.com/',
    title: 'CEO',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: 'person3',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Jamie',
    lastName: 'Gunson',
    email: 'jamie@nudj.co',
    url: 'http://test.com/',
    title: 'Head of Product',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: 'person4',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Matt',
    lastName: 'Ellis',
    email: 'matt@nudj.co',
    url: 'http://test.com/',
    title: 'Design Wizard',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: 'person5',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'David',
    lastName: 'Platt',
    email: 'david@nudj.co',
    url: 'http://not-a-real-person.com',
    title: 'Senior Fake User',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: 'person6',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Tim',
    lastName: 'Robinson',
    email: 'tim@nudj.co',
    url: 'http://not-a-real-person.com',
    title: 'Junior Fake User',
    type: 'external',
    company: 'nudj',
    status: 'user'
  }
])
data.hirers = data.hirers.concat([
  {
    id: 'hirer1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    person: 'person5',
    company: 'company1'
  },
  {
    id: 'hirer2',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    person: 'person1',
    company: 'company1'
  },
  {
    id: 'hirer3',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    person: 'person6',
    company: 'company1'
  }
])
data.employees = data.employees.concat([
  {
    id: 'employee1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    person: 'person4',
    company: 'company1'
  }
])
data.referrals = data.referrals.concat([
  {
    id: 'referral1',
    job: 'job2',
    person: 'person2',
    parent: null,
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00'
  }
])
data.applications = data.applications.concat([
  {
    id: 'application1',
    job: 'job2',
    person: 'person3',
    referral: 'referral1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00'
  }
])
data.recommendations = data.recommendations.concat([
  {
    id: 'recommendation1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    job: 'job2',
    person: 'person1',
    hirer: 'hirer1',
    source: 'HIRER'
  },
  {
    id: 'recommendation2',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    job: 'job2',
    person: 'person3',
    hirer: 'hirer1',
    source: 'NUDJ'
  },
  {
    id: 'recommendation3',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    job: 'job2',
    person: 'person2',
    hirer: 'hirer1',
    source: 'HIRER'
  },
  {
    id: 'recommendation4',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    job: 'job2',
    person: 'person5',
    hirer: 'hirer1',
    source: 'NUDJ'
  }
])
data.companyTasks = data.companyTasks.concat([
  {
    id: 'companyTask2',
    company: 'company1',
    type: 'SEND_SURVEY_INTERNAL',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    completed: false,
    completedBy: 'person2'
  },
  {
    id: 'companyTask3',
    company: 'company1',
    type: 'SHARE_JOBS',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    completed: true,
    completedBy: null
  }
])
data.personTasks = data.personTasks.concat([
  {
    id: 'personTask1',
    person: 'person5',
    type: 'UNLOCK_NETWORK_LINKEDIN',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    completed: false
  },
  {
    id: 'personTask4',
    person: 'person5',
    type: 'HIRER_SURVEY',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    completed: false
  }
])
data.tokens = data.tokens.concat([
  {
    id: 'token1',
    token: 'nice-fat-hash',
    type: 'TEST_TOKEN',
    data: {
      employeeSurvey: 'employeeSurvey1'
    }
  }
])
data.employeeSurveys = data.employeeSurveys.concat([
  {
    id: 'employeeSurvey1',
    employee: 'employee1',
    survey: 'survey1'
  }
])
data.surveys = data.surveys.concat([
  {
    id: 'survey1',
    slug: 'aided-recall-baby',
    company: 'company1'
  }
])
data.surveySections = data.surveySections.concat([
  {
    id: 'section1',
    survey: 'survey1',
    title: 'Aided recall on acid baby',
    description: 'Consequat domesticarum te pariatur a nescius de malis expetendis.'
  },
  {
    id: 'section2',
    survey: 'survey1',
    title: 'Professional + Previous Employers',
    description: 'First up, the places that you\'ve worked before and the people you know professionally.'
  },
  // {
  //   id: 'section3',
  //   survey: 'survey1',
  //   title: 'Friends & Family',
  //   description: ''
  // },
  // {
  //   id: 'section4',
  //   survey: 'survey1',
  //   title: 'Events & Networks',
  //   description: ''
  // },
  {
    id: 'section5',
    survey: 'survey1',
    title: 'Thanks for your answers',
    description: 'Fore ubi nescius aut do ipsum e anim.'
  }
])
data.surveyQuestions = data.surveyQuestions.concat([
  {
    id: 'question1',
    surveySection: 'section2',
    name: 'workBefore',
    title: 'Where did you work before BEAR?',
    description: 'Please list all of your previous employers. Thanks!',
    type: FREETEXT,
    required: false,
    dependencies: {},
    tags: [],
    options: {
      placeholder: 'Answers go here...'
    }
  },
  {
    id: 'question2',
    surveySection: 'section2',
    name: 'knowAccountManagers',
    title: 'Were there any stand-out Account Managers at any of your previous companies?',
    description: 'Remember, the we\'re trying to find people to ask for recommendations as well as hire, so don\'t worry if they don\'t match the skill set your currently looking for?',
    type: CHOICE,
    required: true,
    dependencies: {},
    tags: [],
    options: {
      choices: [
        {
          title: 'Yes',
          name: YES
        },
        {
          title: 'No',
          name: NO
        }
      ]
    }
  },
  {
    id: 'question3',
    surveySection: 'section2',
    name: 'accountManagers',
    title: 'Great! Please add their name(s) below.',
    description: '',
    type: FREETEXT,
    required: true,
    options: {
      placeholder: 'Answers go here...'
    },
    tags: ['Account Management'],
    dependencies: {
      knowAccountManagers: YES
    }
  },
  // {
  //   id: 'question4',
  //   surveySection: 'section2',
  //   name: 'knowSales',
  //   title: 'What about people that worked in broader Sales roles (e.g. Biz Dev, Customer Success etc.)?',
  //   description: 'Again, we\'re only trying to find people to ask for recommendations as well as hire, so don\'t worry if they\'re too senior for the role you\'re currently looking for!',
  //   type: CHOICE,
  //   required: true,
  //   dependencies: {},
  //   tags: [],
  //   options: {
  //     choices: [
  //       {
  //         title: 'Yes',
  //         name: YES
  //       },
  //       {
  //         title: 'No',
  //         name: NO
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: 'question5',
  //   surveySection: 'section2',
  //   name: 'sales',
  //   title: 'Great! Please add their name(s) below.',
  //   description: '',
  //   type: FREETEXT,
  //   required: true,
  //   options: {
  //     placeholder: 'Answers go here...'
  //   },
  //   tags: ['Sales'],
  //   dependencies: {
  //     knowSales: YES
  //   }
  // },
  // {
  //   id: 'question6',
  //   surveySection: 'section2',
  //   name: 'knowGraduates',
  //   title: 'Did you come across or manage any good graduates?',
  //   description: '',
  //   type: CHOICE,
  //   required: true,
  //   dependencies: {},
  //   tags: [],
  //   options: {
  //     choices: [
  //       {
  //         title: 'Yes',
  //         name: YES
  //       },
  //       {
  //         title: 'No',
  //         name: NO
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: 'question7',
  //   surveySection: 'section2',
  //   name: 'graduates',
  //   title: 'Great! Please add their name(s) below.',
  //   description: '',
  //   type: FREETEXT,
  //   required: true,
  //   options: {
  //     placeholder: 'Answers go here...'
  //   },
  //   tags: ['Graduate'],
  //   dependencies: {
  //     knowGraduates: YES
  //   }
  // },
  // {
  //   id: 'question8',
  //   surveySection: 'section2',
  //   name: 'knowWorkWithGraduates',
  //   title: 'What about people who might manage or work with graduates?',
  //   description: '',
  //   type: CHOICE,
  //   required: true,
  //   dependencies: {},
  //   tags: [],
  //   options: {
  //     choices: [
  //       {
  //         title: 'Yes',
  //         name: YES
  //       },
  //       {
  //         title: 'No',
  //         name: NO
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: 'question9',
  //   surveySection: 'section2',
  //   name: 'workWithGraduates',
  //   title: 'Great! Please add their name(s) below.',
  //   description: '',
  //   type: FREETEXT,
  //   required: true,
  //   options: {
  //     placeholder: 'Answers go here...'
  //   },
  //   tags: ['Work with graduates'],
  //   dependencies: {
  //     knowWorkWithGraduates: YES
  //   }
  // },
  // {
  //   id: 'question10',
  //   surveySection: 'section2',
  //   name: 'best',
  //   title: 'In general, who was the best person you worked with?',
  //   description: 'Ignoring their role entirely, we just want to know who the best person you\'ve worked with. Maybe you worked with a few awesome people? If so, feel free to add them all below.',
  //   type: TEXT,
  //   required: false,
  //   dependencies: {},
  //   options: {
  //     placeholder: 'Answer goes here...'
  //   },
  //   tags: ['Best']
  // },
  // {
  //   id: 'question11',
  //   surveySection: 'section2',
  //   name: 'managed',
  //   title: 'Who were the stand-out people that you managed?',
  //   description: 'We want to know all the people that you managed previously that you thought were going to have your job someday!',
  //   type: FREETEXT,
  //   required: false,
  //   dependencies: {},
  //   options: {
  //     placeholder: 'Answers go here...'
  //   },
  //   tags: ['Subordinate']
  // },
  {
    id: 'question12',
    surveySection: 'section3',
    name: 'knowFriendsFmcg',
    title: 'Do any of your friends work in the FMCG space?',
    description: 'Maybe they work for an established brand. Or perhaps they work for a start-up. It might not strictly speaking be FMCG, but still has a sales team and works in the area of food (e.g. Farmdrop).',
    type: CHOICE,
    required: true,
    dependencies: {},
    tags: [],
    options: {
      choices: [
        {
          title: 'Yes',
          name: YES
        },
        {
          title: 'No',
          name: NO
        }
      ]
    }
  },
  {
    id: 'question13',
    surveySection: 'section3',
    name: 'friendsFmcg',
    title: 'Great! Please add their name(s) below.',
    description: '',
    type: FREETEXT,
    required: true,
    options: {
      placeholder: 'Answers go here...'
    },
    tags: ['FMCG'],
    dependencies: {
      knowFriendsFmcg: YES
    }
  },
  {
    id: 'question14',
    surveySection: 'section3',
    name: 'knowFamilyFmcg',
    title: 'Do any of your family work in the FMCG space?',
    description: 'There might not be anyone in your immediate family, but try to think broader, such as your cousins.',
    type: CHOICE,
    required: true,
    dependencies: {},
    tags: [],
    options: {
      choices: [
        {
          title: 'Yes',
          name: YES
        },
        {
          title: 'No',
          name: NO
        }
      ]
    }
  },
  {
    id: 'question15',
    surveySection: 'section3',
    name: 'familyFmcg',
    title: 'Great! Please add their name(s) below.',
    description: '',
    type: FREETEXT,
    required: true,
    options: {
      placeholder: 'Answers go here...'
    },
    tags: ['FMCG'],
    dependencies: {
      knowFamilyFmcg: YES
    }
  },
  {
    id: 'question16',
    surveySection: 'section3',
    name: 'knowSiblingGraduates',
    title: 'Have any of your friend\'s siblings graduated in the last few years?',
    description: 'This is to see if we can uncover an junior, but eager, sales person - after all grads are likely to know other grads!',
    type: CHOICE,
    required: true,
    dependencies: {},
    tags: [],
    options: {
      choices: [
        {
          title: 'Yes',
          name: YES
        },
        {
          title: 'No',
          name: NO
        }
      ]
    }
  },
  {
    id: 'question17',
    surveySection: 'section3',
    name: 'graduates',
    title: 'Great! Please add their name(s) below.',
    description: '',
    type: FREETEXT,
    required: true,
    options: {
      placeholder: 'Answers go here...'
    },
    tags: ['Graduate'],
    dependencies: {
      knowSiblingGraduates: YES
    }
  },
  {
    id: 'question18',
    surveySection: 'section4',
    name: 'events',
    title: 'Have you attended any work related events recently?',
    description: '',
    type: FREETEXT,
    required: false,
    dependencies: {},
    tags: [],
    options: {
      placeholder: 'Answers go here...'
    }
  },
  {
    id: 'question19',
    surveySection: 'section4',
    name: 'knowFromEvents',
    title: 'Did you meet anyone there that might be suitable (or might know someone suitable) for BEAR\'s job?',
    description: 'Perhaps you met someone while working at an event that had an interest in what BEAR was doing.',
    type: CHOICE,
    required: true,
    dependencies: {},
    tags: [],
    options: {
      choices: [
        {
          title: 'Yes',
          name: YES
        },
        {
          title: 'No',
          name: NO
        }
      ]
    }
  },
  {
    id: 'question20',
    surveySection: 'section4',
    name: 'fromEvents',
    title: 'Great! Please add their name(s) below.',
    description: '',
    type: FREETEXT,
    required: true,
    options: {
      placeholder: 'Answers go here...'
    },
    tags: ['events'],
    dependencies: {
      knowFromEvents: YES
    }
  },
  {
    id: 'question21',
    surveySection: 'section4',
    name: 'clubs',
    title: 'Are you part of any clubs or networking groups outside of work?',
    description: '',
    type: FREETEXT,
    required: false,
    dependencies: {},
    tags: [],
    options: {
      placeholder: 'Answers go here...'
    }
  },
  {
    id: 'question22',
    surveySection: 'section4',
    name: 'knowFromClubs',
    title: 'Is there anyone there that might be suitable for the job?',
    description: '',
    type: CHOICE,
    required: true,
    dependencies: {},
    tags: [],
    options: {
      choices: [
        {
          title: 'Yes',
          name: YES
        },
        {
          title: 'No',
          name: NO
        }
      ]
    }
  },
  {
    id: 'question23',
    surveySection: 'section4',
    name: 'fromClubs',
    title: 'Great! Please add their name(s) below.',
    description: '',
    type: FREETEXT,
    required: true,
    options: {
      placeholder: 'Answers go here...'
    },
    tags: ['clubs'],
    dependencies: {
      knowFromClubs: YES
    }
  }
])

module.exports = data
