const fs = require('fs');
const path = require('path');

const routerFile = path.join(__dirname, 'src/main/webapp/app/router.tsx');
let content = fs.readFileSync(routerFile, 'utf-8');

const replacements = [
  { old: 'Ai-consolePage', new: 'AiConsolePage' },
  { old: 'Design-systemPage', new: 'DesignSystemPage' },
  { old: 'Digital-twinPage', new: 'DigitalTwinPage' },
  { old: 'Iot-trackingPage', new: 'IotTrackingPage' },
  { old: 'Punch-listPage', new: 'PunchListPage' },
  { old: 'Reality-capturePage', new: 'RealityCapturePage' },
  { old: 'Site-diaryPage', new: 'SiteDiaryPage' },
  { old: 'Site-issuesPage', new: 'SiteIssuesPage' },
  { old: 'Daily-reportPage', new: 'DailyReportPage' }
];

for (const r of replacements) {
  content = content.replace(new RegExp(`import ${r.old} from`, 'g'), `import ${r.new} from`);
  content = content.replace(new RegExp(`<${r.old} \\/>`, 'g'), `<${r.new} />`);
}

fs.writeFileSync(routerFile, content);

// Also rename the files that have hyphens in their name
const templatesDir = path.join(__dirname, 'src/main/webapp/app/templates');
const dirs = fs.readdirSync(templatesDir);
for (const dir of dirs) {
  if (dir.includes('-')) {
    const capName = dir.charAt(0).toUpperCase() + dir.slice(1);
    const oldPath = path.join(templatesDir, dir, `${capName}Page.tsx`);
    const newCapName = dir.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    const newPath = path.join(templatesDir, dir, `${newCapName}Page.tsx`);
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      // update router content with new path name
      let routerContent = fs.readFileSync(routerFile, 'utf-8');
      routerContent = routerContent.replace(`@/templates/${dir}/${capName}Page`, `@/templates/${dir}/${newCapName}Page`);
      fs.writeFileSync(routerFile, routerContent);
    }
  }
}
console.log("Fixed router and filenames");
