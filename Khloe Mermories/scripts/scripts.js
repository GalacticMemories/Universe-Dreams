// Shell Class Definition
class Shell {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clearTerminal(),
            ls: () => this.listFiles(),
            cd: (dir) => this.changeDirectory(dir),
            upload: () => this.uploadFile(),
            mkdir: (name) => this.createDirectory(name),
            rm: (path) => this.removeFile(path),
            cat: (file) => this.viewFile(file)
        };
        this.currentDir = '/';
    }

    setupTerminal() {
        const terminal = document.createElement('div');
        terminal.className = 'terminal';
        terminal.innerHTML = `
            <div class="terminal-tabs">
                <div class="terminal-tab active">TERMINAL</div>
                <div class="terminal-tab">OUTPUT</div>
                <div class="terminal-tab">PROBLEMS</div>
                <div class="terminal-tab">EXTENSIONS</div>
            </div>
            <div class="terminal-header">
                <span>PowerShell</span>
                <button class="terminal-close">×</button>
            </div>
            <div class="terminal-output"></div>
            <div class="terminal-input-line">
                <span class="prompt">PS C:\\Users\\guest></span>
                <input type="text" class="terminal-input" spellcheck="false">
            </div>
            <div class="terminal-status-bar">
                <span>Galactic Shell</span>
            </div>
        `;
        document.body.appendChild(terminal);

        const input = terminal.querySelector('.terminal-input');
        const closeBtn = terminal.querySelector('.terminal-close');
        
        // Setup tab panels
        const terminalContent = terminal.querySelector('.terminal-output');
        const outputPanel = document.createElement('div');
        outputPanel.className = 'terminal-panel';
        outputPanel.style.display = 'none';
        outputPanel.innerHTML = '<div class="terminal-line">Output panel</div>';
        
        const problemsPanel = document.createElement('div');
        problemsPanel.className = 'terminal-panel';
        problemsPanel.style.display = 'none';
        problemsPanel.innerHTML = '<div class="terminal-line">No problems found</div>';

        const extensionsPanel = document.createElement('div');
        extensionsPanel.className = 'terminal-panel extensions-panel';
        extensionsPanel.style.display = 'none';
        extensionsPanel.innerHTML = `
            <div class="extension-search">
                <input type="text" placeholder="Search Extensions in Marketplace" class="extension-search-input">
            </div>
            <div class="extension-list">
                <div class="extension-item">
                    <div class="extension-icon">🤖</div>
                    <div class="extension-info">
                        <div class="extension-name">BlackBox AI</div>
                        <div class="extension-description">AI-powered code completion and chat</div>
                        <div class="extension-stats">
                            <span>⭐ 4.8</span>
                            <span>↓ 1M+</span>
                            <button class="extension-install installed">Installed</button>
                        </div>
                    </div>
                </div>
                <div class="extension-item">
                    <div class="extension-icon">🎨</div>
                    <div class="extension-info">
                        <div class="extension-name">Theme - Space Dark</div>
                        <div class="extension-description">Dark theme optimized for space themes</div>
                        <div class="extension-stats">
                            <span>⭐ 4.6</span>
                            <span>↓ 500K+</span>
                            <button class="extension-install">Install</button>
                        </div>
                    </div>
                </div>
                <div class="extension-item">
                    <div class="extension-icon">🚀</div>
                    <div class="extension-info">
                        <div class="extension-name">Galactic Snippets</div>
                        <div class="extension-description">Code snippets for space-themed projects</div>
                        <div class="extension-stats">
                            <span>⭐ 4.7</span>
                            <span>↓ 200K+</span>
                            <button class="extension-install">Install</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        terminal.insertBefore(outputPanel, terminalContent.nextSibling);
        terminal.insertBefore(problemsPanel, outputPanel.nextSibling);
        terminal.insertBefore(extensionsPanel, problemsPanel.nextSibling);

        // Setup tab functionality
        const tabs = terminal.querySelectorAll('.terminal        const tabs = terminal.querySelectorAll('.terminal-tab');
        const panels = [terminalContent, outputPanel, problemsPanel, extensionsPanel];

        // Add extension search functionality
        const searchInput = extensionsPanel.querySelector('.extension-search-input');
        const extensionList = extensionsPanel.querySelector('.extension-list');
        const installButtons = extensionsPanel.querySelectorAll('.extension-install');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const extensions = extensionList.querySelectorAll('.extension-item');
            
            extensions.forEach(ext => {
                const name = ext.querySelector('.extension-name').textContent.toLowerCase();
                const desc = ext.querySelector('.extension-description').textContent.toLowerCase();
                if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                    ext.style.display = 'flex';
                } else {
                    ext.style.display = 'none';
                }
            });
        });

        installButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('installed')) {
                    button.textContent = 'Install';
                    button.classList.remove('installed');
                } else {
                    button.textContent = 'Installed';
                    button.classList.add('installed');
                }
            });
        });
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                panels.forEach(panel => panel.style.display = 'none');
                panels[index].style.display = 'block';
            });
        });

        input.addEventListener('keydown', (e) => this.handleInput(e));
        closeBtn.addEventListener('click', () => terminal.classList.toggle('hidden'));

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'terminal-toggle';
        toggleBtn.innerHTML = '>';
        toggleBtn.addEventListener('click', () => terminal.classList.toggle('hidden'));
        document.body.appendChild(toggleBtn);

        this.terminal = terminal;
        this.output = terminal.querySelector('.terminal-output');
        this.input = input;
        this.print('Welcome to Galactic Shell! Type "help" for available commands.');
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const cmd = this.input.value.trim();
            if (cmd) {
                this.history.push(cmd);
                this.historyIndex = this.history.length;
                this.executeCommand(cmd);
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                this.input.value = '';
            }
        }
    }

    executeCommand(cmdString) {
        const [cmd, ...args] = cmdString.split(' ');
        this.print(`<span class="prompt">PS C:\\Users\\guest></span> ${cmdString}`);
        
        if (this.commands[cmd]) {
            try {
                this.commands[cmd](...args);
            } catch (error) {
                this.print(`Error: ${error.message}`, 'error');
            }
        } else {
            this.print(`Command not found: ${cmd}. Type "help" for available commands.`, 'error');
        }
    }

    print(message, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = message;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    showHelp() {
        const help = `
Available commands:
  help    - Show this help message
  clear   - Clear terminal
  ls      - List files in current directory
  cd      - Change directory
  upload  - Upload a file
  mkdir   - Create a new directory
  rm      - Remove a file
  cat     - View file contents`;
        this.print(help);
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    listFiles() {
        const files = [
            'photos/',
            'albums/',
            'uploads/',
            'README.md'
        ];
        this.print(files.join('\n'));
    }

    changeDirectory(dir) {
        if (!dir) {
            this.print    changeDirectory(dir) {
        if (!dir) {
            this.print('Usage: cd <directory>', 'error');
            return;
        }
        this.currentDir = dir;
        this.print(`Changed directory to: ${dir}`);
    }

    uploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        document.body.appendChild(input);
        
        input.click();
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.print(`Uploading: ${file.name}`);
                setTimeout(() => {
                    this.print(`Successfully uploaded: ${file.name}`);
                    document.body.removeChild(input);
                }, 1000);
            }
        });
    }

    createDirectory(name) {
        if (!name) {
            this.print('Usage: mkdir <directory_name>', 'error');
            return;
        }
        this.print(`Created directory: ${name}`);
    }

    removeFile(path) {
        if (!path) {
            this.print('Usage: rm <file_path>', 'error');
            return;
        }
        this.print(`Removed: ${path}`);
    }

    viewFile(file) {
        if (!file) {
            this.print('Usage: cat <file_path>', 'error');
            return;
        }
        this.print(`Contents of ${file}:\n---\nSimulated file contents\n---`);
    }
}

// Helper Functions
function createFullscreenView() {
    const fullscreenView = document.createElement('div');
    fullscreenView.className = 'fullscreen-view';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-fullscreen';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => fullscreenView.classList.remove('active');
    
    const image = document.createElement('img');
    fullscreenView.appendChild(image);
    fullscreenView.appendChild(closeButton);
    document.body.appendChild(fullscreenView);
    
    return { fullscreenView, image };
}

// Main Application Code
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Shell
    const shell = new Shell();
    shell.setupTerminal();

    // Header Toggle Functionality
    let lastScrollY = window.scrollY;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Sun Button Toggle
    const toggleButton = document.querySelector('.toggle-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            header.classList.toggle('header-hidden');
        });
    }

    // Dynamic Photo Slots
    const photoSlots = document.querySelectorAll('.photo-slot');
    const galaxyPhotos = [
        'https://source.unsplash.com/random/400x400/?galaxy',
        'https://source.unsplash.com/random/400x400/?nebula',
        'https://source.unsplash.com/random/400x400/?space'
    ];

    function updatePhotoSlots() {
        photoSlots.forEach((slot, index) => {
            const img = new Image();
            img.src = galaxyPhotos[index % galaxyPhotos.length];
            img.onload = () => {
                slot.style.backgroundImage = `url(${img.src})`;
                slot.style.backgroundSize = 'cover';
                slot.style.backgroundPosition = 'center';
            };
        });
    }

    updatePhotoSlots();
    setInterval(updatePhotoSlots, 10000);

    // Fullscreen View Functionality
    const { fullscreenView, image } = createFullscreenView();

    // Handle Gallery Images
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', () => {
            image.src = img.src;
            fullscreenView.classList.add('active');
        });
    });
});
