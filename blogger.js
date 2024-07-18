const fs = require('fs');
const { exec } = require('child_process');

const filePath = './index.html';
const blogEntry = process.argv[2]; // Takes the blog entry from the command line argument
const commitMessage = 'Blogged 🤙';

if (!blogEntry) {
  console.error('Please provide a blog entry as an argument.');
  process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const blogMarker = '</ul>'; // Identify the closing tag of the blog list
  const newBlogEntry = `<li>${blogEntry}</li>\n  ${blogMarker}`;
  const updatedData = data.replace(blogMarker, newBlogEntry);

  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Blog updated successfully.');
    console.log('Updating site 🌏. Please hold.');
    // Git commit and push
    exec(`git add ${filePath} && git commit -m "${commitMessage}" && git push`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
    });
  });
});
