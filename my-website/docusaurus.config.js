// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CAC For Mac',
  tagline: 'Your Go-To Guide for Smart Cards on macOS',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://cacformac.com', // If using a custom domain, this is correct
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/', // If using a custom domain, this is correct

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Cocopuff2u', // Usually your GitHub org/user name.
  projectName: 'CAC_FOR_MAC', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Cocopuff2u/CAC_FOR_MAC/edit/main/my-website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Cocopuff2u/CAC_FOR_MAC/edit/main/my-website/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-3BYEB7MXSW', // Replace with your Google Gtag tracking ID
          anonymizeIP: false, // Optional: anonymize IP addresses
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/Example_CAC.png',
      navbar: {
        title: 'CAC For Mac',
        logo: {
          alt: 'CAC For Mac Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Introduction',
          },
          {
            type: 'docSidebar',
            sidebarId: 'certificateGuideSidebar',
            position: 'left',
            label: 'Certificate Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'smartCardGuideSidebar',
            position: 'left',
            label: 'Smart Card Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'right', // Use 'left' for consistency
            label: 'Support',
          },
          {
            href: 'https://github.com/cocopuff2u/CAC_FOR_MAC',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://www.buymeacoffee.com/cocopuff2u',
            position: 'right',
            className: 'header-buymeacoffee-link',
            'aria-label': 'Buy Me a Coffee',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Certificate Guide',
                to: '/docs/certificate/Certificate-Introduction',
              },
              {
                label: 'Smart Card Guide',
                to: '/docs/smartcard/Smart-Card-Introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Mac Admins Slack',
                href: 'https://macadmins.slack.com/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'CaC For Mac GitHub',
                href: 'https://github.com/cocopuff2u/cac-for-mac',
              },
              {
                label: 'Found an Issue?',
                href: 'https://github.com/cocopuff2u/cac-for-mac/issues',
              },
              {
                label: 'Need Something?',
                href: 'https://github.com/cocopuff2u/cac-for-mac/discussions',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CAC For Mac.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      announcementBar: {
        id: 'contribute_call',
        content:
          //'<b>🚀 Looking for people to <a target="_blank" rel="noopener noreferrer" href="https://github.com/cocopuff2u/cac-for-mac">contribute</a>! Join us and help improve CAC For Mac.</b>',
          '<b>🚧  We\'re actively building out more pages—thanks for your patience as we grow! 🚧</b>',
        // backgroundColor: '#2563eb', // A moderate blue that works in both modes
        backgroundColor: '#ffff00', // Changed to red
        textColor: '#000000',       // White text for good contrast
        isCloseable: true,
      },
    }),

  plugins: [
    // Remove the '@docusaurus/plugin-google-gtag' plugin if it exists
  ],
};

export default config;
