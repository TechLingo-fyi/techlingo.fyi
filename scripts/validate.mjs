import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const LINGOS_DIR = 'src/content/lingos';
const REQUIRED_FIELDS = ['slug', 'term', 'definitions'];
const REQUIRED_DEFINITION_FIELDS = ['language', 'definition', 'term_usage_example'];

async function validateLingoFiles() {
  console.log('🔍 Validating lingo files...\n');
  
  try {
    const files = await readdir(LINGOS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    let errors = 0;
    const slugs = new Set();
    
    for (const file of jsonFiles) {
      const filePath = join(LINGOS_DIR, file);
      const content = await readFile(filePath, 'utf-8');
      
      try {
        const data = JSON.parse(content);
        
        // Check required fields
        for (const field of REQUIRED_FIELDS) {
          if (!data[field]) {
            console.error(`❌ ${file}: Missing required field '${field}'`);
            errors++;
          }
        }
        
        // Check slug uniqueness
        if (data.slug) {
          if (slugs.has(data.slug)) {
            console.error(`❌ ${file}: Duplicate slug '${data.slug}'`);
            errors++;
          }
          slugs.add(data.slug);
        }
        
        // Validate definitions
        if (data.definitions && Array.isArray(data.definitions)) {
          for (const [index, def] of data.definitions.entries()) {
            for (const field of REQUIRED_DEFINITION_FIELDS) {
              if (!def[field]) {
                console.error(`❌ ${file}: Definition ${index} missing field '${field}'`);
                errors++;
              }
            }
          }
        }
        
        console.log(`✅ ${file}: Valid`);
        
      } catch (parseError) {
        console.error(`❌ ${file}: Invalid JSON - ${parseError.message}`);
        errors++;
      }
    }
    
    console.log(`\n📊 Validation complete: ${jsonFiles.length} files, ${errors} errors`);
    
    if (errors > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Failed to validate files:', error);
    process.exit(1);
  }
}

validateLingoFiles();
