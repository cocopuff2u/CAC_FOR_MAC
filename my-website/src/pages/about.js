import React from 'react';
import Layout from '@theme/Layout';
import './about.css'; // Add this import

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      {/* Added project introduction and details below */}
      <div className="about-container">
        {/* Logo above the title */}
        <h1 className="about-title-animate about-title-rainbow">Welcome to the CAC for Mac Project</h1>
                <img
          src="/img/logo.svg"
          alt="CAC for Mac Logo"
          className="about-logo"
        />
        <p>
          A core part of our mission—and the original intent of this project—is to provide a central location for all smart card and certificate questions for the Mac community. Information was previously scattered across many old Mac admin posts, open-source projects, URLs, and outdated guides. By consolidating knowledge, tools, and resources into an easy-to-read and user-friendly format, we give Mac admins/users a single place to find collected, up-to-date information.
        </p>
        <p>
          Not many of us have smart card knowledge, and even the guides available in the wild are often not detailed or explanatory enough for most of us to come up with a working solution. If you know something, say something—this community exists to help build knowledge and tools for others, while adding a layer of security for everyone.
        </p>
        <h2>About the Project</h2>
        <p>
          Everything in this project is sourced from open-source projects, applications, and shared knowledge articles. Built by the community for the community, much of the progress in bringing smart cards to Macs comes directly from the collective efforts, experiences, and solutions contributed by Mac admins and users. Our community has played a vital role in developing, refining, and sharing the workflows that make smart card integration on macOS possible.
        </p>
                {/* Move image showcase below intro */}
        <div className="about-image-showcase">
          <img src="/img/example_cac_id.webp" alt="CAC ID" className="showcase-img holo" />
          <img src="/img/example_yubikey.webp" alt="YubiKey" className="showcase-img" />
          <img src="/img/example_card.webp" alt="Smart Card" className="showcase-img holo" />
        </div>
        <h2>Our Goals</h2>
        <ul>
          <li><b>Centralized Knowledge:</b> <br />Serve as a single, reliable source for the latest information related to smart cards and certificates on macOS.</li>
          <li><b>Community Collaboration:</b> <br />Foster a welcoming space where Mac admins can contribute, share, and improve resources for the benefit of all.</li>
          <li><b>Ease of Use:</b> <br />Break down complex topics and technical details, making them accessible to users of all experience levels.</li>
          <li><b>Up-to-Date Information:</b> <br />Ensure the community always has access to the most current tools, techniques, and best practices.</li>
          <li><b>Automated Solutions & Detailed Guides:</b> <br />Provide automated solutions alongside in-depth guides, empowering users to automate instantly or build their own custom workflows with the information provided.</li>
        </ul>
        <h2>How to Contribute</h2>
        <p>
          We welcome contributions from everyone! Here’s how you can help:
        </p>
        <ul>
          <li><b>Reporting Issues:</b> If you encounter problems or have suggestions, please let us know by <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/issues" target="_blank" rel="noopener noreferrer">reporting an issue</a>.</li>
          <li><b>Submitting Changes:</b> For those who want to dive deeper, you can fork the repository and submit a pull request with your proposed changes.</li>
          <li><b>Documentation:</b> Help us improve by suggesting edits or additions to our documentation.</li>
          <li><b>Spreading the Word:</b> Share this project with your network to help us reach more people!</li>
        </ul>
        {/* Move Join the Community button here, make it prominent */}
        <div className="about-cta">
          <a
            href="https://github.com/cocopuff2u/CAC_FOR_MAC"
            className="about-btn about-btn-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Community
          </a>
        </div>
      </div>
    </Layout>
  );
}
