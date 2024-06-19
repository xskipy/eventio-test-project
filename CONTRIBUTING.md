# Contributing to the Project

## Getting Started

### Prerequisites

- Read [README.md](README.md) @ Get Started

### Project Structure

Our project follows a modular structure. Here's a brief overview of the main directories:

- `app/`: Contains the main application screens and layout.
- `assets/`: Contains static assets like images and fonts.
- `components/`: Contains all (common) components.
  - `__tests__/`: Contains unit tests for components.
  - `forms/`: Contains form-related components.
  - `headers/`: Contains header components.
  - `screens/`: Contains screen components.
- `constants/`: Defines reusable constants such as themes and breakpoints.
- `contexts/`: Contains React context providers.
- `hooks/`: Contains custom hooks.
- `types/`: TypeScript types used across the project.
- `utils/`: Utility functions and helpers.
  - `__tests__/`: Contains unit tests for utility functions.

## Guidelines

### Code Style

- Use TypeScript (`.ts` and `.tsx` files).
- Use arrow functions for defining components and functions.
- Follow the project's coding conventions as outlined below.

### Naming Conventions

- **Components**: Use PascalCase for component names, e.g., `ComponentName.tsx`.
- **Screens**: Use kebab-case for component names, e.g., `add-event.tsx`. (following expo's convention)
- **Props**: Use `Props` suffix for interface names defining component props, e.g., `ComponentNameProps`.
- **Files**: Use kebab-case for filenames, e.g., `component-name.tsx`.
- **Constants**: Use camelCase for regular constants and UPPER_SNAKE_CASE for environment variables, e.g., `const colors` and `const API_URL`.
- **Styles**: Use camelCase for style properties, e.g., `const styles = StyleSheet.create({ myStyle: { ... } })`.

### Example Code

Here are a few examples to demonstrate our coding style:

#### Component Example

```tsx
interface ComponentProps {
  text: string;
  // ...
}

const Component: FC<ComponentProps> = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default Component;

// Local styles are defined in the component file
const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 48,
    backgroundColor: colors.status.disabled,
  },
  text: {
    color: colors.secondary,
  },
});
```
