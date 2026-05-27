const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src/main/webapp/app/templates');
const routerFile = path.join(__dirname, 'src/main/webapp/app/router.tsx');

let imports = "import HsePage from '@/templates/hse/HsePage';\n";
let routes = `          {
            path: 'hse',
            element: <HsePage />,
          },\n`;

const dirs = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory() && f !== 'hse');

for (const dir of dirs) {
  const capName = dir.charAt(0).toUpperCase() + dir.slice(1);
  const pagePath = path.join(templatesDir, dir, `${capName}Page.tsx`);
  
  if (fs.existsSync(pagePath)) {
    imports += `import ${capName}Page from '@/templates/${dir}/${capName}Page';\n`;
    routes += `          {
            path: '${dir}',
            element: <${capName}Page />,
          },\n`;
  }
}

let content = fs.readFileSync(routerFile, 'utf-8');

// Replace imports
content = content.replace("import HsePage from '@/templates/hse/HsePage';", imports.trim());

// Replace routes
const oldRoutes = `          {
            path: 'hse',
            element: <HsePage />,
          },`;
content = content.replace(oldRoutes, routes.trim());

fs.writeFileSync(routerFile, content);
console.log("Router updated");
