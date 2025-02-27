[![DOI](https://zenodo.org/badge/936285754.svg)](https://doi.org/10.5281/zenodo.14923358)

# FEZClient

![Screenshot 2025-02-25 140512](https://github.com/user-attachments/assets/ee9d585c-d7f8-4706-b246-98825cd319a7)

FEZClient is a powerful and flexible tool designed to enhance the FEZTool ecosystem. This client allows users to interact with FEZTool seamlessly, providing an efficient development and production environment.

![Screenshot 2025-02-25 140443](https://github.com/user-attachments/assets/7e989f25-daa8-411b-9398-a1d19819c196)



## Installation

To get started with FEZClient, ensure you have [Node.js](https://nodejs.org/) installed on your system. Then, follow these steps:

```sh
git clone https://github.com/FEZtool-team/FEZClient.git
cd FEZClient
yarn install
```

## Development

To start the development server, use:

```sh
yarn install
yarn dev
```

This will run the project in development mode, allowing for live updates and debugging.

## Production

For a production-ready installation, run:

```sh
yarn install --prod
yarn build
pm2 start ecosystem.config.cjs
```

This installs only the necessary dependencies for production, builds the project for deployment, and starts the application using PM2.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions from the community! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Description of changes"`).
4. Push your changes (`git push origin feature-branch`).
5. Open a pull request.

## Contact

For questions or support, please send an Email to support@feztool.com .
