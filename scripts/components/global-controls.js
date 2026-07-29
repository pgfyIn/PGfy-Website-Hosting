document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Scroll Buttons
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'global-scroll-controls';
    scrollContainer.innerHTML = `
        <button id="scrollUpBtn" title="Scroll to Top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>
        <button id="scrollDownBtn" title="Scroll to Bottom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
    `;
    document.body.appendChild(scrollContainer);

    // 2. Add Styles for Scroll Buttons & Copy Button
    const style = document.createElement('style');
    style.innerHTML = `
        .global-scroll-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 9999;
        }
        .global-scroll-controls button {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: #1D70B8;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            opacity: 0.8;
        }
        .global-scroll-controls button:hover {
            opacity: 1;
            transform: translateY(-2px);
            background-color: #155A96;
        }
        .global-scroll-controls button svg {
            width: 24px;
            height: 24px;
        }
        .address-copy-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            margin-left: 10px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: all 0.2s;
            vertical-align: middle;
        }
        .address-copy-btn:hover {
            background: rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);

    // 3. Add Event Listeners for Scroll
    const upBtn = document.getElementById('scrollUpBtn');
    const downBtn = document.getElementById('scrollDownBtn');
    
    // Hide Scroll Up button when at top, hide Down button when at bottom
    const handleScroll = () => {
        if (window.scrollY < 100) {
            upBtn.style.display = 'none';
        } else {
            upBtn.style.display = 'flex';
        }
        
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            downBtn.style.display = 'none';
        } else {
            downBtn.style.display = 'flex';
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    downBtn.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // 4. Inject Copy Button for Address
    const addressNodes = Array.from(document.querySelectorAll('p, address'));
    const addressEl = addressNodes.find(el => el.textContent.includes('Office Address:'));
    
    if (addressEl) {
        // Find exact string to copy
        const fullAddress = "IIIT Bangalore Innovation Centre, Space 34, 26/C, Hosur Road, Electronics City Phase 1, Electronic City, Bengaluru, Karnataka 560100";
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'address-copy-btn';
        copyBtn.title = "Copy Address";
        copyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy
        `;
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(fullAddress).then(() => {
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span style="color:#4ade80;">Copied!</span>
                `;
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                }, 2000);
            }).catch(err => {
                console.error("Could not copy address: ", err);
            });
        });
        
        addressEl.appendChild(copyBtn);
    }
});
