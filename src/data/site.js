// Single source of truth for site-wide identity, navigation and contact
// details. Edit here rather than hunting through components.

export const site = {
  name: 'Tanya Euler',
  domain: 'tanyaeuler.com',
  url: 'https://tanyaeuler.com',
  role: 'Brand & Web Designer',
  location: 'Flagstone, South East Queensland',
  email: 'tanya@artifexstudio.com.au',

  tagline: 'Brand, business and a life of faith.',

  intro:
    'I build brands and websites for women stepping into their own thing — and I write about what it actually looks like to run a business, raise a family and keep faith at the centre of both.',

  // Shown in the footer and on the contact page. Replace the placeholder
  // handles with the real profile URLs.
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/artifexmarketingstudio' },
    { label: 'Instagram', href: 'https://www.instagram.com/artifexmarketingstudio' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanyaeuler' },
  ],
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'What I Do', to: '/work' },
  { label: 'Faith', to: '/faith' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]
