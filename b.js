const fs = require('fs');
const { exec } = require('child_process');

const filePath = './index.html';
const blogEntry = process.argv[2]; // Takes the blog entry from the command line argument
const commitMessage = 'Blogged 🤙';

if (!blogEntry) {
  console.log('Updating site 🌏. Please hold.');
  exec(`git add . && git commit -m "${commitMessage}" && git push`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
  process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const blogMarker = '<ul>'; // Identify the opening tag of the blog list
  const newBlogEntry = `${blogMarker}\n  <li>${blogEntry}</li>\n`;
  const updatedData = data.replace(blogMarker, newBlogEntry);

  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Blog updated successfully.');
    console.log('Updating site 🌏. Please hold.');
    exec(`git add . && git commit -m "${commitMessage}" && git push`, (error, stdout, stderr) => {
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
