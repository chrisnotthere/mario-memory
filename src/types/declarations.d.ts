// Handling CSS Modules: Maps CSS class names to a string
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Handling SVG imports: Treats the imported SVG as any type
declare module "*.svg" {
  const content: any;
  export default content;
}
