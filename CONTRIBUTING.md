# Contributing to AI Photo Sketcher

Thank you for your interest in contributing to the AI Photo Sketcher project! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

When filing a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (browser, OS, Node.js version)
- **Error messages** or console logs

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Clear description** of the proposed feature
- **Use case** explaining why it would be useful
- **Mockups or examples** (if applicable)
- **Implementation ideas** (optional)

### Pull Requests

1. **Fork the repository** and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards below

3. **Test your changes** thoroughly:
   ```bash
   npm run dev
   npm run type-check
   npm run lint
   ```

4. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Reference to related issues (if applicable)
   - Screenshots/GIFs for UI changes

## Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/banana-draw.git
   cd banana-draw
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where appropriate

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types with TypeScript interfaces
- Implement proper error boundaries

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

**Key style guidelines:**

- Use single quotes for strings
- 2 spaces for indentation
- Semicolons required
- Max line length: 100 characters
- Use arrow functions for callbacks
- Use `const` by default, `let` when reassignment needed

### Component Structure

```typescript
import React, { useState, useEffect } from 'react';

interface ComponentProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState<Type>(initialValue);
  
  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `ImageUploader.tsx`)
- Utilities: `camelCase.ts` (e.g., `fileUtils.ts`)
- Services: `camelCase.ts` (e.g., `geminiService.ts`)

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(uploader): add file size validation
fix(api): handle empty response from Gemini API
docs(readme): update installation instructions
```

## Testing

Currently, the project does not have automated tests. Contributions adding tests are highly welcome!

When adding tests:
- Use Jest and React Testing Library
- Test user interactions and edge cases
- Aim for meaningful coverage, not 100% coverage
- Mock external API calls

## Accessibility

All UI changes must maintain or improve accessibility:

- Use semantic HTML
- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers when possible
- Maintain sufficient color contrast

## Performance

Consider performance implications:

- Optimize images and assets
- Use React.memo() for expensive components
- Avoid unnecessary re-renders
- Profile performance for large files

## Documentation

Update documentation when:

- Adding new features
- Changing existing behavior
- Modifying configuration
- Adding dependencies

Documentation includes:
- README.md
- Code comments for complex logic
- JSDoc comments for functions
- Type definitions

## Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Review this guide and other documentation
3. Open a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to AI Photo Sketcher! 🎨

