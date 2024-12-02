import enrollment_img from './enrollment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import T1 from './T10.png'
import T2 from './T2.png'
import T3 from './T3.png'
import T4 from './T4.png'
import T5 from './T5.png'
import T6 from './T6.png'
import T7 from './T7.png'
import T8 from './T8.png'
import T9 from './T9.png'
import T10 from './T1.png'
import T11 from './T11.png'
import T12 from './T12.png'
import T13 from './T13.png'
import T14 from './T14.png'
import T15 from './T15.png'
import Math from './Math.svg'
import Science from './Science.svg'
import Programming from './Programming.svg'
import Language from './Language.svg'
import Art from './Art.svg'
import Business from './Business.svg'


export const assets = {
    enrollment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}
//speciality field for the tutor.
export const specialityData = [
    {
        speciality: 'Programming',
        image: Programming
    },
    {
        speciality: 'Language',
        image: Language
    },
    {
        speciality: 'Math',
        image: Math
    },
    {
        speciality: 'Business',
        image: Business
    },
    {
        speciality: 'Art',
        image: Art
    },
    {
        speciality: 'Science',
        image: Science
    },
]
export const tutors = [
    {
        _id: 'T1',
        name: 'Richard James',
        image: T1,
        speciality: 'Programming',
        degree: 'Ph.D. in Computer Science',
        experience: '8 Years',
        about: 'Richard is an expert in software engineering, specializing in algorithms and data structures. He has guided numerous students in building real-world applications.',
        fees: 100,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Tech Hub, Silicon Valley'
        }
    },
    {
        _id: 'T2',
        name: 'Emily Larson',
        image: T2,
        speciality: 'Language',
        degree: 'Ph.D. in Linguistics',
        experience: '5 Years',
        about: 'Emily has a passion for teaching modern languages, focusing on effective communication and cultural nuances. She has experience with diverse learning methodologies.',
        fees: 80,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Language Center, New York'
        }
    },
    {
        _id: 'T3',
        name: 'Sarah Patel',
        image: T3,
        speciality: 'Math',
        degree: 'Ph.D. in Applied Mathematics',
        experience: '3 Years',
        about: 'Sarah specializes in calculus and linear algebra, helping students understand abstract mathematical concepts through simple explanations and applications.',
        fees: 70,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Math Zone, Cambridge'
        }
    },
    {
        _id: 'T4',
        name: 'Christopher Lee',
        image: T4,
        speciality: 'Business',
        degree: 'MBA in Business Administration',
        experience: '6 Years',
        about: 'Christopher excels in business strategy and entrepreneurship. He has mentored start-ups and facilitated workshops on business growth and market strategies.',
        fees: 120,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Corporate Street, Chicago'
        }
    },
    {
        _id: 'T5',
        name: 'Jen Garcia',
        image: T5,
        speciality: 'Art',
        degree: 'MFA in Fine Arts',
        experience: '8 Years',
        about: 'Jen is a creative arts tutor focusing on painting, sculpture, and contemporary art practices. Her approach emphasizes creativity and self-expression.',
        fees: 90,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Creative Lane, Paris'
        }
    },
    {
        _id: 'T6',
        name: 'Andrew Williams',
        image: T6,
        speciality: 'Art',
        degree: 'Ph.D. in Visual Arts',
        experience: '9 Years',
        about: 'Andrew specializes in graphic design and digital media, helping students develop cutting-edge art portfolios for professional opportunities.',
        fees: 85,
        address: {
            line1: '59th Cross, Richmond',
            line2: 'Gallery Avenue, Berlin'
        }
    },
    {
        _id: 'T7',
        name: 'Christopher Davis',
        image: T7,
        speciality: 'Programming',
        degree: 'M.Sc. in Software Development',
        experience: '5 Years',
        about: 'Christopher teaches coding best practices, programming logic, and software architecture, enabling students to excel in competitive tech environments.',
        fees: 95,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Code Valley, Seattle'
        }
    },
    {
        _id: 'T8',
        name: 'Timothy White',
        image: T8,
        speciality: 'Language',
        degree: 'Ph.D. in Comparative Literature',
        experience: '4 Years',
        about: 'Timothy integrates literature and modern language skills to help students master advanced writing and conversational fluency.',
        fees: 75,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Lit District, London'
        }
    },
    {
        _id: 'T9',
        name: 'Ava Mitchell',
        image: T9,
        speciality: 'Math',
        degree: 'M.Sc. in Pure Mathematics',
        experience: '2 Years',
        about: 'Ava focuses on geometry, trigonometry, and problem-solving strategies, making mathematics engaging and intuitive for learners.',
        fees: 65,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Mathematics Square, Boston'
        }
    },
    {
        _id: 'T10',
        name: 'Jeffrey King',
        image: T10,
        speciality: 'Business',
        degree: 'Ph.D. in Marketing',
        experience: '8 Years',
        about: 'Jeffrey has a profound understanding of market analysis and consumer behavior, offering insights to students looking to master business trends.',
        fees: 110,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Business Park, Toronto'
        }
    },
    {
        _id: 'T11',
        name: 'Zoe Kelly',
        image: T11,
        speciality: 'Art',
        degree: 'MFA in Creative Arts',
        experience: '6 Years',
        about: 'Zoe teaches art history and hands-on creative techniques, enabling students to explore their artistic capabilities through traditional and digital mediums.',
        fees: 80,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Art Lane, Florence'
        }
    },
    {
        _id: 'T12',
        name: 'Patrick Harris',
        image: T12,
        speciality: 'Art',
        degree: 'Ph.D. in Art History',
        experience: '10 Years',
        about: 'Patrick provides in-depth knowledge of classical and contemporary art movements, fostering critical analysis and artistic appreciation among students.',
        fees: 95,
        address: {
            line1: '59th Cross, Richmond',
            line2: 'Artistic Plaza, Rome'
        }
    },
    {
        _id: 'T13',
        name: 'Chloe Evans',
        image: T13,
        speciality: 'Programming',
        degree: 'M.Sc. in Artificial Intelligence',
        experience: '6 Years',
        about: 'Chloe specializes in AI, machine learning, and coding for intelligent systems, equipping students with future-ready programming skills.',
        fees: 110,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Innovation Street, Tokyo'
        }
    },
    {
        _id: 'T14',
        name: 'Ryan Martinez',
        image: T14,
        speciality: 'Language',
        degree: 'Ph.D. in Applied Linguistics',
        experience: '7 Years',
        about: 'Ryan focuses on phonetics and advanced language acquisition techniques, helping students master multilingual proficiencies.',
        fees: 85,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Linguistic Avenue, Madrid'
        }
    },
    {
        _id: 'T15',
        name: 'Amelia Hill',
        image: T15,
        speciality: 'Math',
        degree: 'M.Sc. in Computational Mathematics',
        experience: '3 Years',
        about: 'Amelia specializes in statistical modeling and computational math, making complex problems accessible for students in STEM fields.',
        fees: 70,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'STEM Hub, Singapore'
        }
    },
];
