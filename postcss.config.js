import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwindcss from '@tailwindcss/postcss';

const postcssConfig = {
  plugins: [
    autoprefixer,
    tailwindcss,
    // seed4j-needle-thymeleaf-postcss-plugins
  ],
};

// If we are in production mode, then add cssnano
if (process.env.NODE_ENV === 'production') {
  postcssConfig.plugins.push(
    cssnano({
      // use the safe preset so that it doesn't
      // mutate or remove code from our css
      preset: 'default',
    }),
  );
}

export default postcssConfig;
