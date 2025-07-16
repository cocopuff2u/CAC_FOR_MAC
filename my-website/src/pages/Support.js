import React from 'react';
import Layout from '@theme/Layout';
import './About.css';

export default function Support() {
  return (
    <Layout title="Support" description="Support and contribute to CAC for Mac">
      <div className="about-container">
        <h1 className="about-title-animate about-title-rainbow">Support & Contribute</h1>
        
        {/* --- BEGIN USER SUPPORT SECTION --- */}
        <div className="about-support-section">
          <h2><b>Need Help? Get Support!</b></h2>
          <p>
            Whether you're a Mac user or admin, we're here to help with smart cards, certificates, and anything related to this project. Here are the best ways to get support:
          </p>
          <ol>
            <li>
              <b>Ask Questions:</b><br />
              Visit our <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a> to ask questions, get troubleshooting help, or seek advice from the community. You can browse existing topics or start a new one.
            </li>
            <li>
              <b>Report Issues:</b><br />
              If you encounter a bug, problem, or have a suggestion, please open an <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/issues/new" target="_blank" rel="noopener noreferrer">Issue</a> on GitHub. The more details you provide (macOS version, steps to reproduce, screenshots, etc.), the faster we can help!
            </li>
            <li>
              <b>Feature Requests:</b><br />
              Have an idea for a new feature or improvement? Submit it via <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/issues/new" target="_blank" rel="noopener noreferrer">Issues</a> and mark it as a feature request.
            </li>
            <li>
              <b>Browse Documentation:</b><br />
              Explore our guides and documentation for step-by-step instructions and troubleshooting tips.
            </li>
            <li>
              <b>Get Real-Time Help on MacAdmins Slack:</b><br />
              Join the <a href="https://macadmins.slack.com/" target="_blank" rel="noopener noreferrer">MacAdmins Slack</a> and post your questions in the <code>#smartcard</code> channel. You'll find experienced admins and community members ready to assist.
            </li>
          </ol>
          <p>
            The community is here to help—no question is too small!
          </p>
        </div>

        {/* --- BEGIN CONTRIBUTOR GUIDE SECTION --- */}
        <div className="about-guide-section">
          <h2><b>Want to Help Others? Become a Contributor!</b></h2>
                    {/* --- Add Join the Community button below --- */}
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
          <p>
            If you have knowledge, experience, or resources to share, we welcome your contributions! Here’s how you can support the project and help others:
          </p>
          <ol>
            <li>
              <b>Join Discussions:</b><br />
              Answer questions, share solutions, and participate in <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a> to help users in need.
            </li>
            <li>
              <b>Fork the Repository:</b><br />
              Go to the <a href="https://github.com/cocopuff2u/CAC_FOR_MAC" target="_blank" rel="noopener noreferrer">GitHub repository</a> and click <b>Fork</b> to create your own copy.
            </li>
            <li>
              <b>Clone Your Fork:</b><br />
              Use <code>git clone &lt;your-fork-url&gt;</code> to download your fork locally.
            </li>
            <li>
              <b>Make Improvements:</b><br />
              Add features, fix bugs, improve documentation, or submit new guides and resources.
            </li>
            <li>
              <b>Commit & Push:</b><br />
              Commit your changes and push them to your fork on GitHub.
            </li>
            <li>
              <b>Open a Pull Request:</b><br />
              Go to your fork and click <b>New Pull Request</b> to propose your changes to the main project. Describe your changes clearly and reference any related issues.
            </li>
            <li>
              <b>Review & Collaborate:</b><br />
              Collaborate with other contributors by reviewing pull requests, discussing improvements, and sharing feedback.
            </li>
          </ol>
          <p>
            <b>How to Report Issues as a Contributor:</b><br />
            If you notice a bug or area for improvement, open an <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/issues" target="_blank" rel="noopener noreferrer">Issue</a> and describe it in detail. Use labels to categorize your issue (bug, enhancement, documentation, etc.).
          </p>
          <p>
            <b>How to Start or Join a Discussion:</b><br />
            Visit <a href="https://github.com/cocopuff2u/CAC_FOR_MAC/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a> to join ongoing conversations or start a new topic. Share your expertise and help others solve problems.
          </p>
          <p>
            Thank you for helping build a comprehensive resource for the Mac admin community!
          </p>
        </div>
      </div>
    </Layout>
  );
}