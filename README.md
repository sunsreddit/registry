<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sunsreddit/registry/">
    <img src="docs/images/logo.png" alt="Logo" width="235" height="177">
  </a>
  <h3 align="center">☀️ Phoenix Suns Registry 📦</h3>
  <p align="center">
    An Amazon Web Service Private Elastic Container Registry service for all r/suns projects!
    <br />
    <a href="https://github.com/sunsreddit/registry"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://agile.sunsreddit.net/projects/suns-sidebar-project/">View Project</a>
    ·
    <a href="https://github.com/sunsreddit/registry/issues">Report Bug</a>
    ·
    <a href="https://github.com/sunsreddit/registry/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<a name="readme-top"></a>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
          <li><a href="#dependencies">Dependencies</a></li>
          <li><a href="#i-github-secrets">GitHub Secrets</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

As our amazing basketball community grows, the r/SUNS subreddit is developing tools like
  this AWS private Elastic Container Registry stack to help automate tasks which helps promote
  the highest quality of content.
  The "Phoenix Suns Registry" creates private repositories for each `sunsreddit` GitHub project
  and the necessary dependencies to securely push and pull Docker images.

## Getting Started

The following prerequisites and requirements are necessary for the success of this project:

### Dependencies

- [![CDK][cdk-shield]][cdk-url]
- [![Docker][docker-shield]][docker-url]
- [![Node][node-shield]][node-url]

### GitHub Secrets

More information on GitHub Secrets can be found in GitHub's documentation.

```bash
AWS_ACCESS_KEY_ID=
AWS_ACCOUNT_ID=
AWS_REGION=
AWS_SECRET_ACCESS_KEY=
NPM_TOKEN=
```

## Contributing

  If you have a suggestion that would make this better, please fork the repo and create
  a pull request. You can also simply open an issue with the tag "enhancement".
  Don't forget to give the project a star! Thanks again!

  1. Fork the Project
  2. Create your Feature Branch (`git checkout -b feature/project-id`)
  3. Commit your Changes (`git commit -m 'Add the thing'`)
  4. Push to the Branch (`git push origin feature/project-id`)
  5. Open a Pull Request

## Roadmap

  | TO DO      | Description                                          | Status
  | --         | --                                                   | --
  | Usage      | Add "Usage" instructions in the README.md            | ✅
  | Automation | A Docker service that automates the projects actions | ✅
  | CI/CD      | GitHub Action Integration                            | 🚧 WIP
  | Unit Tests | Jest unit tests for all project modules              | 🚧 WIP

## License

  Distributed under the MIT License. See [LICENSE][license-url] for more information.

## Contact

<html>
  <body>
    <p><img src="./docs/images/reddit.svg" alt="u/bruxc"
    style="width:1%;
      filter: invert(32%)
      sepia(91%) saturate(2585%)
      hue-rotate(0deg)
      brightness(100%)
      contrast(110%);">
    <a href="https://reddit.com/u/bruxc/">u/bruxc</a>
    </p>
  </body>
</html>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

  <!-- Shields -->
  [cdk-shield]: https://img.shields.io/badge/CDK-v2.126.0-green?style=appveyor&logo=amazonaws
  [cdk-url]: https://aws.amazon.com/cdk/
  [docker-shield]: https://img.shields.io/badge/Docker-%5E25.0.2-green?style=appveyor&logo=docker
  [docker-url]:    https://docs.docker.com/engine/install/
  [node-shield]:   https://img.shields.io/badge/Node.js-%5E21.6.1-green?style=appveyor&logo=nodedotjs
  [node-url]:      https://nodejs.org/en/docs/

  <!-- License -->
  [license-url]: LICENSE
