// Decap CMS initialization for Meridian Logistics blog.
// Articles are stored as markdown files with frontmatter in src/blog/posts/.
// The CMS writes to the local Git repository via the Git Gateway backend.
import CMS from 'decap-cms-app';

// Optional: custom preview styles
CMS.registerPreviewStyle('/index.css');

console.log('Decap CMS initialized for Meridian Logistics');
