import fs from 'fs';
import path from 'path';
import solc from 'solc';

const contractsDir = './contracts';
const files = fs.readdirSync(contractsDir).filter(f => f.endsWith('.sol'));

const input = {
    language: 'Solidity',
    sources: {},
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        },
        optimizer: {
            enabled: true,
            runs: 200
        },
        evmVersion: 'cancun'
    }
};

files.forEach(file => {
    input.sources[file] = { content: fs.readFileSync(path.join(contractsDir, file), 'utf8') };
});

function findImports(importPath) {
    if (importPath.startsWith('@openzeppelin/')) {
        const fullPath = path.resolve('./node_modules', importPath);
        return { contents: fs.readFileSync(fullPath, 'utf8') };
    }
    return { error: 'File not found' };
}

console.log("Compiling...");
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
    output.errors.forEach(err => console.error(err.formattedMessage));
    if (output.errors.some(err => err.severity === 'error')) process.exit(1);
}

fs.writeFileSync('output.json', JSON.stringify(output, null, 2));
console.log("Compiled successfully! output.json created.");
