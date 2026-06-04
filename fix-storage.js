const fs = require('fs');
let code = fs.readFileSync('src/utils/storage.ts', 'utf8');

const throttleCode = `
// Global fetch throttle to prevent infinite loops and massive network spikes
const lastFetchTime: Record<string, number> = {};
function shouldFetch(key: string) {
  const now = Date.now();
  if (!lastFetchTime[key] || now - lastFetchTime[key] > 60000) {
    lastFetchTime[key] = now;
    return true;
  }
  return false;
}
`;

if (!code.includes('function shouldFetch')) {
  code = code.replace('function notifySync', throttleCode + '\nfunction notifySync');
}

const fetchRegex = /supabase\s*\n\s*\.from\(\"([^\"]+)\"\)\s*\n\s*\.select\(\"\*\"\)\s*\n\s*\.then\(\(\{\s*data,\s*error\s*\}\s*:\s*\{\s*data:\s*any;\s*error:\s*any\s*\}\)\s*=>\s*\{\s*if\s*\(!error\s*&&\s*data\)\s*\{\s*localStorage\.setItem\(([^,]+),\s*JSON\.stringify\(data\)\);\s*notifySync\([^)]+\);\s*\}\s*\}\);/g;

code = code.replace(fetchRegex, (match, table, key) => {
  return `if (shouldFetch(${key})) {
    supabase
      .from("${table}")
      .select("*")
      .then(({ data, error }: { data: any; error: any }) => {
        if (!error && data) {
          const currentString = localStorage.getItem(${key});
          const newString = JSON.stringify(data);
          if (currentString !== newString) {
            localStorage.setItem(${key}, newString);
            notifySync(${key});
          }
        }
      });
  }`;
});

const settingsFetchRegex = /supabase\s*\n\s*\.from\(\"company_settings\"\)\s*\n\s*\.select\(\"\*\"\)\s*\n\s*\.single\(\)\s*\n\s*\.then\(\(\{\s*data,\s*error\s*\}\s*:\s*\{\s*data:\s*any;\s*error:\s*any\s*\}\)\s*=>\s*\{\s*if\s*\(!error\s*&&\s*data\)\s*\{\s*localStorage\.setItem\(SETTINGS_KEY,\s*JSON\.stringify\(data\)\);\s*notifySync\(SETTINGS_KEY\);\s*\}\s*\}\);/g;

code = code.replace(settingsFetchRegex, `if (shouldFetch(SETTINGS_KEY)) {
    supabase
      .from("company_settings")
      .select("*")
      .single()
      .then(({ data, error }: { data: any; error: any }) => {
        if (!error && data) {
          const currentString = localStorage.getItem(SETTINGS_KEY);
          const newString = JSON.stringify(data);
          if (currentString !== newString) {
            localStorage.setItem(SETTINGS_KEY, newString);
            notifySync(SETTINGS_KEY);
          }
        }
      });
  }`);

fs.writeFileSync('src/utils/storage.ts', code);
console.log("Fix applied successfully.");
