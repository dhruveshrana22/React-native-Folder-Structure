/* eslint-disable radix */
// eslint-disable-next-line radix
const fs = require('fs');
const readline = require('readline');
const buildGradlePath = 'android/app/build.gradle';
const appVersionPath = './version-update.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter the increment type (1. major, 2. minor, 3. patch or press enter to skip): ',
  (incrementType) => {
    rl.close();

    if (
      !incrementType ||
      ![1, 2, 3].includes(parseInt(incrementType.trim(), 10))
    ) {
      console.log('Version increment skipped.');
      process.exit(0);
    }

    const packageJson = JSON.parse(fs.readFileSync(appVersionPath, 'utf8'));
    const buildGradleContent = fs.readFileSync(buildGradlePath, 'utf-8');

    let versionCode, versionName;

    const versionCodeMatch = buildGradleContent.match(/versionCode\s+(\d+)/);
    const versionNameMatch = buildGradleContent.match(
      /versionName\s+"([^"]+)"/,
    );

    if (!versionCodeMatch || !versionNameMatch) {
      throw new Error(
        'Failed to parse versionCode or versionName from build.gradle',
      );
    }

    versionCode = parseInt(versionCodeMatch[1], 10);
    versionName = versionNameMatch[1];

    // Combine the increment logic for major, minor, and patch
    versionCode += 1;

    if (incrementType === 'major' || incrementType === '1') {
      versionName = `${parseInt(versionName.split('.')[0]) + 1}.0.0`;
    } else if (incrementType === 'minor' || incrementType === '2') {
      versionName = `${parseInt(versionName.split('.')[0])}.${
        parseInt(versionName.split('.')[1]) + 1
      }.0`;
    } else if (incrementType === 'patch' || incrementType === '3') {
      versionName = `${parseInt(versionName.split('.')[0])}.${parseInt(
        versionName.split('.')[1],
      )}.${parseInt(versionName.split('.')[2]) + 1}`;
    } else {
      throw new Error(
        'Invalid increment type. Use "major", "minor", or "patch".',
      );
    }

    // Use for assign version in our manual json file key "version"
    packageJson.version = versionName;

    // Update version in build.gradle
    const updatedBuildGradleContent = buildGradleContent
      .replace(/versionCode\s+\d+/, `versionCode ${versionCode}`)
      .replace(/versionName\s+"[^"]+"/, `versionName "${versionName}"`);

    fs.writeFileSync(appVersionPath, JSON.stringify(packageJson, null, 2)); // This is use for change version in our manual json file
    fs.writeFileSync(buildGradlePath, updatedBuildGradleContent); // This is use for change version app/build.gradle file

    console.log(`Updated version to ${versionName}`);
  },
);
