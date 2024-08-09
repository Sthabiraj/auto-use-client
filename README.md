# Next.js Auto 'use client' Inserter

This VS Code extension automatically inserts the 'use client' directive in Next.js applications where it's required. It helps developers streamline their workflow by automatically identifying client-side code and inserting the necessary directive.

## Features

This extension automatically inserts 'use client' in the following scenarios:

1. Files containing React hooks usage (both built-in and custom)
2. Files with calls to browser-only APIs
3. Files containing React class components
4. Files with common patterns in client components (e.g., event handlers and refs)

## Installation

Yet not available in VS Code marketplace.

## Building from Source

To build and install the extension from source:

1. Clone the repository:

   ```
   git clone https://github.com/Sthabiraj/auto-use-client.git
   cd auto-use-client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Compile the extension:

   ```
   npx tsc
   ```

4. Package the extension:

   ```
   vsce package
   ```

   This will create a `.vsix` file in your project directory.

5. Install the extension in VS Code:
   - Open VS Code
   - Go to the Extensions view (Ctrl+Shift+X)
   - Click on the "..." at the top of the Extensions view
   - Choose "Install from VSIX..."
   - Select the `.vsix` file you created in step 4

## Usage

Once installed, the extension will automatically scan your Next.js files and insert the 'use client' directive at the top of files where it's needed. You don't need to take any manual action; the extension will handle the insertion automatically.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Support

If you encounter any problems or have any suggestions, please open an issue on the GitHub repository.
