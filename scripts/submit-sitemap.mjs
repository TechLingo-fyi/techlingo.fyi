#!/usr/bin/env node
/**
 * Script to submit sitemap to search engines
 * 
 * Usage:
 *   npm run submit-sitemap
 * 
 * Environment variables:
 *   GOOGLE_SEARCH_CONSOLE_API_KEY - Optional API key for Google Search Console API
 *   BING_API_KEY - Optional API key for Bing Webmaster Tools API
 */

const SITEMAP_URL = 'https://techlingo.fyi/sitemap.xml';

// Google Search Console submission via ping
async function submitToGoogle() {
  const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  
  try {
    const response = await fetch(googlePingUrl);
    if (response.ok) {
      console.log('✅ Successfully submitted sitemap to Google Search Console');
    } else {
      console.warn(`⚠️  Google submission returned status ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Failed to submit sitemap to Google:', error.message);
  }
}

// Bing Webmaster Tools submission via ping
async function submitToBing() {
  const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  
  try {
    const response = await fetch(bingPingUrl);
    if (response.ok) {
      console.log('✅ Successfully submitted sitemap to Bing Webmaster Tools');
    } else {
      console.warn(`⚠️  Bing submission returned status ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Failed to submit sitemap to Bing:', error.message);
  }
}

// Main execution
async function main() {
  console.log(`🚀 Submitting sitemap: ${SITEMAP_URL}\n`);
  
  await Promise.all([
    submitToGoogle(),
    submitToBing(),
  ]);
  
  console.log('\n📝 Manual submission instructions:');
  console.log('   Google Search Console: https://search.google.com/search-console');
  console.log('   Bing Webmaster Tools: https://www.bing.com/webmasters');
  console.log(`   Sitemap URL: ${SITEMAP_URL}`);
}

main().catch((error) => {
  console.error('❌ Error submitting sitemap:', error);
  process.exit(1);
});
